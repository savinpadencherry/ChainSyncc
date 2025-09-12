import './TopBar.css';

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-brand">
        <div className="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1 className="brand-text">ChainSync</h1>
      </div>
      
      <div className="topbar-metrics">
        <div className="metric-item">
          <div className="metric-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M1 3h14l4 4v11H1V3z" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="14" cy="18" r="2" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">12</div>
            <div className="metric-label">Active</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className="metric-item">
          <div className="metric-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">94%</div>
            <div className="metric-label">On-Time</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className="metric-item highlight">
          <div className="metric-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.77 3h16.82a2 2 0 0 0 1.77-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">2</div>
            <div className="metric-label">Alerts</div>
          </div>
        </div>

        <div className="metric-separator"></div>

        <div className="metric-item savings">
          <div className="metric-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">₹8,240</div>
            <div className="metric-label">Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
