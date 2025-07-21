import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import './WhatsAppPopup.css';

const WhatsAppPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before (using localStorage)
    const hasSeenPopup = localStorage.getItem('hasSeenWhatsAppPopup');
    
    // Only show if it's their first visit or after a certain period
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('hasSeenWhatsAppPopup', 'true');
      }, 5000); // Show after 5 seconds
        
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleFollow = () => {
    window.open('https://whatsapp.com/channel/0029VaFj3DcFsJbNFGHoUE0V', '_blank');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="whatsapp-popup-overlay">
      <div className="whatsapp-popup">
        <button className="close-btn" onClick={handleClose} aria-label="Close popup">
          <FaTimes />
        </button>
        
        <div className="popup-content">
          <div className="whatsapp-icon">
            <FaWhatsapp />
          </div>
          <h3>Stay Updated with CrackTest!</h3>
          <p>Have you followed our WhatsApp channel for exclusive content and updates?</p>
          
          <div className="popup-buttons">
            <button className="btn-follow" onClick={handleFollow}>
              <FaWhatsapp /> Follow Now
            </button>
            <button className="btn-later" onClick={handleClose}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPopup;