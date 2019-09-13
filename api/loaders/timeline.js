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
        .xrange(timelineKey, '-', '+', 'COUNT', 1)
        .xrevrange(timelineKey, '+', '-', 'COUNT', 1)
        .xlen(timelineKey)
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

  const results = await thePromise;

  const [firstKey, rawFirst] = parseStreamEntry(results[0][0]);
  const first = [firstKey, parseValue ? parseValue(rawFirst) : rawFirst];

  const [lastKey, rawLast] = parseStreamEntry(results[1][0]);
  const last = [lastKey, parseValue ? parseValue(rawLast) : rawLast];
  let count = results[2];
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
  start = '+',
  count = DEFAULT_PAGE_SIZE,
  direction = '-',
  parseValue,
) {
  let timelineKey = `!__timeline:${timeline}`;

  let rawResults = await (direction === '+'
    ? redisX.xrangeAsync(timelineKey, start, '+', 'COUNT', count + 1)
    : redisX.xrevrangeAsync(timelineKey, start, '-', 'COUNT', count + 1));

  let results = _.map(rawResults.slice(0, count), x => {
    const [k, v] = parseStreamEntry(x);

    return [k, parseValue ? parseValue(v) : v];
  });

  let length = results.length;
  let dt = new Date().toISOString();

  let next =
    rawResults.length > count ? rawResults[rawResults.length - 1][0] : null;

  return {
    timeline,
    start,
    results,
    length,
    count,
    next,
    dt,
  };
}
