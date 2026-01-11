import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const WorkCollection = lazy(() => import('./pages/WorkCollection'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ServicesPage = lazy(() => import('./pages/Services'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  // Lazy initialization to prevent flashes and handle "first touch" logic correctly
  // If hasVisited is set, showPreloader starts as false
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.__IS_404__) return false; // Skip preloader on 404
      return !sessionStorage.getItem('hasVisited');
    }
    return true; // Enable preloader on server/initial HTML to cover content
  });
  
  // If hasVisited is set, isLoaded starts as true (content ready)
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('hasVisited');
    }
    return false; // Content is not loaded on server/initial HTML
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
  
  // MASK LOGIC: Even with auto restoration, the browser might paint frame 1 at scrollTop 0.
  // This mask covers the screen for a split second on refresh to hide that jump.
  const [isScrollRestoring, setIsScrollRestoring] = useState(() => {
    if (typeof window !== 'undefined') {
      // If we've visited, we might be restoring scroll.
      // If preloader is showing (first visit), mask is redundant but harmless.
      // If preloader is skipped (refresh), mask is CRITICAL.
      return !!sessionStorage.getItem('hasVisited');
    }
    return false;
  });

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

    // Clear the scroll restoration mask after a short delay
    // 150ms gives the browser enough frames to jump to the restored position
    if (isScrollRestoring) {
      const timer = setTimeout(() => {
        setIsScrollRestoring(false);
      }, 400); // Increased to 400ms to be absolutely safe against lag
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isScrollRestoring]);

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
      
      {/* Scroll Restoration Mask - Pure White Overlay */}
      {/* Only active if Preloader is NOT active (Refresh scenario) */}
      {!showPreloader && isScrollRestoring && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            zIndex: 99999, // Highest priority
            pointerEvents: 'none' // Allow scrolling underneath immediately
          }}
        />
      )}
      
      {/* Fixed Navigation (Always on top) */}
      <Navbar />
      
      <Suspense fallback={null}>
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
      </Suspense>
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