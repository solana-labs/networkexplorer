import {observable, decorate, action} from 'mobx';
import {initSocket} from 'v2/api/socket';
import networkOverview from 'v2/stores/networkOverview';
import nodes from 'v2/stores/nodes';
import {CONNECTION_TIMEOUT} from 'v2/constants';

import * as EndpointConfig from '../../EndpointConfig';

const socketActions = {
  isLoading: false,
  hasError: false,
  actions: {
    'global-info': networkOverview.updateGlobalStats,
    blk: networkOverview.addBlock,
    'cluster-info': nodes.updateClusterInfo,
    'txns-by-prgid': networkOverview.addTransaction,
  },
  endpointName: EndpointConfig.getEndpointName(),
  onMessage(event) {
    this.setError(false);
    this.setLoading(false);
    const {t, m} = JSON.parse(event.data);
    this.actions[t](m);
  },
  init() {
    this.setLoading(true);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.ws = initSocket();
    this.ws.onmessage = event => this.onMessage(event);
    this.ws.onerror = () => {
      this.setError(true);
    };
    setTimeout(() => {
      if (this.ws.readyState === 0) {
        this.setError(true);
      }
    }, CONNECTION_TIMEOUT);
  },
  updateEndpointName(endpointName) {
    this.setLoading(false);
    this.endpointName = endpointName;
  },
  setLoading(loading) {
    this.isLoading = loading;
  },
  setError(hasError) {
    this.hasError = hasError;
  },
};

decorate(socketActions, {
  endpointName: observable,
  updateEndpointName: action.bound,
  setLoading: action.bound,
  setError: action.bound,
  isLoading: observable,
  hasError: observable,
});

export default socketActions;
