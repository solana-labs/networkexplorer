#!/usr/bin/env bash
set -e

cwd=$PWD

rootDir=$(
  cd "$(dirname "$0")";
  node -p '
    try {
      let package_json = [
        "../lib/node_modules/@solana/blockexplorer/package.json",
        "../@solana/blockexplorer/package.json",
        "../package.json"
      ].find(require("fs").existsSync);

      assert(
        require(package_json)["name"] === "@solana/blockexplorer",
        "Invalid package name in " + package_json
      );

      const path = require("path");
      path.resolve(path.dirname(package_json))
    } catch (err) {
      throw new Error("Unable to locate blockexplorer directory: " + String(err));
    }
  '
)
cd "$rootDir"

if [[ ! -d build || ! -f build/api/api.js ]]; then
  echo "Error: build/ artifacts missing.  Run |yarn run build| to create them"
  exit 1
fi

cleanup() {
  set +e
  for pid in "$api" "$ui"; do
    [[ -z $pid ]] || kill "$pid"
  done
}
trap cleanup SIGINT SIGTERM ERR

set -x
redis-cli ping

node build/api/api.js 2>&1 | tee "$cwd"/solana-blockexplorer-api.log &
api=$!

npm run serve:ui 2>&1 | tee "$cwd"/solana-blockexplorer-ui.log &
ui=$!

wait "$ui"
ui=
cleanup
