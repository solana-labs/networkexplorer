import _ from 'lodash';

import {getTimelineInfo, getTimelinePage} from '../timeline';
import {parseTransaction} from '../parseMessage';

/** see inbound-stream.js#process() -> (message.t === 'entry') */
async function loadEntryInfo(redisX, entryId) {
  return await redisX.hgetallAsync([`!ent:${entryId}`]);
}

// augment with block_id field since it's not available in the timeline
async function fixupTimelinePage(redisX, timelinePage) {
  const entryIds = _(timelinePage.results)
    .map(x => x[1].entry_id)
    .uniq()
    .value();
  const entryBlocks = {};

  for (let i = 0; i < entryIds.length; i++) {
    const entryId = entryIds[i];
    const entryInfo = await loadEntryInfo(redisX, entryId);
    entryBlocks[entryId] = entryInfo && entryInfo.block_id;
  }

  for (let i = 0; i < timelinePage.results.length; i++) {
    const transaction = timelinePage.results[i][1];
    transaction.block_id = entryBlocks[transaction.entry_id];
  }

  return timelinePage;
}

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

  const timelinePageNoBlockIds = await getTimelinePage(
    redisX,
    'transactions',
    start,
    count,
    direction,
    parseTransaction,
  );

  const timelinePage = await fixupTimelinePage(redisX, timelinePageNoBlockIds);

  return {
    timelineInfo,
    timelinePage,
  };
}
