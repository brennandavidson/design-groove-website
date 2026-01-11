import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import WorkCollection from './pages/WorkCollection';
import ProjectDetail from './pages/ProjectDetail';
import ServicesPage from './pages/Services';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';
import ProcessPage from './pages/ProcessPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

function App() {
  // Lazy initialization to prevent flashes and handle "first touch" logic correctly
  // If hasVisited is set, showPreloader starts as false
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasVisited');
    }
    return false;
  });
  
  // If hasVisited is set, isLoaded starts as true (content ready)
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('hasVisited');
    }
    return true;
  });

  // Initialize mobile state based on current width to prevent layout shifts
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 900;
    }
    return false;
  });
  
  // We rely on skeletons now for stable layout, so we don't need to delay Lenis.
  // However, forcing browser to handle restoration is key.
  
  useEffect(() => {
    // If this is the first visit (preloader is showing), mark it as visited for next time
    // This happens after the first render, but since we init state from storage, it's fine.
    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    
    window.addEventListener('resize', checkMobile);
    
    // Explicitly set auto restoration so browser handles the initial position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
      {showPreloader && <Preloader onComplete={() => setIsLoaded(true)} />}
      
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

  return !isMobile ? (
    <ReactLenis root options={{
      // Standard configuration. 
      // We removed 'prevent' callback to avoid interference.
      // autoResize is true by default but we can keep it explicitly if needed.
      lerp: 0.1,
      duration: 1.5,
      smoothTouch: false,
    }}>
      {content}
    </ReactLenis>
  ) : (
    content
  );
}

export default App;