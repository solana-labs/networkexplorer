import {action, flow, observable, decorate} from 'mobx';
import {apiGetBlocksTimelinePage} from 'v2/api/blocks';
import _ from 'lodash';

class Store {
  isLoading = false;
  start = null;
  count = null;
  direction = null;
  res = {};
  blocks = [];
  blockTimeline = {};
  blockCount = null;
  next = null;
  prev = null;

  init = flow(function*({start, count, direction}) {
    if (
      this.blockTimeline.pageInfo &&
      start === this.start &&
      count === this.count &&
      direction === this.direction
    ) {
      return this.blockTimeline;
    }

    this.setLoading(true);
    this.start = start;
    this.count = count;
    this.direction = direction;

    const res = yield apiGetBlocksTimelinePage({start, count, direction});

    this.res = res;

    this.blockTimeline = res.data;
    this.blocks = _.map(res.data.pageData.results, x => x[1]);
    this.blockCount = res.data.pageInfo.count;
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
  blockTimeline: observable,
  blocks: observable,
  blockCount: observable,
  next: observable,
  prev: observable,
  setLoading: action.bound,
  isLoading: observable,
});

const BlocksTimelineStore = new Store();

export default BlocksTimelineStore;
