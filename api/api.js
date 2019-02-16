/*
   This component is a Node.JS server that implements
   API handler methods to support the Block Explorer
   Web UI.
 */
const express = require('express');
const nocache = require('nocache');
const cors = require('cors');
const redis = require('redis');
const WebSocket = require('ws');
const app = express();

const _ = require('lodash');

const port = 3000;

const MINUTE_MS = 60 * 1000;

let props = {
  host: '127.0.0.1',
  port: 6379,
};

let getClient = () => {
  return redis.createClient({
    host: props.host,
    port: props.port,
  });
};

let client = getClient();

app.use(nocache());
app.use(cors());
var expressWs = require('express-ws')(app);

app.get('/', (req, res) => {
  res.send('The Server is running! Try GET /txn-stats or /global-stats');
});

let listeners = {};
let handleRedis = type => (channel, message) => {
  let outMessage = {t: type, m: message};

  _.forEach(listeners, (ws, k) => {
    if (ws.readyState !== WebSocket.OPEN) {
      return;
    }
    ws.send(JSON.stringify(outMessage), (err, result) => {
      // send complete - check error
      if (err) {
        delete listeners[ws.my_id];
      }
    });
  });
};

let blocksClient = getClient();
let entriesClient = getClient();

blocksClient.on('message', handleRedis('blk'));
blocksClient.subscribe('@blocks');
entriesClient.on('message', handleRedis('ent'));
entriesClient.subscribe('@entries');

let fixupJsonData = val => {
  val.data = JSON.parse(val.data);
  return val;
};

let id = 0;

app.ws('/', function(ws, req) {
  ws.my_id = id;
  id += 1;
  listeners[ws.my_id] = ws;

  console.log(
    new Date().toISOString() + ' ws peer [' + ws.my_id + '] connected.',
  );

  ws.on('close', function(reasonCode, description) {
    console.log(
      new Date().toISOString() +
        ' ws peer [' +
        ws.my_id +
        '] disconnected: ' +
        reasonCode +
        ' ' +
        description,
    );
    delete listeners[ws.my_id];
  });
});

app.get('/txn-stats', (req, res) => {
  let now_min = (new Date().getTime() - 1000) / MINUTE_MS;
  let base_min = now_min - 60;

  let min_keys = _.range(base_min, now_min).map(x => {
    let ts = new Date(x * MINUTE_MS).toISOString().substring(0, 16);

    return `!txn-per-min:${ts}`;
  });

  client.mget(min_keys, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      let pure_keys = _.map(min_keys, x => x.substring(13));

      res.send(JSON.stringify(_.zipObject(pure_keys, val)) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/global-stats', (req, res) => {
  let txn_sec = new Date(new Date().getTime() - 3000)
    .toISOString()
    .substring(0, 19);
  let stat_keys = [
    `!global-node-id`,
    `!blk-last-slot`,
    `!blk-last-id`,
    `!txn-per-sec-max`,
    `!txn-per-sec:${txn_sec}`,
    `!txn-count`,
    `!ent-height`,
    `!ent-last-dt`,
    `!ent-last-id`,
  ];

  client.mget(stat_keys, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      res.send(JSON.stringify(_.zipObject(stat_keys, val)) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/blk-timeline', (req, res) => {
  client.lrange(`!blk-timeline`, 0, 99, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      res.send(JSON.stringify(val) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/ent-timeline', (req, res) => {
  client.lrange(`!ent-timeline`, 0, 99, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      res.send(JSON.stringify(val) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/txn-timeline', (req, res) => {
  client.lrange(`!txn-timeline`, 0, 99, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      res.send(JSON.stringify(val) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/blk/:id', (req, res) => {
  client.hgetall(`!blk:${req.params.id}`, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      client.smembers(`!ent-by-slot:${val.s}`, (err2, val2) => {
        if (val2) {
          val.entries = val2;
        }
        res.send(JSON.stringify(fixupJsonData(val)) + '\n');
      });
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/ent/:id', (req, res) => {
  client.hgetall(`!ent:${req.params.id}`, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      client.smembers(`!ent-txn:${val.id}`, (err2, val2) => {
        if (val2) {
          val.transactions = val2;
        }
        client.hgetall(`!blk:${val.block_id}`, (err3, val3) => {
          if (val3) {
            val.block = val3;
          }
          res.send(JSON.stringify(fixupJsonData(val)) + '\n');
        });
      });
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.get('/txn/:id', (req, res) => {
  client.hgetall(`!txn:${req.params.id}`, (err, val) => {
    if (err) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (val) {
      client.hgetall(`!ent:${val.entry_id}`, (err2, val2) => {
        if (val2) {
          val.entry = fixupJsonData(val2);
          client.hgetall(`!blk:${val2.block_id}`, (err3, val3) => {
            if (val3) {
              val.block = fixupJsonData(val3);
            }
            res.send(JSON.stringify(fixupJsonData(val)) + '\n');
          });
          return;
        }
        res.send(JSON.stringify(fixupJsonData(val)) + '\n');
      });
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
