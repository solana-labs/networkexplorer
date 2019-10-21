import _ from 'lodash';
import Base58 from 'base-58';
const b58e = Base58.encode;

/**
 * ProgramDetailView : supports the program detail page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'ProgramDetailView@1.0.0';

export class ProgramDetailView {
  asVersion(rawData, __errors__, version) {
    if (__errors__) {
      return {
        __VERSION__,
        __errors__,
      };
    }

    const programId = rawData.programId;

    const accountInfo = rawData.accountInfo && {
      data: rawData.accountInfo.data.toString(),
      executable: rawData.accountInfo.executable,
      lamports: rawData.accountInfo.lamports,
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
      programId,
      accountInfo,
      programAccounts,
      timestamp: rawData.timestamp && new Date(parseInt(rawData.timestamp)),
    };

    if (version === 'ProgramDetailView@latest' || version === __VERSION__) {
      return data;
    }

    return {
      error: 'UnsupportedVersion',
      currentVersion: __VERSION__,
      desiredVersion: version,
    };
  }
}
