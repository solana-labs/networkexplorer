# BlockExplorer Inbound Stream: Service

This component is a Node.JS service that listens for events from
the Solana EntryStream class. It runs a main event loop listening to 
a TCP, UDP, and/or Unix Domain Socket and dispatches events to one
or more handlers (typically Redis for event aggregation and realtime
streaming).

Prerequisites:

* Ensure prerequisites are satisfied for handlers (Redis)
* NodeJS installed (latest tested version is v10.13.0)
* Yarn installed (for dependency management)

Setup:

* Ensure configuration is proper in config.js
* Run `yarn` from root directory
* Run `./run.sh` from root directory
