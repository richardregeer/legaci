#!/bin/bash

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $root_dir

dosbox {{CONF_PATH}} {{RUN_CONF_PATH}}