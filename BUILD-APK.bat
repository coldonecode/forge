@echo off
title Forge - Build Phone App (APK)
cd /d "%~dp0"

set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"

echo.
echo   1/3  Building web app...
echo.
call npm run build
if errorlevel 1 goto :fail

echo.
echo   2/3  Copying into Android project...
echo.
call npx cap sync android
if errorlevel 1 goto :fail

echo.
echo   3/3  Building APK (2-4 minutes)...
echo.
cd android
call gradlew.bat assembleDebug --no-daemon
if errorlevel 1 goto :fail

copy /y "app\build\outputs\apk\debug\app-debug.apk" "%USERPROFILE%\Desktop\Forge.apk" >nul

echo.
echo  ============================================
echo    DONE!  Forge.apk is on your Desktop.
echo    Send it to your phone and install it.
echo  ============================================
pause
exit /b 0

:fail
echo.
echo   Build failed - check the errors above.
pause
