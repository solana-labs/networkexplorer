[![Build status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

[travis-image]: https://api.travis-ci.org/solana-labs/blockexplorer.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/blockexplorer
[npm-image]: https://img.shields.io/npm/v/@solana/blockexplorer.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@solana/blockexplorer.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@solana/blockexplorer
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release

# Solana Block Explorer
## Prerequisites
### Redis
* Ubuntu: `apt-get install redis-server`
* MacOS: `brew install redis`

### NodeJS
* Install node.js via your favorite mechanism
* Install yarn (typically `npm install -g yarn`)

## Quick Start
Ensure Redis is running with `redis-cli ping`.  If the ping fails, start redis
with:
```bash
$ redis-server &
```

Then install the block explorer:
```bash
$ npm install -g @solana/blockexplorer
```

Build and run a local Solana node:
```bash
$ git clone https://github.com/solana-labs/solana.git
$ cd solana/
$ cargo build --all
$ ./run.sh
```

In another terminal start the block explorer:
```bash
$ solana-blockexplorer
```

## Development Info
Setup the workspace:
```bash
$ yarn
```

Start the API service and Web UI manually with:
```bash
$ yarn start:api
$ yarn start:ui
```

Then configure and start a local Solana node.  From the main solana repository:
```bash
$ cargo build --all
$ ./run.sh
```
and if desired for UI testing:
```bash
$ ./multinode-demo/client.sh --tx_count 40 --threads 2 -z 400
```

## High Performance Use Cases

### Redis via Unix Domain Socket

Redis is known as a very fast in-memory data structure server. To keep up with Solana
speeds, it may be useful to enable Unix Domain Socket communication for added performance
(in our unscientific testing, it gives about 10-40% or more depending on the operations).

Add configuration similar to the following to your `/etc/redis/redis.conf` (or equivalent):
```
unixsocket /var/run/redis/redis-server.sock
unixsocketperm 770
```

We also found these parameters to be super useful on linux:
```bash
sudo sysctl net.core.somaxconn=16384
```

Remember to restart `redis-server` to pick up the new configuration:
```bash
sudo service redis-server restart
```

Ensure that your API unix user is in the same group as your `redis` user so it can read
the file. For example, you may need to do something like this:
```bash
sudo chgrp -R ubuntu /var/run/redis
```

Finally, update the redis section of `api/config.js` to enable the `path` configuration
which takes precedence over the host/port options:
```js
  ...
  redis: {
    ...
    path: '/var/run/redis/redis-server.sock',
  },
  ...
```

If you would like to test Redis performance, the `redis-benchmark` tool is very handy
for quick sanity checks while tuning configuration.

Results using localhost TCP socket:
```bash
$ redis-benchmark -q -n 2000000 -c 1000 -P 40
PING_INLINE: 567215.00 requests per second
PING_BULK: 1021450.50 requests per second
SET: 587026.69 requests per second
GET: 741839.75 requests per second
INCR: 619195.06 requests per second
LPUSH: 671366.19 requests per second
RPUSH: 810701.25 requests per second
LPOP: 473372.78 requests per second
RPOP: 769230.81 requests per second
SADD: 925925.88 requests per second
HSET: 693721.81 requests per second
SPOP: 914494.75 requests per second
LPUSH (needed to benchmark LRANGE): 547495.19 requests per second
LRANGE_100 (first 100 elements): 34660.24 requests per second
LRANGE_300 (first 300 elements): 9543.71 requests per second
LRANGE_500 (first 450 elements): 6180.72 requests per second
LRANGE_600 (first 600 elements): 4716.88 requests per second
MSET (10 keys): 123137.54 requests per second
```

Results using Unix Domain Socket:
```bash
$ redis-benchmark -q -n 2000000 -c 1000 -P 40 -s /var/run/redis/redis-server.sock
PING_INLINE: 1038421.62 requests per second
PING_BULK: 1673640.12 requests per second
SET: 896459.00 requests per second
GET: 1175779.00 requests per second
INCR: 1107419.75 requests per second
LPUSH: 814995.94 requests per second
RPUSH: 768049.12 requests per second
LPOP: 775494.38 requests per second
RPOP: 884564.38 requests per second
SADD: 1047120.44 requests per second
HSET: 758437.62 requests per second
SPOP: 1275510.25 requests per second
LPUSH (needed to benchmark LRANGE): 810372.81 requests per second
LRANGE_100 (first 100 elements): 58491.50 requests per second
LRANGE_300 (first 300 elements): 12462.15 requests per second
LRANGE_500 (first 450 elements): 7449.32 requests per second
LRANGE_600 (first 600 elements): 4019.78 requests per second
MSET (10 keys): 120279.05 requests per second
```

