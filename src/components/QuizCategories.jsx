import React, { useState } from 'react';
import './QuizCategories.css';
import { motion } from 'framer-motion';
import {
  FaGlobeAsia, FaFlask, FaCalculator, FaLaptopCode,
  FaMosque, FaBook, FaBrain, FaLandmark, FaMoneyBillWave,
  FaUniversity, FaMicroscope, FaStar, FaChalkboardTeacher,
  FaCalendarAlt, FaBookOpen, FaBolt
} from 'react-icons/fa';
import Quiz from './Quiz';
import FollowGate from './FollowGate';

const QuizCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFollowGate, setShowFollowGate] = useState(false);
  const [nextCategory, setNextCategory] = useState(null);

  const categories = [
    { name: "Pakistan GK", icon: <FaGlobeAsia />, count: 250 },
    { name: "Everyday Science", icon: <FaFlask />, count: 180 },
    { name: "Maths", icon: <FaCalculator />, count: 150 },
    { name: "Computer Science", icon: <FaLaptopCode />, count: 120 },
    { name: "Islamiat", icon: <FaMosque />, count: 120 },
    { name: "English", icon: <FaBook />, count: 100 },
    { name: "IQ / Reasoning", icon: <FaBrain />, count: 100 },
    { name: "Capitals", icon: <FaLandmark />, count: 50 },
    { name: "Currencies", icon: <FaMoneyBillWave />, count: 50 },
    { name: "World Organizations", icon: <FaUniversity />, count: 40 },
    { name: "Discoveries & Inventions", icon: <FaMicroscope />, count: 50 },
    { name: "Astronomy", icon: <FaStar />, count: 30 },
    { name: "Education Pedagogy", icon: <FaChalkboardTeacher />, count: 60 },
    { name: "Famous Books & Authors", icon: <FaBookOpen />, count: 30 },
    { name: "Important Days", icon: <FaCalendarAlt />, count: 30 },
    { name: "Scientific Instruments", icon: <FaBolt />, count: 30 },
    { name: "Abbreviations", icon: <FaUniversity />, count: 30 }
  ];

  const handleCategorySelect = (category) => {
    setNextCategory(category.name);
    setShowFollowGate(true);
  };

  const handleQuizClose = () => {
    setSelectedCategory(null);
  };

  const handleUnlock = () => {
    setSelectedCategory(nextCategory);
    setShowFollowGate(false);
  };

  if (selectedCategory) {
    return <Quiz category={selectedCategory} onClose={handleQuizClose} />;
  }

  return (
    <section className="categories-section" id="categories" aria-labelledby="category-title">
      <div className="background-pattern"></div>

      <div className="categories-container">
        <div className="section-header">
          <h2 className="section-title" id="category-title">Quiz Categories</h2>
          <p className="section-subtitle">
            Smartly categorized MCQs for all 14-grade job tests in Pakistan.
          </p>
        </div>

        <motion.div
          className="categories-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="category-card"
              role="button"
              tabIndex={0}
              aria-label={`Start ${category.name} quiz`}
              onClick={() => handleCategorySelect(category)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCategorySelect(category);
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="category-icon">
                {React.cloneElement(category.icon, { 'aria-hidden': true })}
              </div>
              <h3 className="category-title">{category.name}</h3>
              <p className="category-count">{category.count}+ Questions</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {showFollowGate && <FollowGate onUnlock={handleUnlock} />}
    </section>
  );
};

export default QuizCategories;
