import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import './FollowGate.css';

const FollowGate = ({ onUnlock }) => {
  const [visited, setVisited] = useState({ fb: false, li: false });

  const handleVisit = (platform) => {
    const urls = {
      fb: 'https://www.facebook.com/profile.php?id=61551771230717&mibextid=ZbWKwL',
      li: 'https://linkedin.com/in/farhad-ali-turk-135369305'
    };
    window.open(urls[platform], '_blank');
    setVisited((prev) => ({ ...prev, [platform]: true }));
  };

  const unlocked = visited.fb && visited.li;

  return (
    <div className="follow-gate-backdrop" role="dialog" aria-labelledby="follow-title" aria-modal="true">
      <div className="follow-gate-modal">
        <h3 id="follow-title" className="follow-title">Before You Begin</h3>
        <p className="follow-subtitle">Follow us to unlock this quiz</p>
        <p className="follow-support-msg">
          Your support means a lot! Consider contributing to help us keep creating.
        </p><br />

        <div className="follow-buttons" role="group" aria-label="Follow on social media">
          <button
            className={`follow-btn fb ${visited.fb ? 'visited' : ''}`}
            onClick={() => handleVisit('fb')}
            aria-pressed={visited.fb}
            aria-label="Follow on Facebook"
          >
            <FaFacebookF aria-hidden="true" /> Facebook
          </button>
          <button
            className={`follow-btn li ${visited.li ? 'visited' : ''}`}
            onClick={() => handleVisit('li')}
            aria-pressed={visited.li}
            aria-label="Follow on LinkedIn"
          >
            <FaLinkedinIn aria-hidden="true" /> LinkedIn
          </button>
        </div>

        <button
          className="btn btn-primary unlock-btn"
          disabled={!unlocked}
          onClick={onUnlock}
          aria-label={unlocked ? 'Start Quiz' : 'Follow both to unlock quiz'}
        >
          {unlocked ? 'Start Quiz' : 'Follow to Unlock'}
        </button>
      </div>
    </div>
  );
};

export default FollowGate;
