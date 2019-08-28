#!/bin/bash

WINEPREFIX=~/tmp/tyrian WINEDLLOVERRIDES=winemenubuilder.exe=d \
    wine ~/Downloads/GOG.com/setup_tyrian_2000_3.0_\(28045\).exe \
    /NOGUI /SUPPRESSMSGBOXES /SILENT /DIR=C:\\game > /dev/null 2>&1

mv ~/tmp/tyrian/drive_c/game/* ~/tmp/tyrian/
rm -rf ~/tmp/tyrian/drive_c/
rm -rf ~/tmp/tyrian/dosdevices

dosbox ~/tmp/tyrian/tyrian.exe -conf ~/tmp/tyrian/dosboxT2K.conf
dosbox -c ~/tmp/tyrian-test-3/legaci.conf -conf ~/tmp/tyrian-test-3/legaci-start.conf