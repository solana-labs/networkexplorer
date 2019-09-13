import _ from 'lodash';

/**
 * TransactionDetailView : supports the transaction detail page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'TransactionDetailView@1.0.0';
export class TransactionDetailView {
  asVersion(rawData, version) {
    const transactionData = rawData.transaction;
    const entryData = rawData.entry;
    const blockData = rawData.block;

    const signatures = _.map(transactionData.signatures, x => {
      const {signature, public_key} = x;

      return {signature, public_key};
    });

    const instructions = _.map(transactionData.instructions, x => {
      const {program_id, keys, data} = x;

      return {program_id, keys, data};
    });

    const recent_blockhash = transactionData.recent_blockhash;

    const transaction = {
      id: transactionData.id,
      block_id: blockData.id,
      entry_id: entryData.id,
      slot: parseInt(entryData.s),
      tick_height: parseInt(entryData.h),
      leader: entryData.l,
      signatures,
      instructions,
      recent_blockhash,
      timestamp: entryData.dt,
    };

    const entry = {
      id: entryData.id,
      block_id: entryData.block_id,
      slot: parseInt(entryData.s),
      tick_height: parseInt(entryData.h),
      leader: entryData.l,
      timestamp: entryData.dt,
    };

    const block = {
      id: blockData.id,
      slot: parseInt(blockData.s),
      tick_height: parseInt(blockData.h),
      leader: blockData.l,
      timestamp: blockData.dt,
    };

    const data = {
      __VERSION__,
      transaction,
      entry,
      block,
    };

    if (version === 'TransactionDetailView@latest' || version === __VERSION__) {
      return data;
    }

    return {
      error: 'UnsupportedVersion',
      currentVersion: __VERSION__,
      desiredVersion: version,
    };
  }
}
