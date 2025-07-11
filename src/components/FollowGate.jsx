import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTimes } from 'react-icons/fa';
import './FollowGate.css';

const FollowGate = ({ onUnlock, onClose }) => {
  const [visited, setVisited] = useState({ fb: false, li: false, wa: false });

  const handleVisit = (platform) => {
    const urls = {
      fb: 'https://www.facebook.com/profile.php?id=61551771230717&mibextid=ZbWKwL',
      li: 'https://linkedin.com/in/farhad-ali-turk-135369305',
      wa: 'https://whatsapp.com/channel/0029VaFj3DcFsJbNFGHoUE0V'
    };
    window.open(urls[platform], '_blank');
    setVisited((prev) => ({ ...prev, [platform]: true }));
  };

  const unlocked = visited.fb && visited.li && visited.wa;

  return (
    <div className="follow-gate-backdrop" role="dialog" aria-modal="true">
      <div className="follow-gate-modal">
        <button className="close-btn" onClick={onClose} aria-label="Close Follow Gate">
          <FaTimes />
        </button>

        <h3 className="follow-title">❤️ Your Support Means Everything!</h3>
        <p className="follow-subtitle">Follow us to unlock the premium quiz!</p>
        <p className="follow-support-msg">
          3 clicks = endless gratitude! 💌<br />
          Your small action helps us empower more learners 🌱
        </p>

        <div className="follow-buttons">
          <button
            className={`follow-btn fb ${visited.fb ? 'visited' : ''}`}
            onClick={() => handleVisit('fb')}
          >
            <FaFacebookF /> Facebook
          </button>
          <button
            className={`follow-btn li ${visited.li ? 'visited' : ''}`}
            onClick={() => handleVisit('li')}
          >
            <FaLinkedinIn /> LinkedIn
          </button>
          <button
            className={`follow-btn wa ${visited.wa ? 'visited' : ''}`}
            onClick={() => handleVisit('wa')}
          >
            <FaWhatsapp /> WhatsApp
          </button>
        </div>

        <button
          className="unlock-btn"
          disabled={!unlocked}
          onClick={onUnlock}
        >
          {unlocked ? '🎉 Start Your Premium Quiz' : '🔓 Follow All to Unlock'}
        </button>

        <p className="follow-thankyou-msg">
          {unlocked ? '🙏 Thank you for the love and support!' : '✨ Unlocking takes just 10 seconds!'}
        </p>
      </div>
    </div>
  );
};

export default FollowGate;
