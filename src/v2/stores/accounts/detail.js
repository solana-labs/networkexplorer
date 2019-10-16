import {action, flow, observable, decorate} from 'mobx';
import {apiGetAccountDetail} from 'v2/api/accounts';

class Store {
  isLoading = false;
  accountId = null;
  accountView = {};
  accountInfo = {};
  programAccounts = [];
  timestamp = null;

  init = flow(function*({accountId}) {
    this.setLoading(true);
    this.accountId = accountId;

    if (this.accountInfo.pubkey) {
      return this.accountInfo;
    }

    const res = yield apiGetAccountDetail({accountId});

    this.accountView = res.data;
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
  accountId: observable,
  timestamp: observable,
  accountView: observable,
});

const AccountDetailStore = new Store();

export default observable(AccountDetailStore);
