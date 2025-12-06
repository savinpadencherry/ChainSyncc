// This component shows a live stream of AI decisions and system actions
import React, { useState, useEffect, useMemo } from 'react';
import { vehicleData, demoScenarios, extendedTrafficIncidents, trafficIncidents } from '../data/mockData';
import './DecisionStream.css';

// DecisionStream component - displays real-time AI decisions
function DecisionStream() {
  const [activeScenarios, setActiveScenarios] = useState([]);
  const [resolvedScenarios, setResolvedScenarios] = useState([]);
  const [isResolving, setIsResolving] = useState({});
  const [currentTime, setCurrentTime] = useState('14:32');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showScenarioMenu, setShowScenarioMenu] = useState(false);

  // All available scenarios for the extended demo
  const allScenarios = useMemo(() => [
    { id: 'traffic-1', type: 'traffic', title: '🚧 Traffic Congestion', data: trafficIncidents[0], scenario: demoScenarios[0] },
    { id: 'weather-1', type: 'weather', title: '🌧️ Weather Alert', data: extendedTrafficIncidents[1], scenario: demoScenarios[2] },
    { id: 'breakdown-1', type: 'breakdown', title: '🔧 Vehicle Breakdown', data: extendedTrafficIncidents[2], scenario: demoScenarios[3] },
    { id: 'fuel-1', type: 'fuel', title: '⛽ Fuel Price Spike', data: extendedTrafficIncidents[3], scenario: demoScenarios[4] },
    { id: 'urgent-1', type: 'urgent', title: '📦 Urgent Order', data: null, scenario: demoScenarios[5] },
    { id: 'sla-1', type: 'sla', title: '⏰ SLA Breach Warning', data: null, scenario: demoScenarios[6] },
    { id: 'fatigue-1', type: 'fatigue', title: '😴 Driver Fatigue', data: null, scenario: demoScenarios[7] },
  ], []);

  // Update time periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Listen for simulation events
  useEffect(() => {
    const handleTrafficAlert = () => {
      if (!activeScenarios.find(s => s.id === 'traffic-1')) {
        setActiveScenarios(prev => [...prev, allScenarios[0]]);
      }
    };
    
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    return () => window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
  }, [activeScenarios]);

  // Trigger next scenario in sequence
  const handleTriggerNextScenario = () => {
    if (scenarioIndex < allScenarios.length) {
      const nextScenario = allScenarios[scenarioIndex];
      if (!activeScenarios.find(s => s.id === nextScenario.id) && !resolvedScenarios.find(s => s.id === nextScenario.id)) {
        setActiveScenarios(prev => [...prev, nextScenario]);
        setScenarioIndex(prev => prev + 1);
        if (nextScenario.id === 'traffic-1') {
          window.dispatchEvent(new CustomEvent('trafficAlertTriggered'));
        }
      }
    }
  };

  // Trigger specific scenario from menu
  const handleTriggerSpecificScenario = (scenario) => {
    if (!activeScenarios.find(s => s.id === scenario.id) && !resolvedScenarios.find(s => s.id === scenario.id)) {
      setActiveScenarios(prev => [...prev, scenario]);
      setShowScenarioMenu(false);
      if (scenario.id === 'traffic-1') {
        window.dispatchEvent(new CustomEvent('trafficAlertTriggered'));
      }
    }
  };

  // AI Resolve handler
  const handleAIResolve = (scenarioId) => {
    setIsResolving(prev => ({ ...prev, [scenarioId]: true }));
    
    setTimeout(() => {
      setIsResolving(prev => ({ ...prev, [scenarioId]: false }));
      const resolved = activeScenarios.find(s => s.id === scenarioId);
      setResolvedScenarios(prev => [...prev, resolved]);
      setActiveScenarios(prev => prev.filter(s => s.id !== scenarioId));
      window.dispatchEvent(new CustomEvent('routeOptimized', { detail: { scenarioId } }));
    }, 2500);
  };

  // Reset all scenarios
  const handleResetDemo = () => {
    setActiveScenarios([]);
    setResolvedScenarios([]);
    setIsResolving({});
    setScenarioIndex(0);
  };
  
  // Calculate remaining scenarios
  const remainingScenarios = allScenarios.filter(
    s => !activeScenarios.find(a => a.id === s.id) && !resolvedScenarios.find(r => r.id === s.id)
  );

  return (
    <div className="decisions-stream">
      {/* Header */}
      <div className="stream-header">
        <h3>Event Log</h3>
        <div className="header-controls">
          {remainingScenarios.length > 0 && (
            <div className="demo-controls">
              <button className="demo-trigger-btn" onClick={handleTriggerNextScenario}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Next Issue ({remainingScenarios.length} left)
              </button>
              <button className="demo-menu-btn" onClick={() => setShowScenarioMenu(!showScenarioMenu)}>
                ▼
              </button>
            </div>
          )}
          {(activeScenarios.length > 0 || resolvedScenarios.length > 0) && (
            <button className="reset-demo-btn" onClick={handleResetDemo}>
              Reset
            </button>
          )}
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Scenario Selection Menu */}
      {showScenarioMenu && (
        <div className="scenario-menu">
          <div className="scenario-menu-title">Select Scenario to Trigger:</div>
          {remainingScenarios.map(scenario => (
            <button 
              key={scenario.id} 
              className="scenario-menu-item"
              onClick={() => handleTriggerSpecificScenario(scenario)}
            >
              {scenario.title}
            </button>
          ))}
        </div>
      )}
      
      {/* Event Log Content */}
      <div className="stream-content">
        {/* Active Scenarios - Pending Issues */}
        {activeScenarios.map(scenario => (
          <div key={scenario.id} className={`decision-entry alert urgent`}>
            <div className="decision-time">{currentTime}</div>
            <div className="decision-content">
              <div className="decision-title">
                <span className="alert-icon">{scenario.title.split(' ')[0]}</span>
                {scenario.title.substring(scenario.title.indexOf(' ') + 1)}
              </div>
              <div className="decision-text">
                <strong>{scenario.scenario.issue}</strong>
                <br />
                Affected: <span className="highlight">{scenario.scenario.affectedTruck}</span>
                {scenario.scenario.estimatedDelay > 0 && (
                  <>
                    <br />
                    Estimated delay: <span className="danger">{scenario.scenario.estimatedDelay} minutes</span>
                  </>
                )}
              </div>
              
              <button 
                className={`ai-resolve-btn ${isResolving[scenario.id] ? 'resolving' : ''}`}
                onClick={() => handleAIResolve(scenario.id)}
                disabled={isResolving[scenario.id]}
              >
                {isResolving[scenario.id] ? (
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
            </div>
            <div className="decision-status">⏳</div>
          </div>
        ))}

        {/* Resolved Scenarios */}
        {resolvedScenarios.map(scenario => (
          <div key={scenario.id} className={`decision-entry alert resolved`}>
            <div className="decision-time">{currentTime}</div>
            <div className="decision-content">
              <div className="decision-title">
                <span className="alert-icon">{scenario.title.split(' ')[0]}</span>
                {scenario.title.substring(scenario.title.indexOf(' ') + 1)}
              </div>
              <div className="resolution-result">
                <div className="result-header">
                  <span className="success-icon">✓</span>
                  AI Resolution Applied
                </div>
                <div className="result-details">
                  <div className="result-row">
                    <span>Action:</span>
                    <span className="value">{scenario.scenario.aiSolution.action}</span>
                  </div>
                  {scenario.scenario.aiSolution.timeSaved && (
                    <div className="result-row">
                      <span>Result:</span>
                      <span className="value positive">{scenario.scenario.aiSolution.timeSaved}</span>
                    </div>
                  )}
                  <div className="result-row total">
                    <span>Net Benefit:</span>
                    <span className="value positive">{scenario.scenario.aiSolution.netBenefit}</span>
                  </div>
                </div>
                {scenario.scenario.aiSolution.loadConsideration && (
                  <div className="ai-reasoning">
                    <strong>AI Reasoning:</strong>
                    <ul>
                      <li>{scenario.scenario.aiSolution.loadConsideration}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="decision-status">✓</div>
          </div>
        ))}
        
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
          {activeScenarios.length + resolvedScenarios.length + 5} events • {activeScenarios.length} pending • {resolvedScenarios.length} resolved
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