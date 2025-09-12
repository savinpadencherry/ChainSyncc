# ChainSync Demo Launcher

Quick start scripts to launch the ChainSync AI Logistics Dashboard demo.

## 🚀 Quick Start

### For macOS/Linux:
```bash
./start-demo.sh
```

### For Windows:
```batch
start-demo.bat
```

## 📋 What the Script Does

1. **Environment Check**: Verifies Node.js and npm are installed
2. **Dependency Management**: Installs npm packages if needed (first run only)
3. **Server Startup**: Launches the React development server
4. **Browser Launch**: Opens the demo at `http://localhost:3000`

## 🎯 Demo Flow

The script will start your ChainSync demo with these features ready:

- **Live Dashboard**: Real-time vehicle tracking and metrics
- **Load Planner**: AI-powered cargo optimization
- **Traffic Alerts**: Simulated real-time traffic disruptions
- **Route Optimization**: Cost-benefit analysis for route changes
- **Decision Stream**: AI decision logging and analytics

## 🛠 Requirements

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 📱 Demo URL

Once started, the demo will be available at:
**http://localhost:3000**

## 🔧 Troubleshooting

### If the script fails to start:
1. Ensure you're in the ChainSync project directory
2. Check that Node.js is installed: `node --version`
3. Try manual installation: `cd frontend && npm install`
4. Restart the script

### If port 3000 is busy:
The React development server will automatically find the next available port (3001, 3002, etc.)

### Browser doesn't open automatically:
Manually navigate to `http://localhost:3000` in your browser

## 🎬 Demo Tips

1. **Start with Live Map**: Shows overall system overview
2. **Navigate to Load Planner**: Demonstrates AI cargo optimization
3. **Trigger Traffic Alert**: Use the demo button in Decision Stream
4. **Run Route Optimization**: Click "Optimize Route with AI"
5. **Observe Metrics**: Watch real-time cost savings and efficiency gains

## 🏁 Stopping the Demo

Press `Ctrl+C` in the terminal window to stop the development server.

---

**Ready to demonstrate the future of AI-powered logistics management!** 🚛✨
