#!/usr/bin/env bash
set -e

rootDir=$(
  cd "$(dirname "$0")";
  node -p '
    let p = [
      "../lib/node_modules/@solana/blockexplorer/package.json",
      "../@solana/blockexplorer/package.json",
      "../package.json"
    ].find(require("fs").existsSync);
    if (!p) throw new Error("Unable to locate blockexplorer directory");
    require("path").dirname(p)
  '
)
cd "$rootDir"

if [[ ! -d build || ! -f build/api/api.js ]]; then
  echo "Error: build/ artifacts missing"
  exit 1
fi

cleanup() {
  set +e
  for pid in "$api" "$ui"; do
    [[ -z $pid ]] || kill "$pid"
  done
}
trap cleanup SIGINT SIGTERM

set -x
redis-cli ping

node build/api/api.js &
api=$!

PORT=80 npx serve -s build &
ui=$!

wait "$ui"
ui=
cleanup
