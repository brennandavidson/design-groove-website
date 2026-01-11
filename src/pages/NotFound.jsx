import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FooterSky from '../components/FooterSky';

const NotFound = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      backgroundColor: '#ffffff', // White background to match Contact section
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      <SEO title="Page Not Found" />

      {/* Background Sky - Uses default mask to fade from white (top) to blue (bottom) */}
      <FooterSky />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '-5vh'
      }}>
        {/* 404 Big Text */}
        <h1 style={{ 
          fontFamily: 'Instrument Serif', 
          fontStyle: 'normal', 
          fontSize: 'clamp(8rem, 30vw, 22rem)', 
          lineHeight: 0.8,
          margin: '0 0 20px 0',
          color: '#1a1a1a', // Black text
          paddingBottom: '20px',
          textAlign: 'center'
        }}>
          404
        </h1>

        {/* Bottom Text: Status */}
        <div style={{ 
          fontFamily: 'Inter',
          fontSize: '1rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#1a1a1a', // Black text
          fontWeight: 600,
          marginBottom: '40px'
        }}>
          Page Not Found
        </div>

        {/* Back Button - Matches "Get in Touch" style */}
        <Link 
          to="/"
          style={{
            textDecoration: 'none'
          }}
        >
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? 'transparent' : '#1a1a1a',
              color: isHovered ? '#1a1a1a' : '#ffffff',
              border: '1px solid #1a1a1a',
              padding: '16px 36px',
              borderRadius: '100px',
              fontFamily: 'Inter',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Return Home</span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;