#!/usr/bin/env bash
set -e


rootDir=$(
  cd "$(dirname "$0")";
  node -p '
    let p;
    try {
      p = require.resolve("@solana/blockexplorer");
    } catch (err) {
      p = require.resolve("../package.json");
    }
    require("path").dirname(p)
  '
)
cd "$rootDir"

node build/api/api.js &
api=$!

PORT=80 npx serve -s build &
ui=$!

abort() {
  kill "$api" "$ui"
}

trap abort SIGINT SIGTERM
wait "$ui"
kill "$api" "$ui"
