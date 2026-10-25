@echo off
set CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe
set PROFILE=%USERPROFILE%\chrome-debug-profile
set PORT=9222

curl -sS --max-time 2 "http://127.0.0.1:%PORT%/json/version" >nul 2>&1
if %ERRORLEVEL%==0 (
  echo 调试 Chrome 已在运行: http://127.0.0.1:%PORT%/json/version
  exit /b 0
)

if not exist "%CHROME%" (
  echo 找不到 Chrome: %CHROME%
  exit /b 1
)

if not exist "%PROFILE%" mkdir "%PROFILE%"
start "" "%CHROME%" --remote-debugging-port=%PORT% --remote-allow-origins=* --user-data-dir="%PROFILE%"
echo 已启动调试 Chrome: http://127.0.0.1:%PORT%/json/version
