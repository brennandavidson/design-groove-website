import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ words, staticText, startAnimation = true }) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const lastUpdateRef = useRef(Date.now());
  const pauseRef = useRef(false);

  useEffect(() => {
    if (!startAnimation) return;

    let animationFrameId;

    const tick = () => {
      const now = Date.now();
      const currentWord = words[wordIndex];
      const typeSpeed = isDeleting ? 30 : 60; // Faster typing (60ms) and deleting (30ms)
      
      if (pauseRef.current) {
        if (now - lastUpdateRef.current > 2000) {
          pauseRef.current = false;
          setIsDeleting(true);
          lastUpdateRef.current = now;
        }
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      if (now - lastUpdateRef.current > typeSpeed) {
        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.substring(0, displayText.length + 1));
            lastUpdateRef.current = now;
          } else {
            pauseRef.current = true;
            lastUpdateRef.current = now;
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentWord.substring(0, displayText.length - 1));
            lastUpdateRef.current = now;
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            lastUpdateRef.current = now;
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [displayText, isDeleting, wordIndex, words, startAnimation]);

  return (
    <span>
      {staticText} <br />
      <span style={{ 
        position: 'relative',
        display: 'inline-block',
      }}>
        <span style={{ 
          fontStyle: 'italic', 
          background: 'linear-gradient(90deg, #0073E6 0%, #00aaff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          paddingRight: '0.1em', // Padding for the cursor spacing
        }}>
          {displayText}
        </span>
        
        {/* Cursor is absolute to avoid affecting flow height/width strangely */}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            times: [0, 0.5, 0.5, 1], 
            ease: "linear"
          }}
          style={{ 
            position: 'absolute',
            right: '-0.1em',
            bottom: '0.15em',
            display: 'inline-block', 
            width: '0.05em',
            height: '0.8em',
            background: 'linear-gradient(180deg, #0073E6 0%, #00aaff 100%)',
          }}
        />
        
        {/* Invisible character to hold line height if text is empty */}
        {displayText.length === 0 && (
          <span style={{ visibility: 'hidden' }}>I</span>
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
