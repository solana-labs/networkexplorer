import _ from 'lodash';
import allSettled from 'promise.allsettled';

class FriendlyGet {
  constructor() {
    this.requests = {};
  }

  with(key, promise, optionalDefault) {
    this.requests[key] = {
      key,
      promise,
      optionalDefault,
    };

    return this;
  }

  async get() {
    let keys = _.keys(this.requests);
    let optionalDefaults = _.map(this.requests, 'optionalDefault');
    let asyncValues = await allSettled(_.map(this.requests, 'promise'));

    let detailedResult = _.zipWith(
      keys,
      asyncValues,
      optionalDefaults,
      (key, promise, optionalDefault) => {
        let value =
          promise.status === 'fulfilled' ? promise.value : optionalDefault;

        let hadError = promise.status !== 'fulfilled';
        let error = hadError ? promise : null;

        return {
          key,
          value,
          hadError,
          error,
        };
      },
    );

    let compactResult = _.zipObject(
      _.map(detailedResult, 'key'),
      _.map(detailedResult, 'value'),
    );

    let __errors__ = _.reduce(
      _.filter(detailedResult, x => x.hadError),
      (a, x) => {
        a[x.key] = x.error;
        return a;
      },
      {},
    );

    if (_.size(__errors__) > 0) {
      compactResult.__errors__ = __errors__;
      console.warn('FRIENDLY_GET_HAD_PROBLEMS', JSON.stringify(__errors__));
    }

    return compactResult;
  }
}

export {FriendlyGet};
