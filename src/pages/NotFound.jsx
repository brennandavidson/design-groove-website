import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
      zIndex: 100 // Ensure it sits on top
    }}>
      <Helmet>
        <title>Page Not Found | Design Groove</title>
        <meta name="robots" content="noindex" />
      </Helmet>

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

        {/* The Switch Track (Off State) */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '100px',
              height: '56px',
              borderRadius: '999px',
              backgroundColor: '#e5e5e5', // Grey (Off)
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              position: 'relative',
              zIndex: 2,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            {/* The Knob (Left/Off Position) */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)',
                zIndex: 3,
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            />
          </div>
        </div>

        {/* Bottom Text: Status */}
        <div style={{ 
          fontFamily: 'Inter',
          fontSize: '0.9rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#1a1a1a',
          fontWeight: 600,
          marginTop: '-10px'
        }}>
          Page Not Found
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

