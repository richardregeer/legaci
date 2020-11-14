#!/bin/bash

GAME_PATH=$(dirname "$0")

cd $GAME_PATH
scummvm --path=$GAME_PATH --config=scummvm.legaci.ini {{SCUMMVM_GAME_ID}}
cd -