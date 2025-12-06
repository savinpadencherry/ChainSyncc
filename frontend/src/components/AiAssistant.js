// AI Assistant component - quick actions and insights panel
import React, { useState } from 'react';
import { vehicleData } from '../data/mockData';
import './AiAssistant.css';

function AiAssistant() {
  const [selectedTruck, setSelectedTruck] = useState(vehicleData[1]); // TRK-002 default
  const [queryResult, setQueryResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const quickActions = [
    { id: 'optimize', label: 'Optimize all routes', icon: '🛣️' },
    { id: 'fuel', label: 'Show fuel status', icon: '⛽' },
    { id: 'delays', label: 'Check for delays', icon: '⏱️' },
    { id: 'cost', label: 'Cost analysis', icon: '💰' }
  ];

  const handleQuickAction = (actionId) => {
    setIsProcessing(true);
    setQueryResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      switch(actionId) {
        case 'optimize':
          setQueryResult({
            title: 'Route Optimization Complete',
            message: '7 routes analyzed. 3 routes optimized with total savings of 145km and ₹4,350.',
            type: 'success'
          });
          break;
        case 'fuel':
          const lowFuel = vehicleData.filter(v => v.fuel < 60);
          setQueryResult({
            title: 'Fuel Status Report',
            message: `${lowFuel.length} trucks need refueling: ${lowFuel.map(v => v.id).join(', ')}`,
            type: lowFuel.length > 0 ? 'warning' : 'success'
          });
          break;
        case 'delays':
          const affectedTrucks = vehicleData.filter(v => v.affectedByTraffic);
          setQueryResult({
            title: 'Delay Analysis',
            message: `${affectedTrucks.length} trucks affected by traffic. Click "Simulate Issue" in Event Log to demo AI resolution.`,
            type: 'info'
          });
          break;
        case 'cost':
          setQueryResult({
            title: 'Cost Analysis',
            message: 'Today\'s fleet cost: ₹45,230 | Projected savings: ₹8,960 (19.8%) with route optimization.',
            type: 'success'
          });
          break;
        default:
          break;
      }
    }, 1000);
  };

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <h3>AI Assistant</h3>
        <div className="ai-status-badge">
          <div className="status-dot"></div>
          <span>Ready</span>
        </div>
      </div>
      
      <div className="ai-content">
        {/* Truck Selector */}
        <div className="ai-selector">
          <label>Focus on:</label>
          <select 
            className="ai-select"
            value={selectedTruck.id}
            onChange={(e) => {
              const truck = vehicleData.find(v => v.id === e.target.value);
              if (truck) setSelectedTruck(truck);
            }}
          >
            {vehicleData.filter(v => v.status === 'active').map(truck => (
              <option key={truck.id} value={truck.id}>
                {truck.id} - {truck.driver}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <p className="section-label">Quick Actions</p>
          <div className="action-grid">
            {quickActions.map(action => (
              <button
                key={action.id}
                className="action-btn"
                onClick={() => handleQuickAction(action.id)}
                disabled={isProcessing}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Processing indicator */}
        {isProcessing && (
          <div className="processing">
            <div className="processing-spinner"></div>
            <span>AI Processing...</span>
          </div>
        )}

        {/* Query Result */}
        {queryResult && !isProcessing && (
          <div className={`query-result ${queryResult.type}`}>
            <div className="result-title">{queryResult.title}</div>
            <div className="result-message">{queryResult.message}</div>
          </div>
        )}

        {/* Truck insight */}
        <div className="truck-insight">
          <p className="section-label">Current Insight</p>
          <div className="insight-card">
            <div className="insight-header">
              <span className="truck-badge">{selectedTruck.id}</span>
              <span className={`status-tag ${selectedTruck.status}`}>{selectedTruck.status}</span>
            </div>
            <div className="insight-body">
              <p><strong>Load:</strong> {selectedTruck.loadUtilization}% utilized</p>
              <p><strong>Route:</strong> {selectedTruck.routeStops.length} stops, {selectedTruck.currentStopIndex} completed</p>
              <p><strong>ETA:</strong> {selectedTruck.eta}</p>
              {selectedTruck.affectedByTraffic && (
                <p className="traffic-warning">⚠️ Traffic issue detected on route</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiAssistant;