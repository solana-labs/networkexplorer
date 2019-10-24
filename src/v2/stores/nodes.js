import {compose, filter, map} from 'lodash/fp';
import {action, computed, decorate, observable, flow} from 'mobx';
import * as API from 'v2/api/stats';

import {LAMPORT_SOL_RATIO} from '../constants';

const addNetworkSolInfo = totalStaked => node => ({
  ...node,
  stakedSol: (node.activatedStake * LAMPORT_SOL_RATIO).toFixed(8),
  stakedSolPercent: (100 * (node.activatedStake / totalStaked)).toFixed(3),
});

class Store {
  cluster = {
    network: {},
  };
  clusterChanges = {};
  network = [];

  // constructor() {
  //   observe(this, 'network', ({oldValue, newValue}) => {
  //     if (!keys(oldValue).length) {
  //       return;
  //     }
  //     this.clusterChanges = compose(
  //       mapValues.convert({cap: false})((value, key) => {
  //         if (eq('nodes', key)) {
  //           return calcChanges(oldValue[key].length, value.length);
  //         }
  //         return calcChanges(oldValue[key], value);
  //       }),
  //       pick(['nodes', 'supply']),
  //     )(newValue);
  //   });
  // }

  updateClusterInfo = data => {
    data = JSON.parse(data);
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
      this.network = data.network
        ? map(addNetworkSolInfo(data.totalStaked))(data.network)
        : [];
      this.totalStaked = data.totalStaked;
      this.supply = data.supply;
      this.networkInflationRate = data.networkInflationRate;
      return res;
    } catch (e) {
      throw e;
    }
  });

  get mapMarkers() {
    if (!this.network.length) {
      return [];
    }

    try {
      return compose(
        map(({nodePubkey: pubkey, tpu: gossip, coordinates, identity}) => ({
          pubkey,
          gossip,
          coordinates,
          name: (identity && identity.name) || pubkey || '',
          avatarUrl: (identity && identity.avatarUrl) || '',
        })),
        filter({what: 'Validator'}),
      )(this.network);
    } catch (e) {
      console.error('mapMarkers()', e);
      return [];
    }
  }

  get validators() {
    return filter(node => node.what === 'Validator')(this.network);
  }

  get activeValidators() {
    return filter(node => node.what === 'Validator' && node.activatedStake)(
      this.network,
    );
  }

  get inactiveValidators() {
    return filter(node => node.what === 'Validator' && !node.activatedStake)(
      this.network,
    );
  }
}

decorate(Store, {
  network: observable,
  supply: observable,
  stakedTokens: observable,
  updateClusterInfo: action.bound,
  mapMarkers: computed,
  validators: computed,
  activeValidators: computed,
  inactiveValidators: computed,
  fetchClusterInfo: action.bound,
});

const NodesStore = new Store();
NodesStore.fetchClusterInfo();

export default NodesStore;
