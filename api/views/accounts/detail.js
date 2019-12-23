import _ from 'lodash';
import Base58 from 'base-58';

import {lamportsToSol} from '../../util';
const b58e = Base58.encode;

/**
 * AccountDetailView : supports the account detail page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'AccountDetailView@1.0.0';

export class AccountDetailView {
  asVersion(rawData, __errors__, version) {
    if (__errors__) {
      return {
        __VERSION__,
        __errors__,
      };
    }

    const accountId = rawData.accountId;

    const accountInfo = rawData.accountInfo && {
      data: rawData.accountInfo.data.toString(),
      executable: rawData.accountInfo.executable,
      lamports: rawData.accountInfo.lamports,
      balance: lamportsToSol(rawData.accountInfo.lamports).toFixed(8),
      owner: rawData.accountInfo.owner.toBase58(),
    };

    const programAccounts =
      rawData.programAccounts &&
      _.map(rawData.programAccounts, ([pubkey, details]) => {
        return {
          pubkey,
          data: b58e(details.data),
          executable: details.executable,
          lamports: details.lamports,
          owner: details.owner.toBase58(),
        };
      });

    const data = {
      __VERSION__,
      accountId,
      accountInfo,
      programAccounts,
      timestamp: rawData.timestamp && new Date(parseInt(rawData.timestamp)),
    };

    if (version === 'AccountDetailView@latest' || version === __VERSION__) {
      return data;
    }

    return {
      error: 'UnsupportedVersion',
      currentVersion: __VERSION__,
      desiredVersion: version,
    };
  }
}
