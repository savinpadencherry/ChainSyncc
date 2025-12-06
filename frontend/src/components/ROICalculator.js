// ROI Calculator - Shows real-time savings aligned with business model
import React, { useState } from 'react';
import './ROICalculator.css';

function ROICalculator({ isOpen, onClose }) {
  const [fleetSize, setFleetSize] = useState(10);
  const [currentCostPerKm, setCurrentCostPerKm] = useState(15);
  const [monthlyKm, setMonthlyKm] = useState(5000);
  const [showResults, setShowResults] = useState(false);
  const [animateResults, setAnimateResults] = useState(false);

  // Pricing tiers from business plan
  const getPricePerVehicle = (size) => {
    if (size <= 5) return 749;
    if (size <= 20) return 599;
    if (size <= 50) return 449;
    return 349;
  };

  // Calculate savings
  const pricePerVehicle = getPricePerVehicle(fleetSize);
  const monthlySubscription = pricePerVehicle * fleetSize;
  
  // ChainSync provides 15-25% cost reduction (use 18% conservative)
  const savingsPercent = 0.18;
  const currentMonthlyCost = fleetSize * monthlyKm * currentCostPerKm;
  const monthlySavings = currentMonthlyCost * savingsPercent;
  const netMonthlySavings = monthlySavings - monthlySubscription;
  const yearlySavings = netMonthlySavings * 12;
  const roi = ((netMonthlySavings / monthlySubscription) * 100).toFixed(0);
  
  // Competitor comparison
  const competitorPrice = 1500; // Average competitor price
  const competitorMonthlyCost = competitorPrice * fleetSize;
  const savingsVsCompetitor = competitorMonthlyCost - monthlySubscription;
  const savingsPercVsCompetitor = ((savingsVsCompetitor / competitorMonthlyCost) * 100).toFixed(0);

  const handleCalculate = () => {
    setShowResults(true);
    setAnimateResults(true);
    setTimeout(() => setAnimateResults(false), 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="roi-overlay" onClick={onClose}>
      <div className="roi-calculator" onClick={e => e.stopPropagation()}>
        <div className="roi-header">
          <div className="roi-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <h2>ROI Calculator</h2>
          </div>
          <button className="roi-close" onClick={onClose}>×</button>
        </div>

        <div className="roi-content">
          {/* Input Section */}
          <div className="roi-inputs">
            <div className="input-group">
              <label>Fleet Size (Vehicles)</label>
              <div className="input-with-slider">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={fleetSize}
                  onChange={(e) => setFleetSize(Number(e.target.value))}
                />
                <span className="input-value">{fleetSize}</span>
              </div>
              <div className="tier-indicator">
                {fleetSize <= 5 ? 'Starter' : fleetSize <= 20 ? 'Pro' : fleetSize <= 50 ? 'Enterprise' : 'Enterprise+'}
                <span className="tier-price">₹{pricePerVehicle}/vehicle/month</span>
              </div>
            </div>

            <div className="input-group">
              <label>Current Cost per Km (₹)</label>
              <div className="input-with-slider">
                <input 
                  type="range" 
                  min="10" 
                  max="25" 
                  value={currentCostPerKm}
                  onChange={(e) => setCurrentCostPerKm(Number(e.target.value))}
                />
                <span className="input-value">₹{currentCostPerKm}</span>
              </div>
            </div>

            <div className="input-group">
              <label>Avg Monthly Km per Vehicle</label>
              <div className="input-with-slider">
                <input 
                  type="range" 
                  min="2000" 
                  max="10000" 
                  step="500"
                  value={monthlyKm}
                  onChange={(e) => setMonthlyKm(Number(e.target.value))}
                />
                <span className="input-value">{monthlyKm.toLocaleString()} km</span>
              </div>
            </div>

            <button className="calculate-btn" onClick={handleCalculate}>
              Calculate My Savings
            </button>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className={`roi-results ${animateResults ? 'animate' : ''}`}>
              <div className="results-header">
                <h3>Your Potential Savings</h3>
                <p>Based on 18% cost reduction (industry average: 15-25%)</p>
              </div>

              <div className="savings-cards">
                <div className="savings-card monthly">
                  <div className="card-label">Monthly Net Savings</div>
                  <div className="card-value">₹{netMonthlySavings.toLocaleString()}</div>
                  <div className="card-detail">After ₹{monthlySubscription.toLocaleString()} subscription</div>
                </div>

                <div className="savings-card yearly highlight">
                  <div className="card-label">Annual Savings</div>
                  <div className="card-value">₹{(yearlySavings / 100000).toFixed(2)} Lakhs</div>
                  <div className="card-detail">ROI: {roi}%</div>
                </div>

                <div className="savings-card competitor">
                  <div className="card-label">vs Competitors</div>
                  <div className="card-value">₹{savingsVsCompetitor.toLocaleString()}/mo</div>
                  <div className="card-detail">{savingsPercVsCompetitor}% cheaper</div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="comparison-table">
                <div className="table-header">
                  <span>Metric</span>
                  <span>Competitors</span>
                  <span className="chainsync">ChainSync</span>
                </div>
                <div className="table-row">
                  <span>Price per Vehicle</span>
                  <span className="competitor-val">₹1,500-3,000</span>
                  <span className="chainsync-val">₹{pricePerVehicle}</span>
                </div>
                <div className="table-row">
                  <span>Setup Time</span>
                  <span className="competitor-val">3-6 months</span>
                  <span className="chainsync-val">30 minutes</span>
                </div>
                <div className="table-row">
                  <span>Language Support</span>
                  <span className="competitor-val">English only</span>
                  <span className="chainsync-val">Hindi + Regional</span>
                </div>
                <div className="table-row">
                  <span>Network</span>
                  <span className="competitor-val">4G required</span>
                  <span className="chainsync-val">Works on 2G</span>
                </div>
                <div className="table-row">
                  <span>Contracts</span>
                  <span className="competitor-val">Annual lock-in</span>
                  <span className="chainsync-val">Monthly, cancel anytime</span>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="roi-cta">
                <div className="cta-text">
                  <strong>Payback Period:</strong> Less than 2 months
                  <br/>
                  <span>Start seeing savings from Day 1</span>
                </div>
                <button className="cta-btn">
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom stats - from business plan */}
        <div className="roi-footer">
          <div className="footer-stat">
            <div className="stat-value">8.5:1</div>
            <div className="stat-label">LTV:CAC Ratio</div>
          </div>
          <div className="footer-stat">
            <div className="stat-value">72%</div>
            <div className="stat-label">Gross Margin</div>
          </div>
          <div className="footer-stat">
            <div className="stat-value">1.25%</div>
            <div className="stat-label">Monthly Churn</div>
          </div>
          <div className="footer-stat">
            <div className="stat-value">50-75%</div>
            <div className="stat-label">Cheaper than Competition</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ROICalculator;
