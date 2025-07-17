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
              CrackTest<span className="dot" aria-hidden="true"></span>
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
