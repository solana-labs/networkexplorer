/*
   This component is a Node.JS server that implements
   API handler methods to support the Block Explorer
   Web UI.
 */
import express from 'express';
import nocache from 'nocache';
import cors from 'cors';
import {promisify} from 'util';
import redis from 'redis';
import WebSocket from 'ws';
import _ from 'lodash';
import './inbound-stream';
import expressWs from 'express-ws';
import geoip from 'geoip-lite';
import YAML from 'yaml';
import fs from 'fs';
import assert from 'assert';
let solanaWeb3 = require('@solana/web3.js');

//
// FIXME: make configurable
//
let FULLNODE_URL = 'http://localhost:8899';

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

const mgetAsync = promisify(client.mget).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const smembersAsync = promisify(client.smembers).bind(client);

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

async function sendMgetKeysZipValuesResult(keys, displayKeys, res) {
  try {
    let result = await mgetAsync(keys);

    if (result) {
      res.send(JSON.stringify(_.zipObject(displayKeys, result)) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  } catch (err) {
    res.status(500).send('{"error":"server_error"}\n');
  }
}

app.get('/txn-stats', (req, res) => {
  let now_min = (new Date().getTime() - 1000) / MINUTE_MS;
  let base_min = now_min - 60;

  let min_keys = _.range(base_min, now_min).map(x => {
    let ts = new Date(x * MINUTE_MS).toISOString().substring(0, 16);

    return `!txn-per-min:${ts}`;
  });

  let pure_keys = _.map(min_keys, x => x.substring(13));

  sendMgetKeysZipValuesResult(min_keys, pure_keys, res);
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

  sendMgetKeysZipValuesResult(stat_keys, stat_keys, res);
});

async function sendLrangeResult(key, first, last, res) {
  try {
    let result = await lrangeAsync(key, first, last);

    if (result) {
      res.send(JSON.stringify(result) + '\n');
    } else {
      res.status(404).send('{"error":"not_found"}\n');
    }
  } catch (err) {
    res.status(500).send('{"error":"server_error"}\n');
  }
}

app.get('/blk-timeline', (req, res) => {
  sendLrangeResult(`!blk-timeline`, 0, 99, res);
});

app.get('/ent-timeline', (req, res) => {
  sendLrangeResult(`!ent-timeline`, 0, 99, res);
});

app.get('/txn-timeline', (req, res) => {
  sendLrangeResult(`!txn-timeline`, 0, 99, res);
});

app.get('/txns-by-prgid/:id', (req, res) => {
  let key = `!txns-by-prgid-timeline:${req.params.id}`;
  sendLrangeResult(key, 0, 99, res);
});

async function sendBlockResult(req, res) {
  try {
    let result = await hgetallAsync(`!blk:${req.params.id}`);
    if (result) {
      let entries = await smembersAsync(`!ent-by-slot:${result.s}`);
      if (entries) {
        result.entries = entries;
      }
      res.send(JSON.stringify(fixupJsonData(result)) + '\n');
      return;
    }
  } catch (err) {
    res.status(500).send('{"error":"server_error"}\n');
    return;
  }
  res.status(404).send('{"error":"not_found"}\n');
}

app.get('/blk/:id', (req, res) => {
  sendBlockResult(req, res);
});

const geoipWhitelistFile =
  process.env.BLOCKEXPLORER_GEOIP_WHITELIST || 'blockexplorer-geoip.yml';
let geoipWhitelist = {};
if (fs.existsSync(geoipWhitelistFile)) {
  try {
    const file = fs.readFileSync(geoipWhitelistFile, 'utf8');
    geoipWhitelist = YAML.parse(file);
    console.log(
      `Loaded geoip whitelist from ${geoipWhitelistFile}:`,
      geoipWhitelist,
    );
    assert(typeof geoipWhitelist === 'object');
  } catch (err) {
    console.log(`Failed to process ${geoipWhitelistFile}:`, err);
  }
}

app.get('/geoip/:ip', (req, res) => {
  const {ip} = req.params;

  if (geoipWhitelist[ip]) {
    res.send(JSON.stringify(geoipWhitelist[ip]) + '\n');
    return;
  }

  const geo = geoip.lookup(ip);
  if (geo === null) {
    res.status(404).send('{"error":"not_found"}\n');
  } else {
    res.send(JSON.stringify(geo.ll) + '\n');
  }
});

async function sendEntryResult(req, res) {
  try {
    let result = await hgetallAsync(`!ent:${req.params.id}`);
    if (result) {
      let transactions = await smembersAsync(`!ent-txn:${result.id}`);
      if (transactions) {
        result.transactions = transactions;
      }
      let block = await hgetallAsync(`!blk:${result.block_id}`);
      if (block) {
        result.block = block;
      }
      res.send(JSON.stringify(fixupJsonData(result)) + '\n');
      return;
    }
  } catch (err) {
    res.status(500).send('{"error":"server_error"}\n');
    return;
  }
  res.status(404).send('{"error":"not_found"}\n');
}

app.get('/ent/:id', (req, res) => {
  sendEntryResult(req, res);
});

async function sendTransactionResult(req, res) {
  try {
    let result = await hgetallAsync(`!txn:${req.params.id}`);
    if (result) {
      let entry = await hgetallAsync(`!ent:${result.entry_id}`);
      if (entry) {
        result.entry = fixupJsonData(entry);

        let block = await hgetallAsync(`!blk:${entry.block_id}`);
        if (block) {
          result.block = fixupJsonData(block);
        }
      }
      res.send(JSON.stringify(fixupJsonData(result)) + '\n');
      return;
    }
  } catch (err) {
    res.status(500).send('{"error":"server_error"}\n');
    return;
  }
  res.status(404).send('{"error":"not_found"}\n');
}

app.get('/txn/:id', (req, res) => {
  sendTransactionResult(req, res);
});

async function sendSearchResults(req, res) {
  let types = ['txn', 'blk', 'ent', 'txns-by-prgid-timeline'];
  try {
    for (let i = 0; i < types.length; i++) {
      let key = `!${types[i]}:${req.params.id}`;
      let result = await existsAsync(key);

      if (result) {
        let outType =
          types[i] === 'txns-by-prgid-timeline' ? 'txns-by-prgid' : types[i];
        res.send(JSON.stringify({t: outType, id: req.params.id}) + '\n');
        return;
      }
    }
  } catch (err) {
    res.status(500).send('{"error":"server_error"}\n');
    return;
  }

  // give up
  res.status(404).send('{"error":"not_found"}\n');
}

app.get('/search/:id', (req, res) => {
  sendSearchResults(req, res);
});

async function sendAccountResult(req, res) {
  try {
    let idsStr = req.params.ids;
    let ids = idsStr.split(",");

    let thePromises = _.map(ids, id => {
      console.log(`${id} creating...`);
      return new Promise((resolve, reject) => {
        const connection = new solanaWeb3.Connection(url);
        console.log(`${id} executing...`);
	return connection.getBalance(new solanaWeb3.PublicKey(id)).then(balance => {
          console.log(`${id} has a balance of ${balance}`);
          return resolve({id:id, balance: balance});
        });
      });
    });
    console.log(thePromises);

    return Promise.all(thePromises).then(values => {
      let consolidated = _.reduce(values, (a, v) => {
        a[v.id] = v.balance;
        return a;
      }, {});

      res.send(JSON.stringify(consolidated) + '\n');
    });
  } catch (err) {
    res.status(500).send(`{"error":"server_error","err":"${err}"}\n`);
    return;
  }

  // give up
  res.status(404).send('{"error":"not_found"}\n');
}

app.get('/accts_bal/:ids', (req, res) => {
  sendAccountResult(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
