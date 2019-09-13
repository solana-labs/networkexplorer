/** see inbound-stream.js#process() -> (message.t === 'block') */
async function loadBlock(redisX, blockId) {
  const result = await redisX.hgetallAsync([`!blk:${blockId}`]);
  delete result.data;

  return result;
}

/** see inbound-stream.js#process() -> (message.t === 'block') */
async function loadBlockEntries(redisX, blockId) {
  return await redisX.smembersAsync(`!blk-ent:${blockId}`);
}

/**
 * loadBlockDetail: retrieves raw data about a block from the data store and returns it for formatting
 *
 * @param redisX
 * @param blockId
 * @returns {Promise<{blockId: *, block: *}>}
 */
export async function loadBlockDetail(redisX, blockId) {
  const block = await loadBlock(redisX, blockId);
  const entries = await loadBlockEntries(redisX, blockId);

  return {
    blockId,
    block,
    entries,
  };
}
