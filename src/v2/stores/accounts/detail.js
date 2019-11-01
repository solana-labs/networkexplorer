import {action, flow, observable, decorate} from 'mobx';
import {apiGetAccountDetail} from 'v2/api/accounts';
import {LAMPORT_SOL_RATIO} from 'v2/constants';

const extendAccountInfo = (account = {}) => ({
  ...account,
  balance: ((account.lamports || 0) * LAMPORT_SOL_RATIO).toFixed(8),
});

class Store {
  isLoading = true;
  accountId = null;
  accountView = {};
  accountInfo = {};
  programAccounts = [];
  timestamp = null;

  init = flow(function*({accountId}) {
    this.setLoading(true);
    this.accountId = accountId;

    const res = yield apiGetAccountDetail({accountId});
    const {accountInfo, programAccounts, timestamp} = res.data;
    this.accountView = res.data;
    this.accountInfo = extendAccountInfo(accountInfo);
    this.programAccounts.replace(programAccounts);
    this.timestamp = timestamp;
    this.setLoading(false);

    return res;
  });

  setLoading(loading) {
    this.isLoading = loading;
  }
}

decorate(Store, {
  setLoading: action.bound,
  init: action.bound,
  isLoading: observable,
  accountInfo: observable,
  programAccounts: observable,
  accountId: observable,
  timestamp: observable,
  accountView: observable,
});

const AccountDetailStore = new Store();

export default AccountDetailStore;
