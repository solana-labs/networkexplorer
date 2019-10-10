import {action, flow, observable, decorate} from 'mobx';
import {apiGetTourDeSolIndexPage} from 'v2/api/tourdesol';

class Store {
  isInited = false;
  isLoading = false;
  activeStage = null;
  activeValidators = [];
  clusterStats = {};
  slotsPerDay = null;
  stages = [];
  tourDeSolView = {};

  init = flow(function*({demo, activeStage}) {
    this.setLoading(true);
    if (this.tourDeSolView.__VERSION__) {
      return this.tourDeSolView;
    }

    const res = yield apiGetTourDeSolIndexPage({demo, activeStage});

    this.activeStage = res.data.activeStage;
    this.activeValidators = res.data.activeValidators;
    this.clusterStats = res.data.clusterStats;
    this.slotsPerDay = res.data.slotsPerDay;
    this.stages = res.data.stages;
    this.tourDeSolView = res.data;

    this.setLoading(false);
    this.setInited(true);

    return res;
  });

  setInited(inited) {
    this.isInited = inited;
  }

  setLoading(loading) {
    this.isLoading = loading;
  }
}

decorate(Store, {
  setLoading: action.bound,
  isLoading: observable,
  setInited: action.bound,
  isInited: observable,
  stages: observable,
  activeStage: observable,
  activeValidators: observable,
  slotsPerDay: observable,
  tourDeSolView: observable,
  clusterStats: observable,
});

const TourDeSolIndexStore = new Store();

export default observable(TourDeSolIndexStore);
