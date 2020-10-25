#!/bin/bash

GAME_PATH=$(dirname "$0")

cd $GAME_PATH
dosbox $GAME_PATH -conf dosbox.legaci.conf -exit
cd -