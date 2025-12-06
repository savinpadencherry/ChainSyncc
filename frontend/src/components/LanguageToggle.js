// Language Toggle Component - Hindi/English/Kannada support for truck owners
import React from 'react';
import './LanguageToggle.css';

function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="language-toggle">
      <button 
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button 
        className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
        onClick={() => setLanguage('hi')}
      >
        हिंदी
      </button>
      <button 
        className={`lang-btn ${language === 'kn' ? 'active' : ''}`}
        onClick={() => setLanguage('kn')}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}

// Complete Translation dictionary - English to Hindi
export const translations = {
  en: {
    // Sidebar
    liveMap: 'Live Map',
    orders: 'Orders',
    routePlans: 'Route Plans',
    loadPlanner: 'Load Planner',
    analytics: 'Analytics',
    costAnalysis: 'Cost Analysis',
    aiQuery: 'AI Query',
    roiCalculator: 'ROI Calculator',
    aiReady: 'AI Ready',
    
    // TopBar
    activeVehicles: 'Active Vehicles',
    onTimeDelivery: 'On-Time Delivery',
    activeAlerts: 'Alerts',
    fuelSaved: 'Fuel Saved',
    todaysSavings: "Today's Savings",
    projectedAnnual: 'Projected Annual',
    
    // Map Panel
    liveFleetTracking: 'Live Fleet Tracking',
    trucks: 'Trucks',
    active: 'Active',
    simulate: 'Simulate',
    stop: 'Stop',
    resetView: 'Reset View',
    fleetStatus: 'Fleet Status',
    idle: 'Idle',
    maintenance: 'Maintenance',
    routes: 'Routes',
    selectTruck: 'Select Truck',
    loadingRoutes: 'Loading road routes...',
    
    // AI Assistant
    aiAssistant: 'AI Assistant',
    ready: 'Ready',
    focusOn: 'Focus on:',
    quickActions: 'Quick Actions',
    optimizeAllRoutes: 'Optimize all routes',
    showFuelStatus: 'Show fuel status',
    checkForDelays: 'Check for delays',
    currentInsight: 'Current Insight',
    load: 'Load',
    utilized: 'utilized',
    route: 'Route',
    stops: 'stops',
    completed: 'completed',
    eta: 'ETA',
    trafficIssueDetected: 'Traffic issue detected on route',
    
    // Analytics Panel
    realTimeAnalytics: 'Real-time Analytics',
    live: 'Live',
    costBreakdown: 'Cost Breakdown',
    totalCost: 'Total Cost',
    fuel: 'Fuel',
    maint: 'Maint.',
    driver: 'Driver',
    routeEfficiency: 'Route Efficiency',
    fleetStatusTitle: 'Fleet Status',
    
    // Event Log / Decision Stream
    eventLog: 'Event Log',
    nextIssue: 'Next Issue',
    left: 'left',
    reset: 'Reset',
    resolveWithAI: 'Resolve with AI',
    aiAnalyzing: 'AI Analyzing...',
    aiResolutionApplied: 'AI Resolution Applied',
    resolved: 'Resolved',
    pending: 'Pending',
    events: 'events',
    viewHistory: 'View History',
    selectScenario: 'Select Scenario to Trigger:',
    
    // Scenarios
    trafficCongestion: 'Traffic Congestion',
    weatherAlert: 'Weather Alert',
    vehicleBreakdown: 'Vehicle Breakdown',
    fuelPriceSpike: 'Fuel Price Spike',
    urgentOrder: 'Urgent Order',
    slaBreachWarning: 'SLA Breach Warning',
    driverFatigue: 'Driver Fatigue',
    routeOptimization: 'Route Optimization',
    costOptimization: 'Cost Optimization',
    deliveryComplete: 'Delivery Complete',
    maintenanceAlert: 'Maintenance Alert',
    loadBalancing: 'Load Balancing',
    
    // Common
    saved: 'saved',
    minutes: 'minutes',
    hours: 'hours',
    affected: 'Affected',
    estimatedDelay: 'Estimated delay',
    netBenefit: 'Net Benefit',
    action: 'Action',
    result: 'Result',
    aiReasoning: 'AI Reasoning',
    
    // Load Planner
    loadOptimizer: 'Load Optimizer',
    cargoToLoad: 'Cargo to Load',
    optimizeWithAI: 'Optimize with AI',
    optimizing: 'Optimizing...',
    optimized: 'Optimized!',
    items: 'items',
    capacity: 'Capacity',
    status: 'Status',
    kmSaved: 'km saved',
    minSaved: 'min saved',
    costSavedLabel: 'cost saved',
    truckBed: 'Truck Bed',
    empty: 'Empty',
    clickOptimize: 'Click "Optimize with AI" to load cargo',
    optimizationResults: 'Optimization Results',
    spaceUtilization: 'Space Utilization',
    improvement: 'improvement',
    algorithm: 'Algorithm',
    nearestNeighbor: 'Nearest Neighbor',
    weight: 'Weight',
    priority: 'Priority',
    fragile: 'Fragile',
    destination: 'Destination',
    
    // Traffic Modal
    trafficAlertDetected: 'Traffic Alert Detected',
    heavyTraffic: 'Heavy traffic congestion detected',
    location: 'Location',
    delay: 'Delay',
    vehiclesAffected: 'Vehicles Affected',
    currentRoute: 'Current Route',
    optimizedRoute: 'Optimized Route',
    savings: 'Savings',
    extraFuel: 'Extra Fuel',
    optimize: 'Optimize Route',
    dismiss: 'Dismiss',
    routeOptimized: 'Route Optimized!',
    newRoute: 'New Route',
    timeSaved: 'Time Saved',
    close: 'Close',
  },
  
  hi: {
    // Sidebar
    liveMap: 'लाइव मैप',
    orders: 'ऑर्डर',
    routePlans: 'रूट प्लान',
    loadPlanner: 'लोड प्लानर',
    analytics: 'एनालिटिक्स',
    costAnalysis: 'लागत विश्लेषण',
    aiQuery: 'AI पूछें',
    roiCalculator: 'बचत कैलकुलेटर',
    aiReady: 'AI तैयार',
    
    // TopBar
    activeVehicles: 'चालू गाड़ियां',
    onTimeDelivery: 'समय पर डिलीवरी',
    activeAlerts: 'अलर्ट',
    fuelSaved: 'डीज़ल बचत',
    todaysSavings: 'आज की बचत',
    projectedAnnual: 'सालाना बचत',
    
    // Map Panel
    liveFleetTracking: 'गाड़ियां देखें',
    trucks: 'ट्रक',
    active: 'चालू',
    simulate: 'चलाएं',
    stop: 'रोकें',
    resetView: 'वापस जाएं',
    fleetStatus: 'गाड़ियों की स्थिति',
    idle: 'खड़ी',
    maintenance: 'मरम्मत में',
    routes: 'रास्ते',
    selectTruck: 'ट्रक चुनें',
    loadingRoutes: 'रास्ते लोड हो रहे हैं...',
    
    // AI Assistant
    aiAssistant: 'AI सहायक',
    ready: 'तैयार',
    focusOn: 'देखें:',
    quickActions: 'जल्दी करें',
    optimizeAllRoutes: 'सभी रास्ते सुधारें',
    showFuelStatus: 'डीज़ल स्थिति',
    checkForDelays: 'देरी जांचें',
    currentInsight: 'अभी की जानकारी',
    load: 'लोड',
    utilized: 'इस्तेमाल',
    route: 'रास्ता',
    stops: 'स्टॉप',
    completed: 'पूरा',
    eta: 'पहुंचने का समय',
    trafficIssueDetected: 'रास्ते में ट्रैफिक जाम',
    
    // Analytics Panel
    realTimeAnalytics: 'लाइव एनालिटिक्स',
    live: 'लाइव',
    costBreakdown: 'खर्चे का विवरण',
    totalCost: 'कुल खर्च',
    fuel: 'डीज़ल',
    maint: 'मरम्मत',
    driver: 'ड्राइवर',
    routeEfficiency: 'रास्ते की क्षमता',
    fleetStatusTitle: 'गाड़ियों की स्थिति',
    
    // Event Log / Decision Stream
    eventLog: 'इवेंट लॉग',
    nextIssue: 'अगली समस्या',
    left: 'बाकी',
    reset: 'रीसेट',
    resolveWithAI: 'AI से हल करें',
    aiAnalyzing: 'AI देख रहा है...',
    aiResolutionApplied: 'AI ने हल किया',
    resolved: 'हल हो गया',
    pending: 'बाकी है',
    events: 'इवेंट',
    viewHistory: 'इतिहास देखें',
    selectScenario: 'समस्या चुनें:',
    
    // Scenarios
    trafficCongestion: 'ट्रैफिक जाम',
    weatherAlert: 'मौसम अलर्ट',
    vehicleBreakdown: 'गाड़ी खराब',
    fuelPriceSpike: 'डीज़ल महंगा',
    urgentOrder: 'जरूरी ऑर्डर',
    slaBreachWarning: 'देरी का खतरा',
    driverFatigue: 'ड्राइवर थका',
    routeOptimization: 'रास्ता सुधारा',
    costOptimization: 'खर्च बचाया',
    deliveryComplete: 'डिलीवरी पूरी',
    maintenanceAlert: 'मरम्मत अलर्ट',
    loadBalancing: 'लोड बैलेंसिंग',
    
    // Common
    saved: 'बचत',
    minutes: 'मिनट',
    hours: 'घंटे',
    affected: 'प्रभावित',
    estimatedDelay: 'अनुमानित देरी',
    netBenefit: 'कुल फायदा',
    action: 'कार्रवाई',
    result: 'नतीजा',
    aiReasoning: 'AI की सोच',
    
    // Load Planner
    loadOptimizer: 'लोड ऑप्टिमाइज़र',
    cargoToLoad: 'लोड करने का माल',
    optimizeWithAI: 'AI से लोड करें',
    optimizing: 'देख रहे हैं...',
    optimized: 'हो गया!',
    items: 'सामान',
    capacity: 'क्षमता',
    status: 'स्थिति',
    kmSaved: 'किमी बचत',
    minSaved: 'मिनट बचत',
    costSavedLabel: 'पैसे बचे',
    truckBed: 'ट्रक का पिछला हिस्सा',
    empty: 'खाली',
    clickOptimize: '"AI से लोड करें" दबाएं',
    optimizationResults: 'नतीजे',
    spaceUtilization: 'जगह का उपयोग',
    improvement: 'सुधार',
    algorithm: 'तरीका',
    nearestNeighbor: 'नजदीकी पहले',
    weight: 'वजन',
    priority: 'प्राथमिकता',
    fragile: 'नाजुक',
    destination: 'मंज़िल',
    
    // Traffic Modal
    trafficAlertDetected: 'ट्रैफिक अलर्ट',
    heavyTraffic: 'भारी ट्रैफिक जाम मिला',
    location: 'जगह',
    delay: 'देरी',
    vehiclesAffected: 'प्रभावित गाड़ियां',
    currentRoute: 'अभी का रास्ता',
    optimizedRoute: 'बेहतर रास्ता',
    savings: 'बचत',
    extraFuel: 'अतिरिक्त डीज़ल',
    optimize: 'रास्ता सुधारें',
    dismiss: 'बंद करें',
    routeOptimized: 'रास्ता सुधर गया!',
    newRoute: 'नया रास्ता',
    timeSaved: 'समय बचा',
    close: 'बंद करें',
  },

  // Kannada translations
  kn: {
    // Sidebar
    liveMap: 'ಲೈವ್ ಮ್ಯಾಪ್',
    orders: 'ಆರ್ಡರ್‌ಗಳು',
    routePlans: 'ರೂಟ್ ಪ್ಲಾನ್',
    loadPlanner: 'ಲೋಡ್ ಪ್ಲಾನರ್',
    analytics: 'ಅನಾಲಿಟಿಕ್ಸ್',
    costAnalysis: 'ವೆಚ್ಚ ವಿಶ್ಲೇಷಣೆ',
    aiQuery: 'AI ಕೇಳಿ',
    roiCalculator: 'ಉಳಿತಾಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    aiReady: 'AI ಸಿದ್ಧ',
    
    // TopBar
    activeVehicles: 'ಸಕ್ರಿಯ ವಾಹನಗಳು',
    onTimeDelivery: 'ಸಮಯಕ್ಕೆ ಡೆಲಿವರಿ',
    activeAlerts: 'ಅಲರ್ಟ್‌ಗಳು',
    fuelSaved: 'ಡೀಸೆಲ್ ಉಳಿತಾಯ',
    todaysSavings: 'ಇಂದಿನ ಉಳಿತಾಯ',
    projectedAnnual: 'ವಾರ್ಷಿಕ ಉಳಿತಾಯ',
    
    // Map Panel
    liveFleetTracking: 'ವಾಹನಗಳನ್ನು ನೋಡಿ',
    trucks: 'ಟ್ರಕ್',
    active: 'ಸಕ್ರಿಯ',
    simulate: 'ಪ್ರಾರಂಭಿಸಿ',
    stop: 'ನಿಲ್ಲಿಸಿ',
    resetView: 'ಮರುಹೊಂದಿಸಿ',
    fleetStatus: 'ವಾಹನ ಸ್ಥಿತಿ',
    idle: 'ನಿಂತಿದೆ',
    maintenance: 'ನಿರ್ವಹಣೆ',
    routes: 'ಮಾರ್ಗಗಳು',
    selectTruck: 'ಟ್ರಕ್ ಆಯ್ಕೆಮಾಡಿ',
    loadingRoutes: 'ಮಾರ್ಗಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    
    // AI Assistant
    aiAssistant: 'AI ಸಹಾಯಕ',
    ready: 'ಸಿದ್ಧ',
    focusOn: 'ನೋಡಿ:',
    quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    optimizeAllRoutes: 'ಎಲ್ಲಾ ಮಾರ್ಗಗಳನ್ನು ಸುಧಾರಿಸಿ',
    showFuelStatus: 'ಡೀಸೆಲ್ ಸ್ಥಿತಿ',
    checkForDelays: 'ವಿಳಂಬ ಪರಿಶೀಲಿಸಿ',
    costAnalysis: 'ವೆಚ್ಚ ವಿಶ್ಲೇಷಣೆ',
    currentInsight: 'ಪ್ರಸ್ತುತ ಮಾಹಿತಿ',
    load: 'ಲೋಡ್',
    utilized: 'ಬಳಸಿದ',
    route: 'ಮಾರ್ಗ',
    stops: 'ನಿಲ್ದಾಣಗಳು',
    completed: 'ಪೂರ್ಣ',
    eta: 'ತಲುಪುವ ಸಮಯ',
    trafficIssueDetected: 'ಮಾರ್ಗದಲ್ಲಿ ಟ್ರಾಫಿಕ್ ಸಮಸ್ಯೆ',
    
    // Analytics Panel
    realTimeAnalytics: 'ಲೈವ್ ಅನಾಲಿಟಿಕ್ಸ್',
    live: 'ಲೈವ್',
    costBreakdown: 'ವೆಚ್ಚದ ವಿವರ',
    totalCost: 'ಒಟ್ಟು ವೆಚ್ಚ',
    fuel: 'ಡೀಸೆಲ್',
    maint: 'ನಿರ್ವಹಣೆ',
    driver: 'ಚಾಲಕ',
    routeEfficiency: 'ಮಾರ್ಗ ದಕ್ಷತೆ',
    fleetStatusTitle: 'ವಾಹನ ಸ್ಥಿತಿ',
    
    // Event Log / Decision Stream
    eventLog: 'ಇವೆಂಟ್ ಲಾಗ್',
    nextIssue: 'ಮುಂದಿನ ಸಮಸ್ಯೆ',
    left: 'ಉಳಿದಿದೆ',
    reset: 'ರೀಸೆಟ್',
    resolveWithAI: 'AI ಮೂಲಕ ಪರಿಹರಿಸಿ',
    aiAnalyzing: 'AI ನೋಡುತ್ತಿದೆ...',
    aiResolutionApplied: 'AI ಪರಿಹಾರ ಅನ್ವಯಿಸಲಾಗಿದೆ',
    resolved: 'ಪರಿಹರಿಸಲಾಗಿದೆ',
    pending: 'ಬಾಕಿ ಇದೆ',
    events: 'ಇವೆಂಟ್‌ಗಳು',
    viewHistory: 'ಇತಿಹಾಸ ನೋಡಿ',
    selectScenario: 'ಸಮಸ್ಯೆ ಆಯ್ಕೆಮಾಡಿ:',
    
    // Scenarios
    trafficCongestion: 'ಟ್ರಾಫಿಕ್ ಜಾಮ್',
    weatherAlert: 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ',
    vehicleBreakdown: 'ವಾಹನ ಕೆಟ್ಟಿದೆ',
    fuelPriceSpike: 'ಡೀಸೆಲ್ ಬೆಲೆ ಏರಿಕೆ',
    urgentOrder: 'ತುರ್ತು ಆರ್ಡರ್',
    slaBreachWarning: 'ವಿಳಂಬದ ಅಪಾಯ',
    driverFatigue: 'ಚಾಲಕ ಆಯಾಸ',
    routeOptimization: 'ಮಾರ್ಗ ಸುಧಾರಣೆ',
    costOptimization: 'ವೆಚ್ಚ ಉಳಿತಾಯ',
    deliveryComplete: 'ಡೆಲಿವರಿ ಪೂರ್ಣ',
    maintenanceAlert: 'ನಿರ್ವಹಣೆ ಎಚ್ಚರಿಕೆ',
    loadBalancing: 'ಲೋಡ್ ಬ್ಯಾಲೆನ್ಸಿಂಗ್',
    
    // Common
    saved: 'ಉಳಿತಾಯ',
    minutes: 'ನಿಮಿಷಗಳು',
    hours: 'ಗಂಟೆಗಳು',
    affected: 'ಪ್ರಭಾವಿತ',
    estimatedDelay: 'ಅಂದಾಜು ವಿಳಂಬ',
    netBenefit: 'ಒಟ್ಟು ಲಾಭ',
    action: 'ಕ್ರಿಯೆ',
    result: 'ಫಲಿತಾಂಶ',
    aiReasoning: 'AI ಯೋಚನೆ',
    
    // Load Planner
    loadOptimizer: 'ಲೋಡ್ ಆಪ್ಟಿಮೈಜರ್',
    cargoToLoad: 'ಲೋಡ್ ಮಾಡಲು ಸರಕು',
    optimizeWithAI: 'AI ಮೂಲಕ ಲೋಡ್ ಮಾಡಿ',
    optimizing: 'ನೋಡುತ್ತಿದೆ...',
    optimized: 'ಆಯಿತು!',
    items: 'ವಸ್ತುಗಳು',
    capacity: 'ಸಾಮರ್ಥ್ಯ',
    status: 'ಸ್ಥಿತಿ',
    kmSaved: 'ಕಿಮೀ ಉಳಿತಾಯ',
    minSaved: 'ನಿಮಿಷ ಉಳಿತಾಯ',
    costSavedLabel: 'ಹಣ ಉಳಿತಾಯ',
    truckBed: 'ಟ್ರಕ್ ಹಿಂಭಾಗ',
    empty: 'ಖಾಲಿ',
    clickOptimize: '"AI ಮೂಲಕ ಲೋಡ್ ಮಾಡಿ" ಒತ್ತಿ',
    optimizationResults: 'ಫಲಿತಾಂಶಗಳು',
    spaceUtilization: 'ಜಾಗ ಬಳಕೆ',
    improvement: 'ಸುಧಾರಣೆ',
    algorithm: 'ವಿಧಾನ',
    nearestNeighbor: 'ಹತ್ತಿರದ ಮೊದಲು',
    weight: 'ತೂಕ',
    priority: 'ಆದ್ಯತೆ',
    fragile: 'ಸೂಕ್ಷ್ಮ',
    destination: 'ಗಮ್ಯಸ್ಥಾನ',
    
    // Traffic Modal
    trafficAlertDetected: 'ಟ್ರಾಫಿಕ್ ಎಚ್ಚರಿಕೆ',
    heavyTraffic: 'ಭಾರೀ ಟ್ರಾಫಿಕ್ ಜಾಮ್ ಕಂಡುಬಂದಿದೆ',
    location: 'ಸ್ಥಳ',
    delay: 'ವಿಳಂಬ',
    vehiclesAffected: 'ಪ್ರಭಾವಿತ ವಾಹನಗಳು',
    currentRoute: 'ಪ್ರಸ್ತುತ ಮಾರ್ಗ',
    optimizedRoute: 'ಉತ್ತಮ ಮಾರ್ಗ',
    savings: 'ಉಳಿತಾಯ',
    extraFuel: 'ಹೆಚ್ಚುವರಿ ಡೀಸೆಲ್',
    optimize: 'ಮಾರ್ಗ ಸುಧಾರಿಸಿ',
    dismiss: 'ಮುಚ್ಚಿ',
    routeOptimized: 'ಮಾರ್ಗ ಸುಧಾರಿಸಲಾಗಿದೆ!',
    newRoute: 'ಹೊಸ ಮಾರ್ಗ',
    timeSaved: 'ಸಮಯ ಉಳಿತಾಯ',
    close: 'ಮುಚ್ಚಿ',
  }
};

export default LanguageToggle;
