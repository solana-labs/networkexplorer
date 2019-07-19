import * as solanaWeb3 from '@solana/web3.js';
import _ from 'lodash';
import YAML from 'yaml';
import redis from 'redis';
import {promisify} from 'util';
import {exec} from 'child_process';
import {sync as commandExistsSync} from 'command-exists';

import config from './config';

const FULLNODE_URL = process.env.FULLNODE_URL || 'http://localhost:8899';

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10min

if (!commandExistsSync('solana-wallet')) {
  throw 'solana-wallet command not found!';
}


function getClient() {
  let props = config.redis.path
    ? {path: config.redis.path}
    : {host: config.redis.host, port: config.redis.port};

  return redis.createClient(props);
}

const client = getClient();
const setAsync = promisify(client.set).bind(client);

function getVoteAccountUptime(x) {
  const t1 = new Date().getTime();

  const p = new Promise((resolve, reject) => {
    exec(
      `solana-wallet -u ${FULLNODE_URL} show-vote-account ${x.votePubkey}`,
      (err, stdout, stderr) => {
        const t2 = new Date().getTime();

        if (err) {
          // node couldn't execute the command
          console.log('err', err, stderr);
          reject(err);
          return;
        }

        const result = YAML.parse(stdout);

        const uptime = _.reduce(
          result['epoch voting history'],
          (a, v) => {
            a.unshift({
              epoch: v.epoch,
              credits_earned: v['credits earned'],
              slots_in_epoch: v['slots in epoch'],
              percentage: (
                (v['credits earned'] * 1.0) /
                (v['slots in epoch'] * 1.0)
              ).toFixed(6),
            });
            return a;
          },
          [],
        );

        const uptimeValue = {
          votePubkey: x.votePubkey,
          uptime: uptime,
          lat: t2 - t1,
          ts: t1,
        };

        resolve(uptimeValue);
      },
    );
  });

  return p;
}

async function refreshUptime() {
  console.log('uptime updater: updating...');
  const connection = new solanaWeb3.Connection(FULLNODE_URL);
  let voting = await connection.getEpochVoteAccounts();

  const allTasks = _.map(voting, v => {
    return getVoteAccountUptime(v);
  });

  Promise.all(allTasks).then(async results => {
    await setAsync('!uptime', JSON.stringify(results));
    console.log('uptime updater: updated successfully.');
  });
}

console.log('uptime updater process running...');
refreshUptime();
setInterval(refreshUptime, REFRESH_INTERVAL);
