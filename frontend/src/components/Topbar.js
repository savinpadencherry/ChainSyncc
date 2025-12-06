import React, { useState, useEffect } from 'react';
import { vehicleData } from '../data/mockData';
import './TopBar.css';

function TopBar() {
  const [metrics, setMetrics] = useState({
    active: vehicleData.filter(v => v.status === 'active').length,
    onTime: 94,
    alerts: 0,
    savings: 8240
  });

  // Listen for traffic events
  useEffect(() => {
    const handleTrafficAlert = () => {
      setMetrics(prev => ({ ...prev, alerts: 2 }));
    };
    const handleRouteOptimized = () => {
      setMetrics(prev => ({ ...prev, alerts: 1, savings: prev.savings + 720, onTime: 96 }));
    };
    
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    window.addEventListener('routeOptimized', handleRouteOptimized);
    return () => {
      window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
      window.removeEventListener('routeOptimized', handleRouteOptimized);
    };
  }, []);

  return (
    <div className="topbar">
      {/* Just metrics - no duplicate branding */}
      <div className="topbar-metrics">
        <div className="metric-item">
          <div className="metric-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 3h14l4 4v11H1V3z" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.active}</div>
            <div className="metric-label">Active</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className="metric-item">
          <div className="metric-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.onTime}%</div>
            <div className="metric-label">On-Time</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className={`metric-item ${metrics.alerts > 0 ? 'highlight' : ''}`}>
          <div className="metric-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.77 3h16.82a2 2 0 0 0 1.77-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.alerts}</div>
            <div className="metric-label">Alerts</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className="metric-item savings">
          <div className="metric-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">₹{metrics.savings.toLocaleString()}</div>
            <div className="metric-label">Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
