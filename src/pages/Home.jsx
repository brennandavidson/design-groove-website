import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Credibility from '../components/Credibility';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Statement from '../components/Statement';

const Home = ({ isLoaded }) => {
  const location = useLocation();

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
      {/* Sticky Header & Hero Container */}
      <div className="home-hero-wrapper">
        <div className="home-hero-inner">
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