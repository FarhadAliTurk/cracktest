import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import CountUp from 'react-countup';
import HeroImageWebP from '../assets/success.webp';
import './Hero.css';

const Hero = () => {
  const scrollToCategories = () => {
    const section = document.getElementById('categories');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero Section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Crack <span>Job Tests</span> with Confidence
            </h1>
            <p className="hero-subtitle">
              Master every MCQ and secure your Grade 14 job. Trusted by thousands of smart candidates across Pakistan.
            </p>
            <div className="hero-cta">
              <button
                className="btn btn-primary btn-lg hover-scale"
                onClick={scrollToCategories}
                aria-label="Start practicing quizzes"
              >
                Start Practicing
              </button>

              <div className="hero-stats" aria-label="App Statistics">
                <div className="stat-item">
                  <div className="stat-number">
                    <CountUp end={15000} duration={2.5} separator="," />+
                  </div>
                  <div className="stat-label">Active Learners</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <CountUp end={95} duration={2} suffix="%" />
                  </div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <CountUp end={5000} duration={2} separator="," />+
                  </div>
                  <div className="stat-label">MCQs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual" role="img" aria-label="Student celebrating job success">
            <div className="hero-image-container">
              <picture>
                <source srcSet={HeroImageWebP} type="image/webp" />
                <img
                  src={HeroImageWebP}
                  alt="Successful student with certificate"
                  className="hero-image"
                  width="600"
                  height="400"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
              <div className="achievement-badge" aria-hidden="true">
                <FaTrophy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;