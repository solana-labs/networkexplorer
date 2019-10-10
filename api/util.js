import {Transaction} from '@solana/web3.js';
import _ from 'lodash';
import Base58 from 'base-58';
const b58e = Base58.encode;

export const LAMPORT_SOL_RATIO = 0.0000000000582;

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
    return {signature: b58e(y.signature), public_key: y.publicKey._bn};
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
