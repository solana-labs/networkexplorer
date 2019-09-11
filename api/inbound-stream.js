/*
  This component is a Node.JS service that listens for events from
  the Solana EntryStream class. It runs a main event loop listening to
  a TCP, UDP, and/or Unix Domain Socket and dispatches events to one
  or more handlers (typically Redis for event aggregation and realtime
  streaming).
*/
import Base58 from 'base-58';
import dgram from 'dgram';
import net from 'net';
import redis from 'redis';
import {Transaction} from '@solana/web3.js';
import _ from 'lodash';
import fs from 'fs';

import config from './config';
const b58e = Base58.encode;

class BridgeFn {
  constructor() {
    this.process = this.process.bind(this);
  }

  process(inMessage) {
    let outMessage = {
      t: inMessage.t,
      dt: inMessage.dt,
    };

    if (inMessage.t === 'entry') {
      outMessage.h = inMessage.h;
      outMessage.s = inMessage.s;
      outMessage.l = inMessage.l;
      outMessage.hash = b58e(inMessage.entry.hash);

      outMessage.transactions = _.map(inMessage.entry.transactions, x => {
        let txn = Transaction.from(Buffer.from(x));
        let tx = {};

        tx.dt = outMessage.dt;
        tx.h = outMessage.h;
        tx.id = b58e(txn.signatures[0].signature);
        tx.s = outMessage.s;
        tx.e = outMessage.hash;
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
      });
    }

    if (inMessage.t === 'block') {
      outMessage.h = inMessage.h;
      outMessage.s = inMessage.s;
      outMessage.l = inMessage.l;
      outMessage.hash = inMessage.hash;
    }

    return outMessage;
  }
}

const TIMELINE_MAX_ELEMENTS = 128 * 1024;
const EXPIRE_TIMEOUT_SECS = 6 * 60 * 60;

class RedisHandler {
  constructor(props) {
    const config = props.path
      ? {path: props.path}
      : {host: props.host, port: props.port};

    this.innerClient = redis.createClient(config);

    this.process = this.process.bind(this);
  }

  redisTimelinePush(commands, key, value) {
    commands.push(['lpush', key, value]);
    commands.push(['ltrim', key, TIMELINE_MAX_ELEMENTS]);
    commands.push(['expire', key, EXPIRE_TIMEOUT_SECS]);
  }

  redisTimelineImprovedPush(commands, key, value) {
    commands.push([
      'xadd',
      key,
      'MAXLEN',
      '~',
      TIMELINE_MAX_ELEMENTS,
      '*',
      'v',
      value,
    ]);
    commands.push(['expire', key, EXPIRE_TIMEOUT_SECS]);
  }

  redisKeyValueAdd(commands, key, value) {
    commands.push(['setex', key, EXPIRE_TIMEOUT_SECS, value]);
  }

  redisSetAdd(commands, key, value) {
    commands.push(['sadd', key, value]);
    commands.push(['expire', key, EXPIRE_TIMEOUT_SECS]);
  }

  redisHashMset(commands, key, value) {
    commands.push(['hmset', key, value]);
    commands.push(['expire', key, EXPIRE_TIMEOUT_SECS]);
  }

  process(message, original) {
    const txn_sec = message.dt.substring(0, 19);
    const txn_min = message.dt.substring(0, 16);
    const txn_hour = message.dt.substring(0, 13);
    const txn_day = message.dt.substring(0, 10);

    let commands = [];

    // block is a lightweight/tiny data structure since it's trailing
    if (message.t === 'block') {
      const msgJson = JSON.stringify(message);

      let blkMsg = [
        message.h,
        message.l,
        message.s,
        message.dt,
        message.hash,
      ].join('#');

      // DEPRECATED
      this.redisTimelinePush(commands, '!blk-timeline', blkMsg);

      // NEW
      this.redisTimelineImprovedPush(commands, '!__timeline:blocks', blkMsg);

      // SAME
      commands.push(['publish', '@blocks', blkMsg]);

      // SAME
      commands.push(['set', '!blk-last-id', message.hash]);
      // SAME
      commands.push(['set', '!blk-last-slot', message.s]);

      // SAME
      this.redisHashMset(commands, `!blk:${message.hash}`, {
        t: 'blk',
        dt: message.dt,
        h: message.h,
        l: message.l,
        s: message.s,
        id: message.hash,
        data: msgJson,
      });

      // write back slot/entry/block correspondence if necessary
      this.innerClient.smembers(`!ent-by-slot:${message.s}`, (err, result) => {
        if (err) {
          console.log('ERR!', err);
          return;
        }

        if (result && result.length > 0) {
          _.forEach(result, x => {
            // SAME
            this.redisHashMset(commands, `!ent:${x}`, 'block_id', message.hash);
            // SAME
            this.redisSetAdd(commands, `!blk-ent:${message.hash}`, x);
          });
          this.innerClient.batch(commands).exec(err2 => {
            // fire and forget
            if (err2) {
              console.log('ERR!', err2);
            }
          });
        }
      });
    }

    // entry is a larger data structure since it contains txns
    if (message.t === 'entry') {
      // NEW : entry full data as-is (so we don't need to store txns separately)
      this.redisKeyValueAdd(commands, `!entry:${message.hash}`, original);

      let txns = message.transactions;
      let txCount = txns.length;

      delete message.transactions;
      const msgJson = JSON.stringify(message);

      // SAME
      commands.push(['set', '!ent-last-leader', message.l]);
      // SAME
      commands.push(['set', '!ent-last-id', message.hash]);
      // SAME
      commands.push(['set', '!ent-last-dt', message.dt]);
      // SAME
      commands.push(['set', '!ent-height', message.h]);

      // SAME : store entry data under entry hash
      this.redisHashMset(commands, `!ent:${message.hash}`, {
        t: 'ent',
        dt: message.dt,
        h: message.h,
        l: message.l,
        s: message.s,
        id: message.hash,
        data: msgJson,
      });

      // SAME : append block height:dt:id to timeline
      let entMsg = [
        message.h,
        message.l,
        message.s,
        message.dt,
        message.hash,
        txCount,
      ].join('#');

      // DEPRECATED
      this.redisTimelinePush(commands, '!ent-timeline', entMsg);

      // NEW
      this.redisTimelineImprovedPush(commands, '!__timeline:entries', entMsg);

      // SAME
      commands.push(['publish', '@entries', entMsg]);

      // SAME
      this.redisSetAdd(commands, `!ent-by-slot:${message.s}`, message.hash);

      // MIXED : store transaction data under transaction id
      _.forEach(txns, txn => {
        // NEW: transaction to block (via entry) index
        this.redisKeyValueAdd(commands, `!tx:${txn.id}`, message.hash);

        let tx = {};

        tx.h = message.h;
        tx.l = message.l;
        tx.s = message.s;
        tx.dt = message.dt;
        tx.id = txn.id;
        tx.entry_id = message.hash;
        tx.instructions = txn.instructions;
        tx.fee = txn.fee;
        tx.recent_blockhash = txn.recent_blockhash;

        let txnJson = JSON.stringify(tx);

        // DEPRECATED : store txn data (replace with thinner index)
        this.redisHashMset(commands, `!txn:${tx.id}`, {
          t: 'txn',
          dt: tx.dt,
          h: tx.h,
          l: tx.l,
          s: tx.s,
          id: tx.id,
          entry_id: tx.entry_id,
          data: txnJson,
        });

        let txnMsg = [
          message.h,
          message.l,
          message.s,
          message.dt,
          message.hash,
          tx.id,
        ];
        if (tx.instructions.length > 0) {
          let txInst = _.map(tx.instructions, i => {
            return [i.program_id, i.keys.join(','), i.data].join('@');
          }).join('|');
          txnMsg.push(txInst);
        } else {
          // Transactions should always have at least one instruction.  But if
          // the Transaction was not deserialized correctly we could end up
          // here.
          txnMsg.push('');
        }
        txnMsg = txnMsg.join('#');

        // SAME (used to create txn -> block mapping)
        this.redisSetAdd(commands, `!ent-txn:${message.hash}`, tx.id);

        // DEPRECATED
        this.redisTimelinePush(commands, '!txn-timeline', txnMsg);

        // NEW
        this.redisTimelineImprovedPush(commands, '!txn-timeline', txnMsg);

        tx.instructions.forEach(instruction => {
          // DEPRECATED
          this.redisTimelinePush(
            commands,
            `!txns-by-prgid-timeline:${instruction.program_id}`,
            txnMsg,
          );
          // SAME
          commands.push([
            'publish',
            `@program_id:${instruction.program_id}`,
            txnMsg,
          ]);

          // NEW
          this.redisTimelineImprovedPush(
            commands,
            `!__timeline:program:${instruction.program_id}`,
            txnMsg,
          );
          // NEW
          this.redisSetAdd(
            commands,
            `!programs:active:${txn_min}`,
            instruction.program_id,
          );
        });
      });

      if (txCount > 0) {
        // increment txn sec count
        commands.push(['incrby', `!txn-per-sec:${txn_sec}`, txCount]);

        // increment txn minute count
        commands.push(['incrby', `!txn-per-min:${txn_min}`, txCount]);

        // increment txn hour count
        commands.push(['incrby', `!txn-per-hour:${txn_hour}`, txCount]);

        // increment txn day count
        commands.push(['incrby', `!txn-per-day:${txn_day}`, txCount]);

        // increment txn all-time count
        commands.push(['incrby', `!txn-count`, txCount]);
      }

      var self = this;

      this.innerClient.batch(commands).exec(() => {
        // SAME : maybe update tps max
        self.innerClient.mget(
          [`!txn-per-sec-max`, `!txn-per-sec:${txn_sec}`],
          (error, vals) => {
            const maxTps = parseInt((vals && vals[0]) || '0');
            const nowTps = parseInt((vals && vals[1]) || '0');

            if (nowTps > maxTps) {
              this.innerClient.set(`!txn-per-sec-max`, nowTps);
            }
          },
        );
      });
    }
  }
}

const UDP_ENABLED = false;
const TCP_ENABLED = false;
const UNIX_DS_ENABLED = true;

const bridgeFn = new BridgeFn();
const handlers = [new RedisHandler(config.redis)];

if (UDP_ENABLED) {
  const udpServer = dgram.createSocket('udp4');

  udpServer.on('listening', function() {
    let address = udpServer.address();

    console.log(
      'UDP Server listening on ' + address.address + ':' + address.port,
    );
  });

  udpServer.on('message', function(data) {
    //console.log(["!ent", data].join("\t"));
    let t1 = new Date().getTime();
    let realMessage = bridgeFn.process(JSON.parse(data));
    let txCount = realMessage.transactions
      ? realMessage.transactions.length
      : '<no_tx>';

    _.forEach(handlers, h => {
      h.process(realMessage);
    });

    let t2 = new Date().getTime();

    console.log(
      [
        '!ent',
        realMessage.dt,
        realMessage.s,
        realMessage.h,
        realMessage.t,
        realMessage.hash,
        txCount,
        'took ' + (t2 - t1) + 'ms',
      ].join(', '),
    );
  });

  udpServer.bind(config.service.port, config.service.host);
}

function makeServer() {
  let pktCount = 0;
  return net.createServer(function(socket) {
    let part = '';

    socket.on('data', data => {
      pktCount += 1;
      data = data.toString();
      part = part + data;

      if (part.indexOf('\n') === -1) {
        console.log('<partial packet received>');
        return;
      }

      let t1 = new Date().getTime();
      let realMessage = bridgeFn.process(JSON.parse(part));
      let txCount = realMessage.transactions
        ? realMessage.transactions.length
        : '<no_tx>';

      _.forEach(handlers, h => {
        h.process(realMessage, part);
      });

      socket.destroy();
      part = '';
      let t2 = new Date().getTime();

      console.log(
        [
          '!ent',
          pktCount,
          realMessage.dt,
          realMessage.s,
          realMessage.h,
          realMessage.t,
          realMessage.hash,
          txCount,
          'took ' + (t2 - t1) + 'ms',
        ].join(', '),
      );
    });
  });
}

if (TCP_ENABLED) {
  makeServer().listen(config.service.port, config.service.host, () => {
    console.log(
      'TCP Server listening on ' +
        config.service.host +
        ':' +
        config.service.port,
    );
  });
}

if (UNIX_DS_ENABLED) {
  const {socket} = config.service;
  if (fs.existsSync(socket)) {
    fs.unlinkSync(socket);
  }
  makeServer().listen(socket, () => {
    console.log('UNIX_DS listening on', socket);
  });
}
