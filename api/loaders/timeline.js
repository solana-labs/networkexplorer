import _ from 'lodash';

export const MAX_PAGE_SIZE = 1000;
export const DEFAULT_PAGE_SIZE = 100;

function parseStreamEntry(data) {
  if (!data || data.length < 2) {
    return null;
  }

  let k = data[0];
  let v = data[1][1];

  return [k, v];
}

/**
 * getTimelineInfo: returns attributes of the specified timeline type to inform pagination and auto-scroll controls
 *
 * @param timeline
 * @returns {Promise<{last: *, length: *, timeline: *, first: *, ts: *}>}
 */
export async function getTimelineInfo(redisX, timeline, parseValue) {
  const timelineKey = `!__timeline:${timeline}`;

  const thePromise = new Promise((resolve, reject) => {
    try {
      redisX.client
        .multi()
        .xinfo('STREAM', timelineKey)
        .exec((err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
    } catch (err) {
      reject(err);
    }
  });

  const rawResults = await thePromise;
  const results = _.fromPairs(_.chunk(rawResults[0], 2));

  const [firstKey, rawFirst] = results['first-entry'];
  const first = [firstKey, parseValue ? parseValue(rawFirst) : rawFirst];

  const [lastKey, rawLast] = results['last-entry'];
  const last = [lastKey, parseValue ? parseValue(rawLast) : rawLast];

  let count = results['length'];

  let dt = new Date().toISOString();

  return {
    timeline,
    last,
    first,
    count,
    dt,
  };
}

/**
 * getTimelinePage: retrieves a page of timeline entries of the specified type
 *
 * @param timeline
 * @param start
 * @param count
 * @param direction
 * @returns {Promise<{start: *, count: *, length: *, timeline: *, has_next: *, results: *, ts: *}>}
 */
export async function getTimelinePage(
  redisX,
  timeline,
  start,
  count,
  direction,
  parseValue,
) {
  let timelineKey = `!__timeline:${timeline}`;
  const safeCount = Math.min(MAX_PAGE_SIZE, Math.max(0, count));

  const thePromise = new Promise((resolve, reject) => {
    try {
      let tx = redisX.client.multi();

      if (direction === '+') {
        tx = tx.xrange(timelineKey, start, '+', 'COUNT', safeCount + 1);
        tx = tx.xrevrange(timelineKey, start, '-', 'COUNT', safeCount + 1);
      } else {
        tx = tx.xrevrange(timelineKey, start, '-', 'COUNT', safeCount + 1);
        tx = tx.xrange(timelineKey, start, '+', 'COUNT', safeCount + 1);
      }

      return tx.exec((err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

  const [rawResults, prevResults] = await thePromise;

  const results = _.map(rawResults.slice(0, safeCount), x => {
    const [k, v] = parseStreamEntry(x);

    return [k, parseValue ? parseValue(v) : v];
  });

  let prevValue = _.map(prevResults, x => {
    const [k, v] = parseStreamEntry(x);

    return [k, parseValue ? parseValue(v) : v];
  });

  let length = results.length;
  let dt = new Date().toISOString();

  let next =
    rawResults.length > safeCount ? rawResults[rawResults.length - 1][0] : null;
  let prev =
    prevValue.length > safeCount ? prevValue[prevValue.length - 1][0] : null;

  return {
    timeline,
    start,
    results,
    length,
    count,
    next,
    prev,
    dt,
  };
}
