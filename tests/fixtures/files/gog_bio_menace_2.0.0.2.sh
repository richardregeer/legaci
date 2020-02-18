#!/bin/sh
# 
# This is an executable installer
# and it has to be run like any other executable file:
# 
# Add executable permissions with:
# chmod +x installer-file.sh
# 
# Then run it like this:
# ./installer-file.sh
# 
# This script was generated using Makeself 2.2.0
# with modifications for mojosetup and GOG.com installer.

umask 077

CRCsum="3040545311"
MD5="bc2c9548ba8c20b158fe9b731a590cd0"
TMPROOT=${TMPDIR:=/tmp}

label="Bio Menace (GOG.com)"
script="./startmojo.sh"
scriptargs=""
licensetxt=""
targetdir="binaries"
filesizes="803366"
keep="n"
quiet="n"

# save off this scripts path so the installer can find it
export MAKESELF_SHAR="$( cd "$(dirname "$0")" && pwd)/$(basename "$0")"

print_cmd_arg=""
if type printf > /dev/null; then
    print_cmd="printf"
elif test -x /usr/ucb/echo; then
    print_cmd="/usr/ucb/echo"
else
    print_cmd="echo"
fi

# And more in the real file from GOG.com