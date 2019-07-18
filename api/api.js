/*
   This component is a Node.JS server that implements
   API handler methods to support the Block Explorer
   Web UI.
 */
import fetch from 'node-fetch';
import express from 'express';
import nocache from 'nocache';
import cors from 'cors';
import expressWs from 'express-ws';
import {promisify} from 'util';
import redis from 'redis';
import WebSocket from 'ws';
import _ from 'lodash';
import './inbound-stream';
import geoip from 'geoip-lite';
import YAML from 'yaml';
import fs from 'fs';
import assert from 'assert';
import * as solanaWeb3 from '@solana/web3.js';

import config from './config';

//
// FIXME: make configurable
//
//const FULLNODE_URL = 'http://beta.testnet.solana.com:8899';
const FULLNODE_URL = 'http://localhost:8899';

const GLOBAL_STATS_BROADCAST_INTERVAL_MS = 2000;
const CLUSTER_INFO_BROADCAST_INTERVAL_MS = 16000;
const CLUSTER_INFO_CACHE_TIME_SECS = 35000;
const CONFIG_PROGRAM_ID = 'Config1111111111111111111111111111111111111';

const app = express();

const port = 3001;
const MINUTE_MS = 60 * 1000;

//
// simple hash code for random
// from: https://jsperf.com/hashcodelordvlad
//
function hashCode(s) {
  let hash = 0;
  var ch;
  if (s.length == 0) return hash;

  for (let i = 0, l = s.length; i < l; i++) {
    ch = s.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash |= 0;
  }
  return hash;
}

//
// simple/approximate RNG from seed
// from: https://stackoverflow.com/questions/521295
//
function randomOffset(seedString) {
  let seed = hashCode(seedString);
  let x = Math.sin(seed++) * 10000;

  return (x - Math.floor(x)) / 10 - 0.05;
}

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

const setexAsync = promisify(client.setex).bind(client);
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

const globalInfoPublish = handleRedis('global-info');

async function updateGlobalInfoTimerTask() {
  const globalInfo = await getGlobalInfo();
  globalInfoPublish('global-info', JSON.stringify(globalInfo));
}

setInterval(updateGlobalInfoTimerTask, GLOBAL_STATS_BROADCAST_INTERVAL_MS);

const clusterInfoPublish = handleRedis('cluster-info');

async function updateClusterInfoTimerTask() {
  const clusterInfo = await getClusterInfo();
  clusterInfoPublish('cluster-info', JSON.stringify(clusterInfo));
}

setInterval(updateClusterInfoTimerTask, CLUSTER_INFO_BROADCAST_INTERVAL_MS);

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

async function getGlobalInfo() {
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

  const stat_values = await mgetAsync(stat_keys);

  return _.zipObject(stat_keys, stat_values);
}

async function sendGlobalInfoResponse(res) {
  const globalInfo = await getGlobalInfo();
  res.send(JSON.stringify(globalInfo) + '\n');
}

app.get('/global-stats', (req, res) => {
  sendGlobalInfoResponse(res);
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
    if (geoipWhitelist === null) {
      geoipWhitelist = {};
    }
  } catch (err) {
    console.log(`Failed to process ${geoipWhitelistFile}:`, err);
  }
}

function geoipLookup(ip) {
  if (geoipWhitelist[ip]) {
    return geoipWhitelist[ip];
  }

  return geoip.lookup(ip);
}

app.get('/geoip/:ip', (req, res) => {
  const {ip} = req.params;

  const geo = geoipLookup(ip);
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

function sendAccountResult(req, res) {
  if (!req.params.ids) {
    // give up
    res.status(404).send('{"error":"not_found"}\n');
    return;
  }

  try {
    let idsStr = req.params.ids;
    let ids = idsStr.split(',');

    let thePromises = _.map(ids, id => {
      return new Promise(resolve => {
        const connection = new solanaWeb3.Connection(FULLNODE_URL);
        return connection
          .getBalance(new solanaWeb3.PublicKey(id))
          .then(balance => {
            return resolve({id: id, balance: balance});
          });
      });
    });

    return Promise.all(thePromises).then(values => {
      let consolidated = _.reduce(
        values,
        (a, v) => {
          a[v.id] = v.balance;
          return a;
        },
        {},
      );

      res.send(JSON.stringify(consolidated) + '\n');
    });
  } catch (err) {
    res.status(500).send(`{"error":"server_error","err":"${err}"}\n`);
    return;
  }
}

app.get('/accts_bal/:ids', (req, res) => {
  sendAccountResult(req, res);
});

const DEFAULT_LAT = 11.6065;
const DEFAULT_LNG = 165.3768;

async function getClusterInfo() {
  const connection = new solanaWeb3.Connection(FULLNODE_URL);
  let ts = new Date().toISOString();
  let [, feeCalculator] = await connection.getRecentBlockhash();
  let supply = await connection.getTotalSupply();
  let cluster = await connection.getClusterNodes();
  let validators = await fetchValidatorInfo(cluster.map(c => c.pubkey));
  let voting = await connection.getEpochVoteAccounts();
  let totalStaked = _.reduce(
    voting,
    (a, v) => {
      a += v.stake || 0;

      return a;
    },
    0,
  );

  cluster = _.map(cluster, c => {
    let ip = c.gossip.split(':')[0];
    const geoip = geoipLookup(ip);
    let ll = geoip ? geoip.ll : null;
    let newc = _.clone(c, true);

    // compute different but deterministic offsets
    let offsetLat = randomOffset(ip);
    let offsetLng = randomOffset(c.gossip);

    newc.lat = ((ll && ll[0]) || DEFAULT_LAT) + offsetLat;
    newc.lng = ((ll && ll[1]) || DEFAULT_LNG) + offsetLng;

    return newc;
  });

  let rest = {
    feeCalculator,
    supply,
    totalStaked,
    cluster,
    validators,
    voting,
    ts,
  };
  await setexAsync(
    '!clusterInfo',
    CLUSTER_INFO_CACHE_TIME_SECS,
    JSON.stringify(rest),
  );
  return rest;
}

async function sendClusterResult(req, res) {
  try {
    let result = await mgetAsync(['!clusterInfo']);
    if (result[0]) {
      res.send(result[0] + '\n');
      return;
    } else {
      let newResult = await getClusterInfo();
      res.send(JSON.stringify(newResult) + '\n');
      return;
    }
  } catch (err) {
    res.status(500).send(`{"error":"server_error","err":"${err}"}\n`);
    return;
  }
}

app.get('/cluster-info', (req, res) => {
  sendClusterResult(req, res);
});

async function fetchValidatorInfo(keys) {
  const configKey = new solanaWeb3.PublicKey(CONFIG_PROGRAM_ID);
  const connection = new solanaWeb3.Connection(FULLNODE_URL);
  const accounts = await connection.getProgramAccounts(configKey);
  const keySet = new Set(keys);

  const results = await Promise.all(
    accounts.map(async account => {
      let validatorInfo;
      try {
        validatorInfo = solanaWeb3.ValidatorInfo.fromConfigData(account[1].data);
      } catch (err) {
        return;
      }

      if (validatorInfo) {
        const validatorKeyStr = validatorInfo.key.toString();
        if (keySet.has(validatorKeyStr)) {
          keySet.delete(validatorKeyStr);

          // build info and verify
          const info = validatorInfo.info;
          const keybaseUsername = info.keybaseUsername;
          if (keybaseUsername) {
            const keybaseUrl = `https://keybase.pub/${keybaseUsername}/solana/validator-${validatorKeyStr}`;
            const keybaseResponse = await fetch(keybaseUrl, {method: 'HEAD'});
            const verified = keybaseResponse.status === 200;
            info.verified = verified;
            info.verifyUrl = keybaseUrl;
          }
          info.pubkey = validatorKeyStr;
          return info;
        }
      }
    }),
  );

  const infoList = results.filter(r => r);
  const keybaseUsernames = infoList.map(info => info.keybaseUsername).filter(u => u).join(',');
  const avatarMap = new Map();
  if (keybaseUsernames.length > 0) {
    const keybaseApiUrl = `https://keybase.io/_/api/1.0/user/lookup.json?usernames=${keybaseUsernames}&fields=pictures,basics`;
    const keybaseResponse = await fetch(keybaseApiUrl);
    const keybaseData = await keybaseResponse.json();
    if (keybaseData && keybaseData.them) {
      for (const {basics, pictures} of keybaseData.them) {
        if (basics && basics.username && pictures && pictures.primary && pictures.primary.url) {
          avatarMap.set(basics.username, pictures.primary.url);
        }
      }
    }
  }

  for (const info of infoList) {
    if (info.keybaseUsername) {
      const avatarUrl = avatarMap.get(info.keybaseUsername);
      if (avatarUrl) {
        info.avatarUrl = avatarUrl;
      }
    }
  }

  return infoList;
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
