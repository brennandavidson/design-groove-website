import React from 'react';
import { motion } from 'framer-motion';

const PixelShockwave = ({ isActive }) => {
  const gridSize = 24; // 24x24 grid
  const cellSize = 24; // Larger pixels
  const halfSize = (gridSize * cellSize) / 2;

  // Generate grid cells
  const cells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = i * cellSize;
      const y = j * cellSize;
      
      // Calculate distance from center
      const dx = x - halfSize + (cellSize / 2);
      const dy = y - halfSize + (cellSize / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only create cells within a certain radius to make a circle shape
      if (distance < halfSize) { 
        cells.push({
          id: `${i}-${j}`,
          x, 
          y,
          distance
        });
      }
    }
  }

  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      width: `${gridSize * cellSize}px`, 
      height: `${gridSize * cellSize}px`, 
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 0,
      background: 'transparent' // Ensure no background
    }}>
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isActive ? { 
            opacity: [0, 0.4, 0], // Subtle flash
            scale: [0.5, 1, 0.5],
            backgroundColor: ['#0073E6', '#87CEFA', '#0073E6'] // Blue to Light Blue
          } : {}}
          transition={{
            duration: 0.5,
            delay: cell.distance * 0.002, // Fast ripple outward
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: cell.y,
            left: cell.x,
            width: '22px', // Gap of 2px
            height: '22px',
            backgroundColor: '#0073E6',
            borderRadius: '2px' 
          }}
        />
      ))}
    </div>
  );
};

export default PixelShockwave;

