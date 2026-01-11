import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100
    }}>
      <SEO title="Page Not Found" />

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
        paddingBottom: '20px' // Prevent clipping of italic descenders
      }}>
        404
      </h1>

      {/* Bottom Text: Status */}
      <div style={{ 
        fontFamily: 'Inter',
        fontSize: '1rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
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
            backgroundColor: isHovered ? '#333' : '#1a1a1a',
            color: '#fff',
            border: '1px solid #1a1a1a',
            padding: '16px 36px',
            borderRadius: '100px',
            fontFamily: 'Inter',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            fontWeight: 500,
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
  );
};

export default NotFound;