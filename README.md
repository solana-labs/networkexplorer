[![Build status][travis-image]][travis-url]

[travis-image]: https://api.travis-ci.org/solana-labs/blockexplorer.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/blockexplorer

# Working with Block Explorer

## Prerequisites

### Redis
* Ubuntu: `apt-get install redis-server`
* MacOS: `brew install redis`

### NodeJS
* Install node.js via your favorite mechanism
* Install yarn (typically `npm install -g yarn`)

## Quick Start
Setup the workspace, ensure Redis is running
```bash
$ yarn
$ redis-server &
```

Start the API service and Web UI:
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

## Running the production Web UI
$ yarn build:ui
$ PORT=80 npx serve -s build
