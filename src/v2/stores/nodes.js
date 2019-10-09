import {compose, filter, map} from 'lodash/fp';
import {action, computed, decorate, observable, flow} from 'mobx';
import * as API from 'v2/api/stats';

class Store {
  cluster = {
    network: {},
  };
  clusterChanges = {};

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
    this.network = data.network || {};
    this.totalStaked = data.totalStaked;
    this.supply = data.supply;
    this.networkInflationRate = data.networkInflationRate;
  };

  fetchClusterInfo = flow(function*() {
    try {
      const res = yield API.getClusterInfo();
      const data = res.data;
      this.network = data.network;
      this.totalStaked = data.totalStaked;
      this.supply = data.supply;
      this.networkInflationRate = data.networkInflationRate;
      return res;
    } catch (e) {
      throw e;
    }
  });

  get mapMarkers() {
    return compose(
      map(({nodePubkey: pubkey, tpu: gossip, coordinates, identity}) => ({
        pubkey,
        gossip,
        coordinates,
        name: (identity && identity.name) || identity.pubkey,
        avatarUrl: (identity && identity.avatarUrl) || '',
      })),
      filter({what: 'Validator'}),
    )(this.network);
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
