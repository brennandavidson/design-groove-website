import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const PixelBlock = ({ filled, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: filled ? 1 : 0.05, 
      scale: filled ? 1 : 0.8,
      backgroundColor: filled ? '#1a1a1a' : 'transparent' 
    }}
    transition={{ 
      duration: 0.5, 
      delay: delay * 0.02,
      ease: "backOut"
    }}
    style={{
      width: '100%',
      aspectRatio: '1/1',
      borderRadius: '2px' // Slight rounding for style, or 0 for pure square
    }}
  />
);

const Number4 = ({ delayOffset = 0 }) => {
  // 5x7 Grid
  const grid = [
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', width: 'clamp(60px, 15vw, 100px)' }}>
      {grid.map((filled, i) => (
        <PixelBlock key={i} filled={filled} delay={delayOffset + i} />
      ))}
    </div>
  );
};

const Number0 = ({ delayOffset = 0 }) => {
  // 5x7 Grid
  const grid = [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', width: 'clamp(60px, 15vw, 100px)' }}>
      {grid.map((filled, i) => (
        <PixelBlock key={i} filled={filled} delay={delayOffset + i} />
      ))}
    </div>
  );
};

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

      {/* 404 Pixel Art Container */}
      <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', marginBottom: '60px' }}>
        <Number4 delayOffset={0} />
        <Number0 delayOffset={15} />
        <Number4 delayOffset={30} />
      </div>

      {/* Bottom Text: Status */}
      <div style={{ 
        fontFamily: 'Inter',
        fontSize: '1rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
        fontWeight: 600,
        marginBottom: '30px'
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
            padding: '14px 32px',
            borderRadius: '100px',
            fontFamily: 'Inter',
            fontSize: '0.9rem',
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