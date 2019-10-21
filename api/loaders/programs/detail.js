import * as solanaWeb3 from '@solana/web3.js';

import {FriendlyGet} from '../../friendlyGet';
import {FULLNODE_URL} from '../../fullnode-url';

async function loadProgramTimestamp(redisX, programId) {
  const result = await redisX.zscoreAsync('!__recent:programs', programId);

  return result;
}

/**
 * loadProgramDetail: retrieves raw data about a program from the data store and returns it for formatting
 *
 * @param redisX
 * @param programId
 * @returns {Promise<{accountInfo: *, __errors__: *, programAccounts: *, programId: *, timestamp: *}>}
 */
export async function loadProgramDetail(redisX, programId) {
  const connection = new solanaWeb3.Connection(FULLNODE_URL);

  const {
    __errors__,
    accountInfo,
    programAccounts,
    timestamp,
  } = await new FriendlyGet()
    .with(
      'accountInfo',
      connection.getAccountInfo(new solanaWeb3.PublicKey(programId)),
    )
    .with(
      'programAccounts',
      connection.getProgramAccounts(new solanaWeb3.PublicKey(programId)),
    )
    .with('timestamp', loadProgramTimestamp(redisX, programId))
    .get();

  return {
    __errors__,
    programId,
    accountInfo,
    programAccounts,
    timestamp,
  };
}
