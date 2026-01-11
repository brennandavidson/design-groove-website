'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CLOUD PARTICLE ---
// A single "puff" of the cloud. 
// Uses radial gradient for soft edges instead of border-radius + blur + contrast.
const CloudPuff = ({ x, y, size, color, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      bottom: y,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(closest-side, ${color} 20%, transparent 100%)`,
      opacity: opacity,
      transform: 'translate(-50%, 50%)', // Center anchor
    }}
  />
);

// --- CLOUD ASSEMBLY ---
// Composed of many overlapping puffs to create fractal complexity
const ComplexCloud = ({ scale = 1 }) => {
  const highlight = 'rgba(255, 255, 255, 1)';
  const shadow = 'rgba(100, 120, 140, 0.8)'; // Darker slate blue for contrast

  return (
    <div style={{ position: 'relative', width: '400px', height: '300px', transform: `scale(${scale})` }}>
      
      {/* --- SHADOW BASE (Dark, heavy bottom) --- */}
      {/* These provide the volume and flat base */}
      <CloudPuff x="30%" y="20%" size="180px" color={shadow} />
      <CloudPuff x="50%" y="15%" size="200px" color={shadow} />
      <CloudPuff x="70%" y="25%" size="160px" color={shadow} />
      <CloudPuff x="40%" y="40%" size="190px" color={shadow} opacity={0.6} />
      <CloudPuff x="60%" y="35%" size="170px" color={shadow} opacity={0.6} />

      {/* --- BODY (White, fluffy) --- */}
      {/* Main mass of the cloud */}
      <CloudPuff x="25%" y="30%" size="150px" color={highlight} />
      <CloudPuff x="45%" y="35%" size="180px" color={highlight} />
      <CloudPuff x="65%" y="40%" size="160px" color={highlight} />
      <CloudPuff x="80%" y="30%" size="140px" color={highlight} />
      
      {/* --- HIGHLIGHT DETAILS (Crisp tops) --- */}
      {/* Smaller puffs on top to create "cauliflower" texture */}
      <CloudPuff x="20%" y="45%" size="100px" color={highlight} />
      <CloudPuff x="35%" y="55%" size="120px" color={highlight} />
      <CloudPuff x="50%" y="60%" size="130px" color={highlight} />
      <CloudPuff x="65%" y="55%" size="110px" color={highlight} />
      <CloudPuff x="80%" y="45%" size="90px" color={highlight} />
      
      {/* Micro-details for fractals */}
      <CloudPuff x="45%" y="65%" size="70px" color={highlight} />
      <CloudPuff x="55%" y="68%" size="60px" color={highlight} />
      <CloudPuff x="30%" y="58%" size="50px" color={highlight} />
    </div>
  );
};

// Animated Container
const DriftingCloud = ({ x, y, scale, duration, delay, isMobile }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      bottom: y,
      zIndex: Math.round(scale * 10), // Larger clouds in front
      // Skip blur filter on mobile - too expensive, causes frame drops
      filter: isMobile ? 'none' : (scale < 1 ? 'blur(2px)' : 'blur(4px)'),
    }}
    // Oscillation instead of linear drift to prevent hard jumps
    // Moving back and forth (reverse) with easeInOut creates a natural "floating" effect
    animate={{
      x: ['-2%', '-8%'],
      y: ['0px', '-10px'] // Slight vertical bobbing for extra life
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }}
  >
    <ComplexCloud scale={scale} />
  </motion.div>
);

const FooterSky = ({ mask = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scale multiplier for mobile to prevent massive clouds covering the screen
  const mScale = isMobile ? 0.55 : 1; 

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      overflow: 'hidden',
      // Deep Sky Blue Gradient matching reference
      background: 'linear-gradient(to top, #66a3ff 0%, #0047b3 100%)',
      // Mask to fade out smoothly at the top (blend with white section above)
      // Extended to 50% for a very gradual, soft fade from white to blue
      maskImage: mask ? 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)' : 'none',
      WebkitMaskImage: mask ? 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)' : 'none'
    }}>
      
      {/* Clouds Container - "U" Arc Composition */}
      <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // Mask to fade out smoothly at the top (horizon line relative to cloud base)
          // Keeping this secondary mask for the clouds themselves if needed, or rely on parent mask
          pointerEvents: 'none'
      }}>
          
          {/* --- LEFT GROUP (TOWER) --- */}
          {/* Forming the left side of the "Valley" */}
          <DriftingCloud
            x={isMobile ? "-45%" : "-5%"}
            y={isMobile ? "120px" : "50px"}
            scale={1.6 * mScale}
            duration={90} delay={0} isMobile={isMobile}
          />
          <DriftingCloud
            x={isMobile ? "-15%" : "15%"}
            y={isMobile ? "40px" : "-20px"}
            scale={1.4 * mScale}
            duration={85} delay={-10} isMobile={isMobile}
          />
          <DriftingCloud
            x={isMobile ? "-35%" : "5%"}
            y={isMobile ? "-20px" : "-80px"}
            scale={1.0 * mScale}
            duration={120} delay={-5} isMobile={isMobile}
          />

          {/* --- RIGHT GROUP (TOWER) --- */}
          {/* Forming the right side of the "Valley" */}
          <DriftingCloud
            x={isMobile ? "95%" : "85%"}
            y={isMobile ? "130px" : "60px"}
            scale={1.7 * mScale}
            duration={95} delay={-20} isMobile={isMobile}
          />
          <DriftingCloud
            x={isMobile ? "75%" : "70%"}
            y={isMobile ? "50px" : "0px"}
            scale={1.3 * mScale}
            duration={80} delay={-15} isMobile={isMobile}
          />
          <DriftingCloud
            x={isMobile ? "105%" : "90%"}
            y={isMobile ? "-10px" : "-50px"}
            scale={1.1 * mScale}
            duration={110} delay={-30} isMobile={isMobile}
          />

          {/* --- CENTER GROUP (LOW/CONNECTING) --- */}
          {/* Lower, smaller clouds to complete the arc but keep the middle open */}
          <DriftingCloud
            x={isMobile ? "20%" : "40%"}
            y={isMobile ? "-80px" : "-100px"}
            scale={0.9 * mScale}
            duration={130} delay={-40} isMobile={isMobile}
          />
          <DriftingCloud
            x={isMobile ? "50%" : "55%"}
            y={isMobile ? "-100px" : "-120px"}
            scale={0.8 * mScale}
            duration={140} delay={-60} isMobile={isMobile}
          />
          <DriftingCloud
            x={isMobile ? "80%" : "30%"}
            y={isMobile ? "-90px" : "-140px"}
            scale={0.7 * mScale}
            duration={150} delay={-10} isMobile={isMobile}
          />

      </div>
    </div>
  );
};

export default FooterSky;
