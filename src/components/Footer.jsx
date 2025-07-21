import React from 'react';
import './Footer.css';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo" aria-label="CrackTest logo">
              <span className="logo-text">CrackTest</span><span className="logo-dot" aria-hidden="true"></span>
            </div>
            <p className="tagline">
              Pakistan’s leading platform for test preparation — trusted by thousands of successful candidates.
            </p>
            <div className="social-icons" aria-label="Social media links">
              <a href="https://www.facebook.com/profile.php?id=61551771230717&mibextid=ZbWKwL" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://github.com/farhadaliturk" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/farhad-ali-turk-135369305" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="mailto:farhadaliturk@gmail.com" aria-label="Email Farhad">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#pdf-library">Premium</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy" tabIndex={0} className="footer-link-disabled" aria-label="Privacy Policy (coming soon)">Privacy Policy <span className="footer-link-tooltip">(coming soon)</span></a></li>
              <li><a href="#terms" tabIndex={0} className="footer-link-disabled" aria-label="Terms of Service (coming soon)">Terms of Service <span className="footer-link-tooltip">(coming soon)</span></a></li>
              <li><a href="#refund" tabIndex={0} className="footer-link-disabled" aria-label="Refund Policy (coming soon)">Refund Policy <span className="footer-link-tooltip">(coming soon)</span></a></li>
              <li><a href="#cookies" tabIndex={0} className="footer-link-disabled" aria-label="Cookie Policy (coming soon)">Cookie Policy <span className="footer-link-tooltip">(coming soon)</span></a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Get free test tips and new updates every week.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="Your email address" required aria-label="Email" />
              <div className="subscribe-btn-wrapper">
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CrackTest — All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
