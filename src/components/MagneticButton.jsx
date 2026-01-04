import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const MagneticButton = ({ children, onClick, style }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  
  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #0073E6 0%, #00C6FF 100%)',
        color: '#fff',
        border: 'none'
      }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;

