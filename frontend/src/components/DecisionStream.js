// This component shows a live stream of AI decisions and system actions
import React, { useState } from 'react';
import './DecisionStream.css';

// DecisionStream component - displays real-time AI decisions and system logs
function DecisionStream() {
  const [trafficAlertTriggered, setTrafficAlertTriggered] = useState(false);
  const [routeOptimized, setRouteOptimized] = useState(false);

  const handleTriggerTrafficAlert = () => {
    setTrafficAlertTriggered(true);
    // Notify MapPanel to show the modal
    window.dispatchEvent(new CustomEvent('trafficAlertTriggered'));
    // Also trigger analytics update
    window.dispatchEvent(new CustomEvent('trafficAlertTriggered'));
  };

  const handleOptimizeRoute = () => {
    setRouteOptimized(true);
    // Trigger route optimization event for analytics
    window.dispatchEvent(new CustomEvent('routeOptimized'));
  };

  return (
    // Main container for the decisions stream panel
    <div className="decisions-stream">
      {/* Header with title and live indicator */}
      <div className="stream-header">
        <h3>AI Decisions Stream</h3>
        <div className="header-controls">
          {!trafficAlertTriggered && (
            <button className="demo-trigger-btn" onClick={handleTriggerTrafficAlert}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 9V13" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Demo: Trigger Traffic Alert
            </button>
          )}
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
      
      {/* Main content area with decision logs */}
      <div className="stream-content">
        {/* Individual decision entries */}
        <div className="decision-entry optimization">
          <div className="decision-time">14:32</div>
          <div className="decision-content">
            <div className="decision-title">Route Optimization</div>
            <div className="decision-text">Suggested alternate route for TRK002 to avoid traffic. ETA improved by 15 minutes.</div>
          </div>
          <div className="decision-status accepted">✓</div>
        </div>
        
        {/* Demo Traffic Alert - only show if triggered */}
        {trafficAlertTriggered && (
          <div className={`decision-entry alert demo-alert ${routeOptimized ? 'optimized' : ''}`}>
            <div className="decision-time">14:29</div>
            <div className="decision-content">
              <div className="decision-title">Traffic Alert</div>
              <div className="decision-text">
                Heavy traffic congestion detected on NH-48. Current delay: 25 minutes. 
                3 vehicles affected in delivery route.
              </div>
              {!routeOptimized && (
                <button className="optimize-route-btn" onClick={handleOptimizeRoute}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9.09 9A3 3 0 0 1 12 6A3 3 0 0 1 15 9M21 16A7 7 0 1 1 7 16" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 17V21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 21H16" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Optimize Route with AI
                </button>
              )}
              {routeOptimized && (
                <div className="route-optimization-results">
                  <div className="optimization-summary">
                    <span className="optimization-icon">✓</span>
                    <span>Route optimized - switched to Expressway 62</span>
                  </div>
                  <div className="optimization-metrics">
                    <div className="metric">
                      <span className="metric-label">Time Saved:</span>
                      <span className="metric-value positive">15 minutes</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Additional Fuel Cost:</span>
                      <span className="metric-value negative">₹280</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Time Value Saved:</span>
                      <span className="metric-value positive">₹1,200</span>
                    </div>
                    <div className="metric total">
                      <span className="metric-label">Net Benefit:</span>
                      <span className="metric-value positive">₹920</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="decision-status accepted">
              {routeOptimized ? '✓' : '⏳'}
            </div>
          </div>
        )}
        
        <div className="decision-entry alert">
          <div className="decision-time">14:28</div>
          <div className="decision-content">
            <div className="decision-title">Traffic Alert</div>
            <div className="decision-text">Heavy traffic detected on NH-48. Recommending route change for 3 vehicles.</div>
          </div>
          <div className="decision-status pending">⏳</div>
        </div>
        
        <div className="decision-entry cost-saving">
          <div className="decision-time">14:25</div>
          <div className="decision-content">
            <div className="decision-title">Cost Optimization</div>
            <div className="decision-text">Fuel-efficient route calculated. Potential savings: ₹1,250 for today's deliveries.</div>
          </div>
          <div className="decision-status accepted">✓</div>
        </div>
        
        <div className="decision-entry maintenance">
          <div className="decision-time">14:20</div>
          <div className="decision-content">
            <div className="decision-title">Maintenance Alert</div>
            <div className="decision-text">TRK001 approaching service interval. Schedule maintenance within 200km.</div>
          </div>
          <div className="decision-status review">👁</div>
        </div>
        
        <div className="decision-entry delivery">
          <div className="decision-time">14:15</div>
          <div className="decision-content">
            <div className="decision-title">Delivery Update</div>
            <div className="decision-text">Order #ORD-2024-001 delivered successfully. Customer satisfaction: 5/5 stars.</div>
          </div>
          <div className="decision-status completed">✓</div>
        </div>
        
        <div className="decision-entry optimization">
          <div className="decision-time">14:10</div>
          <div className="decision-content">
            <div className="decision-title">Load Balancing</div>
            <div className="decision-text">Redistributed cargo for optimal weight distribution across fleet.</div>
          </div>
          <div className="decision-status accepted">✓</div>
        </div>
      </div>
      
      {/* Footer with stream controls */}
      <div className="stream-footer">
        <button className="stream-control">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Pause
        </button>
        <button className="stream-control">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2"/>
            <path d="M19 6V20L7 12L19 6Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Clear
        </button>
        <span className="stream-count">6 decisions today</span>
      </div>
    </div>
  );
}

// Export the component so it can be used in App.js
export default DecisionStream;