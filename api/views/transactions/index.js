import _ from 'lodash';

/**
 * TransactionIndexView : supports the transaction index page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'TransactionIndexView@1.0.0';
export class TransactionIndexView {
  asVersion(rawData, __errors__, version) {
    if (__errors__) {
      return {
        __VERSION__,
        __errors__,
      };
    }

    const timelineData = rawData.timelinePage;
    const timelineInfo = rawData.timelineInfo;

    const results = _.map(timelineData.results, result => {
      let [k, x] = result;

      const id = x.id;
      const slot = x.s;
      const tick_height = x.h;
      const entry_id = x.entry_id;
      const block_id = x.block_id;
      const leader = x.l;
      const timestamp = x.dt;

      const instructions = _.map(x.instructions, i => {
        const program_id = i.program_id;
        const keys = i.keys;
        const data = i.data;

        return {
          program_id,
          keys,
          data,
        };
      });

      return [
        k,
        {
          id,
          slot,
          tick_height,
          entry_id,
          block_id,
          leader,
          instructions,
          timestamp,
        },
      ];
    });

    const pageData = {
      timeline: timelineData.timeline,
      start: timelineData.start,
      results,
      length: timelineData.length,
      count: timelineData.count,
      next: timelineData.next,
      prev: timelineData.prev,
      timestamp: timelineData.dt,
    };

    const pageInfo = {
      timeline: timelineInfo.timeline,
      last: timelineInfo.last,
      first: timelineInfo.first,
      count: timelineInfo.count,
      timestamp: timelineInfo.dt,
    };

    if (version === 'TransactionIndexView@latest' || version === __VERSION__) {
      return {
        __VERSION__,
        pageData,
        pageInfo,
      };
    }

    return {
      error: 'UnsupportedVersion',
      currentVersion: __VERSION__,
      desiredVersion: version,
    };
  }
}
