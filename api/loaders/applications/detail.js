import * as solanaWeb3 from '@solana/web3.js';

import {FriendlyGet} from '../../friendlyGet';
import {FULLNODE_URL} from '../../fullnode-url';

async function loadApplicationTimestamp(redisX, applicationId) {
  const result = await redisX.zscoreAsync('!__recent:programs', applicationId);

  return result;
}

/**
 * loadApplicationDetail: retrieves raw data about an application from the data store and returns it for formatting
 *
 * @param redisX
 * @param applicationId
 * @returns {Promise<{accountInfo: *, __errors__: *, programAccounts: *, applicationId: *, timestamp: *}>}
 */
export async function loadApplicationDetail(redisX, applicationId) {
  const connection = new solanaWeb3.Connection(FULLNODE_URL);

  const {
    __errors__,
    accountInfo,
    programAccounts,
    timestamp,
  } = await new FriendlyGet()
    .with(
      'accountInfo',
      connection.getAccountInfo(new solanaWeb3.PublicKey(applicationId)),
    )
    .with(
      'programAccounts',
      connection.getProgramAccounts(new solanaWeb3.PublicKey(applicationId)),
    )
    .with('timestamp', loadApplicationTimestamp(redisX, applicationId))
    .get();

  return {
    __errors__,
    applicationId,
    accountInfo,
    programAccounts,
    timestamp,
  };
}
