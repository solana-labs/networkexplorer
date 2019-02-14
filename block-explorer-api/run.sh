#!/bin/bash

# populate (strawman) node info
NODE_INFO="{\"host\":\""$(hostname)"\",\"info\":"$(curl -q -s ifconfig.co/json)"}"
export NODE_INFO

yarn run babel-node --presets env index.js
