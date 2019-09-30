import {action, flow, observable, decorate} from 'mobx';
import {apiGetApplicationsTimelinePage} from 'v2/api/applications';
import _ from 'lodash';

class Store {
  isLoading = false;
  start = null;
  count = null;
  direction = null;
  res = {};
  applications = [];
  applicationTimeline = {};
  applicationCount = null;
  next = null;
  prev = null;

  init = flow(function*({start, count, direction}) {
    if (
      this.applicationTimeline.pageInfo &&
      start === this.start &&
      count === this.count &&
      direction === this.direction
    ) {
      return this.applicationTimeline;
    }

    this.setLoading(true);
    this.start = start;
    this.count = count;
    this.direction = direction;

    const res = yield apiGetApplicationsTimelinePage({start, count, direction});

    this.res = res;

    this.applicationTimeline = res.data;
    this.applications = _.map(res.data.pageData.results, x => x[1]);
    this.applicationCount = res.data.pageInfo.count;
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
  applicationTimeline: observable,
  applications: observable,
  applicationCount: observable,
  next: observable,
  prev: observable,
  setLoading: action.bound,
  isLoading: observable,
});

const ApplicationsTimelineStore = new Store();

export default observable(ApplicationsTimelineStore);
