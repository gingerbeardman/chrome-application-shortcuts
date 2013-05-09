#!/bin/bash

echo "FILE"
find -d . -type f | egrep -v "git|Twitter\.sh|Info\.plist|MacOS|databases|Extensions|Extension Rules|Extension State|Local Extension Settings|Managed Mode Settings|Preferences|README|TransportSecurity|Custom\.css|icon\.icns|\.zip|\.sh|\.DS\_Store|Databases\.db|Databases\.db\-journal|chrome\-extension\_*|chrome\-extension\_*\.localstorage" | xargs -I{} rm -v {}
echo "DIR"
find -d . -type d | egrep -v "git|MacOS|PepperFlash|databases|Default|Extensions|Extension Rules|Extension State|Local Extension Settings|User StyleSheets|chrome\-extension\_*|chrome\-extension\_*\.localstorage|https\_getadblock\.com\_0|https\_twitter\.com\_0" | xargs -I{} rmdir {}
echo "DB"
find -d *.app/Contents/Profile/Default/databases/* -type d | egrep -v "chrome\-extension\_*|chrome\-extension\_*\.localstorage|https\_getadblock\.com\_0" | xargs -I{} rm -rfv {}
echo "OTHER"
rm -rfv *.app/Contents/Profile/Dictionaries
rm -rfv *.app/Contents/Profile/Temp
rm -rfv *.app/Contents/Profile/Default/Application\ Cache
rm -rfv *.app/Contents/Profile/Default/File\ System
rm -rfv *.app/Contents/Profile/Default/IndexedDB
rm -rfv *.app/Contents/Profile/Default/Managed\ Extension\ Settings
rm -rfv *.app/Contents/Profile/Default/Pepper\ Data
rm -rfv *.app/Contents/Profile/Default/Session\ Storage
rm -rfv *.app/Contents/Profile/Default/Sync\ Extension\ Settings
