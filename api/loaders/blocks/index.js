import {getTimelineInfo, getTimelinePage} from '../timeline';
import {parseBlock} from '../../../src/v2/utils/parseMessage';

/**
 * loadBlockIndex: retrieves raw data from the data store and returns it for formatting
 *
 * @param redisX
 * @param start
 * @param count
 * @param direction
 * @returns {Promise<{timelinePage: *, timelineInfo: *}>}
 */
export async function loadBlockIndex(redisX, start, count, direction) {
  const timelineInfo = await getTimelineInfo(redisX, 'blocks', parseBlock);

  const timelinePage = await getTimelinePage(
    redisX,
    'blocks',
    start,
    count,
    direction,
    parseBlock,
  );

  return {
    timelineInfo,
    timelinePage,
  };
}
