import './TopBar.css';

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-brand">
        <div className="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="topbar-metrics">
        <div className="metric-card">
          <div className="metric-icon truck">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M1 3H15L19 7V18H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">12</div>
            <div className="metric-label">Active Vehicles</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon time">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">94%</div>
            <div className="metric-label">On-Time Delivery</div>
          </div>
        </div>

        <div className="metric-card alert">
          <div className="metric-icon warning">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.59 21H20.41A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">2</div>
            <div className="metric-label">Active Alerts</div>
          </div>
        </div>

        <div className="metric-card savings">
          <div className="metric-content-large">
            <div className="metric-value-large">₹8,240</div>
            <div className="metric-label">Cost Savings Today</div>
            <div className="metric-sublabel">AI Optimization: ₹12,340 Fuel Saved: ₹6,890</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
