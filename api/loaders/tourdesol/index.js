import * as solanaWeb3 from '@solana/web3.js';

import {FriendlyGet} from '../../friendlyGet';
import {FULLNODE_URL} from '../../fullnode-url';

/**
 * loadTourDeSolIndex: retrieves raw data from the data store and returns it for formatting
 *
 * @param redisX
 * @returns {Promise<{__errors__: *, clusterInfo: *}>}
 */
export async function loadTourDeSolIndex(redisX, {isDemo, activeStage}) {
  const connection = new solanaWeb3.Connection(FULLNODE_URL);

  const {
    __errors__,
    redisKeys,
    epochInfo,
    epochSchedule,
  } = await new FriendlyGet()
    .with('redisKeys', redisX.mgetAsync('!clusterInfo', '!blk-last-slot'))
    .with('epochInfo', connection.getEpochInfo())
    .with('epochSchedule', connection.getEpochSchedule())
    .get();

  const [clusterInfoJson, lastSlotString] = redisKeys;
  const clusterInfo = JSON.parse(clusterInfoJson || {});
  const lastSlot = parseInt(lastSlotString);

  return {
    __errors__,
    isDemo,
    activeStage,
    clusterInfo,
    lastSlot,
    epochInfo,
    epochSchedule,
  };
}
