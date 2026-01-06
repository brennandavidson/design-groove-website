import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypewriterText from './TypewriterText';
import VerticalSlider from './VerticalSlider';

const Hero = ({ startAnimation }) => {
  const navigate = useNavigate();
  return (
    <section className="hero-grid">
      {/* Left Content Area */}
      <div className="hero-content-left">
        
        {/* Main Headline Area - Centered with whitespace */}
        <div className="hero-headline-container">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'clamp(3rem, 9vw, 9rem)', // Adjusted clamp min for mobile
              lineHeight: 1, 
              letterSpacing: '-0.04em', 
              fontFamily: 'Instrument Serif',
              fontWeight: 400,
              color: '#1a1a1a',
              margin: 0,
              maxWidth: '100%' // Full width on mobile
            }}
          >
            <TypewriterText 
              staticText="A digital agency for" 
              words={["creators", "startups", "lawyers", "coaches", "authors", "consultants", "service businesses"]} 
              startAnimation={startAnimation}
            />
          </motion.h1>
        </div>

        {/* Bottom Description Only - Tightened up */}
        <div className="hero-description-container">
          <p style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.5,
            fontFamily: 'Inter',
            fontWeight: 300,
            color: '#4a4a4a',
            margin: 0,
            maxWidth: '550px' // Slightly tighter width
          }}>
            Positioning, messaging, website, funnel, automations. Wired together into one system that sells.
          </p>
          
          <div className="mobile-only" style={{ marginTop: '2rem' }}>
            <button 
              onClick={() => navigate('/book')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #1a1a1a',
                borderRadius: '100px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                fontFamily: 'Inter',
                fontWeight: 500,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                color: '#ffffff',
                textDecoration: 'none',
                width: 'fit-content'
              }}
            >
              Book a Call
            </button>
          </div>
        </div>

        {/* Mobile Slider - Horizontal at bottom */}
        <div className="mobile-only" style={{ 
          width: '100%', 
          height: '35vh', // Adjusted height as requested
          marginTop: 'auto',
          overflow: 'hidden' 
        }}>
           <VerticalSlider orientation="horizontal" />
        </div>
      </div>

      {/* Right Slider Area - Hidden on Mobile via CSS class if needed, but let's use the grid logic */}
      <div className="desktop-only" style={{ 
        height: '100%', 
        width: '100%',
        overflow: 'hidden',
        position: 'relative' 
      }}>
        <VerticalSlider orientation="vertical" />
      </div>
    </section>
  );
};

export default Hero;
