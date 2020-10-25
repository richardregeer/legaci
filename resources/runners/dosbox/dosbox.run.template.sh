#!/bin/bash

GAME_PATH=$1
GAME_PATH=$(dirname "$0")

if [ -z "$1" ]; then
   
    echo No path given using path $GAME_PATH
fi

dosbox  $GAME_PATH/bin/RTetris.exe -conf $GAME_PATH/{{CONF_PATH}} -exit