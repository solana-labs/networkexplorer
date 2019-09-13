import * as solanaWeb3 from '@solana/web3.js';
import _ from 'lodash';
import redis from 'redis';
import {promisify} from 'util';

import {FriendlyGet} from './friendlyGet';
import config from './config';
import {FULLNODE_URL} from './fullnode-url';

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10min

function getClient() {
  let props = config.redis.path
    ? {path: config.redis.path}
    : {host: config.redis.host, port: config.redis.port};

  return redis.createClient(props);
}

const client = getClient();
const setAsync = promisify(client.set).bind(client);

// FIXME: this should be a genesis block API call (eventually), see:
// https://github.com/solana-labs/solana/blob/master/cli/src/wallet.rs#L680
// https://github.com/solana-labs/solana/blob/master/sdk/src/timing.rs#L14
const SLOTS_PER_EPOCH = 8192;

async function getVoteAccountUptime(connection, x) {
  const t1 = new Date().getTime();
  let {voteAccount} = await new FriendlyGet()
    .with(
      'voteAccount',
      connection.getAccountInfo(new solanaWeb3.PublicKey(x.votePubkey)),
    )
    .get();
  const t2 = new Date().getTime();

  let voteState = solanaWeb3.VoteAccount.fromAccountData(voteAccount.data);
  if (voteState) {
    const uptime = _.reduce(
      voteState.epochCredits,
      (a, v) => {
        let credits = v.credits - v.prevCredits;

        a.unshift({
          epoch: v.epoch,
          credits_earned: credits,
          slots_in_epoch: SLOTS_PER_EPOCH,
          percentage: ((credits * 1.0) / (SLOTS_PER_EPOCH * 1.0)).toFixed(6),
        });

        return a;
      },
      [],
    );

    const uptimeValue = {
      nodePubkey: voteState.nodePubkey.toString(),
      authorizedVoterPubkey: voteState.authorizedVoterPubkey.toString(),
      uptime: uptime,
      lat: t2 - t1,
      ts: t1,
    };

    return uptimeValue;
  } else {
    console.log('eep, no vote state: ', x.votePubkey);
    return null;
  }
}

async function refreshUptime() {
  console.log('uptime updater: updating...');
  try {
    const connection = new solanaWeb3.Connection(FULLNODE_URL);
    let {__errors__, voting} = await new FriendlyGet()
      .with('voting', connection.getVoteAccounts())
      .get();
    let allAccounts = (voting && voting.current ? voting.current : []).concat(
      voting && voting.delinquent ? voting.delinquent : [],
    );

    const resultsAsync = _.map(allAccounts, v => {
      return getVoteAccountUptime(connection, v);
    });

    let results = await Promise.all(resultsAsync);
    results = _.filter(results, x => x);
    await setAsync('!uptime', JSON.stringify(results));

    if (_.size(__errors__) === 0) {
      console.log('uptime updater: updated successfully.');
    } else {
      console.log('ERROR updating uptime.');
    }
  } catch (err) {
    console.log('ERROR updating uptime: ' + err);
  }
}

console.log('uptime updater process running...');
refreshUptime();
setInterval(refreshUptime, REFRESH_INTERVAL);
