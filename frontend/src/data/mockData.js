// Mock data for logistics dashboard demo
// Comprehensive data for 10 trucks with route optimization

// Delivery locations (stops) across India with coordinates
export const deliveryLocations = {
  // Mumbai Region
  'Mumbai Depot': { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
  'Andheri Hub': { lat: 19.1136, lng: 72.8697, city: 'Mumbai' },
  'Thane Warehouse': { lat: 19.2183, lng: 72.9781, city: 'Thane' },
  'Navi Mumbai Port': { lat: 19.0330, lng: 73.0297, city: 'Navi Mumbai' },
  
  // Pune Region
  'Pune Central': { lat: 18.5204, lng: 73.8567, city: 'Pune' },
  'Hinjewadi IT Park': { lat: 18.5912, lng: 73.7380, city: 'Pune' },
  'Pimpri MIDC': { lat: 18.6279, lng: 73.8009, city: 'Pimpri' },
  
  // Delhi NCR
  'Delhi Depot': { lat: 28.7041, lng: 77.1025, city: 'Delhi' },
  'Gurugram Hub': { lat: 28.4595, lng: 77.0266, city: 'Gurugram' },
  'Noida Sector 62': { lat: 28.6269, lng: 77.3638, city: 'Noida' },
  
  // Bangalore Region
  'Bangalore Depot': { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
  'Electronic City': { lat: 12.8452, lng: 77.6602, city: 'Bangalore' },
  'Whitefield': { lat: 12.9698, lng: 77.7499, city: 'Bangalore' },
  
  // Chennai Region
  'Chennai Port': { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
  'Ambattur Industrial': { lat: 13.1143, lng: 80.1548, city: 'Chennai' },
  
  // Hyderabad Region
  'Hyderabad Hub': { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' },
  'HITEC City': { lat: 17.4435, lng: 78.3772, city: 'Hyderabad' },
  
  // Other Major Cities
  'Kolkata Depot': { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
  'Ahmedabad Hub': { lat: 23.0225, lng: 72.5714, city: 'Ahmedabad' },
  'Jaipur Depot': { lat: 26.9124, lng: 75.7873, city: 'Jaipur' },
};

// Cargo items with detailed specifications
export const cargoData = [
  {
    id: 'CRG-001',
    name: 'Electronics Package',
    description: 'Consumer electronics including laptops and phones',
    dimensions: '120 × 80 × 60 cm',
    weight: 45,
    priority: 'high',
    fragile: true,
    value: 285000,
    destination: 'Whitefield',
  },
  {
    id: 'CRG-002', 
    name: 'Textile Rolls',
    description: 'Premium cotton fabric rolls',
    dimensions: '150 × 40 × 40 cm',
    weight: 85,
    priority: 'medium',
    fragile: false,
    value: 150000,
    destination: 'Delhi Depot',
  },
  {
    id: 'CRG-003',
    name: 'Medical Supplies',
    description: 'Critical medical equipment',
    dimensions: '90 × 60 × 50 cm', 
    weight: 25,
    priority: 'high',
    fragile: true,
    value: 420000,
    destination: 'Chennai Port',
  },
  {
    id: 'CRG-004',
    name: 'Steel Components',
    description: 'Industrial steel parts',
    dimensions: '200 × 100 × 80 cm',
    weight: 150,
    priority: 'low',
    fragile: false,
    value: 95000,
    destination: 'Pimpri MIDC',
  },
  {
    id: 'CRG-005',
    name: 'Chemical Containers',
    description: 'Industrial chemicals',
    dimensions: '80 × 80 × 120 cm',
    weight: 95,
    priority: 'medium',
    fragile: true,
    value: 310000,
    destination: 'HITEC City',
  },
  {
    id: 'CRG-006',
    name: 'Food Products',
    description: 'Packaged food items',
    dimensions: '100 × 100 × 80 cm',
    weight: 120,
    priority: 'high',
    fragile: false,
    value: 180000,
    destination: 'Gurugram Hub',
  },
  {
    id: 'CRG-007',
    name: 'Automotive Parts',
    description: 'Car spare parts',
    dimensions: '180 × 90 × 70 cm',
    weight: 200,
    priority: 'medium',
    fragile: false,
    value: 350000,
    destination: 'Pune Central',
  },
  {
    id: 'CRG-008',
    name: 'Furniture Set',
    description: 'Office furniture',
    dimensions: '250 × 120 × 100 cm',
    weight: 180,
    priority: 'low',
    fragile: true,
    value: 220000,
    destination: 'Noida Sector 62',
  }
];

// 10 Trucks with comprehensive data and routes
export const vehicleData = [
  {
    id: 'TRK-001',
    type: 'Heavy Duty Truck',
    plateNumber: 'MH-12-AB-3456',
    capacity: 15000,
    driver: 'Rajesh Kumar',
    driverPhone: '+91-9876543210',
    status: 'active',
    currentLocation: 'Mumbai Depot',
    currentPosition: [19.0760, 72.8777],
    fuel: 85,
    speed: 65,
    routeStops: ['Mumbai Depot', 'Thane Warehouse', 'Pune Central', 'Hinjewadi IT Park', 'Pimpri MIDC'],
    cargo: ['CRG-004', 'CRG-007'],
    currentStopIndex: 0,
    totalDistance: 180,
    distanceCovered: 0,
    loadUtilization: 78,
    eta: '4h 30m',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-002',
    type: 'Medium Transport',
    plateNumber: 'KA-05-CD-7890',
    capacity: 8000,
    driver: 'Priya Sharma',
    driverPhone: '+91-9123456789',
    status: 'active',
    currentLocation: 'Bangalore Depot',
    currentPosition: [12.9716, 77.5946],
    fuel: 72,
    speed: 58,
    routeStops: ['Bangalore Depot', 'Electronic City', 'Whitefield', 'Chennai Port', 'Ambattur Industrial'],
    cargo: ['CRG-001', 'CRG-003'],
    currentStopIndex: 1,
    totalDistance: 350,
    distanceCovered: 45,
    loadUtilization: 65,
    eta: '6h 15m',
    affectedByTraffic: true,
  },
  {
    id: 'TRK-003',
    type: 'Heavy Duty Truck',
    plateNumber: 'DL-01-EF-2345',
    capacity: 15000,
    driver: 'Amit Singh',
    driverPhone: '+91-9234567890',
    status: 'active',
    currentLocation: 'Delhi Depot',
    currentPosition: [28.7041, 77.1025],
    fuel: 90,
    speed: 70,
    routeStops: ['Delhi Depot', 'Gurugram Hub', 'Noida Sector 62', 'Jaipur Depot'],
    cargo: ['CRG-002', 'CRG-006', 'CRG-008'],
    currentStopIndex: 0,
    totalDistance: 290,
    distanceCovered: 0,
    loadUtilization: 82,
    eta: '5h 45m',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-004',
    type: 'Light Transport',
    plateNumber: 'TN-07-GH-4567',
    capacity: 5000,
    driver: 'Suresh Rajan',
    driverPhone: '+91-9345678901',
    status: 'active',
    currentLocation: 'Chennai Port',
    currentPosition: [13.0827, 80.2707],
    fuel: 68,
    speed: 55,
    routeStops: ['Chennai Port', 'Ambattur Industrial', 'Bangalore Depot', 'Electronic City'],
    cargo: ['CRG-005'],
    currentStopIndex: 2,
    totalDistance: 380,
    distanceCovered: 280,
    loadUtilization: 45,
    eta: '2h 30m',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-005',
    type: 'Medium Transport',
    plateNumber: 'GJ-01-IJ-6789',
    capacity: 8000,
    driver: 'Vikram Patel',
    driverPhone: '+91-9456789012',
    status: 'active',
    currentLocation: 'Ahmedabad Hub',
    currentPosition: [23.0225, 72.5714],
    fuel: 55,
    speed: 62,
    routeStops: ['Ahmedabad Hub', 'Mumbai Depot', 'Navi Mumbai Port', 'Pune Central'],
    cargo: ['CRG-004'],
    currentStopIndex: 1,
    totalDistance: 520,
    distanceCovered: 145,
    loadUtilization: 58,
    eta: '7h 20m',
    affectedByTraffic: true,
  },
  {
    id: 'TRK-006',
    type: 'Heavy Duty Truck',
    plateNumber: 'TS-09-KL-8901',
    capacity: 15000,
    driver: 'Ramesh Reddy',
    driverPhone: '+91-9567890123',
    status: 'active',
    currentLocation: 'Hyderabad Hub',
    currentPosition: [17.3850, 78.4867],
    fuel: 78,
    speed: 68,
    routeStops: ['Hyderabad Hub', 'HITEC City', 'Bangalore Depot', 'Chennai Port'],
    cargo: ['CRG-005', 'CRG-001'],
    currentStopIndex: 0,
    totalDistance: 680,
    distanceCovered: 0,
    loadUtilization: 72,
    eta: '10h 15m',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-007',
    type: 'Light Transport',
    plateNumber: 'WB-02-MN-0123',
    capacity: 5000,
    driver: 'Ankit Das',
    driverPhone: '+91-9678901234',
    status: 'idle',
    currentLocation: 'Kolkata Depot',
    currentPosition: [22.5726, 88.3639],
    fuel: 92,
    speed: 0,
    routeStops: ['Kolkata Depot'],
    cargo: [],
    currentStopIndex: 0,
    totalDistance: 0,
    distanceCovered: 0,
    loadUtilization: 0,
    eta: 'At depot',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-008',
    type: 'Medium Transport',
    plateNumber: 'RJ-14-OP-2345',
    capacity: 8000,
    driver: 'Deepak Joshi',
    driverPhone: '+91-9789012345',
    status: 'active',
    currentLocation: 'Jaipur Depot',
    currentPosition: [26.9124, 75.7873],
    fuel: 65,
    speed: 60,
    routeStops: ['Jaipur Depot', 'Delhi Depot', 'Gurugram Hub', 'Noida Sector 62'],
    cargo: ['CRG-002', 'CRG-008'],
    currentStopIndex: 1,
    totalDistance: 310,
    distanceCovered: 120,
    loadUtilization: 68,
    eta: '4h 45m',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-009',
    type: 'Heavy Duty Truck',
    plateNumber: 'MH-04-QR-5678',
    capacity: 15000,
    driver: 'Sanjay Patil',
    driverPhone: '+91-9890123456',
    status: 'maintenance',
    currentLocation: 'Pune Central',
    currentPosition: [18.5204, 73.8567],
    fuel: 40,
    speed: 0,
    routeStops: ['Pune Central'],
    cargo: [],
    currentStopIndex: 0,
    totalDistance: 0,
    distanceCovered: 0,
    loadUtilization: 0,
    eta: 'Under maintenance',
    affectedByTraffic: false,
  },
  {
    id: 'TRK-010',
    type: 'Medium Transport',
    plateNumber: 'KA-03-ST-7890',
    capacity: 8000,
    driver: 'Kiran Kumar',
    driverPhone: '+91-9901234567',
    status: 'active',
    currentLocation: 'Electronic City',
    currentPosition: [12.8452, 77.6602],
    fuel: 80,
    speed: 55,
    routeStops: ['Electronic City', 'Bangalore Depot', 'Hyderabad Hub', 'HITEC City'],
    cargo: ['CRG-001', 'CRG-005'],
    currentStopIndex: 2,
    totalDistance: 620,
    distanceCovered: 450,
    loadUtilization: 75,
    eta: '3h 30m',
    affectedByTraffic: true,
  }
];

// Traffic incidents with detailed information
export const trafficIncidents = [
  {
    id: 'TRF-001',
    location: 'NH-48 Mumbai-Pune Highway',
    coordinates: [19.2183, 73.0978],
    severity: 'high',
    type: 'Heavy Traffic Congestion',
    description: 'Major traffic jam due to road construction near Lonavala. Expected delay of 45 minutes.',
    affectedVehicles: ['TRK-001', 'TRK-005'],
    estimatedDelay: 45,
    alternativeRoute: {
      name: 'Mumbai-Pune Expressway',
      additionalDistance: 15,
      timeSaved: 30,
      fuelCost: 350
    },
    reportedTime: '14:25',
    expectedClearance: '16:30',
  },
  {
    id: 'TRF-002',
    location: 'NH-44 Bangalore-Chennai Highway',
    coordinates: [12.8423, 78.1245],
    severity: 'medium',
    type: 'Vehicle Breakdown',
    description: 'Multiple vehicle breakdown causing lane blockage near Krishnagiri.',
    affectedVehicles: ['TRK-002', 'TRK-010'],
    estimatedDelay: 25,
    alternativeRoute: {
      name: 'Via Hosur-Dharmapuri Route',
      additionalDistance: 35,
      timeSaved: 15,
      fuelCost: 480
    },
    reportedTime: '15:10',
    expectedClearance: '16:00',
  }
];

// Pre-computed optimal routes using Nearest Neighbor algorithm
export const optimizedRoutes = {
  'TRK-001': {
    original: ['Mumbai Depot', 'Pune Central', 'Hinjewadi IT Park', 'Thane Warehouse', 'Pimpri MIDC'],
    optimized: ['Mumbai Depot', 'Thane Warehouse', 'Pune Central', 'Pimpri MIDC', 'Hinjewadi IT Park'],
    savingsKm: 45,
    savingsTime: 55,
    savingsFuel: 12
  },
  'TRK-002': {
    original: ['Bangalore Depot', 'Chennai Port', 'Electronic City', 'Whitefield', 'Ambattur Industrial'],
    optimized: ['Bangalore Depot', 'Electronic City', 'Whitefield', 'Chennai Port', 'Ambattur Industrial'],
    savingsKm: 68,
    savingsTime: 75,
    savingsFuel: 18
  },
  'TRK-003': {
    original: ['Delhi Depot', 'Jaipur Depot', 'Gurugram Hub', 'Noida Sector 62'],
    optimized: ['Delhi Depot', 'Gurugram Hub', 'Noida Sector 62', 'Jaipur Depot'],
    savingsKm: 95,
    savingsTime: 120,
    savingsFuel: 25
  },
};

// Fleet performance metrics
export const fleetMetrics = {
  totalVehicles: 10,
  activeVehicles: 7,
  idleVehicles: 2,
  maintenanceVehicles: 1,
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
    vehicleId: 'TRK-001',
    safetyScore: 98,
    fuelEfficiency: 'Excellent',
    onTimeDeliveries: '96%',
    totalDistance: '45,200 km',
    experience: '8 years'
  },
  {
    id: 'DRV-002',
    name: 'Priya Sharma',
    vehicleId: 'TRK-002',
    safetyScore: 94,
    fuelEfficiency: 'Good',
    onTimeDeliveries: '92%',
    totalDistance: '32,800 km',
    experience: '5 years'
  }
];

// Cost analysis data
export const costBreakdown = {
  fuel: 65,
  maintenance: 20,
  driver: 15,
  totalMonthlyCost: '₹4,50,000',
  costPerDelivery: '₹850',
  profitMargin: '18%'
};

// Demo scenarios for AI interactions - Extended for 5-10 minute presentation
export const demoScenarios = [
  {
    id: 'scenario-1',
    title: 'Traffic Congestion',
    trigger: 'Traffic detected on NH-48',
    affectedTruck: 'TRK-002',
    issue: 'Heavy traffic on Bangalore-Chennai route causing 45 min delay',
    aiSolution: {
      action: 'Reroute via Hosur-Dharmapuri',
      timeSaved: '30 minutes',
      costImpact: '+₹480 fuel, -₹1,200 time value',
      netBenefit: '₹720 saved',
      loadConsideration: 'Fragile cargo (Electronics) - recommending smooth route'
    }
  },
  {
    id: 'scenario-2',
    title: 'Delivery Priority Conflict',
    trigger: 'High-priority delivery at risk',
    affectedTruck: 'TRK-003',
    issue: 'Medical supplies delivery may be delayed due to route sequence',
    aiSolution: {
      action: 'Resequence stops using priority-weighted nearest neighbor',
      timeSaved: '45 minutes for priority delivery',
      costImpact: '+₹320 fuel',
      netBenefit: 'Critical delivery on time',
      loadConsideration: 'Temperature-sensitive cargo prioritized'
    }
  },
  {
    id: 'scenario-3',
    title: 'Weather Alert',
    trigger: 'Heavy rainfall warning',
    affectedTruck: 'TRK-005',
    affectedVehicles: ['TRK-005', 'TRK-008'],
    issue: 'Heavy rainfall predicted on NH-44 near Krishnagiri. Visibility reduced, road conditions hazardous.',
    location: 'NH-44 Krishnagiri Section',
    severity: 'high',
    estimatedDelay: 35,
    aiSolution: {
      action: 'Delay departure by 2 hours OR reroute via Salem bypass',
      recommendation: 'Recommend delay - safer for fragile cargo',
      timeSaved: '20 minutes vs attempting in rain',
      costImpact: '+₹0 (delay) or +₹520 fuel (reroute)',
      netBenefit: '₹1,800 saved (accident prevention + cargo safety)',
      loadConsideration: 'Glassware and Electronics onboard - rain poses damage risk'
    }
  },
  {
    id: 'scenario-4',
    title: 'Vehicle Breakdown',
    trigger: 'Engine temperature critical',
    affectedTruck: 'TRK-006',
    issue: 'TRK-006 engine overheating detected. Immediate stop required to prevent damage.',
    location: 'Near Chitradurga, Karnataka',
    severity: 'critical',
    estimatedDelay: 90,
    aiSolution: {
      action: 'Emergency stop at nearest service center. Dispatch TRK-007 from Kolkata depot for cargo transfer.',
      recommendation: 'Transfer high-priority cargo to nearby active vehicle',
      nearestServiceCenter: 'Chitradurga Auto Works - 8 km ahead',
      backupVehicle: 'TRK-004 (currently 45 km away)',
      timeSaved: '60 minutes (vs waiting for full repair)',
      costImpact: '+₹2,400 (transfer + service)',
      netBenefit: '₹4,200 saved (customer penalty avoided)',
      loadConsideration: 'Medical supplies must reach Chennai Port by 6 PM'
    }
  },
  {
    id: 'scenario-5',
    title: 'Fuel Price Spike',
    trigger: 'Fuel price alert',
    affectedTruck: 'ALL',
    affectedVehicles: ['TRK-001', 'TRK-002', 'TRK-003', 'TRK-005', 'TRK-006', 'TRK-008', 'TRK-010'],
    issue: 'Fuel prices increased by ₹3.50/L at upcoming stations. 4 vehicles need refueling within 50 km.',
    location: 'Maharashtra & Karnataka regions',
    severity: 'medium',
    estimatedDelay: 0,
    aiSolution: {
      action: 'Redirect to partner fuel stations with locked-in prices',
      recommendation: 'Bulk refuel at Hubli depot (partner rate ₹94.50/L vs market ₹98/L)',
      vehiclesToRefuel: ['TRK-002', 'TRK-005', 'TRK-010'],
      totalFuelNeeded: '380 liters',
      timeSaved: '0 minutes',
      costImpact: '-₹1,330 fuel savings',
      netBenefit: '₹1,330 saved on fuel costs',
      loadConsideration: 'Minor route deviation of 12 km - acceptable for savings'
    }
  },
  {
    id: 'scenario-6',
    title: 'Urgent Order Received',
    trigger: 'New high-priority order',
    affectedTruck: 'TRK-001',
    issue: 'Urgent pharmaceutical delivery request for Pune. Must reach within 3 hours. Current route does not include Pune.',
    location: 'Pune Central Hub',
    severity: 'high',
    estimatedDelay: 0,
    aiSolution: {
      action: 'Insert Pune stop into TRK-001 route between current stops',
      recommendation: 'TRK-001 is 45 km from Pune, can accommodate urgent delivery',
      routeChange: 'Mumbai Depot → Thane → PUNE (NEW) → Hinjewadi → Pimpri',
      timeSaved: 'Delivery 2 hours ahead of alternate vehicle option',
      costImpact: '+₹180 fuel, +₹850 premium charge to customer',
      netBenefit: '₹2,100 additional revenue + customer satisfaction',
      loadConsideration: 'Space available: 2.2 tons. Pharmaceutical package: 180 kg - fits perfectly'
    }
  },
  {
    id: 'scenario-7',
    title: 'Delivery Window Risk',
    trigger: 'SLA breach warning',
    affectedTruck: 'TRK-003',
    issue: 'TRK-003 ETA 5:45 PM. Customer delivery window closes at 6:00 PM. Only 15 min buffer - high risk.',
    location: 'Noida Sector 62 Delivery',
    severity: 'high',
    estimatedDelay: 0,
    aiSolution: {
      action: 'Skip low-priority stop (Gurugram Hub) - deliver directly to Noida',
      recommendation: 'Reschedule Gurugram delivery to TRK-008 (arriving tomorrow)',
      routeChange: 'Delhi Depot → Noida Sector 62 (PRIORITY) → Gurugram Hub (RESCHEDULED)',
      timeSaved: '35 minutes - new ETA 5:10 PM',
      costImpact: '+₹0 (stop resequencing only)',
      netBenefit: '₹5,500 SLA penalty avoided + customer retention',
      loadConsideration: 'Noida cargo: Furniture Set (fragile) - requires careful handling'
    }
  },
  {
    id: 'scenario-8',
    title: 'Driver Fatigue Alert',
    trigger: 'Driver hours exceeded',
    affectedTruck: 'TRK-010',
    issue: 'Driver Kiran Kumar has been driving for 7.5 hours continuously. Safety regulations require 30-min break.',
    location: 'Near Anantapur, Andhra Pradesh',
    severity: 'medium',
    estimatedDelay: 30,
    aiSolution: {
      action: 'Mandatory rest stop at nearest highway rest area',
      recommendation: 'Schedule 30-min break at Anantapur Rest Stop (3 km ahead)',
      nearestRestStop: 'HP Petrol Pump & Rest Area - Anantapur',
      timeSaved: '0 minutes (safety compliance)',
      costImpact: '+₹0 (planned break)',
      netBenefit: 'Safety compliance + accident prevention (est. value ₹50,000+)',
      loadConsideration: 'Notify customer of 30-min delay. Cargo secure during stop.'
    }
  }
];

// Extended traffic incidents for comprehensive demo
export const extendedTrafficIncidents = [
  {
    id: 'TRF-001',
    location: 'NH-48 Mumbai-Pune Highway',
    coordinates: [19.2183, 73.0978],
    severity: 'high',
    type: 'Heavy Traffic Congestion',
    description: 'Major traffic jam due to road construction near Lonavala.',
    affectedVehicles: ['TRK-001', 'TRK-005'],
    estimatedDelay: 45,
    alternativeRoute: {
      name: 'Mumbai-Pune Expressway',
      additionalDistance: 15,
      timeSaved: 30,
      fuelCost: 350
    }
  },
  {
    id: 'TRF-002',
    location: 'NH-44 Bangalore-Chennai Highway',
    coordinates: [12.8423, 78.1245],
    severity: 'medium',
    type: 'Vehicle Breakdown',
    description: 'Multiple vehicle breakdown causing lane blockage.',
    affectedVehicles: ['TRK-002', 'TRK-010'],
    estimatedDelay: 25,
    alternativeRoute: {
      name: 'Via Hosur-Dharmapuri Route',
      additionalDistance: 35,
      timeSaved: 15,
      fuelCost: 480
    }
  },
  {
    id: 'TRF-003',
    location: 'Ring Road Delhi',
    coordinates: [28.6519, 77.2315],
    severity: 'high',
    type: 'Accident Ahead',
    description: 'Multi-vehicle accident near ITO. Emergency services on site.',
    affectedVehicles: ['TRK-003', 'TRK-008'],
    estimatedDelay: 55,
    alternativeRoute: {
      name: 'Via Outer Ring Road',
      additionalDistance: 22,
      timeSaved: 40,
      fuelCost: 420
    }
  },
  {
    id: 'TRF-004',
    location: 'NH-65 Hyderabad-Vijayawada',
    coordinates: [16.8523, 79.4512],
    severity: 'medium',
    type: 'Road Maintenance',
    description: 'Single lane operation due to road resurfacing work.',
    affectedVehicles: ['TRK-006'],
    estimatedDelay: 30,
    alternativeRoute: {
      name: 'Via Warangal Route',
      additionalDistance: 45,
      timeSaved: 20,
      fuelCost: 580
    }
  }
];

// Export all data as a single object for easy importing
export const mockData = {
  locations: deliveryLocations,
  cargo: cargoData,
  vehicles: vehicleData,
  incidents: trafficIncidents,
  extendedIncidents: extendedTrafficIncidents,
  metrics: fleetMetrics,
  routes: routeOptimization,
  drivers: driverMetrics,
  costs: costBreakdown,
  optimizedRoutes: optimizedRoutes,
  scenarios: demoScenarios
};

export default mockData;
