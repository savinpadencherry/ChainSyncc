// This component shows real-time analytics and performance metrics
import React, { useState, useEffect } from 'react';
import './AnalyticsPanel.css';

// AnalyticsPanel component - displays charts and metrics about fleet performance
function AnalyticsPanel() {
  const [routeEfficiency, setRouteEfficiency] = useState(87);
  const [totalCost, setTotalCost] = useState(45230);
  const [costSavings, setCostSavings] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);
  const [efficiencyTrend, setEfficiencyTrend] = useState(5.2);

  useEffect(() => {
    // Listen for traffic alerts
    const handleTrafficAlert = () => {
      setRouteEfficiency(72);
      setTotalCost(52800);
      setEfficiencyTrend(-8.4);
      setIsOptimized(false);
      setCostSavings(0);
    };

    // Listen for route optimization
    const handleRouteOptimization = () => {
      setRouteEfficiency(94);
      setTotalCost(38650);
      setEfficiencyTrend(12.7);
      setIsOptimized(true);
      setCostSavings(7580);
    };

    // Listen for custom events
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    window.addEventListener('routeOptimized', handleRouteOptimization);

    return () => {
      window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
      window.removeEventListener('routeOptimized', handleRouteOptimization);
    };
  }, []);
  return (
    // Main container for the analytics panel
    <div className="analytics-panel">
      {/* Header with title and time period selector */}
      <div className="analytics-header">
        <h3>Real-time Analytics</h3>
        <div className="time-selector">
          <button className="time-btn active">Live</button>
          <button className="time-btn">1H</button>
          <button className="time-btn">24H</button>
        </div>
      </div>
      
      {/* Main content area with three metric cards */}
      <div className="analytics-content">
        {/* Cost Breakdown Card */}
        <div className="metric-card-large">
          <h4>Cost Breakdown</h4>
          <div className="chart-placeholder">
            {/* Placeholder for pie chart */}
            <div className="pie-chart">
              <div className="chart-center">
                <span className="chart-value">₹{totalCost.toLocaleString()}</span>
                <span className="chart-label">Total Cost</span>
                {costSavings > 0 && (
                  <span className="cost-savings">-₹{costSavings.toLocaleString()} saved</span>
                )}
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot fuel"></div>
                <span>Fuel (65%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot maintenance"></div>
                <span>Maintenance (20%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot driver"></div>
                <span>Driver (15%)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Route Efficiency Card */}
        <div className="metric-card-large">
          <h4>Route Efficiency</h4>
          <div className="chart-placeholder">
            {/* Placeholder for line chart */}
            <div className="line-chart">
              <div className="efficiency-value">
                <span className={`big-number ${isOptimized ? 'optimized' : ''}`}>{routeEfficiency}%</span>
                <span className={`trend ${efficiencyTrend >= 0 ? 'positive' : 'negative'}`}>
                  {efficiencyTrend >= 0 ? '+' : ''}{efficiencyTrend}%
                </span>
              </div>
              <div className="chart-lines">
                <svg width="100%" height="60" viewBox="0 0 200 60">
                  <path d="M10,50 Q60,20 100,30 T190,15" stroke="#4fd1c7" strokeWidth="2" fill="none"/>
                  <path d="M10,55 Q60,35 100,40 T190,25" stroke="#48bb78" strokeWidth="2" fill="none" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fleet Status Card */}
        <div className="metric-card-large">
          <h4>Fleet Status</h4>
          <div className="chart-placeholder">
            <div className="fleet-stats">
              <div className="stat-item">
                <div className="stat-icon active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 3H15L19 7V18H1V3Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-details">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Active</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon idle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-details">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Idle</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon maintenance">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14.7 6.3L12 9L9.3 6.3A1 1 0 0 0 8 7V9H6A1 1 0 0 0 5 10V14A1 1 0 0 0 6 15H8V17A1 1 0 0 0 9.3 17.7L12 15L14.7 17.7A1 1 0 0 0 16 17V15H18A1 1 0 0 0 19 14V10A1 1 0 0 0 18 9H16V7A1 1 0 0 0 14.7 6.3Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-details">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the component so it can be used in App.js
export default AnalyticsPanel;