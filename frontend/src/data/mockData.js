// Mock data for logistics dashboard demo
// This file contains realistic sample data for cargo, vehicles, and traffic incidents

// 5 Cargo Items with realistic specifications
export const cargoData = [
  {
    id: 'CRG-001',
    name: 'Electronics Package',
    description: 'Consumer electronics including laptops, smartphones, and accessories',
    dimensions: '120 × 80 × 60 cm',
    weight: '45 kg',
    priority: 'high',
    fragile: true,
    value: '₹2,85,000',
    origin: 'Bangalore Electronics City',
    destination: 'Mumbai BKC',
    handlingInstructions: 'Keep upright, fragile components',
    temperatureControlled: false
  },
  {
    id: 'CRG-002', 
    name: 'Textile Rolls',
    description: 'Premium cotton fabric rolls for garment manufacturing',
    dimensions: '150 × 40 × 40 cm',
    weight: '85 kg',
    priority: 'medium',
    fragile: false,
    value: '₹1,50,000',
    origin: 'Tirupur Textile Hub',
    destination: 'Delhi Garment District',
    handlingInstructions: 'Keep dry, avoid moisture',
    temperatureControlled: false
  },
  {
    id: 'CRG-003',
    name: 'Medical Supplies',
    description: 'Critical medical equipment and pharmaceutical supplies',
    dimensions: '90 × 60 × 50 cm', 
    weight: '25 kg',
    priority: 'high',
    fragile: true,
    value: '₹4,20,000',
    origin: 'Pune Pharma Zone',
    destination: 'Chennai Apollo Hospital',
    handlingInstructions: 'Temperature sensitive, handle with care',
    temperatureControlled: true
  },
  {
    id: 'CRG-004',
    name: 'Steel Components',
    description: 'Industrial steel parts for automotive manufacturing',
    dimensions: '200 × 100 × 80 cm',
    weight: '150 kg',
    priority: 'low',
    fragile: false,
    value: '₹95,000',
    origin: 'Jamshedpur Steel Plant',
    destination: 'Chennai Ford Factory',
    handlingInstructions: 'Heavy lifting equipment required',
    temperatureControlled: false
  },
  {
    id: 'CRG-005',
    name: 'Chemical Containers',
    description: 'Industrial chemicals for manufacturing processes',
    dimensions: '80 × 80 × 120 cm',
    weight: '95 kg',
    priority: 'medium',
    fragile: true,
    value: '₹3,10,000',
    origin: 'Gujarat Chemical Hub',
    destination: 'Hyderabad Tech City',
    handlingInstructions: 'Hazardous material - special handling required',
    temperatureControlled: false
  }
];

// 2 Vehicles with detailed specifications
export const vehicleData = [
  {
    id: 'TRK-101',
    type: 'Heavy Duty Truck',
    plateNumber: 'MH-12-AB-3456',
    capacity: '15 tons',
    bedDimensions: '6m × 2.5m × 2.2m',
    driver: 'Rajesh Kumar',
    driverPhone: '+91-9876543210',
    currentLocation: 'Mumbai Port',
    coordinates: [19.0760, 72.8777],
    destination: 'Delhi Logistics Hub',
    status: 'active',
    speed: 65,
    fuel: 78,
    fuelCapacity: '400L',
    mileage: '4.2 km/L',
    eta: '2 hours 30 minutes',
    lastMaintenance: '2024-08-15',
    nextServiceDue: '2024-10-15',
    insurance: 'Valid till March 2025',
    gpsEnabled: true,
    temperatureControl: false,
    loadingCapacity: {
      volume: '33 cubic meters',
      maxWeight: '15000 kg',
      currentLoad: '8500 kg'
    }
  },
  {
    id: 'TRK-102',
    type: 'Medium Transport Truck',
    plateNumber: 'KA-05-CD-7890',
    capacity: '8 tons',
    bedDimensions: '4.5m × 2.2m × 2m',
    driver: 'Priya Sharma',
    driverPhone: '+91-9123456789',
    currentLocation: 'Bangalore Electronic City',
    coordinates: [12.9716, 77.5946],
    destination: 'Chennai Central',
    status: 'loading',
    speed: 0,
    fuel: 45,
    fuelCapacity: '250L',
    mileage: '6.8 km/L',
    eta: 'Loading in progress',
    lastMaintenance: '2024-07-20',
    nextServiceDue: '2024-09-20',
    insurance: 'Valid till January 2025',
    gpsEnabled: true,
    temperatureControl: true,
    loadingCapacity: {
      volume: '19.8 cubic meters',
      maxWeight: '8000 kg',
      currentLoad: '3200 kg'
    }
  }
];

// 2 Traffic Incidents with detailed information
export const trafficIncidents = [
  {
    id: 'TRF-001',
    location: 'NH-48 Mumbai-Pune Highway',
    coordinates: [19.2183, 73.0978],
    severity: 'high',
    type: 'Heavy Traffic Congestion',
    description: 'Major traffic jam due to road construction work near Lonavala tunnel. Expected delay of 25-30 minutes for vehicles traveling towards Pune.',
    affectedVehicles: ['TRK-101', 'TRK-205', 'TRK-312'],
    estimatedDelay: '25 minutes',
    alternativeRoute: 'Expressway 62 via Khandala',
    alternativeRouteTime: '45 minutes additional',
    reportedTime: '14:25 PM',
    expectedClearance: '16:30 PM',
    trafficDensity: 'Very High',
    roadCondition: 'Construction Zone',
    weatherImpact: 'Clear weather',
    recommendations: [
      'Switch to Expressway 62 for faster transit',
      'Consider delaying departure by 2 hours',
      'Monitor traffic updates every 30 minutes'
    ]
  },
  {
    id: 'TRF-002',
    location: 'NH-44 Bangalore-Chennai Highway',
    coordinates: [12.8423, 78.1245],
    severity: 'medium',
    type: 'Accident Clearance',
    description: 'Minor vehicle breakdown cleared from the main carriageway near Krishnagiri. Traffic flow restored but moving slowly due to residual congestion.',
    affectedVehicles: ['TRK-102'],
    estimatedDelay: '12 minutes',
    alternativeRoute: 'State Highway 17 via Hosur',
    alternativeRouteTime: '20 minutes additional',
    reportedTime: '15:10 PM',
    expectedClearance: '15:45 PM',
    trafficDensity: 'Moderate',
    roadCondition: 'Good',
    weatherImpact: 'Light rain affecting visibility',
    recommendations: [
      'Reduce speed due to wet road conditions',
      'Maintain safe following distance',
      'Use headlights for better visibility'
    ]
  }
];

// Additional mock data for enhanced dashboard features

// Fleet performance metrics
export const fleetMetrics = {
  totalVehicles: 12,
  activeVehicles: 8,
  idleVehicles: 2,
  maintenanceVehicles: 2,
  fuelEfficiency: '5.2 km/L',
  averageSpeed: '58 km/h',
  onTimeDeliveries: '94%',
  totalDistance: '2,450 km',
  co2Emissions: '1,240 kg',
  costPerKm: '₹12.50'
};

// Route optimization data
export const routeOptimization = {
  totalRoutes: 15,
  optimizedRoutes: 12,
  timeSaved: '3.5 hours',
  fuelSaved: '245 L',
  costSaved: '₹18,500',
  co2Reduced: '580 kg'
};

// Driver performance data
export const driverMetrics = [
  {
    id: 'DRV-001',
    name: 'Rajesh Kumar',
    vehicleId: 'TRK-101',
    safetyScore: 98,
    fuelEfficiency: 'Excellent',
    onTimeDeliveries: '96%',
    totalDistance: '45,200 km',
    experience: '8 years'
  },
  {
    id: 'DRV-002',
    name: 'Priya Sharma',
    vehicleId: 'TRK-102',
    safetyScore: 94,
    fuelEfficiency: 'Good',
    onTimeDeliveries: '92%',
    totalDistance: '32,800 km',
    experience: '5 years'
  }
];

// Weather conditions affecting routes
export const weatherData = [
  {
    location: 'Mumbai',
    condition: 'Clear',
    temperature: '28°C',
    humidity: '65%',
    visibility: 'Good',
    impact: 'No impact on logistics'
  },
  {
    location: 'Bangalore',
    condition: 'Light Rain',
    temperature: '24°C',
    humidity: '80%',
    visibility: 'Moderate',
    impact: 'Minor delay possible'
  }
];

// Cost analysis data
export const costBreakdown = {
  fuel: 65,        // Percentage
  maintenance: 20,
  driver: 15,
  totalMonthlyCost: '₹4,50,000',
  costPerDelivery: '₹850',
  profitMargin: '18%'
};

// Export all data as a single object for easy importing
export const mockData = {
  cargo: cargoData,
  vehicles: vehicleData,
  incidents: trafficIncidents,
  metrics: fleetMetrics,
  routes: routeOptimization,
  drivers: driverMetrics,
  weather: weatherData,
  costs: costBreakdown
};

export default mockData;
