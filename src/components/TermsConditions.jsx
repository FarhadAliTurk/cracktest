import React from 'react';
import './TermsConditions.css';

const TermsConditions = () => {
  return (
    <section className="policy-section" aria-labelledby="terms-title" style={{ scrollMarginTop: '90px' }}>
      <div className="policy-container">
        <div className="section-header">
          <h2 className="section-title" id="terms-title">Terms & Conditions</h2>
          <p className="section-subtitle">
            Please read these terms carefully before using our app.
          </p>
        </div>

        <div className="policy-content">
          <h3>1. Acceptance of Terms</h3>
          <p>By using our app, you agree to these terms and our privacy policy.</p>

          <h3>2. Use of Services</h3>
          <p>You agree to use our services lawfully and not for fraudulent activities.</p>

          <h3>3. Payment & Transactions</h3>
          <p>All transactions processed via EasyPaisa or other payment providers are subject to their terms.</p>

          <h3>4. User Account</h3>
          <p>You are responsible for keeping your account information secure and accurate.</p>

          <h3>5. Intellectual Property</h3>
          <p>All content in the app, including logos, images, and text, is owned by us or our partners.</p>

          <h3>6. Limitation of Liability</h3>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from app usage.</p>

          <h3>7. Contact</h3>
          <p>If you have questions, contact us at <a href="mailto:cracktest.official@gmail.com">cracktest.official@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
