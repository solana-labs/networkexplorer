import {filter, reject, map} from 'lodash/fp';
import {action, computed, decorate, observable, flow} from 'mobx';
import * as API from 'v2/api/stats';
import getUptime from 'v2/utils/getUptime';

import {LAMPORT_SOL_RATIO} from '../constants';

const addNetworkSolInfo = totalStaked => node => ({
  ...node,
  stakedSol: (node.activatedStake * LAMPORT_SOL_RATIO).toFixed(8),
  stakedSolPercent: (100 * (node.activatedStake / totalStaked)).toFixed(3),
  calcCommission: (100 * (node.commission / 0xff)).toFixed(3),
  calcUptime: getUptime(node.uptime),
});

class Store {
  network = [];

  updateClusterInfo = data => {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    this.network = data.network
      ? map(addNetworkSolInfo(data.totalStaked))(data.network)
      : [];
    this.totalStaked = data.totalStaked;
    this.supply = data.supply;
    this.networkInflationRate = data.networkInflationRate;
  };

  fetchClusterInfo = flow(function*() {
    try {
      const res = yield API.getClusterInfo();
      const data = res.data;
      this.updateClusterInfo(data);
      return res;
    } catch (e) {
      throw e;
    }
  });

  get validators() {
    return filter({what: 'Validator'})(this.network);
  }

  get activeValidators() {
    return filter('activatedStake')(this.validators);
  }

  get inactiveValidators() {
    return reject('activatedStake')(this.validators);
  }
}

decorate(Store, {
  network: observable,
  supply: observable,
  stakedTokens: observable,
  updateClusterInfo: action.bound,
  validators: computed,
  activeValidators: computed,
  inactiveValidators: computed,
  fetchClusterInfo: action.bound,
});

const NodesStore = new Store();
NodesStore.fetchClusterInfo();

export default NodesStore;
