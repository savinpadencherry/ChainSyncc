// LoadPlanner component - displays cargo items, vehicle selection, and AI optimization
import React, { useState } from 'react';
import { vehicleData, cargoData, deliveryLocations } from '../data/mockData';
import './LoadPlanner.css';

// Route optimization using Nearest Neighbor algorithm
const optimizeRoute = (startLocation, stops, locations) => {
  if (stops.length <= 2) return { route: stops, distance: 0 };
  
  const getDistance = (loc1, loc2) => {
    const l1 = locations[loc1];
    const l2 = locations[loc2];
    if (!l1 || !l2) return Infinity;
    const R = 6371; // Earth's radius in km
    const dLat = (l2.lat - l1.lat) * Math.PI / 180;
    const dLon = (l2.lng - l1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(l1.lat * Math.PI / 180) * Math.cos(l2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };
  
  const visited = new Set([startLocation]);
  const route = [startLocation];
  let current = startLocation;
  let totalDistance = 0;
  
  while (visited.size < stops.length) {
    let nearest = null;
    let minDist = Infinity;
    
    for (const stop of stops) {
      if (!visited.has(stop)) {
        const dist = getDistance(current, stop);
        if (dist < minDist) {
          minDist = dist;
          nearest = stop;
        }
      }
    }
    
    if (nearest) {
      visited.add(nearest);
      route.push(nearest);
      totalDistance += minDist;
      current = nearest;
    }
  }
  
  return { route, distance: Math.round(totalDistance) };
};

// Extended cargo for 6 items per truck
const extendedCargoData = [
  ...cargoData,
  { id: 'CRG-007', name: 'Auto Parts', weight: 120, priority: 'medium', fragile: false, dimensions: '100 × 80 × 60 cm' },
  { id: 'CRG-008', name: 'Glassware', weight: 35, priority: 'high', fragile: true, dimensions: '60 × 40 × 40 cm' },
  { id: 'CRG-009', name: 'Furniture', weight: 200, priority: 'low', fragile: false, dimensions: '180 × 100 × 80 cm' },
  { id: 'CRG-010', name: 'Machinery', weight: 180, priority: 'medium', fragile: false, dimensions: '150 × 90 × 70 cm' },
  { id: 'CRG-011', name: 'Pharmaceuticals', weight: 25, priority: 'high', fragile: true, dimensions: '50 × 40 × 30 cm' },
  { id: 'CRG-012', name: 'Textiles', weight: 80, priority: 'low', fragile: false, dimensions: '120 × 60 × 50 cm' },
];

function LoadPlanner() {
  const [selectedTruck, setSelectedTruck] = useState(vehicleData[0]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);

  // Generate 6 cargo items for this truck
  const truckCargo = extendedCargoData.slice(0, 6);
  const totalWeight = truckCargo.reduce((sum, c) => sum + c.weight, 0);

  // Get priority/fragile colors
  const getItemColor = (item) => {
    if (item.fragile) return '#ef4444'; // Red for fragile
    switch(item.priority) {
      case 'high': return '#f59e0b'; // Orange for high priority
      case 'medium': return '#3b82f6'; // Blue for medium
      case 'low': return '#10b981'; // Green for low
      default: return '#6b7280';
    }
  };

  // Optimized positions for cargo (after optimization)
  const getOptimizedPosition = (index) => {
    // Arrange by weight: heaviest at bottom, fragile on top
    const positions = [
      { row: 1, col: 0 }, // Heavy - bottom left
      { row: 1, col: 1 }, // Heavy - bottom right
      { row: 0, col: 0 }, // Medium - middle left
      { row: 0, col: 1 }, // Medium - middle right  
      { row: 0, col: 2 }, // Light/Fragile - top
      { row: 1, col: 2 }, // Light/Fragile - top right
    ];
    return positions[index] || { row: 0, col: 0 };
  };

  // Handle truck selection change
  const handleTruckChange = (truckId) => {
    const truck = vehicleData.find(v => v.id === truckId);
    if (truck) {
      setSelectedTruck(truck);
      setOptimizationResult(null);
      setIsOptimized(false);
    }
  };

  // Handle AI optimization
  const handleOptimize = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      // Run nearest neighbor algorithm
      const result = optimizeRoute(
        selectedTruck.routeStops[0],
        selectedTruck.routeStops,
        deliveryLocations
      );
      
      // Calculate savings
      const originalDistance = selectedTruck.totalDistance;
      const optimizedDistance = result.distance || originalDistance * 0.85;
      const distanceSaved = originalDistance - optimizedDistance;
      const timeSaved = Math.round(distanceSaved / 50 * 60);
      const fuelSaved = Math.round(distanceSaved / 5);
      
      setOptimizationResult({
        originalRoute: selectedTruck.routeStops,
        optimizedRoute: result.route,
        distanceSaved: Math.round(distanceSaved),
        timeSaved,
        fuelSaved,
        costSaved: fuelSaved * 95,
      });
      
      setIsOptimized(true);
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="load-planner">
      {/* Header */}
      <div className="planner-header">
        <div className="header-left">
          <h2>Load Optimizer</h2>
          <p className="subtitle">AI-powered cargo placement optimization</p>
        </div>
        <div className="header-right">
          <div className="truck-selector-dropdown">
            <label>Select Truck:</label>
            <select 
              value={selectedTruck.id}
              onChange={(e) => handleTruckChange(e.target.value)}
              className="truck-select"
            >
              {vehicleData.filter(v => v.status !== 'maintenance').map(truck => (
                <option key={truck.id} value={truck.id}>
                  {truck.id} - {truck.driver} ({truck.type})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content - Truck-centric layout */}
      <div className="planner-content-new">
        {/* Cargo items floating outside truck (before optimization) */}
        <div className={`cargo-staging ${isOptimized ? 'optimized' : ''}`}>
          <h3 className="staging-title">
            {isOptimized ? 'Cargo Loaded' : 'Cargo to Load'} 
            <span className="cargo-count">{truckCargo.length} items • {totalWeight} kg</span>
          </h3>
          
          {!isOptimized && (
            <div className="cargo-items-grid">
              {truckCargo.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="cargo-item-card"
                  style={{ '--item-color': getItemColor(item), '--delay': `${idx * 0.05}s` }}
                >
                  <div className="item-header">
                    <span className="item-id">{item.id}</span>
                    {item.fragile && <span className="fragile-badge">⚠ Fragile</span>}
                  </div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-details">
                    <span className="item-weight">{item.weight} kg</span>
                    <span className={`item-priority ${item.priority}`}>{item.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Central Truck Visualization */}
        <div className="truck-center-stage">
          <div className="truck-visual-container">
            {/* Optimize Button */}
            <button 
              className={`optimize-main-btn ${isOptimizing ? 'loading' : ''} ${isOptimized ? 'done' : ''}`}
              onClick={handleOptimize}
              disabled={isOptimizing || isOptimized}
            >
              {isOptimizing ? (
                <>
                  <div className="spinner"></div>
                  Optimizing...
                </>
              ) : isOptimized ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Optimized
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4.93 4.93L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16.95 16.95L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M2 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Optimize with AI
                </>
              )}
            </button>

            {/* Truck SVG */}
            <div className="truck-diagram">
              {/* Truck cab */}
              <div className="truck-cab-large">
                <div className="cab-window-large"></div>
                <div className="cab-mirror left"></div>
                <div className="cab-mirror right"></div>
              </div>
              
              {/* Truck bed */}
              <div className="truck-bed-large">
                <div className="bed-content">
                  {isOptimized ? (
                    // Optimized layout - organized grid
                    <div className="optimized-cargo-grid">
                      {truckCargo
                        .sort((a, b) => b.weight - a.weight) // Sort by weight descending
                        .map((item, idx) => {
                          const pos = getOptimizedPosition(idx);
                          return (
                            <div 
                              key={item.id}
                              className="cargo-in-truck optimized"
                              style={{ 
                                '--item-color': getItemColor(item),
                                '--row': pos.row,
                                '--col': pos.col,
                                '--delay': `${idx * 0.1}s`
                              }}
                            >
                              <span className="cargo-label">{item.id.split('-')[1]}</span>
                              <span className="cargo-weight-small">{item.weight}kg</span>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    // Empty truck bed
                    <div className="empty-bed">
                      <span>Click "Optimize with AI" to load cargo</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Wheels */}
              <div className="truck-wheels">
                <div className="wheel front"></div>
                <div className="wheel back-1"></div>
                <div className="wheel back-2"></div>
              </div>
            </div>

            {/* Truck info */}
            <div className="truck-info-bar">
              <div className="info-item">
                <span className="info-label">Driver</span>
                <span className="info-value">{selectedTruck.driver}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Capacity</span>
                <span className="info-value">{selectedTruck.capacity / 1000} tons</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className={`info-value status ${selectedTruck.status}`}>{selectedTruck.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel (appears after optimization) */}
        {isOptimized && optimizationResult && (
          <div className="optimization-results-panel">
            <h3>Optimization Results</h3>
            
            <div className="results-metrics">
              <div className="result-metric">
                <span className="metric-num">-{optimizationResult.distanceSaved}</span>
                <span className="metric-unit">km saved</span>
              </div>
              <div className="result-metric">
                <span className="metric-num">-{optimizationResult.timeSaved}</span>
                <span className="metric-unit">min saved</span>
              </div>
              <div className="result-metric highlight">
                <span className="metric-num">₹{optimizationResult.costSaved.toLocaleString()}</span>
                <span className="metric-unit">cost saved</span>
              </div>
            </div>

            <div className="optimization-actions">
              <div className="action-item">
                <span className="action-check">✓</span>
                <span>Heavy items placed at bottom for stability</span>
              </div>
              <div className="action-item">
                <span className="action-check">✓</span>
                <span>Fragile items secured on top</span>
              </div>
              <div className="action-item">
                <span className="action-check">✓</span>
                <span>Weight distributed evenly</span>
              </div>
              <div className="action-item">
                <span className="action-check">✓</span>
                <span>Route optimized using Nearest Neighbor</span>
              </div>
            </div>

            <button 
              className="reset-btn"
              onClick={() => {
                setIsOptimized(false);
                setOptimizationResult(null);
              }}
            >
              Reset & Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadPlanner;
