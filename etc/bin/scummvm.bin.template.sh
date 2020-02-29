#!/bin/bash

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $root_dir

scummvm --path={{GAME_PATH}} --config={{CONF_PATH}} {{SCUMMVM_GAME_ID}}