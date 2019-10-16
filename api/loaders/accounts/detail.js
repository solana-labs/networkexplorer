import * as solanaWeb3 from '@solana/web3.js';

import {FriendlyGet} from '../../friendlyGet';
import {FULLNODE_URL} from '../../fullnode-url';

async function loadAccountTimestamp(redisX, accountId) {
  const result = await redisX.zscoreAsync('!__recent:accounts', accountId);

  return result;
}

/**
 * loadAccountDetail: retrieves raw data about an account from the data store and returns it for formatting
 * @param redisX
 * @param accountId
 * @returns {Promise<{accountInfo: *, __errors__: *, programAccounts: *, applicationId: *, timestamp: *}>}
 */
export async function loadAccountDetail(redisX, accountId) {
  const connection = new solanaWeb3.Connection(FULLNODE_URL);

  const {
    __errors__,
    accountInfo,
    programAccounts,
    timestamp,
  } = await new FriendlyGet()
    .with(
      'accountInfo',
      connection.getAccountInfo(new solanaWeb3.PublicKey(accountId)),
    )
    .with(
      'programAccounts',
      connection.getProgramAccounts(new solanaWeb3.PublicKey(accountId)),
    )
    .with('timestamp', loadAccountTimestamp(redisX, accountId))
    .get();

  return {
    __errors__,
    accountId,
    accountInfo,
    programAccounts,
    timestamp,
  };
}
