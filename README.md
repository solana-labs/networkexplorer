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
