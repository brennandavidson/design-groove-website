import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Credibility from '../components/Credibility';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Statement from '../components/Statement';

const Home = ({ isLoaded }) => {
  const location = useLocation();

  // Optimization: Only render/show the fixed hero if it's actually in view (or close to it)
  // This prevents the "Flash of Hero" when refreshing at the bottom of the page
  const [isHeroVisible, setIsHeroVisible] = React.useState(() => {
    if (typeof window !== 'undefined') {
      // If we've visited before (session active), we might be reloading at the bottom.
      // Default to HIDDEN (false) to be safe.
      // The useEffect below will instantly flip it to TRUE if we are actually at the top.
      const hasVisited = sessionStorage.getItem('hasVisited');
      if (hasVisited) return false;

      // First visit ever: Default to visible (we are at top)
      return true;
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => {
      // React state updates are batched and optimized, but we can do a quick check
      const show = window.scrollY < window.innerHeight;
      setIsHeroVisible(prev => (prev !== show ? show : prev));
    };
    
    // Add listener immediately to catch any user scrolls
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // CRITICAL FIX: Delay the initial visibility check.
    // When refreshing at the bottom, the browser initially reports window.scrollY as 0
    // before restoring the scroll position a split second later.
    // If we check immediately, we see 0, show the Hero (Flash), and then the browser jumps down.
    // By waiting 200ms, we allow the restoration to complete, so we read the CORRECT scroll position.
    const timer = setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        // Small delay to ensure layout is ready (especially with Lenis)
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <SEO 
        title="Home"
        description="We build revenue systems for businesses that are done winging it. Strategy, design, development, and automation under one roof."
      />
      {/* Sticky Header & Hero Container */}
      <div className="home-hero-wrapper">
        <div 
          className="home-hero-inner"
          style={{ 
            visibility: isHeroVisible ? 'visible' : 'hidden', // Use visibility to keep layout but hide paint
            opacity: isHeroVisible ? 1 : 0, 
            // Removed transition to ensure instant hiding/showing prevents flash
          }}
        >
          <Hero startAnimation={isLoaded} />
        </div>
      </div>

      {/* Scrolling Main Content - Slides over the fixed Hero */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: '#ffffff',
        width: '100%',
      }}>
        <Statement />
        <Credibility />
        <Work />
        <Services />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
};

export default Home;