#!/usr/bin/env bash
set -ex
redis-cli ping
yarn run babel-node --presets env src/api.js
