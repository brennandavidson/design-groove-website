import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

// Synchronous Imports for SSG/LCP Optimization
import Home from './pages/Home';
import WorkCollection from './pages/WorkCollection';
import ProjectDetail from './pages/ProjectDetail';
import ServicesPage from './pages/Services';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';
import ProcessPage from './pages/ProcessPage';
import AboutPage from './pages/AboutPage';
import HVACLanding from './pages/HVACLanding';
import HVACThankYou from './pages/HVACThankYou';
import NotFound from './pages/NotFound';

function AppServer() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/hvac-system' || location.pathname === '/hvac-ty';

  // Static state for server rendering
  const showPreloader = !isLandingPage;
  const isLoaded = false;

  // HVAC Landing/Thank You pages - minimal shell
  if (isLandingPage) {
    return (
      <div className="App">
        <Routes>
          <Route path="/hvac-system" element={<HVACLanding />} />
          <Route path="/hvac-ty" element={<HVACThankYou />} />
        </Routes>
      </div>
    );
  }

  const content = (
    <div className="App">
      <Helmet>
        <meta property="og:image" content="https://designgroove.io/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://designgroove.io/og-image.jpg" />
      </Helmet>
      <ScrollToTop />
      {/* Only render Preloader if it should be shown */}
      {showPreloader && <Preloader onComplete={() => {}} />}

      {/* Fixed Navigation (Always on top) */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />} />
        <Route path="/work" element={<WorkCollection />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );

  return content;
}

export default AppServer;
