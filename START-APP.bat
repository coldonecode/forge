@echo off
title Forge Gym App - Server
cd /d "%~dp0"

echo.
echo   Building the app (a few seconds)...
echo.
call npm run build

echo.
echo  ============================================================
echo    SERVER IS RUNNING!
echo.
echo    On your PHONE, open this address in Chrome:
echo        https://192.168.100.14:4173
echo.
echo    On THIS computer:
echo        https://localhost:4173
echo.
echo    KEEP THIS WINDOW OPEN while you use the app.
echo    (You can minimize it, just don't close it.)
echo  ============================================================
echo.

call npm run preview -- --host

pause
