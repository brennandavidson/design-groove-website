import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import PixelShockwave from '../components/PixelShockwave';

const NotFound = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1500); // Wait for animation
      return () => clearTimeout(timer);
    }
  }, [isOn, navigate]);

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
      zIndex: 100 // Ensure it sits on top
    }}>
      <SEO title="Page Not Found" />

      {/* Toggle Container */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        
        {/* Top Text: Heading */}
        <h1 style={{ 
          fontFamily: 'Instrument Serif', 
          fontStyle: 'italic', 
          fontSize: '4rem', 
          color: '#1a1a1a',
          margin: 0,
          position: 'relative',
          zIndex: 5,
          lineHeight: 1
        }}>
          404
        </h1>

        {/* The Switch Track */}
        <div 
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={() => setIsOn(true)}
        >
          <PixelShockwave isActive={isOn} />

          <motion.div
            style={{
              width: '100px',
              height: '56px',
              borderRadius: '999px',
              backgroundColor: '#e5e5e5', // Start grey
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              position: 'relative',
              zIndex: 2,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
            animate={{
              background: isOn 
                ? 'linear-gradient(135deg, #0073E6 0%, #4facfe 100%)' 
                : '#e5e5e5', 
              boxShadow: isOn 
                ? 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(0,115,230,0.4)' 
                : 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* The Knob */}
            <motion.div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)',
                zIndex: 3,
                border: '1px solid rgba(0,0,0,0.05)'
              }}
              animate={{
                x: isOn ? 42 : 0, 
              }}
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 30
              }}
            />
          </motion.div>
        </div>

        {/* Bottom Text: Status */}
        <div style={{ position: 'relative', height: '20px', display: 'flex', justifyContent: 'center', width: '200px', zIndex: 5 }}>
          <AnimatePresence mode="wait">
            {!isOn ? (
              <motion.div
                key="offline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ 
                  fontFamily: 'Inter',
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  marginTop: '-10px'
                }}
              >
                Page Not Found
              </motion.div>
            ) : (
              <motion.div
                key="online"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  marginTop: '-10px'
                }}
              >
                Redirecting...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Button */}
        <Link 
          to="/"
          style={{
            textDecoration: 'none',
            marginTop: '20px'
          }}
        >
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? '#333' : '#1a1a1a',
              color: '#fff',
              border: '1px solid #1a1a1a',
              padding: '12px 24px',
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
    </div>
  );
};

export default NotFound;

