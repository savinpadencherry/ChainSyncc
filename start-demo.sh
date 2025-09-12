#!/bin/bash

# ChainSync AI Logistics Dashboard - Demo Launcher
# This script will start the demo application and open it in your browser

echo "🚛 ChainSync AI Logistics Dashboard Demo Launcher"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo -e "${BLUE}📁 Project Directory: ${NC}$SCRIPT_DIR"
echo -e "${BLUE}🌐 Frontend Directory: ${NC}$FRONTEND_DIR"

# Check if we're in the right directory
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}❌ Error: Frontend directory not found at $FRONTEND_DIR${NC}"
    echo -e "${YELLOW}💡 Make sure you're running this script from the ChainSync project root${NC}"
    exit 1
fi

# Change to frontend directory
cd "$FRONTEND_DIR"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found in frontend directory${NC}"
    exit 1
fi

echo -e "${CYAN}🔍 Checking Node.js and npm...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo -e "${YELLOW}💡 Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    echo -e "${YELLOW}💡 Please install npm (usually comes with Node.js)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✅ npm version: $(npm --version)${NC}"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies (this may take a few minutes)...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

echo ""
echo -e "${CYAN}🚀 Starting ChainSync Demo...${NC}"
echo -e "${YELLOW}⏳ The application will open in your default browser${NC}"
echo -e "${YELLOW}📱 Demo will be available at: http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}🎯 Demo Features Ready:${NC}"
echo -e "   • Live logistics dashboard with vehicle tracking"
echo -e "   • AI-powered load planning optimization"
echo -e "   • Real-time traffic alert simulation"
echo -e "   • Route optimization with cost analysis"
echo -e "   • Interactive decision stream"
echo ""
echo -e "${GREEN}💡 Demo Tips:${NC}"
echo -e "   1. Start with the Live Map view for overview"
echo -e "   2. Navigate to Load Planner for cargo optimization"
echo -e "   3. Use 'Demo: Trigger Traffic Alert' button"
echo -e "   4. Click 'Optimize with AI' buttons to see results"
echo ""
echo -e "${CYAN}🔄 Starting development server...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the demo when finished${NC}"
echo ""

# Start the development server in background and capture PID
npm start &
SERVER_PID=$!

# Wait a moment for server to start
echo -e "${CYAN}⏳ Starting server...${NC}"
sleep 3

# Function to check if server is running
check_server() {
    curl -s http://localhost:3000 > /dev/null
    return $?
}

# Wait for server to be ready (max 30 seconds)
echo -e "${CYAN}🔍 Waiting for server to be ready...${NC}"
for i in {1..30}; do
    if check_server; then
        echo -e "${GREEN}✅ Server is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Server failed to start within 30 seconds${NC}"
        kill $SERVER_PID 2>/dev/null
        exit 1
    fi
    sleep 1
done

# Open browser automatically
echo -e "${GREEN}🌐 Opening demo in your browser...${NC}"
if command -v open &> /dev/null; then
    # macOS
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:3000
elif command -v start &> /dev/null; then
    # Windows (if running in WSL)
    start http://localhost:3000
else
    echo -e "${YELLOW}📱 Please manually open: http://localhost:3000${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Demo is now running!${NC}"
echo -e "${BLUE}🎯 Follow the demo script for best experience${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the demo when finished${NC}"

# Keep the script running and monitor the server
wait $SERVER_PID
