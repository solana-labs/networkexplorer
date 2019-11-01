import {action, flow, observable, decorate} from 'mobx';
import {apiGetTransactionDetail} from 'v2/api/transactions';

class Store {
  transactionId = null;
  isLoading = true;
  transactionView = {};
  transaction = {};

  init = flow(function*({transactionId}) {
    this.setLoading(true);
    this.transactionId = transactionId;

    const res = yield apiGetTransactionDetail({transactionId});

    this.transactionView = res.data;
    this.transaction = res.data.transaction;
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
  transaction: observable,
  transactionId: observable,
  transactionView: observable,
});

const TransactionDetailStore = new Store();

export default TransactionDetailStore;
