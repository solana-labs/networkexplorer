import {find, compose, split, map} from 'lodash/fp';

export function parseTransaction(message) {
  const [h, l, s, dt, entry_id, id, inst] = split('#')(message);

  const instructions = compose(
    map(i => {
      const [program_id, keys, data] = split('@')(i);

      return {
        program_id,
        keys: split(',')(keys),
        data,
      };
    }),
    split('|'),
  )(inst);

  return {
    t: 'txn',
    h: parseInt(h),
    l,
    s: parseInt(s),
    dt,
    entry_id,
    id,
    instructions,
  };
}

export function parseBlock(message) {
  const [h, l, s, dt, id] = split('#')(message);

  return {
    t: 'blk',
    h,
    l,
    s: parseInt(s),
    dt,
    id,
  };
}

export function parseClusterInfo(data) {
  const {
    voting,
    cluster: gossip,
    supply,
    feeCalculator,
    identities,
  } = JSON.parse(data);

  const nodes = map(g => ({
    ...g,
    voteAccount: find({nodePubkey: g.pubKey})(voting),
  }))(gossip);

  return {
    nodes,
    supply,
    feeCalculator,
    identities,
  };
}
