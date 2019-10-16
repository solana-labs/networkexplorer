import {getRecencySetInfo, getRecencySetPage} from '../recency';

function parseAccountEntry(data) {
  if (!data || data.length < 2) {
    return null;
  }

  let k = new Date(parseInt(data[1]));
  let v = {program_id: data[0], dt: k.toISOString()};

  return v;
}

/**
 * loadAccountIndex: retrieves raw data from the data store and returns it for formatting
 *
 * @param redisX
 * @param start
 * @param count
 * @param direction
 * @returns {Promise<{timelinePage: *, timelineInfo: *}>}
 */
export async function loadAccountIndex(redisX, start, count, direction) {
  const timelineInfo = await getRecencySetInfo(redisX, 'accounts', parseAccountEntry);

  const timelinePage = await getRecencySetPage(redisX, 'accounts', start, count, direction);

  return {
    timelineInfo,
    timelinePage,
  };
}
