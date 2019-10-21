import {action, flow, observable, decorate} from 'mobx';
import {apiGetProgramDetail} from 'v2/api/programs';

class Store {
  isLoading = false;
  programId = null;
  programView = {};
  accountInfo = {};
  programAccounts = [];
  timestamp = null;

  init = flow(function*({programId}) {
    this.setLoading(true);
    this.programId = programId;

    if (this.accountInfo.pubkey) {
      return this.accountInfo;
    }

    const res = yield apiGetProgramDetail({programId});

    this.programView = res.data;
    this.accountInfo = res.data.accountInfo;
    this.programAccounts.replace(res.data.programAccounts);
    this.timestamp = res.data.timestamp;
    this.setLoading(false);

    return res;
  });

  setLoading(loading) {
    this.isLoading = loading;
  }
}

decorate(Store, {
  setLoading: action.bound,
  isLoading: observable,
  accountInfo: observable,
  programAccounts: observable,
  programId: observable,
  timestamp: observable,
  programView: observable,
});

const ProgramDetailStore = new Store();

export default ProgramDetailStore;
