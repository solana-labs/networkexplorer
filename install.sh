#!/usr/bin/env bash
set -e

for package in */package.json; do
  (
    dir=$(dirname "$package")
    set -x
    cd "$dir"
    yarn
  )
done
