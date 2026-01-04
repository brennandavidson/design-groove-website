import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ProjectCursor = ({ isHovered, text = "View Case Study" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Determine content based on text prop
  let content;
  if (text.toLowerCase() === 'concept work' || text.toLowerCase() === 'case study coming soon') {
    content = (
      <span style={{ fontStyle: 'italic' }}>
        {text}
      </span>
    );
  } else {
    content = (
      <>
        <span style={{ fontStyle: 'italic' }}>View</span> Project &rarr;
      </>
    );
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0 // Hidden by default
      }}
      animate={{ 
        opacity: isHovered ? 1 : 0,
        scale: isHovered ? 1 : 0.5
      }}
      transition={{ duration: 0.2 }}
    >
      <div style={{
        backgroundColor: '#1a1a1a', // Dark background for contrast
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '50px',
        fontFamily: 'Instrument Serif', // Brand font
        fontSize: '1.1rem',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px' // Reduced gap from 8px to 4px
      }}>
        {content}
      </div>
    </motion.div>
  );
};

export default ProjectCursor;

