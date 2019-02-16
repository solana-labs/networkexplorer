[![Build status][travis-image]][travis-url]

[travis-image]: https://api.travis-ci.org/solana-labs/blockexplorer.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/blockexplorer

# Working with Block Explorer

Part 1 - Configuring the Block Explorer Inbound Stream

* Ensure prerequisites are installed (Redis, NodeJS, Yarn):
* On Ubuntu, ```apt-get install redis-server```; On OS X, ```brew install redis```
* Install node.js via your favorite mechanism
* Install yarn (typically ```npm install -g yarn```)
* Run `yarn` to install all node dependencies
* Start redis: `redis-server`
* Run `./inbound-stream.sh`

Part 2 - Configuring Solana:

* Ensure that Solana has a version with EntryStream support
* Configure the leader fullnode with ```--entry-stream /tmp/streamtap.sock``` and ```--no-leader-rotation```
* Configure the client with throttling ```--tx_count 40```, ```--threads 2```, ```-z 400``` (if desired for UI testing)
* Setup the demo: ./multinode-demo/setup.sh ; ./multinode-demo/bootstrap-leader.sh ; ./multinode-demo/client.sh

Part 3 - Configuring the Web API & Web App
* Follow directions below

# Block Explorer API Server

This component is a Node.JS server that implements
API handler methods to support the Block Explorer
Web UI.

Prerequisites:
* Redis/Inbound Stream Service running locally

# BlockExplorer Inbound Stream: Service

This component is a Node.JS service that listens for events from
the Solana EntryStream class. It runs a main event loop listening to
a TCP, UDP, and/or Unix Domain Socket and dispatches events to one
or more handlers (typically Redis for event aggregation and realtime
streaming).

# Block Explorer Web UI

Prerequisites

* Ensure Block Explorer API Server is running (typically on port 3000)
* Update src/EndpointConfig.js to point to the proper API server URL

Running Block Explorer Web UI

* Run `yarn` from directory to install dependencies
* Run `PORT=9090 yarn run start` to run webapp
* View app on `http://127.0.0.1:9090/`

