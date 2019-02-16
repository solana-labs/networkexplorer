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

Start the inbound stream service:
```
$ yarn start:stream
```

Configure and start a local Solana node.  From the main solana repository:
```bash
$ ./multinode-demo/setup.sh
$ ./multinode-demo/drone.sh
$ ./multinode-demo/bootstrap-leader.sh
$ ./multinode-demo/fullnode.sh --entry-stream /tmp/streamtap.sock
```

Start the API service:
```bash
$ yarn start:api
```

Start the Web UI:
```bash
$ PORT=9090 yarn start
```

Finally if desired for UI testing, from the main solana repository:
```bash
$ ./multinode-demo/client.sh --tx_count 40 --threads 2 -z 400
```

