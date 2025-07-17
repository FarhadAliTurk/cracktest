// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaTimes, FaBars, FaCrown } from 'react-icons/fa';
import './Navbar.css';
import Logo from '../assets/logo-icon.svg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef([]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    const scrollPosition = window.scrollY + 100;
    for (const section of sectionsRef.current) {
      if (!section) continue;
      const { offsetTop, offsetHeight, id } = section;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        if (activeSection !== id) {
          requestAnimationFrame(() => setActiveSection(id));
        }
        break;
      }
    }
  }, [activeSection]);

  useEffect(() => {
    sectionsRef.current = [
      'home', 'about', 'categories', 'pdf-library', 'testimonials', 'contact'
    ].map(id => document.getElementById(id));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileMenuOpen);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="container">
        <a href="#home" className="navbar-brand" aria-label="CrackTest home link">
          <img src={Logo} alt="CrackTest logo" className="logo-icon" />
          <span className="logo-text">CrackTest</span>
          <span className="logo-dot" aria-hidden="true">.</span>
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav id="main-navigation" className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`} role="navigation" aria-label="Main Navigation">
          <div className="nav-links">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'categories', label: 'Quiz' },
              { id: 'pdf-library', label: 'PDF Library', icon: <FaCrown /> },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label, icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${id === 'pdf-library' ? 'premium-link' : ''} ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(id);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleNavClick(id)}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <span>{label}</span>
                {icon && <span className="premium-icon" aria-hidden="true">{icon}</span>}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
