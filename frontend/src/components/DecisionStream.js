// This component shows a live stream of AI decisions and system actions
import React, { useState, useEffect } from 'react';
import { vehicleData, trafficIncidents } from '../data/mockData';
import './DecisionStream.css';

// DecisionStream component - displays real-time AI decisions
function DecisionStream() {
  const [trafficAlertTriggered, setTrafficAlertTriggered] = useState(false);
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [showIssuePopup, setShowIssuePopup] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [currentTime, setCurrentTime] = useState('14:32');

  // Listen for simulation events
  useEffect(() => {
    const handleTrafficAlert = () => {
      setTrafficAlertTriggered(true);
      setShowIssuePopup(true);
    };
    
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    return () => window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
  }, []);

  // Trigger demo alert manually
  const handleTriggerAlert = () => {
    setTrafficAlertTriggered(true);
    setShowIssuePopup(true);
    window.dispatchEvent(new CustomEvent('trafficAlertTriggered'));
  };

  // AI Resolve handler - clickable, no typing needed
  const handleAIResolve = () => {
    setIsResolving(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsResolving(false);
      setRouteOptimized(true);
      setShowIssuePopup(false);
      window.dispatchEvent(new CustomEvent('routeOptimized'));
    }, 2000);
  };

  const affectedTruck = vehicleData.find(v => v.affectedByTraffic);
  const incident = trafficIncidents[0];

  return (
    <div className="decisions-stream">
      {/* Header */}
      <div className="stream-header">
        <h3>Event Log</h3>
        <div className="header-controls">
          {!trafficAlertTriggered && (
            <button className="demo-trigger-btn" onClick={handleTriggerAlert}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Simulate Issue
            </button>
          )}
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
      
      {/* Event Log Content */}
      <div className="stream-content">
        {/* Traffic Issue Alert - Main Demo Feature */}
        {trafficAlertTriggered && (
          <div className={`decision-entry alert urgent ${routeOptimized ? 'resolved' : ''}`}>
            <div className="decision-time">{currentTime}</div>
            <div className="decision-content">
              <div className="decision-title">
                <span className="alert-icon">⚠️</span>
                Traffic Issue Detected
              </div>
              <div className="decision-text">
                <strong>{incident.type}</strong> on {incident.location}
                <br />
                Affected: <span className="highlight">{affectedTruck?.id}</span> ({affectedTruck?.driver})
                <br />
                Estimated delay: <span className="danger">{incident.estimatedDelay} minutes</span>
              </div>
              
              {!routeOptimized ? (
                <button 
                  className={`ai-resolve-btn ${isResolving ? 'resolving' : ''}`}
                  onClick={handleAIResolve}
                  disabled={isResolving}
                >
                  {isResolving ? (
                    <>
                      <div className="resolve-spinner"></div>
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Resolve with AI
                    </>
                  )}
                </button>
              ) : (
                <div className="resolution-result">
                  <div className="result-header">
                    <span className="success-icon">✓</span>
                    AI Resolution Applied
                  </div>
                  <div className="result-details">
                    <div className="result-row">
                      <span>New Route:</span>
                      <span className="value">{incident.alternativeRoute.name}</span>
                    </div>
                    <div className="result-row">
                      <span>Time Saved:</span>
                      <span className="value positive">+{incident.alternativeRoute.timeSaved} min</span>
                    </div>
                    <div className="result-row">
                      <span>Extra Fuel Cost:</span>
                      <span className="value negative">₹{incident.alternativeRoute.fuelCost}</span>
                    </div>
                    <div className="result-row total">
                      <span>Net Benefit:</span>
                      <span className="value positive">₹{(incident.alternativeRoute.timeSaved * 80 - incident.alternativeRoute.fuelCost).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="ai-reasoning">
                    <strong>AI Reasoning:</strong>
                    <ul>
                      <li>Cargo includes fragile electronics - avoiding rough alternate routes</li>
                      <li>Time value (₹80/min) exceeds fuel cost increase</li>
                      <li>Expressway route has better road conditions</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="decision-status">
              {routeOptimized ? '✓' : '⏳'}
            </div>
          </div>
        )}
        
        {/* Regular log entries */}
        <div className="decision-entry optimization">
          <div className="decision-time">14:28</div>
          <div className="decision-content">
            <div className="decision-title">Route Optimization</div>
            <div className="decision-text">TRK-003 route resequenced. ETA improved by 22 min using Nearest Neighbor algorithm.</div>
          </div>
          <div className="decision-status accepted">✓</div>
        </div>
        
        <div className="decision-entry cost-saving">
          <div className="decision-time">14:22</div>
          <div className="decision-content">
            <div className="decision-title">Cost Optimization</div>
            <div className="decision-text">Fleet fuel efficiency improved. Today's savings: ₹2,450 across 7 active vehicles.</div>
          </div>
          <div className="decision-status accepted">✓</div>
        </div>
        
        <div className="decision-entry delivery">
          <div className="decision-time">14:15</div>
          <div className="decision-content">
            <div className="decision-title">Delivery Complete</div>
            <div className="decision-text">TRK-004 completed stop 3/4 at Chennai Port. On schedule.</div>
          </div>
          <div className="decision-status completed">✓</div>
        </div>
        
        <div className="decision-entry maintenance">
          <div className="decision-time">14:08</div>
          <div className="decision-content">
            <div className="decision-title">Maintenance Alert</div>
            <div className="decision-text">TRK-009 scheduled for service. Fuel level low - refuel recommended within 50km.</div>
          </div>
          <div className="decision-status review">👁</div>
        </div>
        
        <div className="decision-entry optimization">
          <div className="decision-time">14:00</div>
          <div className="decision-content">
            <div className="decision-title">Load Balancing</div>
            <div className="decision-text">TRK-001 cargo redistributed. Weight distribution improved by 18%.</div>
          </div>
          <div className="decision-status accepted">✓</div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="stream-footer">
        <span className="stream-count">
          {trafficAlertTriggered ? (routeOptimized ? '6 events • 1 resolved' : '6 events • 1 pending') : '5 events today'}
        </span>
        <button className="stream-control">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
          </svg>
          View History
        </button>
      </div>
    </div>
  );
}

export default DecisionStream;