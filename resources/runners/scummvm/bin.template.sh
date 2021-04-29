#!/bin/bash

GAME_PATH=$(dirname "$0")
COMMAND='--config=scummvm.legaci.ini {{SCUMMVM_GAME_ID}}'

cd $GAME_PATH

if which scummvm ; then
    scummvm --path=$GAME_PATH $COMMAND
elif which flatpak ; then
    if flatpak list | grep org.scummvm.ScummVM ; then
        flatpak run org.scummvm.ScummVM --path=$GAME_PATH $COMMAND
    else
        echo 'Unable to find a ScummVM flatpak on the system'
    fi
elif which snap ; then
    if snap list | grep scummvm ; then
        snap run scummvm --path=$GAME_PATH $COMMAND
    else
        echo 'Unable to find a ScummVM snap on the system'
    fi
else
    echo 'Unable to start ScummVM, ScummVM not found on the system'
fi

cd -