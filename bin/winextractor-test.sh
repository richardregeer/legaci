Xvfb :0 -screen 0 1024x768x16 &

sleep 2
WINEPREFIX=/root/tyrian WINEDLLOVERRIDES=winemenubuilder.exe=d wine "/development/assets/setup_tyrian.exe" /NOGUI /SUPPRESSMSGBOXES /SILENT /DIR=C:\\game

sleep 2
DISPLAY=:0.0 WINEPREFIX=/root/tyrian WINEDLLOVERRIDES=winemenubuilder.exe=d wine "/development/assets/setup_tyrian.exe" /NOGUI /SUPPRESSMSGBOXES /SILENT /DIR=C:\\game

ls /root/tyrian/drive_c/game