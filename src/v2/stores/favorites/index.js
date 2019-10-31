import {action, computed, decorate, observable, reaction} from 'mobx';

import socketActions from '../socket';

class Store {
  emptyFavorites() {
    return {accounts: {}, programs: {}};
  }

  constructor() {
    reaction(
      () => socketActions.endpointName,
      () => {
        this.init();
      },
    );
    this.init();
  }
  saveToLocal() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  favorites = {};

  init() {
    const localFavorites = localStorage.getItem('favorites');
    const {endpointName} = socketActions;
    if (!localFavorites) {
      this.favorites = {[endpointName]: this.emptyFavorites()};
      return;
    }
    this.favorites = JSON.parse(localFavorites);
    if (!this.favorites[endpointName]) {
      this.favorites[endpointName] = this.emptyFavorites();
    }
  }

  addFavorites(item, type) {
    const {endpointName} = socketActions;
    item.timestamp = new Date().toISOString();
    this.favorites[endpointName][type][item.id] = item;
    this.saveToLocal();
  }
  removeFavorites(id, type) {
    const {endpointName} = socketActions;
    delete this.favorites[endpointName][type][id];
    this.saveToLocal();
  }
  clear() {
    const {endpointName} = socketActions;
    this.favorites[endpointName] = this.emptyFavorites();
    this.saveToLocal();
  }
  get endpointFavorites() {
    const {endpointName} = socketActions;
    return this.favorites[endpointName];
  }
}

decorate(Store, {
  addFavorites: action.bound,
  removeFavorites: action.bound,
  clear: action.bound,
  favorites: observable,
  endpointFavorites: computed,
});
const FavoritesStore = new Store();

export default FavoritesStore;
