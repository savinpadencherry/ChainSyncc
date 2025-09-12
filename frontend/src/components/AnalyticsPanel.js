// This component shows real-time analytics and performance metrics
import React, { useState, useEffect } from 'react';
import './AnalyticsPanel.css';

// AnalyticsPanel component - displays charts and metrics about fleet performance
function AnalyticsPanel() {
  const [routeEfficiency, setRouteEfficiency] = useState(87);
  const [totalCost, setTotalCost] = useState(45230);
  const [isOptimized, setIsOptimized] = useState(false);
  const [efficiencyTrend, setEfficiencyTrend] = useState(5.2);

  useEffect(() => {
    const handleTrafficAlert = () => {
      setRouteEfficiency(72);
      setTotalCost(52800);
      setEfficiencyTrend(-8.4);
      setIsOptimized(false);
    };

    const handleRouteOptimization = () => {
      setRouteEfficiency(94);
      setTotalCost(38650);
      setEfficiencyTrend(12.7);
      setIsOptimized(true);
    };

    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    window.addEventListener('routeOptimized', handleRouteOptimization);

    return () => {
      window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
      window.removeEventListener('routeOptimized', handleRouteOptimization);
    };
  }, []);

  return (
    <div className="analytics-panel">
      <div className="analytics-header">
        <h3>Real-time Analytics</h3>
        <div className="time-selector">
          <button className="time-btn active">Live</button>
          <button className="time-btn">1H</button>
          <button className="time-btn">24H</button>
        </div>
      </div>
      
      <div className="analytics-content">
        {/* Cost Breakdown Card */}
        <div className="metric-card-large">
          <h4>Cost Breakdown</h4>
          <div className="chart-placeholder">
            <div className="cost-breakdown">
              <div className="total-cost">
                <div className="total-cost-value">₹{totalCost.toLocaleString()}</div>
                <div className="total-cost-label">Total Cost</div>
              </div>
              <div className="cost-bar">
                <div className="cost-segment fuel" style={{width: '65%'}}></div>
                <div className="cost-segment maintenance" style={{width: '20%'}}></div>
                <div className="cost-segment driver" style={{width: '15%'}}></div>
              </div>
              <div className="cost-legend">
                <div className="legend-item"><span>Fuel</span><span className="value">65%</span></div>
                <div className="legend-item"><span>Maint.</span><span className="value">20%</span></div>
                <div className="legend-item"><span>Driver</span><span className="value">15%</span></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Route Efficiency Card (Kept as is) */}
        <div className="metric-card-large">
          <h4>Route Efficiency</h4>
          <div className="chart-placeholder">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 3h14l4 4v11H1V3z" stroke="currentColor" strokeWidth="2.5"/><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2.5"/><circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2.5"/></svg>
                </div>
                <div className="stat-details">
                  <span className="stat-label">Active</span>
                  <span className="stat-number">12</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon idle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5"/><polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2.5"/></svg>
                </div>
                <div className="stat-details">
                  <span className="stat-label">Idle</span>
                  <span className="stat-number">3</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon maintenance">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3L12 9 9.3 6.3a1 1 0 0 0-1.7.7V9H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v1.3a1 1 0 0 0 1.7.7L12 15l2.7 2.7a1 1 0 0 0 1.7-.7V15h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2V7a1 1 0 0 0-1.7-.7z" stroke="currentColor" strokeWidth="2.5"/></svg>
                </div>
                <div className="stat-details">
                  <span className="stat-label">Maintenance</span>
                  <span className="stat-number">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPanel;
