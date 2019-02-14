# Working with Block Explorer

Part 1 - Configuring the Block Explorer Inbound Stream

* Ensure prerequisites are installed (Redis, NodeJS, Yarn):
* On Ubuntu, ```apt-get install redis-server```; On OS X, ```brew install redis```
* Install node.js via your favorite mechanism
* Install yarn (typically ```npm install -g yarn```)
* Run `yarn` in all block-explorer- subdirectories
* Run `./run.sh` in the block-explorer-inbound-service directory

Part 2 - Configuring Solana:

* Ensure that Solana has a version with EntryStream support
* Configure the leader fullnode with ```--entry-stream /tmp/streamtap.sock``` and ```--no-leader-rotation```
* Configure the client with throttling ```--tx_count 40```, ```--threads 2```, ```-z 400``` (if desired for UI testing)
* Setup the demo: ./multinode-demo/setup.sh ; ./multinode-demo/bootstrap-leader.sh ; ./multinode-demo/client.sh

Part 3 - Configuring the Web API & Web App

* Follow directions in README files
