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
  exit 1
}
trap cleanup SIGINT SIGTERM ERR

(
  set -x
  redis-cli ping
)

rm -f "$cwd"/solana-blockexplorer-{api,ui}.log

api=
ui=
while true; do
  if [[ -z $api ]] || ! kill -0 "$api"; then
    logfile="$cwd"/solana-blockexplorer-api.log
    echo "Starting api process (logfile: $logfile)"
    date >> "$logfile"
    npm run start-prod:api >> "$logfile" 2>&1 &
    api=$!
    echo "  pid: $api"
  fi

  if [[ -z $ui ]] || ! kill -0 "$ui"; then
    logfile="$cwd"/solana-blockexplorer-ui.log
    echo "Starting ui process (logfile: $logfile)"
    date >> "$logfile"
    npm run start-prod:ui >> "$logfile" 2>&1 &
    ui=$!
    echo "  pid: $ui"
  fi

  sleep 1
done
