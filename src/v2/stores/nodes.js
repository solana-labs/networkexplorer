import {
  sumBy,
  eq,
  get,
  compose,
  keys,
  map,
  mapValues,
  pick,
  merge,
  find,
} from 'lodash/fp';
import {action, computed, decorate, observable, observe, flow} from 'mobx';
import {parseClusterInfo} from 'v2/utils/parseMessage';
import * as API from 'v2/api/stats';
import calcChanges from 'v2/utils/calcChanges';

class Store {
  cluster = {
    nodes: [],
    voting: [],
  };
  clusterChanges = {};

  constructor() {
    observe(this, 'cluster', ({oldValue, newValue}) => {
      if (!keys(oldValue).length) {
        return;
      }
      this.clusterChanges = compose(
        mapValues.convert({cap: false})((value, key) => {
          if (eq('nodes', key)) {
            return calcChanges(oldValue[key].length, value.length);
          }
          return calcChanges(oldValue[key], value);
        }),
        pick(['nodes', 'supply']),
      )(newValue);
    });
  }

  updateClusterInfo = data => {
    this.cluster = merge(this.cluster, parseClusterInfo(data));
  };

  fetchClusterInfo = flow(function*() {
    const res = yield API.getClusterInfo();
    this.cluster = merge(this.cluster, res.data);
  });

  get mapMarkers() {
    return map(({pubkey: name, gossip, lat, lng}) => ({
      name,
      gossip,
      coordinates: [lng, lat],
    }))(this.cluster.nodes);
  }

  get validators() {
    return map(vote => ({
      ...vote,
      uptime: find({votePubkey: vote.votePubkey})(this.cluster.uptime),
    }))(this.cluster.voting);
  }

  get totalBondedTokens() {
    return compose(
      sumBy('stake'),
      get('voting'),
    )(this.cluster);
  }
}

decorate(Store, {
  cluster: observable,
  updateClusterInfo: action.bound,
  mapMarkers: computed,
  fetchClusterInfo: action.bound,
});

const NodesStore = new Store();
NodesStore.fetchClusterInfo();

export default NodesStore;
