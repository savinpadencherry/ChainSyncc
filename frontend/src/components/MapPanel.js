// Import React hooks for state management
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Import Leaflet CSS for proper map styling
import 'leaflet/dist/leaflet.css';
// Import Leaflet library for marker icons
import L from 'leaflet';
// Import mock data
import { vehicleData, deliveryLocations } from '../data/mockData';
// Import our custom CSS for additional styling
import './MapPanel.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom truck icons with status colors
const createTruckIcon = (status, isSelected = false) => {
  const colors = {
    active: '#10b981',
    idle: '#f59e0b',
    maintenance: '#ef4444',
    alert: '#ef4444',
    optimized: '#22c55e'
  };
  const color = colors[status] || colors.active;
  const size = isSelected ? [44, 44] : [32, 32];
  const anchor = isSelected ? [22, 44] : [16, 32];
  
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 24 24">
        <rect x="1" y="3" width="14" height="12" rx="2" fill="${color}" stroke="white" stroke-width="1.5"/>
        <path d="M15 8L19 8L21 11V15H15V8Z" fill="${color}" stroke="white" stroke-width="1.5"/>
        <circle cx="6" cy="17" r="2" fill="${color}" stroke="white" stroke-width="1.5"/>
        <circle cx="17" cy="17" r="2" fill="${color}" stroke="white" stroke-width="1.5"/>
        ${isSelected ? '<circle cx="8" cy="9" r="2" fill="white"/>' : ''}
      </svg>
    `),
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -anchor[1]]
  });
};

// Create stop marker icon
const createStopIcon = (index, isVisited = false) => {
  const color = isVisited ? '#22c55e' : '#4fd1c7';
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="12" fill="${color}" stroke="white" stroke-width="2"/>
        <text x="14" y="19" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${index + 1}</text>
      </svg>
    `),
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

// Fetch real road route from OSRM
const fetchRoadRoute = async (coordinates) => {
  if (coordinates.length < 2) return coordinates;
  
  try {
    // Format: lng,lat;lng,lat;...
    const coordString = coordinates.map(c => `${c[1]},${c[0]}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes[0]) {
      // OSRM returns [lng, lat], we need [lat, lng] for Leaflet
      return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
    }
  } catch (error) {
    console.warn('OSRM routing failed, using straight lines:', error);
  }
  
  return coordinates;
};

// Main MapPanel component function
function MapPanel() {
  // State management
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulatedPositions, setSimulatedPositions] = useState({});
  const [trafficAlertTriggered, setTrafficAlertTriggered] = useState(false);
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [vehicles, setVehicles] = useState(vehicleData);
  const [roadRoutes, setRoadRoutes] = useState({}); // Cache for fetched road routes
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  
  // Map references
  const mapId = useRef(`map-${Date.now()}-${Math.random()}`);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const routeLinesRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);

  // India's center coordinates
  const indiaCenter = [20.5937, 78.9629];
  const zoomLevel = 5;

  // Get route coordinates from stop names
  const getRouteCoordinates = useCallback((stops) => {
    return stops.map(stop => {
      const loc = deliveryLocations[stop];
      return loc ? [loc.lat, loc.lng] : null;
    }).filter(Boolean);
  }, []);

  // Listen for traffic events
  useEffect(() => {
    const handleTrafficAlert = () => {
      setTrafficAlertTriggered(true);
    };
    const handleRouteOptimized = () => {
      setRouteOptimized(true);
    };
    
    window.addEventListener('trafficAlertTriggered', handleTrafficAlert);
    window.addEventListener('routeOptimized', handleRouteOptimized);
    
    return () => {
      window.removeEventListener('trafficAlertTriggered', handleTrafficAlert);
      window.removeEventListener('routeOptimized', handleRouteOptimized);
    };
  }, []);

  // Fetch road routes for all vehicles on mount
  useEffect(() => {
    const fetchAllRoutes = async () => {
      setLoadingRoutes(true);
      const routes = {};
      
      for (const vehicle of vehicles) {
        const coords = getRouteCoordinates(vehicle.routeStops);
        if (coords.length >= 2) {
          const roadRoute = await fetchRoadRoute(coords);
          routes[vehicle.id] = roadRoute;
        }
      }
      
      setRoadRoutes(routes);
      setLoadingRoutes(false);
    };
    
    fetchAllRoutes();
  }, [vehicles, getRouteCoordinates]);

  // Initialize map
  useEffect(() => {
    if (mapInstanceRef.current || !mapId.current) return;

    const initMap = () => {
      try {
        const container = document.getElementById(mapId.current);
        if (!container) return;
        if (container._leaflet_id) delete container._leaflet_id;

        const map = L.map(container, {
          center: indiaCenter,
          zoom: zoomLevel,
          zoomControl: false,
          worldCopyJump: false,
          maxBounds: [[4, 65], [38, 100]],
          maxBoundsViscosity: 1.0
        });

        // Use standard OSM tiles (they work better)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          noWrap: true
        }).addTo(map);

        mapInstanceRef.current = map;
        setMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    const timer = setTimeout(initMap, 100);
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          setMapReady(false);
        } catch (error) {}
      }
    };
  }, []);

  // Add/update markers and routes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      if (mapInstanceRef.current) mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = {};

    // Clear existing route lines
    routeLinesRef.current.forEach(line => {
      if (mapInstanceRef.current) mapInstanceRef.current.removeLayer(line);
    });
    routeLinesRef.current = [];

    if (showMarkers) {
      vehicles.forEach((vehicle) => {
        const status = vehicle.affectedByTraffic && trafficAlertTriggered && !routeOptimized 
          ? 'alert' 
          : (vehicle.affectedByTraffic && routeOptimized ? 'optimized' : vehicle.status);
        
        const position = simulatedPositions[vehicle.id] || vehicle.currentPosition;
        const isSelected = selectedVehicle?.id === vehicle.id;
        
        const marker = L.marker(position, { 
          icon: createTruckIcon(status, isSelected) 
        }).addTo(mapInstanceRef.current);

        // Popup content
        const popupContent = `
          <div class="vehicle-popup">
            <h4>${vehicle.id}</h4>
            <p><strong>Driver:</strong> ${vehicle.driver}</p>
            <p><strong>Status:</strong> <span class="status ${status}">${status}</span></p>
            <p><strong>Location:</strong> ${vehicle.currentLocation}</p>
            <p><strong>Fuel:</strong> ${vehicle.fuel}%</p>
            <p><strong>Load:</strong> ${vehicle.loadUtilization}%</p>
            <p><strong>ETA:</strong> ${vehicle.eta}</p>
            ${vehicle.affectedByTraffic && trafficAlertTriggered ? '<p class="traffic-alert">⚠️ Traffic Issue</p>' : ''}
          </div>
        `;
        marker.bindPopup(popupContent);
        marker.on('click', () => setSelectedVehicle(vehicle));
        markersRef.current[vehicle.id] = marker;
      });
    }

    // Draw routes for selected vehicle or all active vehicles
    if (showRoutes && Object.keys(roadRoutes).length > 0) {
      const vehiclesToShow = selectedVehicle ? [selectedVehicle] : vehicles.filter(v => v.status === 'active');
      
      vehiclesToShow.forEach((vehicle) => {
        const routeCoords = roadRoutes[vehicle.id] || getRouteCoordinates(vehicle.routeStops);
        
        if (routeCoords.length > 1) {
          const isAffected = vehicle.affectedByTraffic && trafficAlertTriggered;
          const isOptimizedRoute = vehicle.affectedByTraffic && routeOptimized;
          
          const routeLine = L.polyline(routeCoords, {
            color: isOptimizedRoute ? '#22c55e' : (isAffected ? '#ef4444' : '#3b82f6'),
            weight: selectedVehicle?.id === vehicle.id ? 5 : 3,
            opacity: selectedVehicle?.id === vehicle.id ? 0.9 : 0.6,
            dashArray: isAffected && !isOptimizedRoute ? '10, 10' : null
          }).addTo(mapInstanceRef.current);
          
          routeLinesRef.current.push(routeLine);

          // Add stop markers for selected vehicle
          if (selectedVehicle?.id === vehicle.id) {
            vehicle.routeStops.forEach((stop, index) => {
              const loc = deliveryLocations[stop];
              if (loc) {
                const isVisited = index < vehicle.currentStopIndex;
                const stopMarker = L.marker([loc.lat, loc.lng], {
                  icon: createStopIcon(index, isVisited)
                }).addTo(mapInstanceRef.current);
                stopMarker.bindPopup(`<strong>${index + 1}. ${stop}</strong><br/>${isVisited ? '✓ Visited' : 'Pending'}`);
                markersRef.current[`stop-${vehicle.id}-${index}`] = stopMarker;
              }
            });
          }
        }
      });
    }
  }, [showMarkers, showRoutes, mapReady, vehicles, selectedVehicle, simulatedPositions, trafficAlertTriggered, routeOptimized, roadRoutes, getRouteCoordinates]);

  // Simulation function
  const startSimulation = () => {
    if (simulationActive) {
      setSimulationActive(false);
      return;
    }
    
    setSimulationActive(true);
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      
      // After 3 seconds, trigger traffic alert
      if (step === 3) {
        window.dispatchEvent(new CustomEvent('trafficAlertTriggered'));
      }
      
      // Move vehicles along their routes
      setSimulatedPositions(prev => {
        const newPositions = { ...prev };
        vehicles.forEach(vehicle => {
          if (vehicle.status === 'active') {
            const routeCoords = roadRoutes[vehicle.id] || getRouteCoordinates(vehicle.routeStops);
            if (routeCoords.length > 1) {
              const progress = (step % 30) / 30;
              const totalPoints = routeCoords.length - 1;
              const currentIndex = Math.floor(progress * totalPoints);
              
              if (currentIndex < totalPoints) {
                const start = routeCoords[currentIndex];
                const end = routeCoords[currentIndex + 1];
                const segmentProgress = (progress * totalPoints) % 1;
                newPositions[vehicle.id] = [
                  start[0] + (end[0] - start[0]) * segmentProgress,
                  start[1] + (end[1] - start[1]) * segmentProgress
                ];
              }
            }
          }
        });
        return newPositions;
      });
      
      if (step >= 60) {
        clearInterval(interval);
        setSimulationActive(false);
      }
    }, 1000);
  };

  // Fleet statistics
  const activeCount = vehicles.filter(v => v.status === 'active').length;
  const idleCount = vehicles.filter(v => v.status === 'idle').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;

  return (
    <div className="map-panel">
      {/* Header section */}
      <div className="map-header">
        <div className="map-title">
          <h3>Live Fleet Tracking</h3>
          <span className="vehicle-count">{vehicles.length} trucks • {activeCount} active</span>
        </div>
        
        <div className="map-controls">
          <button 
            className={`control-btn simulation ${simulationActive ? 'active' : ''}`}
            onClick={startSimulation}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              {simulationActive ? (
                <rect x="6" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2"/>
              ) : (
                <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2" fill="none"/>
              )}
            </svg>
            {simulationActive ? 'Stop' : 'Simulate'}
          </button>
          
          <button className="control-btn india active" onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView(indiaCenter, zoomLevel);
            }
            setSelectedVehicle(null);
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Reset View
          </button>
        </div>
      </div>

      {/* Main map container */}
      <div className="map-container">
        <div 
          id={mapId.current}
          className="leaflet-map"
          style={{ width: '100%', height: '100%' }}
        ></div>

        {/* Loading indicator */}
        {loadingRoutes && (
          <div className="route-loading">
            <div className="loading-spinner"></div>
            <span>Loading road routes...</span>
          </div>
        )}

        {/* Zoom controls */}
        <div className="map-zoom-controls">
          <button className="zoom-btn zoom-in" onClick={() => mapInstanceRef.current?.zoomIn()}>+</button>
          <button className="zoom-btn zoom-out" onClick={() => mapInstanceRef.current?.zoomOut()}>−</button>
        </div>

        {/* Fleet Legend */}
        <div className="traffic-legend">
          <div className="legend-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Fleet Status
          </div>
          
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color active"></div>
              <span>Active ({activeCount})</span>
            </div>
            <div className="legend-item">
              <div className="legend-color idle"></div>
              <span>Idle ({idleCount})</span>
            </div>
            <div className="legend-item">
              <div className="legend-color maintenance"></div>
              <span>Maintenance ({maintenanceCount})</span>
            </div>
          </div>
          
          <div className="legend-controls">
            <button 
              className={`legend-btn ${showRoutes ? 'active' : ''}`}
              onClick={() => setShowRoutes(!showRoutes)}
            >
              Routes
            </button>
            <button 
              className={`legend-btn ${showMarkers ? 'active' : ''}`}
              onClick={() => setShowMarkers(!showMarkers)}
            >
              Trucks
            </button>
          </div>
        </div>

        {/* Truck selector panel */}
        <div className="truck-selector">
          <div className="selector-header">Select Truck</div>
          <div className="truck-list">
            {vehicles.map(vehicle => (
              <button
                key={vehicle.id}
                className={`truck-btn ${selectedVehicle?.id === vehicle.id ? 'selected' : ''} ${vehicle.status}`}
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  if (mapInstanceRef.current) {
                    const pos = simulatedPositions[vehicle.id] || vehicle.currentPosition;
                    mapInstanceRef.current.setView(pos, 8);
                  }
                }}
              >
                <span className="truck-id">{vehicle.id}</span>
                <span className={`truck-status ${vehicle.status}`}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected vehicle details */}
        {selectedVehicle && (
          <div className="vehicle-details">
            <div className="details-header">
              <h4>{selectedVehicle.id}</h4>
              <button className="close-btn" onClick={() => setSelectedVehicle(null)}>×</button>
            </div>
            <div className="details-content">
              <p><strong>Driver:</strong> {selectedVehicle.driver}</p>
              <p><strong>Type:</strong> {selectedVehicle.type}</p>
              <p><strong>Status:</strong> <span className={`status ${selectedVehicle.status}`}>{selectedVehicle.status}</span></p>
              <p><strong>Location:</strong> {selectedVehicle.currentLocation}</p>
              <p><strong>Fuel:</strong> {selectedVehicle.fuel}%</p>
              <p><strong>Load:</strong> {selectedVehicle.loadUtilization}%</p>
              <p><strong>ETA:</strong> {selectedVehicle.eta}</p>
              
              <div className="route-sequence">
                <strong>Route ({selectedVehicle.routeStops.length} stops):</strong>
                <div className="stops-list">
                  {selectedVehicle.routeStops.map((stop, i) => (
                    <span key={i} className={`stop ${i < selectedVehicle.currentStopIndex ? 'visited' : (i === selectedVehicle.currentStopIndex ? 'current' : '')}`}>
                      {i + 1}. {stop}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedVehicle.cargo.length > 0 && (
                <div className="cargo-info">
                  <strong>Cargo:</strong> {selectedVehicle.cargo.join(', ')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapPanel;
