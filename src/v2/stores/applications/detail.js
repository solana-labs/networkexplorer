import {action, flow, observable, decorate} from 'mobx';
import {apiGetApplicationDetail} from 'v2/api/applications';

class Store {
  isLoading = false;
  applicationId = null;
  applicationView = {};
  accountInfo = {};
  programAccounts = [];
  timestamp = null;

  init = flow(function*({applicationId}) {
    this.setLoading(true);
    this.applicationId = applicationId;

    if (this.accountInfo.pubkey) {
      return this.accountInfo;
    }

    const res = yield apiGetApplicationDetail({applicationId});

    this.applicationView = res.data;
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
  applicationId: observable,
  timestamp: observable,
  applicationView: observable,
});

const ApplicationDetailStore = new Store();

export default observable(ApplicationDetailStore);
