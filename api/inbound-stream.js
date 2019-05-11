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

class RedisHandler {
  constructor(props) {
    const config = props.path
      ? {path: props.path}
      : {host: props.host, port: props.port};

    this.innerClient = redis.createClient(config);

    this.process = this.process.bind(this);
  }

  process(message) {
    const txn_sec = message.dt.substring(0, 19);
    const txn_min = message.dt.substring(0, 16);
    const txn_hour = message.dt.substring(0, 13);
    const txn_day = message.dt.substring(0, 10);

    let commands = [];

    if (message.t === 'block') {
      const msgJson = JSON.stringify(message);
      let blkMsg = [
        message.h,
        message.l,
        message.s,
        message.dt,
        message.hash,
      ].join('#');

      commands.push(['lpush', '!blk-timeline', blkMsg]);
      commands.push(['publish', '@blocks', blkMsg]);

      commands.push(['set', '!blk-last-id', message.hash]);
      commands.push(['set', '!blk-last-slot', message.s]);
      commands.push([
        'hmset',
        `!blk:${message.hash}`,
        {
          t: 'blk',
          dt: message.dt,
          h: message.h,
          l: message.l,
          s: message.s,
          id: message.hash,
          data: msgJson,
        },
      ]);

      this.innerClient.smembers(`!ent-by-slot:${message.s}`, (err, result) => {
        if (err) {
          console.log('ERR!', err);
          return;
        }

        if (result && result.length > 0) {
          _.forEach(result, x => {
            commands.push(['hset', `!ent:${x}`, 'block_id', message.hash]);
            commands.push(['sadd', `!blk-ent:${message.hash}`, x]);
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

    if (message.t === 'entry') {
      let txns = message.transactions;
      let txCount = txns.length;

      delete message.transactions;
      const msgJson = JSON.stringify(message);

      commands.push(['set', '!ent-last-leader', message.l]);
      commands.push(['set', '!ent-last-id', message.hash]);
      commands.push(['set', '!ent-last-dt', message.dt]);
      commands.push(['set', '!ent-height', message.h]);

      // store entry data under entry hash
      commands.push([
        'hmset',
        `!ent:${message.hash}`,
        {
          t: 'ent',
          dt: message.dt,
          h: message.h,
          l: message.l,
          s: message.s,
          id: message.hash,
          data: msgJson,
        },
      ]);

      // append block height:dt:id to timeline
      let entMsg = [
        message.h,
        message.l,
        message.s,
        message.dt,
        message.hash,
        txCount,
      ].join('#');

      commands.push(['lpush', '!ent-timeline', entMsg]);
      commands.push(['publish', '@entries', entMsg]);

      commands.push(['sadd', `!ent-by-slot:${message.s}`, message.hash]);

      // store transaction data under transaction id
      _.forEach(txns, txn => {
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

        // store txn data
        commands.push([
          'hmset',
          `!txn:${tx.id}`,
          {
            t: 'txn',
            dt: tx.dt,
            h: tx.h,
            l: tx.l,
            s: tx.s,
            id: tx.id,
            entry_id: tx.entry_id,
            data: txnJson,
          },
        ]);

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

        commands.push(['sadd', `!ent-txn:${message.hash}`, tx.id]);
        commands.push(['lpush', '!txn-timeline', txnMsg]);

        tx.instructions.forEach(instruction => {
          commands.push([
            'lpush',
            `!txns-by-prgid-timeline:${instruction.program_id}`,
            txnMsg,
          ]);
          commands.push([
            'publish',
            `@program_id:${instruction.program_id}`,
            txnMsg,
          ]);
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
        // maybe update tps max
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
        h.process(realMessage);
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
