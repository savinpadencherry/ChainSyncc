import React from 'react';
import './TrafficAlertModal.css';

function TrafficAlertModal({ isOpen, onClose, onOptimize, isOptimized, optimizationResult }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="traffic-alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="alert-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.59 21H20.41A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="#f59e0b" strokeWidth="2"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="#f59e0b" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="#f59e0b" strokeWidth="2"/>
            </svg>
          </div>
          <div className="alert-title">
            <h2>Traffic Alert Detected</h2>
            <span className="alert-severity">High Priority</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="alert-details">
            <div className="detail-section">
              <h3>🚧 Traffic Situation</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Location:</span>
                  <span className="value">NH-48 Mumbai-Pune Highway</span>
                </div>
                <div className="detail-item">
                  <span className="label">Cause:</span>
                  <span className="value">Heavy congestion due to road construction</span>
                </div>
                <div className="detail-item">
                  <span className="label">Current Delay:</span>
                  <span className="value danger">25 minutes</span>
                </div>
                <div className="detail-item">
                  <span className="label">Vehicles Affected:</span>
                  <span className="value">TRK001, TRK003, TRK005</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>📊 Impact Analysis</h3>
              <div className="impact-grid">
                <div className="impact-card negative">
                  <div className="impact-icon">⏱️</div>
                  <div className="impact-value">+25 min</div>
                  <div className="impact-label">Delivery Delay</div>
                </div>
                <div className="impact-card negative">
                  <div className="impact-icon">💰</div>
                  <div className="impact-value">₹2,100</div>
                  <div className="impact-label">Cost Impact</div>
                </div>
                <div className="impact-card negative">
                  <div className="impact-icon">⚡</div>
                  <div className="impact-value">+15L</div>
                  <div className="impact-label">Extra Fuel</div>
                </div>
              </div>
            </div>

            {isOptimized && optimizationResult && (
              <div className="detail-section optimization-result">
                <h3>✅ AI Optimization Complete</h3>
                <div className="optimization-success">
                  <div className="success-message">
                    <div className="success-icon">🚀</div>
                    <div>
                      <h4>Route Optimized Successfully!</h4>
                      <p>AI has found an alternative route via Expressway 62</p>
                    </div>
                  </div>
                  
                  <div className="optimization-metrics">
                    <div className="metric-card positive">
                      <div className="metric-icon">⏱️</div>
                      <div className="metric-value">-15 min</div>
                      <div className="metric-label">Time Saved</div>
                    </div>
                    <div className="metric-card mixed">
                      <div className="metric-icon">⛽</div>
                      <div className="metric-value">+₹280</div>
                      <div className="metric-label">Extra Fuel</div>
                    </div>
                    <div className="metric-card positive">
                      <div className="metric-icon">💰</div>
                      <div className="metric-value">₹1,200</div>
                      <div className="metric-label">Time Value</div>
                    </div>
                    <div className="metric-card positive highlight">
                      <div className="metric-icon">📈</div>
                      <div className="metric-value">₹920</div>
                      <div className="metric-label">Net Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-actions">
          {!isOptimized ? (
            <button className="optimize-btn" onClick={onOptimize}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9.09 9A3 3 0 0 1 12 6A3 3 0 0 1 15 9M21 16A7 7 0 1 1 7 16" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 17V21" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 21H16" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Optimize Route with AI
            </button>
          ) : (
            <button className="success-btn" disabled>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Route Optimized
            </button>
          )}
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrafficAlertModal;
