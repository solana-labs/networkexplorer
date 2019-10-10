import {FriendlyGet} from '../../friendlyGet';

/**
 * loadTourDeSolIndex: retrieves raw data from the data store and returns it for formatting
 *
 * @param redisX
 * @returns {Promise<{__errors__: *, clusterInfo: *}>}
 */
export async function loadTourDeSolIndex(redisX, {isDemo, activeStage}) {
  const {__errors__, redisKeys} = await new FriendlyGet()
    .with('redisKeys', redisX.mgetAsync('!clusterInfo', '!blk-last-slot'))
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
  };
}
