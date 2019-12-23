import {filter, reject, map} from 'lodash/fp';
import {action, computed, decorate, observable, flow} from 'mobx';
import * as API from 'v2/api/stats';
import getUptime from 'v2/utils/getUptime';

const addNetworkSolInfo = () => node => ({
  ...node,
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
    this.totalStakedSol = data.totalStakedSol;
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
