import {SOL_LAMPORTS, Transaction} from '@solana/web3.js';
import _ from 'lodash';
import Base58 from 'base-58';
const b58e = Base58.encode;

const DEFAULT_CUMULATIVE_UPTIME_EPOCHS = 64;
const TDS_MAGIC_EPOCH = 10;

export function lamportsToSol(lamports) {
  return ((lamports || 0.0) * 1.0) / SOL_LAMPORTS;
}

export function calculateUptimeValues(epochInfo, epochSchedule, uptimeValues) {
  const {epoch} = epochInfo;
  const {
    first_normal_epoch: firstNormalEpoch,
    slots_per_epoch: slotsPerEpoch,
  } = epochSchedule;

  const lastEpoch = epoch - 1;
  const firstEpoch = Math.max(firstNormalEpoch, TDS_MAGIC_EPOCH);

  if (lastEpoch < firstEpoch) {
    return {
      lastEpochUptimePercent: null,
      lastEpochUptimeCreditsEarned: null,
      lastEpochUptimeCreditsPossible: null,
      cumulativeUptimeCreditsEarned: null,
      cumulativeUptimeCreditsPossible: null,
      cumulativeUptimePercent: null,
      uptimeComplete: false,
      uptimeEpochs: 0,
      uptimeEpochsSeen: {},
    };
  }

  const accumulated = _.reduce(
    uptimeValues,
    (a, v) => {
      const {
        lastEpochUptimeCreditsEarned,
        cumulativeUptimeCreditsEarned,
        epochsSeen,
      } = a;

      const {epoch: thisEpoch, credits_earned: creditsEarned} = v;

      if (
        thisEpoch < firstEpoch ||
        thisEpoch > lastEpoch ||
        epochsSeen[thisEpoch]
      ) {
        return a;
      }

      epochsSeen[thisEpoch] = true;

      return {
        lastEpochUptimeCreditsEarned:
          thisEpoch === lastEpoch
            ? creditsEarned
            : lastEpochUptimeCreditsEarned,
        cumulativeUptimeCreditsEarned:
          creditsEarned + cumulativeUptimeCreditsEarned,
        epochsSeen,
      };
    },
    {
      lastEpochUptimeCreditsEarned: 0,
      cumulativeUptimeCreditsEarned: 0,
      epochsSeen: {},
    },
  );

  const {
    lastEpochUptimeCreditsEarned,
    cumulativeUptimeCreditsEarned,
    epochsSeen,
  } = accumulated;

  const lastEpochUptimeCreditsPossible = slotsPerEpoch;
  const cumulativeUptimeCreditsPossible =
    Math.min(DEFAULT_CUMULATIVE_UPTIME_EPOCHS, lastEpoch - firstEpoch + 1) *
    slotsPerEpoch;

  const lastEpochUptimePercent = Math.min(
    100.0,
    (100 * (lastEpochUptimeCreditsEarned * 1.0)) /
      (lastEpochUptimeCreditsPossible * 1.0),
  );

  const cumulativeUptimePercent = Math.min(
    100.0,
    (100 * (cumulativeUptimeCreditsEarned * 1.0)) /
      (cumulativeUptimeCreditsPossible * 1.0),
  );

  return {
    lastEpoch,
    lastEpochUptimePercent,
    lastEpochUptimeCreditsEarned,
    lastEpochUptimeCreditsPossible,
    cumulativeUptimeCreditsEarned,
    cumulativeUptimeCreditsPossible,
    cumulativeUptimePercent,
    uptimeComplete: lastEpoch - firstEpoch >= DEFAULT_CUMULATIVE_UPTIME_EPOCHS,
    uptimeEpochs: _.size(epochsSeen),
    uptimeEpochsSeen: epochsSeen,
  };
}

export function transactionFromJson(x, outMessage = {}) {
  let txn = Transaction.from(Buffer.from(x));
  let tx = {};

  if (outMessage.hash) {
    tx.dt = outMessage.dt;
    tx.h = outMessage.h;
    tx.id = b58e(txn.signatures[0].signature);
    tx.s = outMessage.s;
    tx.e = outMessage.hash;
  }

  tx.id = b58e(txn.signatures[0].signature);
  tx.signatures = _.map(txn.signatures, y => {
    return {signature: b58e(y.signature), public_key: y.publicKey.toBase58()};
  });

  tx.instructions = _.map(txn.instructions, y => {
    let inst = {};

    inst.keys = _.map(y.keys, z => {
      return z.pubkey.toBase58();
    });
    inst.program_id = y.programId.toBase58();
    inst.data = b58e(y.data);

    return inst;
  });

  tx.fee = txn.fee;
  tx.recent_blockhash = txn.recentBlockhash;

  return tx;
}
