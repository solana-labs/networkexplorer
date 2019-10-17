import {action, flow, observable, decorate} from 'mobx';
import {apiGetAccountsTimelinePage} from 'v2/api/accounts';
import {map} from 'lodash';

class Store {
  isLoading = false;
  start = null;
  count = null;
  direction = null;
  res = {};
  accounts = [];
  accountTimeline = {};
  accountCount = null;
  next = null;
  prev = null;

  init = flow(function*({start, count, direction}) {
    if (
      this.accountTimeline.pageInfo &&
      start === this.start &&
      count === this.count &&
      direction === this.direction
    ) {
      return this.accountTimeline;
    }

    this.setLoading(true);
    this.start = start;
    this.count = count;
    this.direction = direction;

    const res = yield apiGetAccountsTimelinePage({start, count, direction});

    this.res = res;

    this.accountTimeline = res.data;
    this.accounts = map(res.data.pageData.results, x => x[1]);
    this.accountCount = res.data.pageInfo.count;
    this.next = res.data.pageData.next;
    this.prev = res.data.pageData.prev;
    this.setLoading(false);

    return res;
  });
  setLoading(loading) {
    this.isLoading = loading;
  }
}

decorate(Store, {
  init: action.bound,
  start: observable,
  accounts: observable,
  accountCount: observable,
  next: observable,
  prev: observable,
  setLoading: action.bound,
  isLoading: observable,
});

const AccountsTimelineStore = new Store();

export default AccountsTimelineStore;
