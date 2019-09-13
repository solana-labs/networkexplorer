import {transactionFromJson} from '../../util';

/** see inbound-stream.js#process() -> (message.t === 'entry') */
async function loadTransactionEntry(redisX, transactionId) {
  return await redisX.getAsync([`!tx:${transactionId}`]);
}

/** see inbound-stream.js#process() -> (message.t === 'entry') */
async function loadEntryInfo(redisX, entryId) {
  return await redisX.hgetallAsync([`!ent:${entryId}`]);
}

/** see inbound-stream.js#process() -> (message.t === 'entry') */
async function loadEntryData(redisX, entryId) {
  return await redisX.getAsync([`!entry:${entryId}`]);
}

/** see inbound-stream.js#process() -> (message.t === 'block') */
async function loadBlock(redisX, blockId) {
  return await redisX.hgetallAsync([`!blk:${blockId}`]);
}

/**
 * loadTransactionDetail: retrieves raw data about a transaction from the data store and returns it for formatting
 *
 * @param redisX
 * @param transactionId
 * @returns {Promise<{blockId: *, entry: *, block: *, transaction: *, entryId: *}>}
 */
export async function loadTransactionDetail(redisX, transactionId) {
  const entryId = await loadTransactionEntry(redisX, transactionId);
  const entry = await loadEntryInfo(redisX, entryId);
  delete entry.data;

  const blockId = entry.block_id;
  const block = await loadBlock(redisX, blockId);
  delete block.data;

  const entryRaw = await loadEntryData(redisX, entryId);
  const entryData = JSON.parse(entryRaw);

  const transaction = (() => {
    for (const x of entryData.entry.transactions) {
      const transaction = transactionFromJson(x, entry);

      if (transaction.id === transactionId) {
        return transaction;
      }
    }
    return null;
  })();

  return {
    entryId,
    entry,
    blockId,
    block,
    entryRaw,
    transaction,
  };
}
