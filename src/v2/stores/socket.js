import {initSocket} from 'v2/api/socket';
import networkOverview from 'v2/stores/networkOverview';
import nodes from 'v2/stores/nodes';

const socketActions = {
  actions: {
    'global-info': networkOverview.updateGlobalStats,
    blk: networkOverview.addBlock,
    'cluster-info': nodes.updateClusterInfo,
    'txns-by-prgid': networkOverview.addTransaction,
  },
  onMessage(event) {
    const {t, m} = JSON.parse(event.data);
    this.actions[t](m);
  },
  init() {
    this.ws = initSocket();
    this.ws.onmessage = event => this.onMessage(event);
  },
};

export default socketActions;
