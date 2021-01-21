#!/bin/bash

GAME_PATH=$(dirname "$0")

cd $GAME_PATH
dosbox $GAME_PATH/tyrian.exe -conf dosbox.legaci.conf -exit
cd -