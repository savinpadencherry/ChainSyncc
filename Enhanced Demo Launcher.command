#!/bin/bash

# ChainSync Demo Launcher with Automated Features
# This script will start the app and optionally guide through the demo

# Set up colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

clear
echo -e "${CYAN}🚛 ChainSync AI Logistics Dashboard - Smart Demo Launcher${NC}"
echo -e "${CYAN}=============================================================${NC}"
echo ""

# Function to show animated progress
show_progress() {
    local duration=$1
    local message=$2
    local chars="⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"
    local i=0
    
    while [ $i -lt $duration ]; do
        printf "\r%s %s" "${chars:$((i % ${#chars})):1}" "$message"
        sleep 0.1
        ((i++))
    done
    printf "\r✅ %s\n" "$message"
}

# Check if we're in the right directory
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}❌ Error: Frontend directory not found at $FRONTEND_DIR${NC}"
    echo -e "${YELLOW}💡 Make sure this script is in the ChainSync project root${NC}"
    exit 1
fi

# Change to frontend directory
cd "$FRONTEND_DIR"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found in frontend directory${NC}"
    exit 1
fi

echo -e "${CYAN}🔍 Checking system requirements...${NC}"

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
    echo ""
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
echo -e "${PURPLE}🎯 Choose your demo mode:${NC}"
echo -e "${BLUE}  1) Manual Demo${NC} - Launch app and follow demo script manually"
echo -e "${BLUE}  2) Guided Demo${NC} - Launch app with step-by-step terminal guidance" 
echo -e "${BLUE}  3) Auto Demo${NC} - Launch app and auto-open demo features (coming soon)"
echo ""
read -p "Enter your choice (1-3) [Default: 1]: " demo_mode

# Default to manual demo if no choice made
demo_mode=${demo_mode:-1}

echo ""
echo -e "${CYAN}🚀 Starting ChainSync Demo...${NC}"

# Demo information
echo -e "${BLUE}🎯 Demo Features Available:${NC}"
echo -e "   • Live logistics dashboard with vehicle tracking"
echo -e "   • AI-powered load planning optimization"
echo -e "   • Real-time traffic alert simulation"
echo -e "   • Route optimization with cost analysis"
echo -e "   • Interactive decision stream"
echo ""

case $demo_mode in
    1)
        echo -e "${GREEN}📋 Manual Demo Mode Selected${NC}"
        echo -e "${YELLOW}💡 Demo Tips:${NC}"
        echo -e "   1. Start with the Live Map view for overview"
        echo -e "   2. Navigate to Load Planner for cargo optimization"
        echo -e "   3. Use 'Demo: Trigger Traffic Alert' button"
        echo -e "   4. Click 'Optimize with AI' buttons to see results"
        ;;
    2)
        echo -e "${GREEN}🎤 Guided Demo Mode Selected${NC}"
        echo -e "${YELLOW}💡 This terminal will provide step-by-step guidance${NC}"
        ;;
    3)
        echo -e "${GREEN}🤖 Auto Demo Mode Selected${NC}"
        echo -e "${YELLOW}💡 Automatic demo sequence will begin after startup${NC}"
        ;;
esac

echo ""
echo -e "${CYAN}🔄 Starting development server...${NC}"

# Start the development server in background
npm start &
SERVER_PID=$!

# Show progress while server starts
show_progress 30 "Initializing React development server"

# Function to check if server is running
check_server() {
    curl -s http://localhost:3000 > /dev/null 2>&1
    return $?
}

# Wait for server to be ready (max 60 seconds)
echo -e "${CYAN}🌐 Waiting for server to be ready...${NC}"
for i in {1..60}; do
    if check_server; then
        echo -e "${GREEN}✅ Server is ready at http://localhost:3000${NC}"
        break
    fi
    if [ $i -eq 60 ]; then
        echo -e "${RED}❌ Server failed to start within 60 seconds${NC}"
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
else
    echo -e "${YELLOW}📱 Please manually open: http://localhost:3000${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Demo is now running!${NC}"
echo -e "${YELLOW}📱 Demo URL: http://localhost:3000${NC}"
echo ""

# Demo mode specific instructions
case $demo_mode in
    1)
        echo -e "${BLUE}📖 Refer to your demo script for presentation guidance${NC}"
        echo -e "${YELLOW}⏱️  Total demo time: ~4.5 minutes${NC}"
        ;;
    2)
        echo ""
        echo -e "${PURPLE}🎤 GUIDED DEMO MODE ACTIVATED${NC}"
        echo -e "${CYAN}============================================${NC}"
        echo ""
        echo -e "${YELLOW}Ready to begin guided demo sequence...${NC}"
        echo ""
        read -p "Press Enter when the demo page has loaded and you're ready to start..."
        
        # Start guided demo sequence
        source "$SCRIPT_DIR/guided-demo-sequence.sh"
        ;;
    3)
        echo -e "${PURPLE}🤖 Auto Demo Mode (Coming Soon)${NC}"
        echo -e "${YELLOW}For now, use Manual or Guided mode${NC}"
        ;;
esac

echo ""
echo -e "${CYAN}🔧 Demo Controls:${NC}"
echo -e "   • Press ${YELLOW}Ctrl+C${NC} to stop the demo server"
echo -e "   • Browser refresh: ${YELLOW}Cmd+R${NC} (Mac) or ${YELLOW}Ctrl+R${NC} (PC)"
echo -e "   • Open dev tools: ${YELLOW}F12${NC} or ${YELLOW}Cmd+Option+I${NC}"
echo ""

# Keep the script running and monitor the server
wait $SERVER_PID
