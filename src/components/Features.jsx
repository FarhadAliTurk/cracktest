import React from 'react';
import './Features.css';
import {
  FaClipboardCheck,
  FaChartPie,
  FaClock,
  FaMobileAlt,
  FaBookReader,
  FaUserFriends
} from 'react-icons/fa';

const features = [
  {
    icon: <FaClipboardCheck aria-hidden="true" />,
    title: "Extensive Question Banks",
    description: "Thousands of MCQs across categories with regular updates and syllabus alignment."
  },
  {
    icon: <FaChartPie aria-hidden="true" />,
    title: "Smart Performance Insights",
    description: "Visual progress charts and AI-powered topic analysis to help you focus where it matters."
  },
  {
    icon: <FaClock aria-hidden="true" />,
    title: "Exam-Like Timed Practice",
    description: "Master pressure with realistic timers, auto-submits, and instant results."
  },
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "100% Mobile Responsive",
    description: "Study anywhere — phone, tablet, or laptop — with smooth and optimized layouts."
  },
  {
    icon: <FaBookReader aria-hidden="true" />,
    title: "Instant Explanations",
    description: "Learn with real-time correct answers and explanations to strengthen your concepts."
  },
  {
    icon: <FaUserFriends aria-hidden="true" />,
    title: "Peer Support Community",
    description: "Connect with aspirants, ask doubts, and discuss preparation strategies."
  }
];

const Features = () => {
  return (
    <section className="features-section" id="features" aria-labelledby="features-title">
      <div className="features-container">
        <div className="section-header center">
          <h2 className="section-title" id="features-title">Why Choose CrackTest</h2>
          <p className="section-subtitle">
            Everything you need to crack competitive exams in Pakistan — all in one place.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={index} aria-label={`Feature: ${feature.title}`}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
