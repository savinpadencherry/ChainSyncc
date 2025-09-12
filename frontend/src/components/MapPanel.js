// Import React hooks for state management
import React, { useState, useEffect, useRef } from 'react';
// Import Leaflet map components for real interactive maps
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// Import Leaflet CSS for proper map styling
import 'leaflet/dist/leaflet.css';
// Import Leaflet library for marker icons
import L from 'leaflet';
// Remove traffic alert modal import - it's now handled at app level
// Import our custom CSS for additional styling
import './MapPanel.css';

// Fix for default markers in react-leaflet (they don't show up without this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom truck icons for vehicle markers
const createTruckIcon = (color = '#10b981', isHighlighted = false) => {
  const strokeColor = color === '#10b981' ? '#059669' : (color === '#ef4444' ? '#dc2626' : '#059669');
  const size = isHighlighted ? [40, 40] : [32, 32];
  const anchor = isHighlighted ? [20, 40] : [16, 32];
  
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 24 24" fill="${color}">
        <path d="M1 3H15L19 7V18H1V3Z" stroke="${strokeColor}" stroke-width="2"/>
        <circle cx="6" cy="18" r="2" stroke="${strokeColor}" stroke-width="2"/>
        <circle cx="14" cy="18" r="2" stroke="${strokeColor}" stroke-width="2"/>
        ${isHighlighted ? '<circle cx="12" cy="10" r="1" fill="white"/>' : ''}
      </svg>
    `),
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -anchor[1]]
  });
};

const truckIcon = createTruckIcon();
const alertTruckIcon = createTruckIcon('#ef4444', true);
const optimizedTruckIcon = createTruckIcon('#10b981', true);

// Sample vehicle data - in real app this would come from API
const vehicleData = [
  {
    id: 'TRK001',
    driver: 'Raj Kumar',
    position: [19.2183, 72.9781], // Mumbai (Andheri)
    destination: 'Pune',
    status: 'active',
    speed: 45,
    fuel: 78,
    eta: '2 hours 30 minutes',
    route: 'NH-48',
    affectedByTraffic: true
  },
  {
    id: 'TRK002', 
    driver: 'Amit Singh',
    position: [28.7041, 77.1025], // Delhi
    destination: 'Bangalore',
    status: 'active',
    speed: 72,
    fuel: 82,
    eta: '8 hours 15 minutes',
    route: 'NH-44'
  },
  {
    id: 'TRK003',
    driver: 'Priya Sharma', 
    position: [12.9716, 77.5946], // Bangalore
    destination: 'Chennai',
    status: 'active',
    speed: 68,
    fuel: 65,
    eta: '6 hours 45 minutes',
    route: 'NH-44',
    affectedByTraffic: true
  },
  {
    id: 'TRK004',
    driver: 'Suresh Patel',
    position: [13.0827, 80.2707], // Chennai
    destination: 'Kolkata',
    status: 'active',
    speed: 70,
    fuel: 91,
    eta: '18 hours 45 minutes',
    route: 'NH-16'
  },
  {
    id: 'TRK005',
    driver: 'Ravi Gupta',
    position: [22.5726, 88.3639], // Kolkata
    destination: 'Delhi', 
    status: 'active',
    speed: 65,
    fuel: 55,
    eta: '20 hours 15 minutes',
    route: 'NH-19',
    affectedByTraffic: true
  }
];

// Route lines connecting major cities (realistic highway routes)
const routeLines = [
  {
    name: 'NH-48 Mumbai-Pune Highway',
    positions: [
      [19.2183, 72.9781], // Mumbai (Andheri)
      [19.1136, 73.0086], // Lonavala area
      [18.5204, 73.8567]  // Pune
    ],
    color: '#4fd1c7',
    isTrafficRoute: true
  },
  {
    name: 'NH-44 Delhi-Bangalore',
    positions: [
      [28.7041, 77.1025], // Delhi
      [27.1767, 78.0081], // Agra
      [26.2389, 78.1677], // Gwalior
      [23.2599, 77.4126], // Bhopal
      [21.1458, 79.0882], // Nagpur
      [17.3850, 78.4867], // Hyderabad
      [12.9716, 77.5946]  // Bangalore
    ],
    color: '#4fd1c7',
    isTrafficRoute: false
  },
  {
    name: 'Mumbai-Bangalore Highway', 
    positions: [
      [19.0760, 72.8777], // Mumbai
      [15.8497, 74.4977], // Belgaum
      [12.9716, 77.5946]  // Bangalore
    ],
    color: '#48bb78',
    isTrafficRoute: false
  },
  {
    name: 'Bangalore-Chennai Highway',
    positions: [
      [12.9716, 77.5946], // Bangalore
      [13.0827, 80.2707]  // Chennai
    ],
    color: '#f59e0b',
    isTrafficRoute: false
  },
  {
    name: 'Chennai-Kolkata Highway',
    positions: [
      [13.0827, 80.2707], // Chennai
      [20.9517, 85.0985], // Bhubaneswar
      [22.5726, 88.3639]  // Kolkata
    ],
    color: '#8b5cf6'
  }
];

// Main MapPanel component function
function MapPanel() {
  // State to track which vehicle is selected
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  // State to control map controls visibility
  const [showTraffic, setShowTraffic] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  // Modal state management is now handled at App level
  const [trafficAlertTriggered, setTrafficAlertTriggered] = useState(false);
  const [routeOptimized, setRouteOptimized] = useState(false);
  
  // Listen for traffic alert and route optimization events from App level
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
  // Create unique ID for this map instance
  const mapId = useRef(`map-${Date.now()}-${Math.random()}`);
  const mapInstanceRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // India's approximate center coordinates for map centering
  const indiaCenter = [20.5937, 78.9629];
  const zoomLevel = 5;

  // Initialize map only once
  useEffect(() => {
    if (mapInstanceRef.current || !mapId.current) return;

    const initMap = () => {
      try {
        const container = document.getElementById(mapId.current);
        if (!container) return;

        // Remove any existing leaflet instance
        if (container._leaflet_id) {
          delete container._leaflet_id;
        }

        // Create map instance
        const map = L.map(container, {
          center: indiaCenter,
          zoom: zoomLevel,
          zoomControl: false
        });

        // Add dark theme tile layer
        const tileLayer = darkMode 
          ? L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19
            })
          : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });
        
        tileLayer.addTo(map);

        // Store map instance
        mapInstanceRef.current = map;
        setMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMap, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          setMapReady(false);
        } catch (error) {
          console.error('Error removing map:', error);
        }
      }
    };
  }, []);

  // Add markers when map is ready and data changes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || !showMarkers) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add vehicle markers with dynamic coloring
    vehicleData.forEach((vehicle) => {
      let vehicleIcon = truckIcon;
      
      // Color coding based on traffic alert status
      if (trafficAlertTriggered && vehicle.affectedByTraffic && !routeOptimized) {
        vehicleIcon = alertTruckIcon; // Red highlighted truck
      } else if (routeOptimized && vehicle.affectedByTraffic) {
        vehicleIcon = optimizedTruckIcon; // Green optimized truck
      }
      
      const marker = L.marker(vehicle.position, { icon: vehicleIcon })
        .addTo(mapInstanceRef.current)
        .on('click', () => setSelectedVehicle(vehicle));

      // Add popup with enhanced info
      const statusColor = vehicle.affectedByTraffic && trafficAlertTriggered && !routeOptimized ? 'danger' : vehicle.status;
      const popupContent = `
        <div class="vehicle-popup">
          <h4>${vehicle.id} - ${vehicle.driver}</h4>
          <p><strong>Destination:</strong> ${vehicle.destination}</p>
          <p><strong>Route:</strong> ${vehicle.route}</p>
          <p><strong>Status:</strong> <span class="status ${statusColor}">${vehicle.status}</span></p>
          <p><strong>Speed:</strong> ${vehicle.speed} km/h</p>
          <p><strong>Fuel:</strong> ${vehicle.fuel}%</p>
          <p><strong>ETA:</strong> ${vehicle.eta}</p>
          ${vehicle.affectedByTraffic && trafficAlertTriggered ? 
            '<p class="traffic-alert">⚠️ Affected by traffic</p>' : ''}
        </div>
      `;
      marker.bindPopup(popupContent);
    });
  }, [showMarkers, mapReady, trafficAlertTriggered, routeOptimized]);

  // Add route lines when map is ready and routes should be shown
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    // Clear existing polylines
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polyline && !(layer instanceof L.Marker)) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    if (showRoutes) {
      routeLines.forEach((route) => {
        let routeColor = route.color;
        let routeWeight = 3;
        let routeOpacity = 0.7;
        
        // Highlight traffic-affected routes
        if (route.isTrafficRoute && trafficAlertTriggered && !routeOptimized) {
          routeColor = '#ef4444';  // Red for traffic
          routeWeight = 5;
          routeOpacity = 0.9;
        } else if (route.isTrafficRoute && routeOptimized) {
          routeColor = '#22c55e';  // Green for optimized
          routeWeight = 4;
          routeOpacity = 0.8;
        }
        
        L.polyline(route.positions, {
          color: routeColor,
          weight: routeWeight,
          opacity: routeOpacity,
          dashArray: route.isTrafficRoute && trafficAlertTriggered ? '5, 5' : '10, 10'
        }).addTo(mapInstanceRef.current);
      });

      // Add alternative route when optimized
      if (routeOptimized) {
        const alternativeRoute = [
          [19.2183, 72.9781], // Mumbai (Andheri)
          [19.0330, 73.0297], // Expressway route
          [18.6298, 73.7997], // Via Expressway 62
          [18.5204, 73.8567]  // Pune
        ];
        
        L.polyline(alternativeRoute, {
          color: '#22c55e',
          weight: 4,
          opacity: 0.9,
          dashArray: '15, 5'
        }).addTo(mapInstanceRef.current);
      }
    }
  }, [showRoutes, mapReady]);

  return (
    // Main container for the entire map panel
    <div className="map-panel">
      
      {/* Header section with title and control buttons */}
      <div className="map-header">
        {/* Left side of header with title */}
        <div className="map-title">
          <h3>Live Fleet Tracking</h3>
          <span className="vehicle-count">{vehicleData.length} vehicles online</span>
        </div>
        
        {/* Right side of header with control buttons */}
        <div className="map-controls">
          {/* Refresh button to reload map data */}
          <button className="control-btn refresh" onClick={() => window.location.reload()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 15A9 9 0 1 1 5.64 5.64L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          
          {/* Button to center map on India */}
          <button className="control-btn india active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            India View
          </button>
          
          {/* Toggle button for satellite/map view */}
          <button
            className={`control-btn dark-mode ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {darkMode ? 'Dark On' : 'Dark Off'}
          </button>
          
          {/* Button to enable auto-tracking of selected vehicle */}
          <button className="control-btn auto-track">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 21V23" stroke="currentColor" strokeWidth="2"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="2"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Auto Track
          </button>
        </div>
      </div>

      {/* Main map container */}
      <div className="map-container">
        {/* Native Leaflet map container - prevents React reinitialization issues */}
        <div 
          id={mapId.current}
          className={`leaflet-map ${darkMode ? 'dark' : ''}`}
          style={{ width: '100%', height: '100%' }}
        ></div>

        {/* Custom zoom controls positioned on the left */}
        <div className="map-zoom-controls">
          {/* Zoom in button */}
          <button className="zoom-btn zoom-in" onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.zoomIn();
            }
          }}>+</button>
          {/* Zoom out button */}
          <button className="zoom-btn zoom-out" onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.zoomOut();
            }
          }}>−</button>
        </div>

        {/* Traffic and route legend on the right side */}
        <div className="traffic-legend">
          {/* Legend title */}
          <div className="legend-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Map Controls
          </div>
          
          {/* Vehicle status indicators */}
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color active"></div>
              <span>Active ({vehicleData.filter(v => v.status === 'active').length})</span>
            </div>
            <div className="legend-item">
              <div className="legend-color idle"></div>
              <span>Idle ({vehicleData.filter(v => v.status === 'idle').length})</span>
            </div>
            <div className="legend-item">
              <div className="legend-color maintenance"></div>
              <span>Maintenance ({vehicleData.filter(v => v.status === 'maintenance').length})</span>
            </div>
          </div>
          
          {/* Map control toggles */}
          <div className="legend-controls">
            {/* Toggle route lines */}
            <button 
              className={`legend-btn ${showRoutes ? 'active' : ''}`}
              onClick={() => setShowRoutes(!showRoutes)} // Toggle routes on/off
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Routes
            </button>
            
            {/* Toggle vehicle markers */}
            <button 
              className={`legend-btn ${showMarkers ? 'active' : ''}`}
              onClick={() => setShowMarkers(!showMarkers)} // Toggle markers on/off
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Vehicles
            </button>
            
            {/* Toggle traffic layer */}
            <button 
              className={`legend-btn ${showTraffic ? 'active' : ''}`}
              onClick={() => setShowTraffic(!showTraffic)} // Toggle traffic on/off
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M1 6L23 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 12L23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 18L23 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Traffic
            </button>
          </div>
        </div>

        {/* Selected vehicle details panel */}
        {selectedVehicle && (
          <div className="vehicle-details">
            <div className="details-header">
              <h4>{selectedVehicle.id}</h4>
              <button 
                className="close-btn"
                onClick={() => setSelectedVehicle(null)} // Close the details panel
              >×</button>
            </div>
            <div className="details-content">
              <p><strong>Driver:</strong> {selectedVehicle.driver}</p>
              <p><strong>Status:</strong> <span className={`status ${selectedVehicle.status}`}>{selectedVehicle.status}</span></p>
              <p><strong>Speed:</strong> {selectedVehicle.speed} km/h</p>
              <p><strong>Fuel:</strong> {selectedVehicle.fuel}%</p>
              <p><strong>Destination:</strong> {selectedVehicle.destination}</p>
              <p><strong>ETA:</strong> {selectedVehicle.eta}</p>
              <p><strong>Route:</strong> {selectedVehicle.route}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// Export this component so it can be used in other files (like App.js)
export default MapPanel;
