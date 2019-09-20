// import _ from 'lodash';

/**
 * ApplicationIndexView : supports the application index page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'ApplicationIndexView@1.0.0';
export class ApplicationIndexView {
  asVersion(rawData, __errors__, version) {
    if (__errors__) {
      return {
        __VERSION__,
        __errors__,
      };
    }

    // const timelineData = rawData.timelinePage;
    // const timelineInfo = rawData.timelineInfo;
    //
    // const results = _.map(rawData.timelinePage.results, result => {
    //   const [k, x] = result;
    //   const id = x.id;
    //   const slot = x.s;
    //   const tick_height = x.h;
    //   const leader = x.l;
    //   const timestamp = x.dt;
    //
    //   return [
    //     k,
    //     {
    //       id,
    //       slot,
    //       tick_height,
    //       leader,
    //       timestamp,
    //     },
    //   ];
    // });
    //
    // const pageData = {
    //   timeline: timelineData.timeline,
    //   start: timelineData.start,
    //   results,
    //   length: timelineData.length,
    //   count: timelineData.count,
    //   next: timelineData.next,
    //   prev: timelineData.prev,
    //   timestamp: timelineData.dt,
    // };
    //
    // const pageInfo = {
    //   timeline: timelineInfo.timeline,
    //   last: timelineInfo.last,
    //   first: timelineInfo.first,
    //   count: timelineInfo.count,
    //   timestamp: timelineInfo.dt,
    // };

    if (version === 'ApplicationIndexView@latest' || version === __VERSION__) {
      return {
        __VERSION__,
        rawData,
        // pageInfo,
      };
    }

    return {
      error: 'UnsupportedVersion',
      currentVersion: __VERSION__,
      desiredVersion: version,
    };
  }
}
