// Orders component - displays all delivery orders and their status
// Import React hooks for state management
import React, { useState } from 'react';
// Import CSS for styling
import './Orders.css';

// Sample orders data - in real app this would come from API
const ordersData = [
  {
    id: 'ORD-2024-001',
    customer: 'Reliance Industries',
    pickup: 'Mumbai, Maharashtra',
    delivery: 'Bangalore, Karnataka',
    status: 'in-transit',
    vehicle: 'TRK002',
    driver: 'Amit Singh',
    value: '₹2,45,000',
    weight: '15.5 tons',
    expectedDelivery: '2024-01-15 14:30',
    priority: 'high'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Tata Motors',
    pickup: 'Delhi, NCR',
    delivery: 'Mumbai, Maharashtra',
    status: 'pending',
    vehicle: 'Not Assigned',
    driver: 'Not Assigned',
    value: '₹1,85,000',
    weight: '12.3 tons',
    expectedDelivery: '2024-01-16 10:00',
    priority: 'medium'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Mahindra Group',
    pickup: 'Chennai, Tamil Nadu',
    delivery: 'Kolkata, West Bengal',
    status: 'delivered',
    vehicle: 'TRK004',
    driver: 'Suresh Patel',
    value: '₹3,20,000',
    weight: '18.7 tons',
    expectedDelivery: '2024-01-14 16:45',
    priority: 'low'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Infosys Limited',
    pickup: 'Bangalore, Karnataka',
    delivery: 'Hyderabad, Telangana',
    status: 'loading',
    vehicle: 'TRK003',
    driver: 'Priya Sharma',
    value: '₹95,000',
    weight: '8.2 tons',
    expectedDelivery: '2024-01-15 18:00',
    priority: 'high'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Asian Paints',
    pickup: 'Pune, Maharashtra',
    delivery: 'Ahmedabad, Gujarat',
    status: 'cancelled',
    vehicle: 'N/A',
    driver: 'N/A',
    value: '₹1,50,000',
    weight: '10.5 tons',
    expectedDelivery: 'Cancelled',
    priority: 'medium'
  }
];

// Orders component function
function Orders() {
  // State to track the selected filter
  const [statusFilter, setStatusFilter] = useState('all');
  // State to track the selected order for details view
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all' 
    ? ordersData 
    : ordersData.filter(order => order.status === statusFilter);

  // Function to get status color for styling
  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#10b981'; // Green
      case 'in-transit': return '#3b82f6'; // Blue  
      case 'loading': return '#f59e0b'; // Yellow
      case 'pending': return '#6b7280'; // Gray
      case 'cancelled': return '#ef4444'; // Red
      default: return '#6b7280';
    }
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444'; // Red
      case 'medium': return '#f59e0b'; // Yellow
      case 'low': return '#10b981'; // Green
      default: return '#6b7280';
    }
  };

  return (
    // Main container for orders page
    <div className="orders-container">
      
      {/* Header section with title and filters */}
      <div className="orders-header">
        <div className="header-left">
          <h2>Orders Management</h2>
          <p className="orders-count">{filteredOrders.length} orders found</p>
        </div>
        
        {/* Filter buttons */}
        <div className="filter-buttons">
          {['all', 'pending', 'loading', 'in-transit', 'delivered', 'cancelled'].map(status => (
            <button
              key={status} // Unique key for React rendering
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)} // Set the active filter
            >
              {status === 'all' ? 'All Orders' : status.replace('-', ' ').toUpperCase()}
              {/* Show count for each status */}
              <span className="filter-count">
                {status === 'all' ? ordersData.length : ordersData.filter(o => o.status === status).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders grid/list */}
      <div className="orders-grid">
        {filteredOrders.map(order => (
          <div 
            key={order.id} // Unique key for React rendering
            className="order-card"
            onClick={() => setSelectedOrder(order)} // Show order details on click
          >
            {/* Order card header */}
            <div className="order-header">
              <div className="order-id-section">
                <span className="order-id">{order.id}</span>
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(order.priority) }}
                >
                  {order.priority.toUpperCase()}
                </span>
              </div>
              
              {/* Order status indicator */}
              <div 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            {/* Customer information */}
            <div className="customer-info">
              <h4>{order.customer}</h4>
              <p className="order-value">{order.value}</p>
            </div>

            {/* Route information */}
            <div className="route-info">
              <div className="route-item">
                <span className="route-label">From:</span>
                <span className="route-location">{order.pickup}</span>
              </div>
              <div className="route-arrow">→</div>
              <div className="route-item">
                <span className="route-label">To:</span>
                <span className="route-location">{order.delivery}</span>
              </div>
            </div>

            {/* Order details */}
            <div className="order-details">
              <div className="detail-item">
                <span className="detail-label">Vehicle:</span>
                <span className="detail-value">{order.vehicle}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Weight:</span>
                <span className="detail-value">{order.weight}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ETA:</span>
                <span className="detail-value">{order.expectedDelivery}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order details modal/panel (shows when an order is selected) */}
      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedOrder(null)} // Close modal
              >
                ×
              </button>
            </div>

            {/* Modal content */}
            <div className="modal-content">
              {/* Order status and priority */}
              <div className="modal-section">
                <h4>Status & Priority</h4>
                <div className="status-priority-row">
                  <span 
                    className="modal-status"
                    style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                  >
                    {selectedOrder.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span 
                    className="modal-priority"
                    style={{ backgroundColor: getPriorityColor(selectedOrder.priority) }}
                  >
                    {selectedOrder.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>

              {/* Customer information */}
              <div className="modal-section">
                <h4>Customer Information</h4>
                <p><strong>Company:</strong> {selectedOrder.customer}</p>
                <p><strong>Order Value:</strong> {selectedOrder.value}</p>
                <p><strong>Cargo Weight:</strong> {selectedOrder.weight}</p>
              </div>

              {/* Route information */}
              <div className="modal-section">
                <h4>Route Information</h4>
                <p><strong>Pickup Location:</strong> {selectedOrder.pickup}</p>
                <p><strong>Delivery Location:</strong> {selectedOrder.delivery}</p>
                <p><strong>Expected Delivery:</strong> {selectedOrder.expectedDelivery}</p>
              </div>

              {/* Vehicle assignment */}
              <div className="modal-section">
                <h4>Vehicle Assignment</h4>
                <p><strong>Vehicle ID:</strong> {selectedOrder.vehicle}</p>
                <p><strong>Driver:</strong> {selectedOrder.driver}</p>
              </div>
            </div>

            {/* Modal action buttons */}
            <div className="modal-actions">
              <button className="action-btn track">Track Order</button>
              <button className="action-btn edit">Edit Order</button>
              <button className="action-btn cancel">Cancel Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export the component to be used in App.js
export default Orders;