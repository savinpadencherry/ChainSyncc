// LoadPlanner component - displays cargo items, vehicle selection, and AI optimization
import React, { useState } from 'react';
import './LoadPlanner.css';

// Sample cargo data - in real app this would come from API
const cargoData = [
  {
    id: 'CRG-001',
    name: 'Electronics Package',
    dimensions: '120 × 80 × 60 cm',
    weight: '45 kg',
    priority: 'high',
    fragile: true
  },
  {
    id: 'CRG-002', 
    name: 'Textile Rolls',
    dimensions: '150 × 40 × 40 cm',
    weight: '85 kg',
    priority: 'medium',
    fragile: false
  },
  {
    id: 'CRG-003',
    name: 'Medical Supplies',
    dimensions: '90 × 60 × 50 cm', 
    weight: '25 kg',
    priority: 'high',
    fragile: true
  },
  {
    id: 'CRG-004',
    name: 'Steel Components',
    dimensions: '200 × 100 × 80 cm',
    weight: '150 kg',
    priority: 'low',
    fragile: false
  },
  {
    id: 'CRG-005',
    name: 'Chemical Containers',
    dimensions: '80 × 80 × 120 cm',
    weight: '95 kg',
    priority: 'medium',
    fragile: true
  }
];

// Available vehicles
const vehicleOptions = [
  { id: 'TRK-001', name: 'Heavy Duty Truck', capacity: '15 tons', bedDimensions: '6m × 2.5m × 2.2m' },
  { id: 'TRK-002', name: 'Medium Transport', capacity: '8 tons', bedDimensions: '4.5m × 2.2m × 2m' },
  { id: 'TRK-003', name: 'Light Cargo Van', capacity: '3 tons', bedDimensions: '3m × 1.8m × 1.8m' },
];

function LoadPlanner() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleOptions[0]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState(new Set(cargoData.map(item => item.id)));

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#48bb78';
      default: return '#6b7280';
    }
  };

  // Handle cargo selection toggle
  const toggleCargoSelection = (cargoId) => {
    const newSelection = new Set(selectedCargo);
    if (newSelection.has(cargoId)) {
      newSelection.delete(cargoId);
    } else {
      newSelection.add(cargoId);
    }
    setSelectedCargo(newSelection);
  };

  // Handle AI optimization
  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsOptimizing(false);
      setIsOptimized(true);
    }, 2000);
  };

  // Calculate total weight of selected cargo
  const totalWeight = cargoData
    .filter(item => selectedCargo.has(item.id))
    .reduce((sum, item) => sum + parseInt(item.weight), 0);

  return (
    <div className="load-planner">
      {/* Header Section */}
      <div className="planner-header">
        <div className="header-left">
          <h2>Load Planner</h2>
          <p className="cargo-count">{selectedCargo.size} items selected • {totalWeight} kg total</p>
        </div>
        <div className="header-right">
          <div className="vehicle-selector">
            <label>Select Vehicle:</label>
            <select 
              value={selectedVehicle.id} 
              onChange={(e) => setSelectedVehicle(vehicleOptions.find(v => v.id === e.target.value))}
              className="vehicle-select"
            >
              {vehicleOptions.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.capacity})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="planner-content">
        {/* Left Panel - Cargo List */}
        <div className="cargo-panel">
          <div className="panel-header">
            <h3>Available Cargo</h3>
            <div className="cargo-stats">
              <span className="stat-item">
                <span className="stat-value">{cargoData.length}</span>
                <span className="stat-label">Total Items</span>
              </span>
              <span className="stat-item">
                <span className="stat-value">{selectedCargo.size}</span>
                <span className="stat-label">Selected</span>
              </span>
            </div>
          </div>
          
          <div className="cargo-list">
            {cargoData.map(item => (
              <div 
                key={item.id} 
                className={`cargo-item ${selectedCargo.has(item.id) ? 'selected' : ''}`}
                onClick={() => toggleCargoSelection(item.id)}
              >
                <div className="cargo-checkbox">
                  <div className={`checkbox ${selectedCargo.has(item.id) ? 'checked' : ''}`}>
                    {selectedCargo.has(item.id) && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="cargo-details">
                  <div className="cargo-header">
                    <span className="cargo-id">{item.id}</span>
                    <div className="cargo-badges">
                      {item.fragile && <span className="fragile-badge">Fragile</span>}
                      <span 
                        className="priority-badge"
                        style={{ background: getPriorityColor(item.priority) }}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="cargo-name">{item.name}</h4>
                  
                  <div className="cargo-specs">
                    <div className="spec-item">
                      <span className="spec-label">Dimensions:</span>
                      <span className="spec-value">{item.dimensions}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Weight:</span>
                      <span className="spec-value">{item.weight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Vehicle Visualization */}
        <div className="visualization-panel">
          <div className="panel-header">
            <h3>Load Visualization</h3>
            <button 
              className={`optimize-btn ${isOptimizing ? 'loading' : ''}`}
              onClick={handleOptimize}
              disabled={isOptimizing || selectedCargo.size === 0}
            >
              {isOptimizing ? (
                <>
                  <div className="loading-spinner"></div>
                  Optimizing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9.09 9A3 3 0 0 1 12 6A3 3 0 0 1 15 9M21 16A7 7 0 1 1 7 16" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 17V21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 21H16" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Optimize with AI
                </>
              )}
            </button>
          </div>

          {/* Vehicle Info */}
          <div className="vehicle-info">
            <div className="vehicle-details">
              <h4>{selectedVehicle.name}</h4>
              <div className="vehicle-specs">
                <span>Capacity: {selectedVehicle.capacity}</span>
                <span>Bed: {selectedVehicle.bedDimensions}</span>
              </div>
            </div>
          </div>

          {/* Truck Bed Visualization */}
          <div className={`truck-bed ${isOptimized ? 'optimized' : ''}`}>
            <div className="truck-outline">
              <div className="truck-cab"></div>
              <div className="truck-cargo-area">
                {selectedCargo.size > 0 ? (
                  <div className="cargo-visualization">
                    {Array.from(selectedCargo).map((cargoId, index) => {
                      const item = cargoData.find(c => c.id === cargoId);
                      return (
                        <div 
                          key={cargoId}
                          className={`cargo-box ${isOptimized ? 'optimized' : ''}`}
                          style={{
                            '--delay': `${index * 0.1}s`,
                            '--priority-color': getPriorityColor(item.priority)
                          }}
                        >
                          <span className="cargo-label">{item.id}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-bed">
                    <span>Select cargo items to visualize loading</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Optimization Results */}
          {isOptimized && (
            <div className="optimization-results">
              <h4>Optimization Results</h4>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-value">87%</div>
                  <div className="metric-change positive">+23%</div>
                  <div className="metric-label">Space Utilization</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">Balanced</div>
                  <div className="metric-change positive">Improved</div>
                  <div className="metric-label">Weight Distribution</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">42 min</div>
                  <div className="metric-change positive">-15 min</div>
                  <div className="metric-label">Loading Time</div>
                </div>
              </div>
              
              <div className="optimization-summary">
                <div className="summary-item">
                  <span className="summary-icon">✓</span>
                  <span>High-priority items placed for easy access</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">✓</span>
                  <span>Fragile items secured in protected areas</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">✓</span>
                  <span>Weight distribution optimized for stability</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoadPlanner;
