// Import React hooks for state management
import React from 'react';
// Import CSS for styling
import './Sidebar.css';
import './TopBar.css';

// Sidebar component - navigation menu for the application
function Sidebar({ activeTab, setActiveTab }) {
  
  // Navigation items with their details
  const navItems = [
    {
      id: 'live-map',
      name: 'Live Map',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="6,2 6,6 18,6 18,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'route-plans',
      name: 'Route Plans',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="7,10 12,14 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'load-planner',
      name: 'Load Planner',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M1 3H15L19 7V18H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'cost-analysis',
      name: 'Cost Analysis',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 5H9.5A3.5 3.5 0 0 0 6 8.5V8.5A3.5 3.5 0 0 0 9.5 12H14.5A3.5 3.5 0 0 1 18 15.5V15.5A3.5 3.5 0 0 1 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'ai-query',
      name: 'AI Query',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9.09 9A3 3 0 0 1 12 6A3 3 0 0 1 15 9M21 16A7 7 0 1 1 7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebar">
      {/* Logo section */}
      <div className="logo">
        <div className="logo-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Navigation menu */}
      <nav>
        <ul>
          {navItems.map(item => (
            <li 
              key={item.id} // Unique key for React rendering
              className={activeTab === item.id ? 'active' : ''} // Highlight active tab
              onClick={() => setActiveTab(item.id)} // Switch to clicked tab
            >
              {item.icon} {/* Display the icon */}
              <span>{item.name}</span> {/* Display the name */}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer with AI status */}
      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span>Sav.in Ready</span>
        </div>
        <p>RAG Pipeline Active</p>
      </div>
    </div>
  );
}

// Export the component to be used in App.js
export default Sidebar;
