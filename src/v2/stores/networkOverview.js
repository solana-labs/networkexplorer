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
  find,
  includes,
  identity,
  pickBy,
} from 'lodash/fp';
import {camelizeKeys} from 'humps';
import * as API from 'v2/api/stats';
import {parseBlock, parseTransaction} from 'v2/utils/parseMessage';

import calcChanges from '../utils/calcChanges';

configure({enforceActions: 'observed'});

class OverviewStore {
  globalStats = {};
  statsChanges = {};
  txnStats = {};

  constructor() {
    observe(this, 'globalStats', ({oldValue, newValue}) => {
      if (!keys(oldValue).length) {
        return;
      }

      this.statsChanges = compose(
        mapValues.convert({cap: false})((value, key) =>
          calcChanges(oldValue[key], value),
        ),
        pick(['!blkLastSlot', '!txnCount', 'tpsCount']),
      )(newValue);
    });
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

  getTxnStats = flow(function* getTxnStats() {
    const res = yield API.getTxnStats();
    this.txnStats = res.data;
    return res;
  });
}

decorate(OverviewStore, {
  globalStats: observable,
  getStats: action.bound,
  getTxnStats: action.bound,
  txnChartData: computed,
  txnStats: observable,
  addBlock: action,
  addTransaction: action,
  updateGlobalStats: action,
});

export default new OverviewStore();
