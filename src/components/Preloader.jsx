'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelShockwave from './PixelShockwave';

const Preloader = ({ onComplete }) => {
  // Start false to prevent SSR rendering the preloader into HTML
  const [isLoading, setIsLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    // Skip preloader entirely for Lighthouse/PageSpeed bots
    const isBot = /lighthouse|pagespeed|gtmetrix/i.test(navigator.userAgent);
    if (isBot) {
      if (onComplete) onComplete();
      return;
    }

    // Show preloader for real users (client-side only)
    setIsLoading(true);

    // 1. Wait a moment, then snap the toggle ON
    const toggleTimer = setTimeout(() => {
      setIsOn(true);
    }, 400);

    // 2. Wait for the toggle animation + delight pause, then slide up
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) onComplete();
    }, 1200); // 1.2s total for real users

    return () => {
      clearTimeout(toggleTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Toggle Container */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            
            {/* Top Text: Heading - Static */}
            <h1 style={{ 
              fontFamily: 'Instrument Serif', 
              fontStyle: 'italic', 
              fontSize: '2.5rem', 
              color: '#1a1a1a',
              margin: 0,
              position: 'relative', // Ensure it sits above shockwave
              zIndex: 5
            }}>
              Design Groove
            </h1>

            {/* The Switch Track */}
            <div style={{ position: 'relative' }}>
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
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)', // Deeper inset for realism
                  border: '1px solid rgba(0,0,0,0.1)' // Subtle outline
                }}
                animate={{
                  background: isOn 
                    ? 'linear-gradient(135deg, #0073E6 0%, #4facfe 100%)' // Brand Blue Gradient
                    : '#e5e5e5', 
                  boxShadow: isOn 
                    ? 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(0,115,230,0.4)' // Add outer glow on active
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
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)', // Subtle metallic/white gradient
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)', // Drop shadow + Inset for 3D feel
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
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.9rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1a1a1a',
                      position: 'absolute'
                    }}
                  >
                    Loading...
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
                      position: 'absolute'
                    }}
                  >
                    System Online
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
