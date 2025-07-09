import React from 'react';
import './PremiumQuiz.css';
import { 
  FaChartLine, FaBookOpen, FaUserTie, FaClock, FaCheck, FaCrown, FaShieldAlt 
} from 'react-icons/fa';

const premiumFeatures = [
  {
    icon: <FaChartLine />,
    title: 'Advanced Analytics',
    desc: 'Track your progress with detailed performance reports.'
  },
  {
    icon: <FaBookOpen />,
    title: 'Exclusive Question Banks',
    desc: 'Access premium-only questions and mock tests.'
  },
  {
    icon: <FaUserTie />,
    title: 'Expert Guidance',
    desc: 'Get tips from successful candidates and subject experts.'
  },
  {
    icon: <FaClock />,
    title: 'Time Management Tools',
    desc: 'Practice with timed tests and improve your speed.'
  }
];

const PremiumQuiz = () => {
  return (
    <section className="premium-section categories-section" id="premium">
      <div className="background-pattern"></div>

      <div className="categories-container">
        <div className="section-header">
          <h2 className="section-title">
            <FaCrown style={{ color: '#f5b301', marginRight: '8px' }} /> Unlock Premium Features
          </h2>
          <p className="section-subtitle">
            Get exclusive tools to supercharge your exam prep.
          </p>
        </div>

        <div className="categories-grid">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="category-card premium-locked">
              <div className="category-icon">{feature.icon}</div>
              <h3 className="category-title">{feature.title}</h3>
              <p className="category-count">{feature.desc}</p>
              <div className="premium-blur">🔒 Premium</div>
            </div>
          ))}
        </div>

        <div className="premium-upgrade-card">
          <h3 className="upgrade-title">Go Premium for Rs. 999/mo</h3>
          <p className="upgrade-subtitle">Billed monthly. Cancel anytime.</p>

          <ul className="premium-benefits-list">
            <li><FaCheck /> All 12 question categories</li>
            <li><FaCheck /> 5000+ premium questions</li>
            <li><FaCheck /> Full-length mock tests</li>
            <li><FaCheck /> Detailed explanations</li>
            <li><FaCheck /> Performance tracking</li>
          </ul>

          <button className="btn btn-primary mt-3">Upgrade Now</button>
          <div className="secure-note">
            <FaShieldAlt /> Secure payment. 7-day money back guarantee.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumQuiz;
