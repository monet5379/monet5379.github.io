@echo off
setlocal
cd /d "%~dp0"
title monet5379 jekyll serve
echo Working directory: %CD%
echo Keep this window open. Stop with Ctrl+C.
echo.

where ruby >nul 2>&1
if errorlevel 1 (
  echo ERROR: ruby not found. Add Ruby to User PATH, then try again.
  goto fail
)
where bundle >nul 2>&1
if errorlevel 1 (
  echo ERROR: bundle not found. Install Bundler, then try again.
  goto fail
)

REM bundle is bundle.bat — must use CALL or this window exits
call bundle check >nul 2>&1
if errorlevel 1 (
  echo Installing gems...
  call bundle install
  if errorlevel 1 (
    echo ERROR: bundle install failed.
    goto fail
  )
)

echo Starting http://127.0.0.1:4000/
echo Browser will open in a few seconds.
echo.
start /b cmd /c "ping -n 9 127.0.0.1 >nul & start http://127.0.0.1:4000/"
call bundle exec jekyll serve --host 127.0.0.1 --port 4000
echo.
echo Server stopped.
pause
exit /b 0

:fail
echo.
pause
exit /b 1
