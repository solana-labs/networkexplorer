import {action, flow, observable, decorate} from 'mobx';
import {apiGetProgramDetail} from 'v2/api/programs';
import {LAMPORT_SOL_RATIO} from 'v2/constants';

const extendAccountInfo = (account = {}) => ({
  ...account,
  balance: ((account.lamports || 0) * LAMPORT_SOL_RATIO).toFixed(8),
});

class Store {
  isLoading = true;
  programId = null;
  programView = {};
  accountInfo = {};
  programAccounts = [];
  timestamp = null;

  init = flow(function*({programId}) {
    this.setLoading(true);
    this.programId = programId;

    const res = yield apiGetProgramDetail({programId});
    const {accountInfo, programAccounts, timestamp} = res.data;

    this.programView = res.data;
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
  programId: observable,
  timestamp: observable,
  programView: observable,
});

const ProgramDetailStore = new Store();

export default ProgramDetailStore;
