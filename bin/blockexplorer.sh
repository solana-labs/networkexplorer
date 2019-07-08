#!/usr/bin/env bash
set -e

cmd=${1:-all}
case $cmd in
ui)
  runUi=1
  runApi=0
  runProxy=0
  ;;
api)
  runUi=0
  runApi=1
  runProxy=1
  ;;
all)
  runUi=1
  runApi=1
  runProxy=1
  ;;
*)
  echo "Error: unknown command: $cmd"
  exit 1
  ;;
esac

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
  for pid in "$api" "$proxy" "$ui"; do
    [[ -z $pid ]] || kill "$pid"
  done
  exit 1
}
trap cleanup SIGINT SIGTERM ERR

if ((runApi)); then
  (
    set -x
    redis-cli ping
  )
fi

rm -f "$cwd"/solana-blockexplorer-{api,proxy,ui}.log

api=
proxy=
ui=
while true; do
  if ((runApi)); then
    if [[ -z $api ]] || ! kill -0 "$api"; then
      logfile="$cwd"/solana-blockexplorer-api.log
      echo "Starting api process (logfile: $logfile)"
      date | tee -a "$logfile"
      npm run start-prod:api >> "$logfile" 2>&1 &
      api=$!
      echo "  pid: $api"
    fi
  fi

  if ((runProxy)); then
    if [[ -z $proxy ]] || ! kill -0 "$proxy"; then
      logfile="$cwd"/solana-blockexplorer-proxy.log
      echo "Starting proxy process (logfile: $logfile)"
      date | tee -a "$logfile"
      npm run start-prod:proxy >> "$logfile" 2>&1 &
      proxy=$!
      echo "  pid: $proxy"
    fi
  fi

  if ((runUi)); then
    if [[ -z $ui ]] || ! kill -0 "$ui"; then
      logfile="$cwd"/solana-blockexplorer-ui.log
      echo "Starting ui process (logfile: $logfile)"
      date | tee -a "$logfile"
      npm run start-prod:ui >> "$logfile" 2>&1 &
      ui=$!
      echo "  pid: $ui"
    fi
  fi

  sleep 1
done
