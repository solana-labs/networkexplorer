import {action, flow, observable, decorate} from 'mobx';
import {apiGetProgramsTimelinePage} from 'v2/api/programs';
import _ from 'lodash';

class Store {
  isLoading = false;
  start = null;
  count = null;
  direction = null;
  res = {};
  programs = [];
  programTimeline = {};
  programCount = null;
  next = null;
  prev = null;

  init = flow(function*({start, count, direction}) {
    if (
      this.programTimeline.pageInfo &&
      start === this.start &&
      count === this.count &&
      direction === this.direction
    ) {
      return this.programTimeline;
    }

    this.setLoading(true);
    this.start = start;
    this.count = count;
    this.direction = direction;

    const res = yield apiGetProgramsTimelinePage({start, count, direction});

    this.res = res;

    this.programTimeline = res.data;
    this.programs = _.map(res.data.pageData.results, x => x[1]);
    this.programCount = res.data.pageInfo.count;
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
  programTimeline: observable,
  programs: observable,
  programCount: observable,
  next: observable,
  prev: observable,
  setLoading: action.bound,
  isLoading: observable,
});

const ProgramsTimelineStore = new Store();

export default ProgramsTimelineStore;
