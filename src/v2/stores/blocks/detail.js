import {action, flow, observable, decorate} from 'mobx';
import {apiGetBlockDetail} from 'v2/api/blocks';

class Store {
  isLoading = false;
  blockId = null;
  block = {};

  init = flow(function*({blockId}) {
    this.setLoading(true);
    this.blockId = blockId;

    if (this.block.id) {
      return this.block;
    }

    const res = yield apiGetBlockDetail({blockId});

    this.block = res.data.block;
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
  block: observable,
  blockId: observable,
});

const BlockDetailStore = new Store();

export default BlockDetailStore;
