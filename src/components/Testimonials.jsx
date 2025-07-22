import React from 'react';
import './Testimonials.css';
import { FaQuoteRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    <section id="testimonials" className="testimonials-section bg-alt" aria-labelledby="testimonials-title" style={{ scrollMarginTop: '90px' }}>
      <div className="testimonials-container">
        <div className="section-header center">
          <h2 className="section-title" id="testimonials-title">Success Stories</h2>
          <p className="section-subtitle">Real candidates. Real results. Real impact.</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials-slider"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <blockquote className="testimonial-card" aria-label={`Testimonial from ${item.author}`}>
                <FaQuoteRight className="quote-icon" aria-hidden="true" />
                <p className="testimonial-text">"{item.text}"</p>
                <footer className="testimonial-author">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="author-avatar"
                    width="64"
                    height="64"
                    loading="lazy"
                  />
                  <div className="author-info">
                    <h3>{item.author}</h3>
                    <p>{item.role}</p>
                  </div>
                </footer>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
