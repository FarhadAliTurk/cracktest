import React, { Suspense, lazy } from 'react';
import './App.css';
import './styles/base.css';
import './styles/utilities.css';
import './styles/animations.css';
import './styles/loader.css';
import Hero from './components/Hero'; // Eagerly loaded to boost LCP

// Lazy-loaded components
const Navbar = lazy(() => import('./components/Navbar'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const QuizCategories = lazy(() => import('./components/QuizCategories'));
const PremiumQuiz = lazy(() => import('./components/PremiumQuiz'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="loader-container" style={{ minHeight: '100vh' }}>
            <div className="text-logo-loader">
              <span className="logo-text">CrackTest</span>
              <span className="logo-dot">.</span>
            </div>
          </div>
        }
      >
        <Navbar />
        <Hero />
        <AboutUs />
        <QuizCategories />
        <PremiumQuiz />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;  