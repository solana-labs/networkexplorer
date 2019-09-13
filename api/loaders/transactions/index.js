import {getTimelineInfo, getTimelinePage} from '../timeline';
import {parseTransaction} from '../../../src/v2/utils/parseMessage';

/**
 * loadTransactionIndex: retrieves raw data from the data store and returns it for formatting
 *
 * @param redisX
 * @param start
 * @param count
 * @param direction
 * @returns {Promise<{timelinePage: *, timelineInfo: *}>}
 */
export async function loadTransactionIndex(redisX, start, count, direction) {
  const timelineInfo = await getTimelineInfo(
    redisX,
    'transactions',
    parseTransaction,
  );

  const timelinePage = await getTimelinePage(
    redisX,
    'transactions',
    start,
    count,
    direction,
    parseTransaction,
  );

  return {
    timelineInfo,
    timelinePage,
  };
}
