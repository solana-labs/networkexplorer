#!/usr/bin/env bash
set -e

# populate (strawman) node info
NODE_INFO="{\"host\":\""$(hostname)"\",\"info\":"$(curl -q -s ifconfig.co/json)"}"
export NODE_INFO

set -x
redis-cli ping
rm -f /tmp/streamtap.sock
yarn run babel-node --presets env index.js
