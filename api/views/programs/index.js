import _ from 'lodash';

/**
 * ProgramIndexView : supports the program index page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'ProgramIndexView@1.0.0';
export class ProgramIndexView {
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
      const [k, x] = result;
      const program_id = x.program_id;
      const timestamp = x.timestamp;

      return [
        k,
        {
          program_id,
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

    if (version === 'ProgramIndexView@latest' || version === __VERSION__) {
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
