#!/bin/bash

# Guided Demo Sequence for ChainSync
# This script provides step-by-step terminal guidance through the demo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
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
    echo -e "${PURPLE}═══════════════════════════════════════════${NC}"
    echo -e "${YELLOW}📍 STEP $step_num: $title${NC} ${CYAN}($duration)${NC}"
    echo -e "${PURPLE}═══════════════════════════════════════════${NC}"
    echo ""
}

# Function to show what to say
show_talking_points() {
    echo -e "${GREEN}💬 What to say:${NC}"
    while IFS= read -r line; do
        echo -e "${BLUE}   \"$line\"${NC}"
    done
}

# Function to show actions
show_actions() {
    echo -e "${CYAN}🎯 Actions to take:${NC}"
    while IFS= read -r line; do
        echo -e "${YELLOW}   → $line${NC}"
    done
}

clear
echo -e "${PURPLE}🎤 ChainSync Guided Demo Sequence${NC}"
echo -e "${PURPLE}=================================${NC}"
echo ""
echo -e "${GREEN}This will guide you step-by-step through the 4.5-minute demo${NC}"
echo -e "${YELLOW}Your browser should now be open to: http://localhost:3000${NC}"
echo ""

wait_for_user "Make sure the ChainSync dashboard is loaded in your browser"

# STEP 1: Dashboard Overview
show_step "1" "Dashboard Introduction & Overview" "30 seconds"

show_talking_points << 'EOF'
Welcome to ChainSync - an AI-powered logistics management platform
This is a real-time view of our entire logistics network spanning major Indian cities
Our AI continuously monitors vehicle locations, traffic conditions, and operational metrics
Notice our key performance indicators - 5 active vehicles, 94% on-time delivery rate
We've already saved ₹8,240 today through AI optimization
The system has already processed 6 AI decisions today, each one saving time and money
EOF

show_actions << 'EOF'
Point to the live map with vehicle dots
Highlight the TopBar metrics (5 active vehicles, 94% delivery rate, ₹8,240 savings)
Point to the Decision Stream panel (bottom right) showing 6 decisions
Emphasize the live indicators and moving elements
EOF

wait_for_user "Complete the dashboard introduction, then move to Load Planner"

# STEP 2: Load Planner Navigation
show_step "2" "Load Planner Navigation & Current Layout" "30 seconds"

show_talking_points << 'EOF'
Now let me show you how our AI optimizes cargo loading for maximum efficiency
Here we have 5 different cargo items waiting to be loaded
Electronics Package - high priority, fragile, worth ₹2,85,000
Steel Components - heavy item at 150kg, our highest weight cargo
Medical Supplies - critical priority, fragile handling required
We're using our Heavy Duty Truck with 15-ton capacity
All 5 items are currently selected, totaling 400kg
Currently showing 64% space utilization with standard loading methods
EOF

show_actions << 'EOF'
Click "Load Planner" in the sidebar
Wait for the Load Planner page to fully load
Point to each cargo item in the list (Electronics, Steel, Medical, Textile, Chemical)
Show the vehicle selector (Heavy Duty Truck selected)
Point to the cargo visualization showing basic layout
Highlight the stats: "5 items selected • 400 kg total"
EOF

wait_for_user "Navigate to Load Planner and explain the current cargo layout"

# STEP 3: AI Optimization Demo
show_step "3" "AI Cargo Optimization Demonstration" "45 seconds"

show_talking_points << 'EOF'
Watch what happens when we let our AI analyze and optimize this loading arrangement
The AI is now analyzing cargo dimensions, weight distribution, priority levels
It's analyzing optimal placement for weight distribution and vehicle stability
Priority items are positioned for quick access, fragile items secured
87% utilization - that's a remarkable 23% improvement over standard loading
Perfectly balanced for optimal vehicle stability and reduced wear
42 minutes total loading time, saving 15 minutes of labor costs
High-priority items placed for easy access at unloading
Fragile items secured in protected areas away from heavy cargo
Weight distribution optimized for vehicle stability and fuel efficiency
EOF

show_actions << 'EOF'
Click the "Optimize with AI" button (ensure it's visible)
During the 2-second loading animation, explain the AI analysis
Point to the optimized visualization when it appears
Highlight each metric: 87% utilization (+23%), Balanced weight, 42 min (-15 min)
Point to the three optimization summary checkmarks
Show the visual changes in the truck bed cargo layout
EOF

wait_for_user "Complete the AI optimization demo, then return to dashboard"

# STEP 4: Traffic Alert Demo
show_step "4" "Return to Dashboard & Trigger Traffic Alert" "30 seconds"

show_talking_points << 'EOF'
Now let me show you how our AI handles dynamic challenges like traffic disruptions
This panel shows live AI decisions and automated system responses
In real operations, these alerts come from traffic APIs and GPS data
A traffic alert just appeared - heavy congestion detected on NH-48
25-minute delay affecting 3 vehicles in our fleet currently on that route
This alert was automatically detected and processed by our AI traffic monitoring system
The system immediately identifies which vehicles are impacted
Notice the 'Optimize Route with AI' button - our AI is already ready with a solution
EOF

show_actions << 'EOF'
Click "Live Map" in the sidebar to return to main dashboard
Point to the Decision Stream panel (bottom right)
Locate the "Demo: Trigger Traffic Alert" button
Click "Demo: Trigger Traffic Alert" button
Point immediately to the new alert entry that appears
Read the alert details aloud (NH-48 congestion, 25-minute delay, 3 vehicles affected)
Show the "Optimize Route with AI" button in the alert
EOF

wait_for_user "Trigger the traffic alert and show the system response"

# STEP 5: Route Optimization
show_step "5" "AI Route Optimization & Cost Analysis" "45 seconds"

show_talking_points << 'EOF'
Let's see how our AI responds to this traffic situation with intelligent route optimization
AI is calculating alternative routes and cost implications
AI has switched the route to Expressway 62 - completely avoiding the congestion zone
15 minutes saved - turning a 25-minute delay into actual time savings
Additional fuel cost: ₹280 - minor investment for the route change
Time value saved: ₹1,200 - major benefit from avoiding delays
Net benefit: ₹920 - highlight this prominently
The AI doesn't just consider direct costs - it calculates opportunity costs too
Time has real monetary value in logistics - delivery delays cost more than extra fuel
This single intelligent decision saves nearly ₹1000 while ensuring on-time delivery
EOF

show_actions << 'EOF'
Click "Optimize Route with AI" in the traffic alert entry
Point to the brief loading state
Highlight the results as they appear:
  → Route changed to Expressway 62
  → Time saved: 15 minutes
  → Additional fuel cost: ₹280
  → Time value saved: ₹1,200
  → Net benefit: ₹920 (emphasize this)
Point to the green checkmark showing completion
Show the alert status change from pending (⏳) to completed (✓)
EOF

wait_for_user "Complete the route optimization demo, then move to benefits summary"

# STEP 6: Benefits Summary
show_step "6" "Benefits Summary & ROI Conclusion" "30 seconds"

show_talking_points << 'EOF'
Let me show you the cumulative impact of these AI optimizations
That breaks down to AI Optimization savings of ₹12,340 and fuel efficiency improvements
At this rate, that's over ₹3 million in annual savings
87% space utilization improvement in cargo loading across our fleet
42-minute average loading times with 15-minute savings per load
Automated response to traffic conditions within seconds, not minutes
₹8,240 saved today alone through intelligent AI decisions
Real-time cost-benefit analysis for every route and loading decision
94% on-time delivery rate maintained consistently
ChainSync doesn't just track your fleet - it actively optimizes every aspect
From cargo loading to route planning, our AI makes intelligent decisions
The result? A logistics operation that's intelligently adaptive to real-world challenges
This is the future of logistics management - and it's available today
EOF

show_actions << 'EOF'
Point back to "Cost Savings Today: ₹8,240" in the top bar
Break down the savings components
Scale the impact: "Over ₹3 million annually"
Summarize key benefits:
  → Operational Efficiency (87% utilization, 42min loading)
  → Cost Optimization (₹8,240 daily, ₹3M annually)
  → Customer Satisfaction (94% on-time delivery)
Deliver the closing value proposition
Point to the competitive advantage
EOF

wait_for_user "Complete the benefits summary and close the demo"

# Demo Complete
echo ""
echo -e "${GREEN}🎉 GUIDED DEMO SEQUENCE COMPLETE! 🎉${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📊 Demo Summary:${NC}"
echo -e "${BLUE}   ✅ Dashboard overview with live metrics${NC}"
echo -e "${BLUE}   ✅ Load planner AI optimization (+23% efficiency)${NC}"
echo -e "${BLUE}   ✅ Traffic alert detection and response${NC}"
echo -e "${BLUE}   ✅ Route optimization (₹920 net benefit)${NC}"
echo -e "${BLUE}   ✅ ROI summary (₹3M annual savings)${NC}"
echo ""
echo -e "${GREEN}🎯 Key Messages Delivered:${NC}"
echo -e "${CYAN}   • Real-time AI decision making${NC}"
echo -e "${CYAN}   • Measurable cost savings and efficiency gains${NC}"
echo -e "${CYAN}   • Proactive problem solving vs reactive management${NC}"
echo -e "${CYAN}   • Competitive advantage through intelligent automation${NC}"
echo ""
echo -e "${YELLOW}💡 Next Steps:${NC}"
echo -e "   • Answer any questions from your audience"
echo -e "   • Demonstrate additional features if time permits"
echo -e "   • Schedule follow-up meetings for interested prospects"
echo ""
echo -e "${GREEN}📌 TIP: For longer presentations (5-10 min), run:${NC}"
echo -e "${WHITE}   ./extended-demo-guide.sh${NC}"
echo -e "${WHITE}   (Includes 7 comprehensive scenarios with detailed talking points)${NC}"
echo ""
echo -e "${PURPLE}Great job on completing the demo! 🚛✨${NC}"
