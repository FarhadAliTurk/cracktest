import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="policy-section" aria-labelledby="privacy-title" style={{ scrollMarginTop: '90px' }}>
      <div className="policy-container">
        <div className="section-header">
          <h2 className="section-title" id="privacy-title">Privacy Policy</h2>
          <p className="section-subtitle">
            Your privacy is important to us. This policy explains how we handle your data.
          </p>
        </div>

        <div className="policy-content">
          <h3>1. Information Collection</h3>
          <p>We collect personal information like name, email, and phone number when you use our services.</p>

          <h3>2. Information Usage</h3>
          <p>Your information is used to provide services, improve your experience, and communicate updates.</p>

          <h3>3. Data Sharing</h3>
          <p>We do not sell or share your personal data with third parties except as required by law or for payment processing.</p>

          <h3>4. Security</h3>
          <p>We implement strict security measures to protect your data from unauthorized access.</p>

          <h3>5. Cookies</h3>
          <p>Our app may use cookies to enhance user experience and track app usage anonymously.</p>

          <h3>6. Contact</h3>
          <p>If you have questions regarding your data, contact us at <a href="mailto: cracktest.official@gmail.com">cracktest.official@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
