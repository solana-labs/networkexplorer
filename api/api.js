/*
   This component is a Node.JS server that implements
   API handler methods to support the Block Explorer
   Web UI.
 */
import express from 'express';
import nocache from 'nocache';
import cors from 'cors';
import redis from 'redis';
import WebSocket from 'ws';
import _ from 'lodash';
import './inbound-stream';
import expressWs from 'express-ws';

import config from './config';

const app = express();

const port = 3001;
const MINUTE_MS = 60 * 1000;

function getClient() {
  let props = config.redis.path
    ? {path: config.redis.path}
    : {host: config.redis.host, port: config.redis.port};

  return redis.createClient(props);
}

expressWs(app);
app.use(nocache());
app.use(cors());

app.get('/', (req, res) => {
  res.send('The Server is running! Try GET /txn-stats or /global-stats');
});

let listeners = {};
let handleRedis = type => (channel, message) => {
  let outMessage = {t: type, m: message};

  _.forEach(listeners, ws => {
    if (ws.readyState !== WebSocket.OPEN) {
      return;
    }
    ws.send(JSON.stringify(outMessage), err => {
      // send complete - check error
      if (err) {
        delete listeners[ws.my_id];
      }
    });
  });
};

const client = getClient();
const blocksClient = getClient();

blocksClient.on('message', handleRedis('blk'));
blocksClient.subscribe('@blocks');

function fixupJsonData(val) {
  val.data = JSON.parse(val.data);
  return val;
}

let txnListeners = {};
let handleTxnRedis = type => (channel, message) => {
  let outMessage = {t: type, m: message};

  _.forEach(txnListeners[channel], ws => {
    if (ws.readyState !== WebSocket.OPEN) {
      return;
    }
    ws.send(JSON.stringify(outMessage), err => {
      // send complete - check error
      if (err) {
        delete txnListeners[channel][ws.my_id];
      }
    });
  });
};

const txnsClient = getClient();
txnsClient.on('message', handleTxnRedis('txns-by-prgid'));

let id = 0;

app.ws('/', function(ws) {
  ws.my_id = id;
  id += 1;
  listeners[ws.my_id] = ws;

  console.log(
    new Date().toISOString() + ' ws peer [' + ws.my_id + '] connected.',
  );

  ws.on('message', function(data) {
    console.log(new Date().toISOString() + ' ws peer msg: ' + data);

    let value = JSON.parse(data);

    if (value.type === 'txns-by-prgid') {
      let chanKey = `@program_id:${value.id}`;

      if (
        value.action === 'subscribe' &&
        (!txnListeners[chanKey] || !txnListeners[chanKey][ws.my_id])
      ) {
        if (!txnListeners[chanKey]) {
          txnListeners[chanKey] = {};
          txnsClient.subscribe(chanKey);
        }
        txnListeners[chanKey][ws.my_id] = ws;
      }

      if (
        value.action === 'unsubscribe' &&
        txnListeners[chanKey] &&
        txnListeners[chanKey][ws.my_id]
      ) {
        if (txnListeners[chanKey] && txnListeners[chanKey][ws.my_id]) {
          delete txnListeners[chanKey][ws.my_id];
        }
        if (txnListeners[chanKey] && !txnListeners[chanKey].length) {
          delete txnListeners[chanKey];
          txnsClient.unsubscribe(chanKey);
        }
      }
    }
  });

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
    `!ent-last-leader`,
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

app.get('/txns-by-prgid/:id', (req, res) => {
  client.lrange(
    `!txns-by-prgid-timeline:${req.params.id}`,
    0,
    99,
    (err, val) => {
      if (err) {
        res.status(500).send('{"error":"server_error"}\n');
      } else if (val) {
        res.send(JSON.stringify(val) + '\n');
      } else {
        res.status(404).send('{"error":"not_found"}\n');
      }
    },
  );
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

app.get('/search/:id', (req, res) => {
  client.exists(`!txn:${req.params.id}`, (e1, v1) => {
    if (e1) {
      res.status(500).send('{"error":"server_error"}\n');
    } else if (v1) {
      res.send(JSON.stringify({t: 'txn', id: req.params.id}) + '\n');
      return;
    }
    client.exists(`!blk:${req.params.id}`, (e2, v2) => {
      if (e2) {
        res.status(500).send('{"error":"server_error"}\n');
      } else if (v2) {
        res.send(JSON.stringify({t: 'blk', id: req.params.id}) + '\n');
        return;
      }
      client.exists(`!ent:${req.params.id}`, (e3, v3) => {
        if (e3) {
          res.status(500).send('{"error":"server_error"}\n');
        } else if (v3) {
          res.send(JSON.stringify({t: 'ent', id: req.params.id}) + '\n');
          return;
        }
        client.exists(`!txns-by-prgid-timeline:${req.params.id}`, (e4, v4) => {
          if (e4) {
            res.status(500).send('{"error":"server_error"}\n');
          } else if (v4) {
            res.send(JSON.stringify({t: 'prg_id', id: req.params.id}) + '\n');
            return;
          }

          // give up
          res.status(404).send('{"error":"not_found"}\n');
          return;
        });
      });
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
