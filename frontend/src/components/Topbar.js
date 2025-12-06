import React, { useState, useEffect } from 'react';
import { vehicleData } from '../data/mockData';
import { translations } from './LanguageToggle';
import './TopBar.css';

function TopBar({ language = 'en' }) {
  const t = translations[language] || translations.en;
  
  const [metrics, setMetrics] = useState({
    active: vehicleData.filter(v => v.status === 'active').length,
    onTime: 94,
    alerts: 0,
    savings: 0,  // Start at 0 - builds up during demo
    fuelSaved: 0,
    animateSavings: false
  });

  // Animate savings counter
  useEffect(() => {
    if (metrics.animateSavings) {
      const timer = setTimeout(() => {
        setMetrics(prev => ({ ...prev, animateSavings: false }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [metrics.animateSavings]);

  // Listen for events and accumulate savings
  useEffect(() => {
    const handleTrafficAlert = () => {
      setMetrics(prev => ({ ...prev, alerts: prev.alerts + 1 }));
    };
    
    const handleRouteOptimized = (event) => {
      // Each scenario adds different savings based on type
      const savingsMap = {
        'traffic-1': { savings: 2050, fuel: 12 },
        'weather-1': { savings: 1800, fuel: 0 },
        'breakdown-1': { savings: 1800, fuel: 8 },
        'fuel-1': { savings: 1330, fuel: 45 },
        'urgent-1': { savings: 2100, fuel: 5 },
        'sla-1': { savings: 5500, fuel: 0 },
        'fatigue-1': { savings: 500, fuel: 0 },
        'default': { savings: 920, fuel: 10 }
      };
      
      const scenarioId = event?.detail?.scenarioId || 'default';
      const addition = savingsMap[scenarioId] || savingsMap['default'];
      
      setMetrics(prev => ({ 
        ...prev, 
        alerts: Math.max(0, prev.alerts - 1),
        savings: prev.savings + addition.savings,
        fuelSaved: prev.fuelSaved + addition.fuel,
        onTime: Math.min(99, prev.onTime + 1),
        animateSavings: true
      }));
    };
    
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    window.addEventListener('routeOptimized', handleRouteOptimized);
    return () => {
      window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
      window.removeEventListener('routeOptimized', handleRouteOptimized);
    };
  }, []);

  // Calculate monthly projection (assuming 22 working days)
  const monthlyProjection = metrics.savings * 22;
  const yearlyProjection = monthlyProjection * 12;

  return (
    <div className="topbar">
      {/* Fleet Status */}
      <div className="topbar-metrics">
        <div className="metric-item">
          <div className="metric-icon active-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 3h14l4 4v11H1V3z" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.active}</div>
            <div className="metric-label">{t.activeVehicles}</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className="metric-item">
          <div className="metric-icon ontime-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.onTime}%</div>
            <div className="metric-label">{t.onTimeDelivery}</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className={`metric-item ${metrics.alerts > 0 ? 'alert-active' : ''}`}>
          <div className="metric-icon alert-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.77 3h16.82a2 2 0 0 0 1.77-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.alerts}</div>
            <div className="metric-label">{t.activeAlerts}</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        {/* Fuel Saved - Key differentiator */}
        <div className="metric-item fuel-metric">
          <div className="metric-icon fuel-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 22V8a2 2 0 012-2h6a2 2 0 012 2v14"/>
              <path d="M13 10h4a2 2 0 012 2v8a2 2 0 01-2 2"/>
              <path d="M15 22v-4"/>
              <rect x="5" y="2" width="6" height="4"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metrics.fuelSaved}L</div>
            <div className="metric-label">{t.fuelSaved}</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        {/* Today's Savings with Animation */}
        <div className={`metric-item savings-metric ${metrics.animateSavings ? 'animate-savings' : ''}`}>
          <div className="metric-icon savings-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">₹{metrics.savings.toLocaleString()}</div>
            <div className="metric-label">{t.todaysSavings}</div>
          </div>
        </div>

        {/* Monthly/Yearly Projection - Shows ROI */}
        {metrics.savings > 0 && (
          <>
            <div className="metric-separator"></div>
            <div className="metric-item projection-metric">
              <div className="metric-icon projection-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-value projected-value">₹{(yearlyProjection / 100000).toFixed(1)}L/yr</div>
                <div className="metric-label">{t.projectedAnnual}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Cost Comparison Badge - Shows competitive advantage */}
      <div className="cost-comparison-badge">
        <div className="badge-content">
          <span className="badge-label">ChainSync</span>
          <span className="badge-price">₹599/vehicle</span>
          <span className="badge-vs">vs ₹1,500+ competitors</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
