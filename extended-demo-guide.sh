#!/bin/bash

# Extended Demo Guide for ChainSync - 5-10 Minutes Presentation
# This script provides comprehensive step-by-step guidance through the extended demo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
WHITE='\033[1;37m'
NC='\033[0m'

# Function to wait for user confirmation
wait_for_user() {
    echo ""
    echo -e "${CYAN}👆 $1${NC}"
    read -p "Press Enter when ready to continue..."
    echo ""
}

# Function to show demo step
show_step() {
    local step_num=$1
    local title=$2
    local duration=$3
    
    echo ""
    echo -e "${PURPLE}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC} ${YELLOW}📍 STEP $step_num: $title${NC}"
    echo -e "${PURPLE}║${NC} ${CYAN}⏱️  Estimated Time: $duration${NC}"
    echo -e "${PURPLE}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Function to show what to say
show_talking_points() {
    echo -e "${GREEN}💬 TALKING POINTS:${NC}"
    while IFS= read -r line; do
        echo -e "${WHITE}   • $line${NC}"
    done
}

# Function to show actions
show_actions() {
    echo -e "${CYAN}🎯 ACTIONS TO TAKE:${NC}"
    while IFS= read -r line; do
        echo -e "${YELLOW}   → $line${NC}"
    done
}

# Function to show key highlights
show_highlights() {
    echo -e "${RED}🔥 KEY HIGHLIGHTS TO EMPHASIZE:${NC}"
    while IFS= read -r line; do
        echo -e "${PURPLE}   ★ $line${NC}"
    done
}

clear
echo -e "${PURPLE}"
echo "╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                           ║"
echo "║   🚛  CHAINSYNC EXTENDED DEMO GUIDE  🚛                                   ║"
echo "║   ─────────────────────────────────────────                               ║"
echo "║   Duration: 5-10 Minutes | 7 Comprehensive Scenarios                      ║"
echo "║                                                                           ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${GREEN}This guide will walk you through a comprehensive 5-10 minute demo${NC}"
echo -e "${GREEN}showcasing ChainSync's AI-powered logistics management capabilities.${NC}"
echo ""

# Check if server is running
check_server() {
    curl -s http://localhost:3000 > /dev/null
    return $?
}

if check_server; then
    echo -e "${GREEN}✅ ChainSync server is already running!${NC}"
else
    echo -e "${YELLOW}🚀 Starting ChainSync server...${NC}"
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    FRONTEND_DIR="$SCRIPT_DIR/frontend"
    
    cd "$FRONTEND_DIR"
    
    # Start server in background, redirect output to avoid messing up the guide
    npm start > /dev/null 2>&1 &
    SERVER_PID=$!
    
    echo -e "${CYAN}⏳ Waiting for server to be ready...${NC}"
    
    # Wait for server to be ready (max 60 seconds)
    for i in {1..60}; do
        if check_server; then
            echo -e "${GREEN}✅ Server is ready!${NC}"
            break
        fi
        if [ $i -eq 60 ]; then
            echo -e "${RED}❌ Server failed to start within 60 seconds${NC}"
            echo -e "${YELLOW}💡 Try running ./start-demo.sh first${NC}"
            exit 1
        fi
        sleep 1
    done
    
    # Open browser automatically
    if command -v open &> /dev/null; then
        open http://localhost:3000
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    fi
fi

echo -e "${YELLOW}📋 DEMO OVERVIEW:${NC}"
echo -e "${WHITE}   1. Dashboard Introduction (1 min)${NC}"
echo -e "${WHITE}   2. Load Planner AI Optimization (1.5 min)${NC}"
echo -e "${WHITE}   3. Traffic Congestion Scenario (1 min)${NC}"
echo -e "${WHITE}   4. Weather Alert Scenario (1 min)${NC}"
echo -e "${WHITE}   5. Vehicle Breakdown & Cargo Transfer (1 min)${NC}"
echo -e "${WHITE}   6. Fuel Price Optimization (45 sec)${NC}"
echo -e "${WHITE}   7. SLA & Driver Safety Scenarios (1.5 min)${NC}"
echo -e "${WHITE}   8. ROI Summary & Closing (1 min)${NC}"
echo ""

wait_for_user "Make sure ChainSync dashboard is loaded at http://localhost:3000"

# ═══════════════════════════════════════════════════════════════
# STEP 1: Dashboard Introduction
# ═══════════════════════════════════════════════════════════════
show_step "1" "Dashboard Introduction & Overview" "1 minute"

show_talking_points << 'EOF'
Welcome to ChainSync - India's most advanced AI-powered logistics management platform
This real-time dashboard monitors our entire fleet across major Indian cities
Our AI operates 24/7, continuously analyzing traffic, weather, fuel prices, and delivery schedules
Notice the live metrics: 10 vehicles in our fleet, 94% on-time delivery rate
Today alone, AI has already saved ₹8,240 through intelligent optimization
Each decision the AI makes is logged and auditable - full transparency
EOF

show_actions << 'EOF'
Point to the live map showing vehicle positions across India
Highlight TopBar metrics (vehicles, delivery rate, savings)
Point to the Event Log panel (bottom right) - this is where AI decisions appear
Show the live indicators and real-time updates
EOF

show_highlights << 'EOF'
Real-time visibility across the entire fleet
AI makes decisions automatically - not just suggestions
Every rupee saved is tracked and reported
EOF

wait_for_user "Complete dashboard overview, then navigate to Load Planner"

# ═══════════════════════════════════════════════════════════════
# STEP 2: Load Planner AI Optimization
# ═══════════════════════════════════════════════════════════════
show_step "2" "Load Planner - AI Cargo Optimization" "1.5 minutes"

show_talking_points << 'EOF'
Let's see how our AI optimizes cargo loading - a critical cost factor
Here we have 6 cargo items waiting to be loaded onto our Heavy Duty Truck
Notice the variety: Electronics (fragile), Steel Components (heavy), Medical Supplies (priority)
Each item has different handling requirements - weight, fragility, priority
The AI considers all these factors simultaneously
Traditional loading relies on driver experience - inconsistent and error-prone
Watch what happens when we let AI analyze this...
EOF

show_actions << 'EOF'
Click "Load Planner" in the sidebar
Point to the cargo items list - explain each item's characteristics
Highlight fragile items (red), high-priority (orange), heavy items
Point to the empty truck bed
Click "Optimize with AI" button
EOF

echo ""
echo -e "${BLUE}[After clicking Optimize with AI - during loading animation]:${NC}"
show_talking_points << 'EOF'
The AI is now analyzing multiple factors simultaneously:
- Weight distribution for vehicle stability
- Fragile item placement for damage prevention
- Priority sequencing for delivery efficiency
- Space utilization for maximum capacity
This takes 2 seconds for AI vs 15-20 minutes for manual planning
EOF

echo ""
echo -e "${BLUE}[After optimization completes]:${NC}"
show_talking_points << 'EOF'
Look at the results - heavy items at the bottom for stability
Fragile items secured in protected positions
Route optimized using Nearest Neighbor algorithm
We've saved 27km distance, 32 minutes time, and ₹2,565 in costs
This optimization happens for EVERY load, EVERY truck, EVERY day
EOF

show_highlights << 'EOF'
87% space utilization - 23% improvement over manual loading
32 minutes saved per load = significant labor cost reduction
Consistent, error-free loading every single time
EOF

wait_for_user "Complete Load Planner demo, return to Live Map for scenarios"

# ═══════════════════════════════════════════════════════════════
# STEP 3: Traffic Congestion Scenario
# ═══════════════════════════════════════════════════════════════
show_step "3" "Scenario 1: Traffic Congestion Alert" "1 minute"

show_talking_points << 'EOF'
Now let's see how ChainSync handles real-world disruptions
I'll trigger a traffic scenario - in production, these come from live GPS and traffic APIs
This simulates what happens dozens of times daily in logistics operations
EOF

show_actions << 'EOF'
Click "Live Map" in sidebar to return to dashboard
Locate the Event Log panel (bottom right)
Click "Next Issue" button to trigger traffic scenario
Watch the alert appear in real-time
EOF

echo ""
echo -e "${BLUE}[After traffic alert appears]:${NC}"
show_talking_points << 'EOF'
Alert: Heavy traffic congestion on NH-48 Mumbai-Pune Highway
3 vehicles affected, 45-minute estimated delay
In traditional logistics, this information might not reach operations for hours
Our AI detected this instantly and is already calculating solutions
Notice the "Resolve with AI" button - let's see what the AI recommends
EOF

show_actions << 'EOF'
Click "Resolve with AI" button
Wait for AI analysis (2-3 seconds)
Point to the resolution details as they appear
EOF

echo ""
echo -e "${BLUE}[After AI resolution]:${NC}"
show_talking_points << 'EOF'
AI has rerouted to Mumbai-Pune Expressway - avoiding the congestion zone
30 minutes saved from the estimated delay
Additional fuel cost: ₹350 for the detour
But time value saved: ₹2,400 (at ₹80/minute for commercial delivery)
Net benefit: Over ₹2,000 saved from this single decision
The AI also notes: fragile cargo onboard - chose smoother expressway route
EOF

show_highlights << 'EOF'
Instant detection and response - seconds, not hours
Cost-benefit analysis built into every decision
Cargo-aware routing - AI considers what's being transported
EOF

wait_for_user "Trigger next scenario: Weather Alert"

# ═══════════════════════════════════════════════════════════════
# STEP 4: Weather Alert Scenario
# ═══════════════════════════════════════════════════════════════
show_step "4" "Scenario 2: Weather Alert & Safety" "1 minute"

show_talking_points << 'EOF'
Weather is unpredictable, but our response doesn't have to be
Let's trigger a weather scenario
EOF

show_actions << 'EOF'
Click "Next Issue" button (or select "Weather Alert" from dropdown)
Watch the weather alert appear
EOF

echo ""
echo -e "${BLUE}[After weather alert appears]:${NC}"
show_talking_points << 'EOF'
Heavy rainfall warning on NH-44 near Krishnagiri
This affects 2 vehicles carrying fragile cargo - Glassware and Electronics
35-minute estimated delay if they proceed
But more importantly - safety risk for drivers and cargo damage risk
EOF

show_actions << 'EOF'
Click "Resolve with AI" to see the recommendation
EOF

echo ""
echo -e "${BLUE}[After AI resolution]:${NC}"
show_talking_points << 'EOF'
AI recommendation: Delay departure by 2 hours OR reroute via Salem bypass
Notice the AI recommends DELAY - not just fastest option
Why? Because glassware and electronics onboard - rain poses damage risk
Estimated prevention value: ₹1,800 (cargo safety + accident prevention)
The AI weighs SAFETY alongside speed and cost
This is where AI truly differentiates from rule-based systems
EOF

show_highlights << 'EOF'
Safety-first decision making - not just cost optimization
Cargo-specific recommendations based on what's being transported
Weather integration provides proactive warnings, not reactive responses
EOF

wait_for_user "Trigger next scenario: Vehicle Breakdown"

# ═══════════════════════════════════════════════════════════════
# STEP 5: Vehicle Breakdown Scenario
# ═══════════════════════════════════════════════════════════════
show_step "5" "Scenario 3: Vehicle Breakdown & Cargo Transfer" "1 minute"

show_talking_points << 'EOF'
Vehicle breakdowns are inevitable - the question is how fast you respond
This is where AI-powered logistics truly shines
EOF

show_actions << 'EOF'
Click "Next Issue" button to trigger breakdown scenario
Watch the critical alert appear
EOF

echo ""
echo -e "${BLUE}[After breakdown alert appears]:${NC}"
show_talking_points << 'EOF'
CRITICAL: TRK-006 engine overheating detected near Chitradurga
This is a real IoT sensor alert - predictive maintenance in action
The truck MUST stop immediately to prevent engine damage
But there's high-priority medical supplies onboard for Chennai Port
Traditional response: Panic, phone calls, delays, angry customers
EOF

show_actions << 'EOF'
Click "Resolve with AI" for the intelligent response
EOF

echo ""
echo -e "${BLUE}[After AI resolution]:${NC}"
show_talking_points << 'EOF'
AI has already:
1. Located nearest service center: Chitradurga Auto Works - 8 km ahead
2. Identified backup vehicle: TRK-004 is 45 km away, can receive cargo transfer
3. Calculated that cargo transfer saves 60 minutes vs waiting for full repair
4. Cost: ₹2,400 for transfer and emergency service
5. Benefit: ₹4,200 customer penalty avoided - net savings ₹1,800
The medical supplies WILL reach Chennai Port on time
EOF

show_highlights << 'EOF'
Predictive IoT integration detects problems BEFORE they strand drivers
Automatic identification of backup resources
Customer SLA protection built into the algorithm
EOF

wait_for_user "Trigger next scenario: Fuel Price Optimization"

# ═══════════════════════════════════════════════════════════════
# STEP 6: Fuel Price Optimization
# ═══════════════════════════════════════════════════════════════
show_step "6" "Scenario 4: Fuel Price Spike Alert" "45 seconds"

show_talking_points << 'EOF'
Fuel is typically 60-65% of logistics operating costs
Even small savings compound significantly across a fleet
EOF

show_actions << 'EOF'
Click "Next Issue" to trigger fuel alert
EOF

echo ""
echo -e "${BLUE}[After fuel alert appears]:${NC}"
show_talking_points << 'EOF'
Fuel prices just increased by ₹3.50/L at upcoming stations
4 vehicles need refueling within the next 50 km
That's an extra ₹1,330 in fuel costs if we don't act
EOF

show_actions << 'EOF'
Click "Resolve with AI"
EOF

echo ""
echo -e "${BLUE}[After AI resolution]:${NC}"
show_talking_points << 'EOF'
AI redirects to partner fuel station at Hubli depot
Partner rate: ₹94.50/L vs market rate: ₹98/L
Total savings: ₹1,330 on 380 liters
Minor route deviation: 12 km - completely worth it
This happens automatically, every time fuel prices fluctuate
EOF

show_highlights << 'EOF'
Real-time fuel price monitoring across regions
Partner network integration for best rates
Small savings × many vehicles × every day = massive annual impact
EOF

wait_for_user "Continue to SLA and Driver Safety scenarios"

# ═══════════════════════════════════════════════════════════════
# STEP 7: SLA & Driver Safety Scenarios
# ═══════════════════════════════════════════════════════════════
show_step "7" "Scenarios 5-6: SLA Breach Prevention & Driver Safety" "1.5 minutes"

show_talking_points << 'EOF'
Two more critical scenarios that showcase ChainSync's intelligence
First: SLA breach prevention - protecting customer relationships
Second: Driver fatigue monitoring - protecting your most valuable asset
EOF

show_actions << 'EOF'
Click "Next Issue" to trigger SLA warning
EOF

echo ""
echo -e "${BLUE}[After SLA breach warning appears]:${NC}"
show_talking_points << 'EOF'
TRK-003 ETA is 5:45 PM - customer delivery window closes at 6:00 PM
Only 15 minutes buffer - high risk of SLA breach
SLA penalty for this customer: ₹5,500
The furniture delivery is fragile and cannot be rushed unsafely
EOF

show_actions << 'EOF'
Click "Resolve with AI"
EOF

echo ""
echo -e "${BLUE}[After AI resolution]:${NC}"
show_talking_points << 'EOF'
AI solution: Skip low-priority Gurugram stop, go directly to Noida
Gurugram delivery rescheduled to TRK-008 arriving tomorrow
New ETA: 5:10 PM - 50 minutes buffer, comfortable delivery
Cost: ₹0 - just stop resequencing
Benefit: ₹5,500 SLA penalty avoided + customer retention value
This is proactive problem-solving, not reactive firefighting
EOF

show_actions << 'EOF'
Click "Next Issue" for driver fatigue alert
EOF

echo ""
echo -e "${BLUE}[After driver fatigue alert appears]:${NC}"
show_talking_points << 'EOF'
Driver Kiran Kumar has been driving 7.5 hours continuously
Safety regulations require 30-minute break after 8 hours
But more importantly - fatigue is the #1 cause of commercial vehicle accidents
EOF

show_actions << 'EOF'
Click "Resolve with AI"
EOF

echo ""
echo -e "${BLUE}[After AI resolution]:${NC}"
show_talking_points << 'EOF'
AI mandates: 30-minute rest stop at Anantapur Rest Area, 3 km ahead
Customer automatically notified of the minor delay
Safety compliance maintained - accident prevention value: ₹50,000+
This isn't just about regulations - it's about caring for your drivers
Happy, rested drivers = better service = lower turnover = higher profits
EOF

show_highlights << 'EOF'
Proactive SLA management prevents customer issues before they happen
Driver safety monitoring protects your team and your reputation
Automatic customer communication reduces support burden
EOF

wait_for_user "Proceed to ROI Summary and Closing"

# ═══════════════════════════════════════════════════════════════
# STEP 8: ROI Summary & Closing
# ═══════════════════════════════════════════════════════════════
show_step "8" "ROI Summary & Closing Value Proposition" "1 minute"

show_talking_points << 'EOF'
Let me summarize what we've just demonstrated in this session
EOF

echo ""
echo -e "${WHITE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${WHITE}║            📊 TODAY'S DEMO IMPACT SUMMARY                      ║${NC}"
echo -e "${WHITE}╠════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${WHITE}║  Traffic Rerouting:              ₹2,050 saved                  ║${NC}"
echo -e "${WHITE}║  Weather Safety Decision:        ₹1,800 saved (cargo safety)   ║${NC}"
echo -e "${WHITE}║  Vehicle Breakdown Response:     ₹1,800 saved (SLA protected) ║${NC}"
echo -e "${WHITE}║  Fuel Price Optimization:        ₹1,330 saved                  ║${NC}"
echo -e "${WHITE}║  SLA Breach Prevention:          ₹5,500 saved                  ║${NC}"
echo -e "${WHITE}║  Load Optimization:              ₹2,565 saved                  ║${NC}"
echo -e "${WHITE}╠════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  TOTAL FROM 6 SCENARIOS:         ₹15,045 saved                 ║${NC}"
echo -e "${WHITE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

show_talking_points << 'EOF'
₹15,000+ saved from just 6 scenarios in a 10-minute demo
These scenarios happen dozens of times daily in real operations
Project this across a 50-vehicle fleet over a year:
- Conservative estimate: ₹2.5 Crore annual savings
- Aggressive estimate: ₹4+ Crore with full optimization
And we haven't even discussed:
- Reduced insurance premiums from safety improvements
- Lower driver turnover from fatigue management
- Customer retention value from better service levels
EOF

show_highlights << 'EOF'
AI makes hundreds of micro-decisions daily - each one adding value
ROI is measurable, trackable, and auditable
Payback period typically 3-6 months
EOF

echo ""
show_talking_points << 'EOF'
ChainSync isn't just a tracking system - it's an intelligent operations platform
Every decision is data-driven, cargo-aware, and cost-optimized
We transform reactive logistics into proactive logistics
The question isn't whether you can afford ChainSync
The question is: how much are you losing every day without it?
EOF

echo ""
echo -e "${GREEN}🎯 CLOSING CALL TO ACTION:${NC}"
echo -e "${WHITE}   • Schedule a pilot program with your actual fleet data${NC}"
echo -e "${WHITE}   • We'll show you YOUR potential savings with YOUR routes${NC}"
echo -e "${WHITE}   • No commitment required - let the numbers speak${NC}"
echo ""

wait_for_user "Complete the ROI summary and open for Q&A"

# ═══════════════════════════════════════════════════════════════
# Demo Complete
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                           ║${NC}"
echo -e "${GREEN}║   🎉  EXTENDED DEMO COMPLETE!  🎉                                         ║${NC}"
echo -e "${GREEN}║                                                                           ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📋 DEMO CHECKLIST - FEATURES DEMONSTRATED:${NC}"
echo -e "${CYAN}   ✅ Real-time fleet visibility and monitoring${NC}"
echo -e "${CYAN}   ✅ AI-powered load optimization (+23% efficiency)${NC}"
echo -e "${CYAN}   ✅ Traffic congestion detection and rerouting${NC}"
echo -e "${CYAN}   ✅ Weather-aware safety decisions${NC}"
echo -e "${CYAN}   ✅ Predictive maintenance and breakdown response${NC}"
echo -e "${CYAN}   ✅ Fuel price optimization${NC}"
echo -e "${CYAN}   ✅ SLA breach prevention${NC}"
echo -e "${CYAN}   ✅ Driver fatigue and safety management${NC}"
echo -e "${CYAN}   ✅ Real-time cost-benefit analysis${NC}"
echo ""
echo -e "${YELLOW}💡 POTENTIAL Q&A TOPICS:${NC}"
echo -e "${WHITE}   • Integration with existing TMS/ERP systems${NC}"
echo -e "${WHITE}   • GPS and IoT hardware requirements${NC}"
echo -e "${WHITE}   • Data security and privacy compliance${NC}"
echo -e "${WHITE}   • Implementation timeline and support${NC}"
echo -e "${WHITE}   • Pricing models and ROI guarantee${NC}"
echo ""
echo -e "${PURPLE}Great job on the demo! 🚛✨${NC}"
echo ""
