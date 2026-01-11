'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import FooterSky from './FooterSky';

const BlurChar = ({ char, index }) => {
  if (char === ' ') return <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>;

  // Variants triggered by parent's 'animate' state
  const childVariant = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(6px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.0, 
        ease: [0.2, 0.65, 0.3, 0.9], 
        delay: index * 0.05 // Stagger calculation
      }
    }
  };

  return (
    <motion.span
      variants={childVariant}
      style={{ 
        display: 'inline-block', 
        fontFamily: 'Instrument Serif',
        color: '#1a1a1a'
      }}
    >
      {char}
    </motion.span>
  );
};

const Contact = () => {
  const [showSky, setShowSky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use a Ref + useInView hook for robust scroll detection
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { 
    once: false, 
    amount: 0.2 // Trigger when 20% of the container is visible (more reliable)
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isContainerInView) {
      // Sequence: Text animates immediately via prop -> Sky fades in 500ms later
      const timer = setTimeout(() => {
        setShowSky(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSky(false);
    }
  }, [isContainerInView]);

  return (
    <footer className="contact-footer" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      position: 'relative',
      paddingBottom: '2rem', // REDUCED BOTTOM PADDING
      paddingTop: '6rem',
      paddingLeft: '4vw',
      paddingRight: '4vw'
    }}>
      
      {/* Removed Top Gradient Overlay - The mask on FooterSky handles the fade naturally against the white background */}

      {/* BACKGROUND SKY - Fades in on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSky ? 1 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }} // Slower, more majestic fade
        style={{
          position: 'absolute',
          top: -2,
          left: -2,
          width: 'calc(100% + 4px)', // Extend slightly to prevent 1px border artifacts
          height: 'calc(100% + 4px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <FooterSky />
      </motion.div>

      {/* Attach ref to this wrapper container for better scroll detection */}
      <div 
        ref={containerRef}
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'relative', 
          zIndex: 6,
          paddingTop: isMobile ? '80px' : '0'
        }}
      >
        
        {/* Main Heading - Controlled by isContainerInView state */}
        <motion.h2 
          initial="hidden"
          animate={isContainerInView ? "visible" : "hidden"}
          style={{ 
            fontSize: 'clamp(5rem, 15vw, 18rem)', 
            lineHeight: 0.8, 
            fontFamily: 'Instrument Serif',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            textAlign: 'center',
            color: '#1a1a1a',
            margin: 0,
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Line 1: READY */}
          <div style={{ display: 'block' }}>
            {"Ready".split('').map((char, i) => (
              <BlurChar key={i} char={char} index={i} />
            ))}
          </div>
          
          {/* Line 2: TO TALK? */}
          <div style={{ display: 'block' }}>
            {"To Talk?".split('').map((char, i) => (
              <BlurChar key={i} char={char} index={i + 5} />
            ))}
          </div>
        </motion.h2>
        
        {/* CTA Button - Also fades in with text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isContainerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.0, duration: 0.8 }} // Appears after text finishes
          style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, marginTop: '2rem' }}
        >
          <a 
            href="/book"
            style={{ 
              padding: '16px 32px',
              backgroundColor: '#1a1a1a', 
              border: '1px solid #1a1a1a',
              borderRadius: '100px',
              fontSize: '1rem',
              textTransform: 'uppercase',
              fontFamily: 'Inter',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'transparent'; 
              e.target.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#1a1a1a';
              e.target.style.color = '#ffffff';
            }}
          >
            Book a Call
          </a>
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="footer-grid">
        <div className="footer-col-left">
          <p style={{ fontSize: '1.2rem', color: '#000000', fontFamily: 'Inter', margin: 0 }}>© 2026 Design Groove</p>
        </div>
        <div className="footer-col-right">
          <Link to="/work" style={{ textTransform: 'uppercase', fontSize: '1rem', fontFamily: 'Inter', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>Work</Link>
          <Link to="/services" style={{ textTransform: 'uppercase', fontSize: '1rem', fontFamily: 'Inter', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>Services</Link>
          <Link to="/process" style={{ textTransform: 'uppercase', fontSize: '1rem', fontFamily: 'Inter', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>Our Process</Link>
          <Link to="/about" style={{ textTransform: 'uppercase', fontSize: '1rem', fontFamily: 'Inter', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>About</Link>
          <Link to="/contact" style={{ textTransform: 'uppercase', fontSize: '1rem', fontFamily: 'Inter', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
