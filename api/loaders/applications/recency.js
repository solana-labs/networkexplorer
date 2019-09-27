import _ from 'lodash';

export const MAX_PAGE_SIZE = 1000;
export const DEFAULT_PAGE_SIZE = 100;

function parseApplicationEntry(data) {
  if (!data || data.length < 2) {
    return null;
  }

  let k = new Date(parseInt(data[1]));
  let v = {program_id: data[0], dt: k.toISOString()};

  return v;
}

/**
 * getRecencySetInfo: obtain description of recent applications set
 *
 * @param redisX
 * @returns {Promise<{dt: *, last: *, count: *, timeline: *, first: *}>}
 */
export async function getRecencySetInfo(redisX) {
  const timeline = 'programs';
  const timelineKey = `!__recent:programs`;

  const thePromise = new Promise((resolve, reject) => {
    try {
      redisX.client
        .multi()
        .zrange(timelineKey, 0, 0, 'WITHSCORES')
        .zrange(timelineKey, -1, -1, 'WITHSCORES')
        .zcard(timelineKey)
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

  const [, firstKey] = rawResults[0];
  const first = [firstKey, parseApplicationEntry(rawResults[0])];

  const [, lastKey] = rawResults[1];
  const last = [lastKey, parseApplicationEntry(rawResults[1])];

  let count = rawResults[2];

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
 * getRecencySetPage: get one page of recent applications index
 *
 * @param redisX
 * @param start
 * @param count
 * @param direction
 * @returns {Promise<{next: *, dt: *, prev: *, start: *, length: *, count: *, timeline: *, results: *}>}
 */
export async function getRecencySetPage(redisX, start, count, direction) {
  const timeline = 'applications';
  const timelineKey = `!__recent:programs`;
  const safeCount = Math.min(MAX_PAGE_SIZE, Math.max(0, count));
  const safeStart = start ? parseInt(start) : 0;

  const currentPageStart = start ? parseInt(start) : 0;
  const currentPageEnd = currentPageStart + safeCount;
  const prevPageStart = safeStart >= safeCount ? safeStart - safeCount : 0;
  const prevPageEnd = safeStart >= safeCount ? safeStart : 0;

  const thePromise = new Promise((resolve, reject) => {
    try {
      let tx = redisX.client.multi();

      if (direction === '+') {
        tx = tx.zrange(
          timelineKey,
          currentPageStart,
          currentPageEnd,
          'WITHSCORES',
        );
        tx = tx.zrange(timelineKey, prevPageStart, prevPageEnd, 'WITHSCORES');
      } else {
        tx = tx.zrevrange(
          timelineKey,
          currentPageStart,
          currentPageEnd,
          'WITHSCORES',
        );
        tx = tx.zrevrange(
          timelineKey,
          prevPageStart,
          prevPageEnd,
          'WITHSCORES',
        );
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

  const results = _.map(_.chunk(rawResults, 2).slice(0, safeCount), x => {
    const [program_id, timestamp] = x;

    return [
      timestamp,
      {program_id, timestamp: new Date(parseInt(timestamp)).toISOString()},
    ];
  });

  let prevValue = _.map(_.chunk(prevResults, 2).slice(0, safeCount), x => {
    const [program_id, timestamp] = x;

    return [
      timestamp,
      {program_id, timestamp: new Date(parseInt(timestamp)).toISOString()},
    ];
  });

  let length = results.length;
  let dt = new Date().toISOString();

  let next = rawResults.length >= safeCount ? currentPageEnd : null;
  let prev = prevValue.length >= safeCount ? prevPageStart : null;

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
