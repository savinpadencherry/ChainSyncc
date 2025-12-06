// Import React hooks for state management
import React from 'react';
// Import CSS for styling
import './Sidebar.css';
import './TopBar.css';
import LanguageToggle, { translations } from './LanguageToggle';

// Sidebar component - navigation menu for the application
function Sidebar({ activeTab, setActiveTab, onOpenROI, language, setLanguage }) {
  const t = translations[language] || translations.en;
  
  // Navigation items with their details
  const navItems = [
    {
      id: 'live-map',
      name: t.liveMap,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'orders',
      name: t.orders,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="6,2 6,6 18,6 18,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'route-plans',
      name: t.routePlans,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="7,10 12,14 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'load-planner',
      name: t.loadPlanner,
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
      name: t.analytics,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'cost-analysis',
      name: t.costAnalysis,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 5H9.5A3.5 3.5 0 0 0 6 8.5V8.5A3.5 3.5 0 0 0 9.5 12H14.5A3.5 3.5 0 0 1 18 15.5V15.5A3.5 3.5 0 0 1 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'ai-query',
      name: t.aiQuery,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.93 4.93L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.95 16.95L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.93 19.07L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebar">
      {/* Logo section */}
      <div className="logo">
        <div className="logo-icon">
          <img 
            className="sidebar-logo"
            src="/chainsync.jpeg" 
            alt="ChainSync logo"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo192.png'; }}
          />
        </div>
      </div>

      {/* Language Toggle - Hindi/English for truck owners */}
      <div className="language-container">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      {/* Navigation menu */}
      <nav>
        <ul>
          {navItems.map(item => (
            <li 
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* ROI Calculator Button - Key business differentiator */}
      <div className="roi-button-container">
        <button className="roi-calculator-btn" onClick={onOpenROI}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="8" y1="10" x2="16" y2="10"/>
            <line x1="8" y1="14" x2="10" y2="14"/>
            <line x1="14" y1="14" x2="16" y2="14"/>
            <line x1="8" y1="18" x2="10" y2="18"/>
            <line x1="14" y1="18" x2="16" y2="18"/>
          </svg>
          <span>{t.roiCalculator}</span>
          <div className="roi-badge">NEW</div>
        </button>
      </div>
      
      {/* Footer with AI status */}
      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span>{t.aiReady}</span>
        </div>
        <p>RAG Pipeline Active</p>
      </div>
    </div>
  );
}

// Export the component to be used in App.js
export default Sidebar;
