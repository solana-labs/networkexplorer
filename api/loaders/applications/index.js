import {getRecencySetInfo, getRecencySetPage} from './recency';

/**
 * loadApplicationIndex: retrieves raw data from the data store and returns it for formatting
 *
 * @param redisX
 * @param start
 * @param count
 * @param direction
 * @returns {Promise<{timelinePage: *, timelineInfo: *}>}
 */
export async function loadApplicationIndex(redisX, start, count, direction) {
  const timelineInfo = await getRecencySetInfo(redisX);

  const timelinePage = await getRecencySetPage(redisX, start, count, direction);

  return {
    timelineInfo,
    timelinePage,
  };
}
