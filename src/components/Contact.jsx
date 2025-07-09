import React from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title" id="contact-title">Contact Us</h2>
          <p className="section-subtitle">
            We’re here to support your journey. Reach out anytime!
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className="contact-info" role="complementary" aria-label="Contact information">
            <ContactItem icon={<FaMapMarkerAlt aria-hidden="true" />} title="Office" text="123 Blue Area, Islamabad, Pakistan" />
            <ContactItem icon={<FaPhoneAlt aria-hidden="true" />} title="Phone" text={
              <>
                <a href="tel:+92511234567">+92 51 1234567</a><br />
                <a href="tel:+923001234567">+92 300 1234567</a>
              </>
            } />
            <ContactItem icon={<FaEnvelope aria-hidden="true" />} title="Email" text={
              <>
                <a href="mailto:info@cracktest.com">info@cracktest.com</a><br />
                <a href="mailto:support@cracktest.com">support@cracktest.com</a>
              </>
            } />
            <ContactItem icon={<FaClock aria-hidden="true" />} title="Hours" text="Mon–Fri: 9AM–6PM | Sat: 10AM–4PM" />
          </div>

          {/* Form Panel */}
          <form className="contact-form" aria-label="Contact form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="Test Help or Feedback" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" placeholder="Write your message..." required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, text }) => (
  <div className="contact-item">
    <div className="contact-icon">{icon}</div>
    <div className="contact-text">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  </div>
);

export default Contact;
