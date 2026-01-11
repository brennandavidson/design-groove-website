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
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      <SEO title="Page Not Found" />

      {/* Background Sky */}
      <FooterSky />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* 404 Big Text */}
        <h1 style={{ 
          fontFamily: 'Instrument Serif', 
          fontStyle: 'normal', 
          fontSize: 'clamp(8rem, 25vw, 20rem)', // Responsive sizing
          lineHeight: 0.8,
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #0073E6 0%, #4facfe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent', // Fallback
          paddingBottom: '20px' // Prevent clipping
        }}>
          404
        </h1>

        {/* Bottom Text: Status */}
        <div style={{ 
          fontFamily: 'Inter',
          fontSize: '1rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#ffffff',
          fontWeight: 600,
          marginBottom: '40px'
        }}>
          Page Not Found
        </div>

        {/* Back Button */}
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
              backgroundColor: isHovered ? '#cccccc' : '#ffffff',
              color: '#000000',
              border: '1px solid #ffffff',
              padding: '16px 36px',
              borderRadius: '100px',
              fontFamily: 'Inter',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
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