#!/bin/bash

GAME_PATH=$(dirname "$0")
COMMAND='-conf dosbox.legaci.conf -conf dosbox.legaci.run.conf -exit'

cd $GAME_PATH

if which dosbox ; then
    dosbox $GAME_PATH $COMMAND
elif which flatpak ; then
    if flatpak list | grep io.github.dosbox-staging ; then
        flatpak run io.github.dosbox-staging $GAME_PATH $COMMAND
    elif flatpak list | grep com.dosbox.DOSBox; then
        flatpak run com.dosbox.DOSBox $GAME_PATH $COMMAND
    elif flatpak list | grep com.dosbox_x.DOSBox-X ; then
        flatpak run com.dosbox_x.DOSBox-X $GAME_PATH $COMMAND
    fi
elif which snap ; then
    if snap list | grep dosbox-staging ; then
        snap run dosbox-staging $GAME_PATH $COMMAND
    elif snap list | grep dosbox-x ; then
        snap run dosbox-x $GAME_PATH $COMMAND
    fi
else
    echo 'Unable to start Dosbox, Dosbox not found on the system'
fi

cd -