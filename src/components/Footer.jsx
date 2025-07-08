// Footer.jsx
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Logo & Tagline */}
          <div className="footer-brand">
            <div className="footer-logo">
              CrackTest<span className="dot"></span>
            </div>
            <p className="tagline">
              Pakistan’s leading platform for test preparation — trusted by thousands of successful candidates.
            </p>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61551771230717&mibextid=ZbWKwL"><FaFacebookF /></a>
              <a href="https://github.com/farhadaliturk"><FaGithub /></a>
              <a href="https://linkedin.com/in/farhad-ali-turk-135369305"><FaLinkedinIn /></a>
              <a href="mailto:farhadaliturk@example.com"><FaEnvelope/></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#premium">Premium</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#refund">Refund Policy</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Get free test tips and new updates every week.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CrackTest — All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
