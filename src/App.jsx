import React, { Suspense, lazy } from 'react';
import './App.css';
import './styles/base.css';
import './styles/utilities.css';
import './styles/animations.css';
import './styles/loader.css';
import Hero from './components/Hero'; // Eager load critical section
import Logo from './assets/logo-icon.png';

// Lazy-loaded components (non-critical)
const Navbar = lazy(() => import('./components/Navbar'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const QuizCategories = lazy(() => import('./components/QuizCategories'));
const PDFLibrary = lazy(() => import('./components/PDFLibrary'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppPopup = lazy(() => import('./components/WhatsAppPopup'));

function App() {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="loader-container" style={{ minHeight: '100vh' }}>
            <div className="text-logo-loader" role="status" aria-live="polite">
              <img src={Logo} alt="Loading CrackTest Logo" className="loader-logo-icon" width={64} height={64} loading="eager" />
              <span className="loader-logo-text">CrackTest</span>
              <span className="loader-logo-dot" />
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
