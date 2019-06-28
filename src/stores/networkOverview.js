import { configure, flow, observable, action } from 'mobx';
import * as API from 'api/stats';

configure({ enforceActions: 'always' });

const OverviewStore = observable(
  {
    state: 'pending',
    globalStats: {},

    getStats: flow(function* getStats() {
      this.state = 'loading';
      try {
        const res = yield API.getStats();
        this.state = 'loaded';
        this.globalStats = res.data;
      } catch (e) {
        this.state = 'error';
      }
    }),
  },
  {
    state: observable,
    globalStats: observable,
    getStats: action.bound,
  },
);

export default OverviewStore;
