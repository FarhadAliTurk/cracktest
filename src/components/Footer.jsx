import React from 'react';
import './Footer.css';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link'; // Smooth scroll

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
              <span className="logo-text">CrackTest</span>
              <span className="logo-dot" aria-hidden="true"></span>
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
              <li><Link smooth to="#home">Home</Link></li>
              <li><Link smooth to="#about">About Us</Link></li>
              <li><Link smooth to="#categories">Categories</Link></li>
              <li><Link smooth to="#pdf-library">Premium</Link></li>
              <li><Link smooth to="#testimonials">Testimonials</Link></li>
              <li><Link smooth to="#contact">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><Link smooth to="#privacy">Privacy Policy</Link></li>
              <li><Link smooth to="#terms">Terms of Service</Link></li>
              <li><Link smooth to="#refund">Refund Policy</Link></li>
              <li><Link smooth to="#cookies">Cookie Policy</Link></li>
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
