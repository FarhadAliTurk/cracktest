import React, { Suspense, lazy } from 'react';
import './App.css';
import './styles/base.css';
import './styles/utilities.css';
import './styles/animations.css';
import './styles/loader.css';
import Hero from './components/Hero'; // Eagerly loaded to boost LCP
import Logo from './assets/logo-icon.svg'; // Logo for fallback

// Lazy-loaded components
const Navbar = lazy(() => import('./components/Navbar'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const QuizCategories = lazy(() => import('./components/QuizCategories'));
const PDFLibrary = lazy(() => import('./components/PDFLibrary'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppPopup = lazy(() => import('./components/WhatsAppPopup')); // New lazy-loaded popup

function App() {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="loader-container" style={{ minHeight: '100vh' }}>
            <div className="text-logo-loader">
              <img src={Logo} alt="CrackTest Logo" className="loader-logo-icon" />
              <span className="loader-logo-text">CrackTest</span>
              <span className="loader-logo-dot"></span>
            </div>
          </div>
        }
      >
        <Navbar />
        <Hero />
        <AboutUs />
        <QuizCategories />
        <PDFLibrary />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppPopup />
      </Suspense>
    </div>
  );
}

export default App;
