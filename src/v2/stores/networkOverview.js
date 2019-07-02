import {
  configure,
  flow,
  observable,
  action,
  decorate,
  observe,
  computed,
} from 'mobx';
import {parse, format} from 'date-fns';
import {
  map,
  keys,
  compose,
  pick,
  mapValues,
  toPairs,
  differenceBy,
  concat,
  find,
  includes,
  identity,
  pickBy,
} from 'lodash/fp';
import {camelizeKeys} from 'humps';
import {Connection} from '@solana/web3.js';
import * as API from 'v2/api/stats';
import {BLOCK_EXPLORER_RPC_URL} from 'v2/const';
import {initSocket} from 'v2/api/socket';
import {
  parseBlock,
  parseClusterInfo,
  parseTransaction,
} from 'v2/utils/parseMessage';

configure({enforceActions: 'observed'});

class OverviewStore {
  state = 'pending';
  globalStats = {};
  nodes = [];
  cluster = {
    nodes: [],
  };
  statsChanges = null;
  nodesChanges = null;
  txnStats = {};

  actions = {
    'global-info': data => this.updateGlobalStats(data),
    blk: data => this.addBlock(data),
    'cluster-info': data => this.updateClusterInfo(data),
    'txns-by-prgid': data => this.addTransaction(data),
  };

  constructor() {
    observe(this, 'globalStats', ({oldValue, newValue}) => {
      if (!keys(oldValue).length) {
        return;
      }

      this.statsChanges = compose(
        mapValues.convert({cap: false})((value, key) =>
          ((+value * 100) / (oldValue[key] || 1) - 100).toFixed(2),
        ),
        pick(['!blkLastSlot', '!txnCount', 'tpsCount']),
      )(newValue);
    });
    observe(this, 'cluster', ({oldValue, newValue}) => {
      if (
        !keys(oldValue).length ||
        !newValue.nodes.length ||
        !oldValue.nodes.length
      ) {
        return 0;
      }
      this.nodesChanges = (
        (+newValue.nodes.length * 100) / oldValue.nodes.length -
        100
      ).toFixed(2);
    });
    const ws = initSocket();
    ws.onmessage = event => {
      const {t, m} = JSON.parse(event.data);
      this.actions[t](m);
    };
  }

  addBlock = block => {
    parseBlock(block);
  };

  addTransaction = block => {
    parseTransaction(block);
  };

  updateGlobalStats = data => {
    const parsedData = camelizeKeys(JSON.parse(data));
    const tpsCountField = compose(
      find(includes('txnPerSec:')),
      keys,
    )(parsedData);
    this.globalStats = {
      ...parsedData,
      tpsCount: parsedData[tpsCountField],
    };
  };

  updateClusterInfo = data => {
    this.cluster = parseClusterInfo(data);
  };

  get txnChartData() {
    return compose(
      map(([date, value = 0]) => ({
        y: Math.round((parseFloat(value) / 60) * 100) / 100,
        x: date,
        date: format(parse(date), 'MMM D hh:mmA'),
      })),
      toPairs,
      pickBy(identity),
    )(this.txnStats);
  }

  getStats = flow(function* getStats() {
    const res = yield API.getStats();
    const tpsCountField = compose(
      find(includes('txnPerSec:')),
      keys,
    )(res.data);
    this.globalStats = {
      ...res.data,
      tpsCount: res.data[tpsCountField],
    };
    return res;
  });

  getClusterNodes = flow(function* getClusterNodes() {
    const res = new Connection(BLOCK_EXPLORER_RPC_URL);
    const nodes = yield res.getClusterNodes();
    const difference = differenceBy('pubkey', nodes)(this.nodes);
    if (!difference.length) {
      return;
    }
    const promises = map(({gossip}) =>
      API.getNodeCoordinated(gossip.split(':')[0]),
    )(difference);
    const geoRes = yield Promise.all(promises);
    this.nodes = compose(
      concat(this.nodes),
      map.convert({cap: false})((node, idx) => ({
        ...node,
        coordinates: geoRes[idx].data,
      })),
    )(difference);
    return geoRes;
  });
  getTxnStats = flow(function* getTxnStats() {
    const res = yield API.getTxnStats();
    this.txnStats = res.data;
    return res;
  });
}

decorate(OverviewStore, {
  state: observable,
  globalStats: observable,
  nodes: observable,
  cluster: observable,
  getClusterNodes: action.bound,
  getStats: action.bound,
  getTxnStats: action.bound,
  txnChartData: computed,
  txnStats: observable,
  addBlock: action,
  addTransaction: action,
  updateGlobalStats: action,
  updateClusterInfo: action,
});

export default new OverviewStore();
