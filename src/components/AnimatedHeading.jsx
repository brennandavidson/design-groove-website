import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeading = ({ text, highlightWords = [] }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const isHighlight = (word) => {
    // Remove punctuation for check to ensure matching works (e.g., "systems." matches "systems")
    const cleanWord = word.replace(/[.,]/g, '');
    return highlightWords.includes(cleanWord);
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
        lineHeight: '1.15',
        fontFamily: 'Instrument Serif',
        fontWeight: 400,
        color: '#1a1a1a',
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: '0.25em' 
      }}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={child}
          style={isHighlight(word) ? { fontStyle: 'italic', color: '#0073E6' } : {}}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedHeading;







