import React from 'react';
import './Testimonials.css';
import { FaQuoteRight } from 'react-icons/fa';
import Avatar1 from '../assets/avatars/user1.webp';
import Avatar2 from '../assets/avatars/user2.webp';
import Avatar3 from '../assets/avatars/user3.webp';

const testimonials = [
  {
    text: "CrackTest helped me secure my position as an Assistant Director. Their practice tests mirrored the actual exam perfectly!",
    author: "Ahmed Raza",
    role: "Assistant Director, FPSC",
    avatar: Avatar1
  },
  {
    text: "The detailed explanations for each question were invaluable. I improved my score by 30% after two months of practice.",
    author: "Fatima Khan",
    role: "CSS Aspirant",
    avatar: Avatar2
  },
  {
    text: "As a working professional, the mobile accessibility allowed me to prepare during my commute. Best investment I made!",
    author: "Usman Ali",
    role: "Income Tax Officer",
    avatar: Avatar3
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="section-header center">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Real candidates. Real results. Real impact.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <FaQuoteRight className="quote-icon" />
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <img src={item.avatar} alt={item.author} className="author-avatar" />
                <div className="author-info">
                  <h4>{item.author}</h4>
                  <p>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
