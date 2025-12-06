// This is the main App component - it's like the master container that holds all other components
// Think of it as the blueprint for how our entire dashboard is organized

// Import React hooks for state management
import React, { useState, useEffect, createContext } from 'react';

// Import all the individual components we've created
import Sidebar from './components/Sidebar';           // Left navigation menu
import TopBar from './components/Topbar';             // Top header with metrics (note: file is named Topbar.js)
import MapPanel from './components/MapPanel';         // Main map display
import Orders from './components/Orders';             // Orders management page
import LoadPlanner from './components/LoadPlanner';   // Load planning interface
import AnalyticsPanel from './components/AnalyticsPanel'; // Charts and analytics
import AiAssistant from './components/AiAssistant';   // AI chat interface
import DecisionStream from './components/DecisionStream'; // Live AI decisions log
import TrafficAlertModal from './components/TrafficAlertModal'; // Traffic alert modal
import ROICalculator from './components/ROICalculator'; // ROI Calculator aligned with business plan

// Import the CSS file that contains the layout styling for this component
import './App.css';

// Create Language Context for Hindi/English support
export const LanguageContext = createContext();

// This is the main App function - it returns the structure of our entire dashboard
function App() {
  // State to track which tab/page is currently active (starts with 'live-map')
  const [activeTab, setActiveTab] = useState('live-map');
  
  // Language state - 'en' for English, 'hi' for Hindi (vernacular support for truck owners)
  const [language, setLanguage] = useState('en');
  
  // Modal state management - this should be at app level to overlay entire UI
  const [showTrafficModal, setShowTrafficModal] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [routeOptimized, setRouteOptimized] = useState(false);
  
  // Handle traffic alert from DecisionStream
  useEffect(() => {
    const handleTrafficAlert = () => {
      setShowTrafficModal(true);
    };
    
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    return () => window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
  }, []);
  
  const handleOptimizeRoute = () => {
    setRouteOptimized(true);
    // Trigger analytics panel update and map update
    window.dispatchEvent(new CustomEvent('routeOptimized', {
      detail: { savings: 920, timeSaved: 15, fuelCost: 280 }
    }));
  };
  
  const handleCloseModal = () => {
    setShowTrafficModal(false);
  };

  // Function to render the main content based on the active tab
  const renderMainContent = () => {
    switch(activeTab) {
      case 'live-map':
        // Show the map dashboard layout when Live Map is selected
        return (
          <>
            {/* Middle row - contains the map and AI assistant side by side */}
            <div className="middle-row">
              {/* MapPanel component - takes up 70% of the width */}
              {/* Shows the interactive map with vehicle tracking */}
              <MapPanel />
              
              {/* AiAssistant component - takes up 30% of the width */}
              {/* Provides AI-powered insights and query interface */}
              <AiAssistant />
            </div>
            
            {/* Bottom row - contains analytics and decisions stream side by side */}
            <div className="bottom-row">
              {/* AnalyticsPanel component - takes up 60% of the width */}
              {/* Shows charts, metrics, and performance data */}
              <AnalyticsPanel />
              
              {/* DecisionStream component - takes up 40% of the width */}
              {/* Shows live stream of AI decisions and system actions */}
              <DecisionStream />
            </div>
          </>
        );
      
      case 'orders':
        // Show the orders page when Orders is selected
        return (
          <div className="full-page">
            <Orders />
          </div>
        );
        
      case 'route-plans':
        // Placeholder for Route Plans page
        return (
          <div className="placeholder-page">
            <h2>Route Plans</h2>
            <p>Route planning interface coming soon...</p>
          </div>
        );
        
      case 'load-planner':
        // Show the load planner page when Load Planner is selected
        return (
          <div className="full-page">
            <LoadPlanner />
          </div>
        );
        
      case 'analytics':
        // Show full analytics page when Analytics is selected
        return (
          <div className="full-page">
            <AnalyticsPanel />
          </div>
        );
        
      case 'cost-analysis':
        // Placeholder for Cost Analysis page
        return (
          <div className="placeholder-page">
            <h2>Cost Analysis</h2>
            <p>Cost analysis dashboard coming soon...</p>
          </div>
        );
        
      case 'ai-query':
        // Show full AI Assistant when AI Query is selected
        return (
          <div className="full-page">
            <AiAssistant />
          </div>
        );
        
      default:
        // Default case - show the map dashboard
        return renderMainContent();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {/* Main container that holds everything - uses CSS class 'app-container' */}
      <div className="app-container">
        
        {/* Sidebar component - shows on the left side of the screen */}
        {/* Contains navigation menu, logo, and AI status */}
        {/* Pass activeTab and setActiveTab as props so sidebar can control navigation */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenROI={() => setShowROICalculator(true)}
          language={language}
          setLanguage={setLanguage}
        />
        
        {/* Main content area - everything except the sidebar */}
        <div className="main-content">
          
          {/* TopBar component - shows at the top */}
          {/* Contains brand info and key performance metrics */}
          <TopBar language={language} />
          
          {/* Dynamic content area - changes based on active tab */}
          {renderMainContent()}
          
        </div>
      </div>
      
      {/* Traffic Alert Modal - positioned at app level to overlay entire UI */}
      <TrafficAlertModal 
        isOpen={showTrafficModal}
        onClose={handleCloseModal}
        onOptimize={handleOptimizeRoute}
        isOptimized={routeOptimized}
        optimizationResult={routeOptimized ? {
          timeSaved: 15,
          costSaved: 920,
          fuelCost: 280
        } : null}
      />

      {/* ROI Calculator - Aligned with business presentation */}
      <ROICalculator 
        isOpen={showROICalculator}
        onClose={() => setShowROICalculator(false)}
      />
    </LanguageContext.Provider>
  );
}

// Export the App component so it can be used by React to render the application
// This makes the App available to be displayed in the browser
export default App;

