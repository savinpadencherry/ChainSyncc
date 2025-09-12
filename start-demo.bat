@echo off
REM ChainSync AI Logistics Dashboard - Demo Launcher (Windows)
REM This script will start the demo application and open it in your browser

echo.
echo 🚛 ChainSync AI Logistics Dashboard Demo Launcher
echo ==================================================

REM Get the script directory
set SCRIPT_DIR=%~dp0
set FRONTEND_DIR=%SCRIPT_DIR%frontend

echo 📁 Project Directory: %SCRIPT_DIR%
echo 🌐 Frontend Directory: %FRONTEND_DIR%

REM Check if we're in the right directory
if not exist "%FRONTEND_DIR%" (
    echo ❌ Error: Frontend directory not found at %FRONTEND_DIR%
    echo 💡 Make sure you're running this script from the ChainSync project root
    pause
    exit /b 1
)

REM Change to frontend directory
cd /d "%FRONTEND_DIR%"

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: package.json not found in frontend directory
    pause
    exit /b 1
)

echo 🔍 Checking Node.js and npm...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo 💡 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    echo 💡 Please install npm (usually comes with Node.js)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo 📦 Installing dependencies (this may take a few minutes)...
    npm install
    
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
) else (
    echo ✅ Dependencies already installed
)

echo.
echo 🚀 Starting ChainSync Demo...
echo ⏳ The application will open in your default browser
echo 📱 Demo will be available at: http://localhost:3000
echo.
echo 🎯 Demo Features Ready:
echo    • Live logistics dashboard with vehicle tracking
echo    • AI-powered load planning optimization
echo    • Real-time traffic alert simulation
echo    • Route optimization with cost analysis
echo    • Interactive decision stream
echo.
echo 💡 Demo Tips:
echo    1. Start with the Live Map view for overview
echo    2. Navigate to Load Planner for cargo optimization
echo    3. Use 'Demo: Trigger Traffic Alert' button
echo    4. Click 'Optimize with AI' buttons to see results
echo.
echo 🔄 Starting development server...
echo Press Ctrl+C to stop the demo when finished
echo.

REM Start the development server
npm start

REM If npm start fails
if %errorlevel% neq 0 (
    echo ❌ Failed to start the development server
    echo 💡 Try running 'npm install' manually in the frontend directory
    pause
    exit /b 1
)

pause
