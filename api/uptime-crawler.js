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

function getSlotsInEpoch(epochSchedule, epoch) {
  if (!epochSchedule.warmup || epoch >= epochSchedule.first_normal_epoch) {
    return epochSchedule.slots_per_epoch;
  }

  return null;
}

function getUptime(epochSchedule, voteState, lat, ts) {
  const uptime = _.reduce(
    voteState.epochCredits,
    (a, v) => {
      const slotsInEpoch =
        epochSchedule &&
        v &&
        v.epoch &&
        getSlotsInEpoch(epochSchedule, v.epoch);

      if (!slotsInEpoch) {
        return a;
      }

      const credits = v.credits - v.prevCredits;

      a.unshift({
        epoch: v.epoch,
        credits_earned: credits,
        slots_in_epoch: slotsInEpoch,
        percentage: ((credits * 1.0) / (slotsInEpoch * 1.0)).toFixed(6),
      });

      return a;
    },
    [],
  );

  return {
    nodePubkey: voteState.nodePubkey.toString(),
    authorizedVoterPubkey: voteState.authorizedVoterPubkey.toString(),
    uptime,
    lat,
    ts,
  };
}

async function getVoteAccountUptime(connection, epochSchedule, x) {
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
    return getUptime(
      epochSchedule,
      voteState,
      t2 - t1,
      new Date(t1).toISOString(),
    );
  } else {
    console.log('eep, no vote state: ', x.votePubkey);
    return null;
  }
}

async function refreshUptime() {
  console.log('uptime updater: updating...');
  try {
    const connection = new solanaWeb3.Connection(FULLNODE_URL);
    let {__errors__, voting, epochSchedule} = await new FriendlyGet()
      .with('voting', connection.getVoteAccounts())
      .with('epochSchedule', connection.getEpochSchedule())
      .get();
    let allAccounts = (voting && voting.current ? voting.current : []).concat(
      voting && voting.delinquent ? voting.delinquent : [],
    );

    const resultsAsync = _.map(allAccounts, v => {
      return getVoteAccountUptime(connection, epochSchedule, v);
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
