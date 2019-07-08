import {observable, decorate, action} from 'mobx';
import {initSocket} from 'v2/api/socket';
import networkOverview from 'v2/stores/networkOverview';
import nodes from 'v2/stores/nodes';

import * as EndpointConfig from '../../EndpointConfig';

const socketActions = {
  actions: {
    'global-info': networkOverview.updateGlobalStats,
    blk: networkOverview.addBlock,
    'cluster-info': nodes.updateClusterInfo,
    'txns-by-prgid': networkOverview.addTransaction,
  },
  endpointName: EndpointConfig.getEndpointName(),
  onMessage(event) {
    const {t, m} = JSON.parse(event.data);
    this.actions[t](m);
  },
  init() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.ws = initSocket();
    this.ws.onmessage = event => this.onMessage(event);
  },
  updateEndpointName(endpointName) {
    this.endpointName = endpointName;
  },
};

decorate(socketActions, {
  endpointName: observable,
  updateEndpointName: action.bound,
});

export default socketActions;
