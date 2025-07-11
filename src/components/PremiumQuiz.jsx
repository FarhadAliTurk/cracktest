import React from "react";
import "./PremiumQuiz.css";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaKey,
  FaShieldAlt,
  FaGem,
  FaUserSecret,
  FaWhatsapp,
} from "react-icons/fa";

const premiumCategories = [
  {
    name: "JST Past Papers 2023-2024 (Official)",
    icon: <FaCrown />,
    count: 100,
    price: "Rs. 150",
    tag: "🔥 Most Wanted",
  },
  {
    name: "PST Solved Papers 2022-2023 (100% Verified)",
    icon: <FaKey />,
    count: 100,
    price: "Rs. 120",
    tag: "🔥 Most Wanted",
  },
  {
    name: "General Science Mega Set (All Boards)",
    icon: <FaShieldAlt />,
    count: 180,
    price: "Rs. 100",
    tag: null,
  },
  {
    name: "IQ & Reasoning 2024 Preparation",
    icon: <FaGem />,
    count: 100,
    price: "Rs. 80",
    tag: null,
  },
  {
    name: "Most Repeated MCQs (All Tests)",
    icon: <FaUserSecret />,
    count: 250,
    price: "Rs. 160",
    tag: "🔥 Most Wanted",
  },
];

const PremiumQuiz = () => {
  return (
    <div id="premium" className="premium-container">
      {premiumCategories.map((category, index) => (
        <motion.div
          key={index}
          className="premium-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="premium-badge">Premium</div>
          <div className="premium-icon">{category.icon}</div>
          <div className="premium-title">{category.name}</div>
          <div className="premium-count">{category.count} Real MCQs</div>
          <div className="premium-price">{category.price}</div>

          <a
            href="https://wa.me/923161193300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="whatsapp-btn">
              <FaWhatsapp /> Unlock via WhatsApp
            </button>
          </a>

          {category.tag && <div className="most-wanted">{category.tag}</div>}
        </motion.div>
      ))}
    </div>
  );
};

export default PremiumQuiz;
