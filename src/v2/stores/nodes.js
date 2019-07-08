import {eq, compose, keys, map, mapValues, pick} from 'lodash/fp';
import {action, computed, decorate, observable, observe} from 'mobx';
import {parseClusterInfo} from 'v2/utils/parseMessage';

import calcChanges from '../utils/calcChanges';

class NodesStore {
  cluster = {
    nodes: [],
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
    this.cluster = parseClusterInfo(data);
  };

  get mapMarkers() {
    return map(({pubkey: name, gossip, lat, lng}) => ({
      name,
      gossip,
      coordinates: [lng, lat],
    }))(this.cluster.nodes);
  }
}

decorate(NodesStore, {
  cluster: observable,
  updateClusterInfo: action.bound,
  mapMarkers: computed,
});

export default new NodesStore();
