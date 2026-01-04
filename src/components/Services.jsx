import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';

// Widget 1: Strategy (Scattered to Organized)
// High-fidelity "Data Defrag" animation
const StrategyWidget = () => {
  // Styles borrowed from Preloader for consistency
  const whiteNodeStyle = {
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)', // Updated Shadow to match LaunchWidget
    border: '1px solid rgba(255,255,255,0.8)',
    zIndex: 10
  };

  const blueNodeStyle = {
    background: 'linear-gradient(135deg, #0073E6 0%, #4facfe 100%)',
    boxShadow: '0 4px 12px rgba(0,115,230,0.2), inset 0 2px 4px rgba(255,255,255,0.2)', // Updated Shadow
    border: 'none',
    zIndex: 5
  };

  // 6 Items: 3 Circles (White), 3 Rounded Squares (Blue)
  const items = [
    { id: 1, type: 'circle', style: whiteNodeStyle },
    { id: 2, type: 'square', style: blueNodeStyle },
    { id: 3, type: 'circle', style: whiteNodeStyle },
    { id: 4, type: 'square', style: blueNodeStyle },
    { id: 5, type: 'circle', style: whiteNodeStyle },
    { id: 6, type: 'square', style: blueNodeStyle },
  ];

  // Grid Layout (2 rows x 3 columns)
  // Container is roughly 300x250 in the grid, we'll map relative to that
  // Centered in a 200x200 viewbox equivalent
  const gridPositions = [
    { x: -60, y: -30 }, { x: 0, y: -30 }, { x: 60, y: -30 },
    { x: -60, y: 30 },  { x: 0, y: 30 },  { x: 60, y: 30 }
  ];

  // Random Scatter Positions (Exploded view)
  const scatterPositions = [
    { x: -80, y: -90, r: -45 }, { x: 50, y: -100, r: 30 }, { x: 90, y: -50, r: 90 },
    { x: -90, y: 40, r: 15 },   { x: -20, y: 90, r: -60 }, { x: 80, y: 80, r: 120 }
  ];

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      perspective: '1000px' // Adds slight 3D feel to movement
    }}>
      {/* Underlying Grid Pattern (Fades in when organized) */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '180px',
          height: '100px',
          border: '1px dashed rgba(0,0,0,0.05)', // Updated: Neutral Grey Line Work
          borderRadius: '12px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr'
        }}
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.3, 0.4, 1], repeat: Infinity, repeatDelay: 1 }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ border: '1px dashed rgba(0,0,0,0.05)' }} /> // Updated: Neutral Grey Line Work
        ))}
      </motion.div>

      {/* Moving Nodes */}
      {items.map((item, i) => {
        const isCircle = item.type === 'circle';
        
        return (
          <motion.div
            key={item.id}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: isCircle ? '50%' : '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...item.style
            }}
            animate={{
              x: [scatterPositions[i].x, scatterPositions[i].x, gridPositions[i].x, gridPositions[i].x, scatterPositions[i].x],
              y: [scatterPositions[i].y, scatterPositions[i].y, gridPositions[i].y, gridPositions[i].y, scatterPositions[i].y],
              rotate: [scatterPositions[i].r, scatterPositions[i].r, 0, 0, scatterPositions[i].r],
              scale: [0.8, 0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: 4, // Slower loop per user request
              times: [0, 0.15, 0.35, 0.75, 1], // Hold chaos (15%), Snap to grid (20%), Hold grid (40%), Scatter (25%)
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 0
            }}
          >
            {/* Inner Detail for "Tech" feel */}
            {item.type === 'square' && (
               <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            )}
            {item.type === 'circle' && (
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e5e5e5' }} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

// Widget 2: The Build (Webpage Assembly)
// High-fidelity "Drag & Drop Builder" animation - Precise Sync & Physics
const BuildWidget = () => {
  // --- Assets (Standard OS Cursors) ---
  const StandardArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
      <path d="M5 3l6.5 18 2.5-7 7-2.5L5 3z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );

  const StandardGrab = () => (
    <svg width="32" height="32" viewBox="0 0 257 257" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_40_341)">
        <path d="M81.0183 180.026C77.6138 175.993 73.4782 167.747 66.1179 157.738C61.9463 152.076 51.6011 141.415 48.5203 136C45.8471 131.214 46.1348 129.069 46.7702 125.103C47.897 118.048 55.6169 112.555 63.8523 113.296C70.0737 113.847 75.3482 117.7 80.0953 121.34C86.5499 126.275 89.6466 134.286 93.087 141.647C93.8232 143.222 94.2708 143.773 94 142C93.1537 136.459 83.6081 86.5647 83.5009 86.0046L83.495 85.9739L78.7682 61.3943C77.1058 52.7503 80.7622 42.5647 89.5 41.4999C98.1629 40.4443 106.163 46.1267 108.449 54.549L113.464 73.0246C113.821 74.3406 114.109 75.6552 114.333 77.0004C115.57 84.443 119.843 110.194 119.996 111.929C119.97 110.998 119.827 103.622 119.701 97.0462C119.575 90.4682 123.421 85.5 130 85.5C146 85.5 152.62 94.02 152.62 98.5C152.62 92 161.371 87.4611 167 87.4611C175.32 87.4611 181.08 89.468 183 94.5C184.92 99.5319 185.899 113.5 186 114C186.298 115.47 186.93 106.506 191 103C197.838 97.1093 208.5 100.5 209.881 111C210.271 113.967 210.36 119.705 210.36 124.647C210.36 130.455 210.216 133.949 209.881 138.151C209.509 142.644 208.478 152.8 206.98 157.72C205.966 161.045 202.645 168.456 199.331 173.039C199.22 173.193 199.113 173.336 199 173.489C197.587 175.404 187.496 189.232 186.192 195.112C184.778 201.426 185.245 201.471 184.969 205.953C184.778 209.048 185.547 212.822 186.038 214.851C186.224 215.62 185.709 216.394 184.922 216.472C182.015 216.763 175.549 217.291 171.627 216.704C166.94 215.996 166.893 208.615 165.395 205.942C163.333 202.257 157.368 201.089 155.654 203.807C152.957 208.11 147.155 215.827 143.055 216.311C135.36 217.217 119.716 216.703 106.964 216.552C106.164 216.542 105.558 215.811 105.658 215.017C106.063 211.79 106.53 204.298 102.705 201.28C99.0493 198.37 94.7559 193.472 90.9918 190.372L81.0183 180.026Z" fill="white"/>
        <path d="M152.62 98.5C152.62 94.02 146 85.5 130 85.5V85.5C123.421 85.5 119.575 90.4682 119.701 97.0462C119.84 104.317 120 112.566 120 112C120 111.143 115.593 84.5792 114.333 77.0004C114.109 75.6551 113.821 74.3406 113.464 73.0246L108.449 54.549C106.163 46.1267 98.1629 40.4443 89.5 41.4999V41.4999V41.4999C80.7622 42.5647 77.1058 52.7503 78.7682 61.3943L83.495 85.9739C83.4983 85.9912 83.4976 85.9873 83.5009 86.0046C83.6081 86.5647 93.1537 136.459 94 142C94.2708 143.773 93.8232 143.222 93.087 141.647C89.6466 134.286 86.5499 126.275 80.0953 121.34V121.34C75.3482 117.7 70.0737 113.847 63.8523 113.296C55.6169 112.555 47.897 118.048 46.7702 125.103C46.1348 129.069 45.8471 131.214 48.5203 136C51.6011 141.415 61.9463 152.076 66.1179 157.738C73.4782 167.747 77.6138 175.993 81.0183 180.026L90.9918 190.372C94.7559 193.472 99.0493 198.37 102.705 201.28C106.53 204.298 106.063 211.791 105.658 215.017C105.558 215.811 106.164 216.542 106.964 216.552C119.716 216.703 135.36 217.217 143.055 216.311C147.155 215.827 152.957 208.11 155.654 203.807C157.368 201.089 163.333 202.257 165.395 205.942C166.893 208.615 166.94 215.996 171.627 216.704C175.549 217.291 182.015 216.763 184.922 216.472C185.709 216.394 186.224 215.62 186.038 214.851C185.547 212.822 184.778 209.048 184.969 205.953C185.245 201.471 184.778 201.426 186.192 195.112C187.496 189.232 197.587 175.404 199 173.489C199.113 173.336 199.22 173.193 199.331 173.039C202.645 168.456 205.966 161.045 206.98 157.72C208.478 152.8 209.509 142.644 209.881 138.151C210.216 133.949 210.36 130.455 210.36 124.647C210.36 119.705 210.271 113.967 209.881 111C208.5 100.5 197.838 97.1093 191 103C186.93 106.506 186.298 115.47 186 114C185.899 113.5 184.92 99.5319 183 94.5C181.08 89.468 175.32 87.4611 167 87.4611C161.371 87.4611 152.62 92 152.62 98.5ZM152.62 98.5C152.62 103.575 152.754 107.841 152.893 111C153.172 117.382 152.62 110.414 152.62 104.026C152.62 101.923 152.62 99.9074 152.62 98.5Z" stroke="black" strokeWidth="10"/>
      </g>
      <path d="M175 183L175 145" stroke="black" strokeWidth="8.96" strokeLinecap="round"/>
      <path d="M152 182.899V144.92" stroke="black" strokeWidth="8.96" strokeLinecap="round"/>
      <path d="M128.7 143.92V181.899" stroke="black" strokeWidth="8.96" strokeLinecap="round"/>
      <defs>
        <filter id="filter0_d_40_341" x="18.3013" y="26.1326" width="212.419" height="223.995" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-3.84" dy="8.96"/>
          <feGaussianBlur stdDeviation="9.6"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40_341"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40_341" result="shape"/>
        </filter>
      </defs>
    </svg>
  );

  // --- Styles ---
  const frameStyle = {
    position: 'relative',
    width: '120px',
    height: '150px',
    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)', // Match LaunchWidget Gradient
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)', // Match LaunchWidget Shadow
    border: '1px solid rgba(255,255,255,0.8)', // Match LaunchWidget Border
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
    gap: '10px'
  };

  const ghostSlotStyle = {
    width: '100%',
    height: '50px',
    borderRadius: '8px',
    background: '#f7f7f7',
    border: '1px dashed rgba(0,0,0,0.1)', // More subtle grey line work
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
    position: 'relative'
  };

  const headerStyle = {
    width: '100%',
    height: '16px',
    borderRadius: '6px',
    background: 'linear-gradient(145deg, #f5f5f5, #eeeeee)',
    border: '1px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    flexShrink: 0
  };

  const bodyStyle = {
    width: '100%',
    flex: 1,
    borderRadius: '6px',
    background: 'linear-gradient(145deg, #f5f5f5, #eeeeee)',
    border: '1px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const activeBlockStyle = {
    width: '96px',
    height: '50px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #0073E6 0%, #4facfe 100%)',
    boxShadow: '0 8px 20px rgba(0,115,230,0.25), inset 0 1px 1px rgba(255,255,255,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    position: 'absolute',
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Start at center relative to its parent (but we use transforms)
  };

  // --- Animation Physics ---
  // Locked timing for cohesive movement
  const cycle = 4; // Total duration
  const times = [0, 0.25, 0.3, 0.6, 0.65, 0.8, 1]; 
  
  return (
    <div key="build-widget-laser-restored" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Device Frame */}
      <div style={frameStyle}>
        <div style={headerStyle} />
        <div style={ghostSlotStyle} /> {/* Ghost Slot */}
        <div style={bodyStyle} />
      </div>

      {/* Draggable Component */}
      <motion.div
        style={activeBlockStyle}
        initial={{ x: 80, y: -20, scale: 0.9, opacity: 0 }}
        animate={{
          x: [80, 80, 80, 0, 0, 0, 80],
          y: [-20, -20, -20, -12, -12, -12, -20], 
          scale: [0.9, 0.9, 1.05, 1.05, 1, 1, 0.9],
          opacity: [0, 1, 1, 1, 1, 1, 0],
          boxShadow: [
            '0 4px 12px rgba(0,115,230,0.15)', // 0: Start
            '0 4px 12px rgba(0,115,230,0.15)', // 0.25: Arrive
            '0 15px 30px rgba(0,115,230,0.3)', // 0.3: Grab (Lift)
            '0 15px 30px rgba(0,115,230,0.3)', // 0.6: Drag (Keep Lifted!)
            '0 2px 4px rgba(0,0,0,0.05)',      // 0.65: Drop (Land flush)
            '0 2px 4px rgba(0,0,0,0.05)',      // 0.8: Stay Landed
            '0 4px 12px rgba(0,115,230,0.15)'  // 1.0: Reset
          ]
        }}
        transition={{
          duration: cycle,
          times: times,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        <div style={{ width: '40%', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />

        {/* Laser Light Border Effect */}
        <svg 
          style={{ position: 'absolute', top: -1, left: -1, width: '98px', height: '52px', pointerEvents: 'none', overflow: 'visible' }}
          viewBox="0 0 98 52"
        >
          <defs>
            <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4facfe" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <motion.rect
            x="1" y="1" width="96" height="50" rx="8"
            fill="none"
            stroke="url(#laserGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0, 0, 0, 0.4, 0, 0], // Draw a segment
              strokeDashoffset: [0, 0, 0, 0, -100, -280, 0], // Travel around
              opacity: [0, 0, 0, 0, 1, 0, 0]
            }}
            transition={{
              duration: cycle,
              times: times,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
        </svg>

      </motion.div>

      {/* Cursor Container */}
      <motion.div
        style={{ position: 'absolute', zIndex: 30, pointerEvents: 'none' }}
        initial={{ x: 120, y: 40 }}
        animate={{
          x: [120, 85, 85, 5, 5, 5, 120],  // Aligned to block center (approx +5px offset)
          y: [40, -15, -15, -7, -7, -7, 40],  // Aligned to block center (approx +5px offset)
        }}
        transition={{
          duration: cycle,
          times: times,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        {/* Arrow State */}
        <motion.div
          animate={{ opacity: [1, 1, 0, 0, 1, 1, 1] }}
          transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5 }}
          style={{ position: 'absolute' }}
        >
          <StandardArrow />
        </motion.div>
        
        {/* Hand State (Grab - Closed) */}
        <motion.div
          animate={{ 
            opacity: [0, 0, 1, 1, 0, 0, 0],
            scale: [1, 1, 0.9, 0.9, 1, 1, 1] 
          }}
          transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5 }}
          style={{ position: 'absolute', top: '0px', left: '0px' }}
        >
          <StandardGrab />
        </motion.div>
      </motion.div>

    </div>
  );
};

// Widget 3: Launch & Optimize (Live Status Module)
// Concept: A compact UI card with a "Launch" toggle and an "Optimization" graph.
// 1. Launch: Toggle flips ON (Grey -> Blue).
// 2. Optimize: A smooth graph curve grows upward from flat line.
// Style: Matches "Strategy" (Gradients, Soft Shadows) and "Build" (UI Elements).
const LaunchWidget = () => {
  // --- Styles ---
  const cardStyle = {
    width: '150px',
    height: '125px', // Balanced proportions
    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
    borderRadius: '12px', // Matches BuildWidget
    boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid rgba(255,255,255,0.8)',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden'
  };

  const toggleTrackStyle = {
    width: '32px',
    height: '18px',
    borderRadius: '9px',
    position: 'relative',
    transition: 'background-color 0.3s ease' // Fallback
  };

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    fontWeight: 600,
    color: '#888',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  };

  // --- Animation Physics ---
  const cycle = 4;
  const times = [0, 0.1, 0.2, 0.6, 0.9, 1]; // Flip, Grow, Hold, Reset

  return (
    <div key="launch-widget-final-status-compact" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={cardStyle}>
        
        {/* Header: Label + Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
           <div style={labelStyle}>Live Status</div>
           
           {/* Toggle Switch */}
           <motion.div
             style={toggleTrackStyle}
             animate={{
               backgroundColor: ['#e0e0e0', '#e0e0e0', '#0073E6', '#0073E6', '#e0e0e0'] // Grey -> Blue -> Grey
             }}
             transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5 }}
           >
             {/* Toggle Knob */}
             <motion.div
               style={{
                 width: '14px', height: '14px', borderRadius: '50%',
                 backgroundColor: '#fff',
                 boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                 position: 'absolute', top: '2px'
               }}
               animate={{
                 x: [2, 2, 16, 16, 2] // Slide Right -> Slide Left
               }}
               transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
             />
           </motion.div>
        </div>

        {/* Graph Area */}
        <div style={{ width: '100%', height: '60px', position: 'relative' }}>
           {/* Grid Lines */}
           <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.05)' }} />
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.05)' }} />
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.05)' }} />
           </div>

           {/* The Graph */}
           <svg width="100%" height="100%" viewBox="0 0 126 60" style={{ overflow: 'visible', zIndex: 1, position: 'relative' }}>
             <defs>
               <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#0073E6" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#0073E6" stopOpacity="0" />
               </linearGradient>
             </defs>
             
             {/* Fill Area (Under the line) */}
             <motion.path
               d="M 0 60 L 0 50 C 30 50, 50 50, 85 15 C 100 5, 126 5, 126 0 V 60 Z" 
               fill="url(#graphGradient)"
               initial={{ opacity: 0, scaleY: 0 }}
               animate={{
                 opacity: [0, 0, 1, 1, 0],
                 scaleY: [0, 0, 1, 1, 0]
               }}
               style={{ transformOrigin: 'bottom' }}
               transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5 }}
             />

             {/* The Line */}
             <motion.path
               d="M 0 50 C 30 50, 50 50, 85 15 C 100 5, 126 5, 126 0"
               fill="none"
               stroke="#0073E6"
               strokeWidth="2.5"
               strokeLinecap="round"
               initial={{ pathLength: 0 }}
               animate={{
                 pathLength: [0, 0, 1, 1, 0]
               }}
               transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
             />
             
            {/* Data Point (Follows the tip) */}
            <motion.circle
              r="4"
              fill="#fff"
              stroke="#0073E6"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{
                offsetDistance: ['0%', '0%', '100%', '100%', '0%'],
                opacity: [0, 0, 1, 1, 0]
              }}
              // CSS 'offsetPath' property tells it which path to follow
              style={{ 
                offsetPath: "path('M 0 50 C 30 50, 50 50, 85 15 C 100 5, 126 5, 126 0')",
                offsetDistance: '0%'
              }}
              transition={{ duration: cycle, times: times, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
            />

           </svg>
        </div>

      </div>
    </div>
  );
};

// Widget 4: Partnership (The Rapid Resolve)
// Concept: A Task Inbox showing "Batch Resolution" with high-fidelity UI.
// 1. Three tasks slide in one by one (Glass/White cards).
// 2. Pending tasks glow Red. Resolved tasks glow Blue.
// 3. A "Processing Beam" sweeps down.
// 4. "All Systems Go" Badge appears.
const PartnershipWidget = () => {
  // --- Styles ---
  const cardStyle = {
    width: '150px',
    height: '125px',
    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid rgba(255,255,255,0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    gap: '6px',
    position: 'relative',
    overflow: 'hidden'
  };

  const taskStyle = {
    width: '100%',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    gap: '6px',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(145deg, #ffffff, #f9f9f9)', // Glass-like card
    boxShadow: '0 2px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)', // Depth
  };

  // --- Animation Physics ---
  const cycle = 6; 

  return (
    <div key="partnership-widget-final-batch-enhanced" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={cardStyle}>
         
         {[0, 1, 2].map((i) => (
            <motion.div
               key={i}
               style={taskStyle}
               initial={{ x: -150, opacity: 0 }}
               animate={{
                  x: [-150, 0, 0, 0, 0, 150],
                  opacity: [0, 1, 1, 1, 1, 0],
                  // Status is shown via Border color and Shadow glow, not background
                  borderColor: [
                     'rgba(255, 77, 77, 0.3)', // Red Border
                     'rgba(255, 77, 77, 0.3)',
                     'rgba(0, 115, 230, 0.3)', // Blue Border
                     'rgba(0, 115, 230, 0.3)',
                     'rgba(0, 115, 230, 0.3)',
                     'rgba(255, 77, 77, 0.3)'
                  ],
                  boxShadow: [
                     '0 2px 4px rgba(255, 77, 77, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)', // Red Glow
                     '0 2px 4px rgba(255, 77, 77, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                     '0 2px 8px rgba(0, 115, 230, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)', // Blue Glow
                     '0 2px 8px rgba(0, 115, 230, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                     '0 2px 8px rgba(0, 115, 230, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                     '0 2px 4px rgba(255, 77, 77, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                  ]
               }}
               transition={{
                  duration: cycle,
                  times: [
                     0 + (i * 0.05), 
                     0.1 + (i * 0.05), 
                     0.5, 
                     0.6, 
                     0.9, 
                     1
                  ],
                  repeat: Infinity,
                  repeatDelay: 0.5
               }}
            >
               {/* Icon Container */}
               <motion.div
                  style={{ width: '12px', height: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
               >
                   {/* Alert Icon (Red) */}
                   <motion.div
                      style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      animate={{ opacity: [1, 1, 0, 0, 1], scale: [1, 1, 0, 0, 1] }}
                      transition={{ duration: cycle, times: [0, 0.5, 0.6, 1], repeat: Infinity, repeatDelay: 0.5 }}
                   >
                       <div style={{ width: '2px', height: '6px', background: 'white', borderRadius: '1px' }} />
                   </motion.div>

                   {/* Check Icon (Blue) */}
                   <motion.div
                      style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#0073E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
                      transition={{ duration: cycle, times: [0, 0.5, 0.6, 1], repeat: Infinity, repeatDelay: 0.5 }}
                   >
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   </motion.div>
               </motion.div>

               {/* Simulated Text Lines */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                  <motion.div 
                     style={{ height: '3px', borderRadius: '1.5px', background: '#d1e6fa' }} 
                     // FIXED: Avoid animating gradients directly as per warning
                     // Instead animate background-color, or use opacity on overlay
                     animate={{ backgroundColor: ['#ffcccc', '#ffcccc', '#d1e6fa', '#d1e6fa'] }} 
                     transition={{ duration: cycle, times: [0, 0.5, 0.6, 1], repeat: Infinity, repeatDelay: 0.5 }}
                  />
                  <div style={{ width: '60%', height: '3px', background: '#f0f0f0', borderRadius: '1.5px' }} />
               </div>

            </motion.div>
         ))}

         {/* Processing Beam (Gradient Scan) */}
         <motion.div
            style={{
               position: 'absolute',
               left: -20, right: -20, height: '20px', // Wider beam
               background: 'linear-gradient(180deg, rgba(0,115,230,0) 0%, rgba(0,115,230,0.2) 50%, rgba(0,115,230,0) 100%)',
               borderBottom: '1px solid rgba(0,115,230,0.4)', // Sharp scan line
               zIndex: 20,
               pointerEvents: 'none'
            }}
            initial={{ top: -30, opacity: 0 }}
            animate={{
               top: [-30, -30, 150, 150, -30],
               opacity: [0, 1, 1, 0, 0]
            }}
            transition={{
               duration: cycle,
               times: [0, 0.5, 0.65, 0.7, 1],
               repeat: Infinity,
               repeatDelay: 0.5,
               ease: "easeInOut"
            }}
         />

         {/* Success Badge Overlay */}
         <motion.div
            style={{
               position: 'absolute', inset: 0,
               background: 'rgba(255,255,255,0.8)',
               backdropFilter: 'blur(2px)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               zIndex: 30
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{
               duration: cycle,
               times: [0, 0.7, 0.75, 0.9, 1],
               repeat: Infinity,
               repeatDelay: 0.5
            }}
         >
            <motion.div
               style={{
                 width: '48px', height: '48px',
                 borderRadius: '12px',
                 background: 'linear-gradient(135deg, #0073E6 0%, #4facfe 100%)',
                 boxShadow: '0 8px 20px rgba(0,115,230,0.3)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center'
               }}
               animate={{ scale: [0.8, 1.1, 1], rotate: [0, 5, 0] }}
               transition={{ duration: 0.5, ease: "backOut" }}
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </motion.div>
         </motion.div>

      </div>
    </div>
  );
};

const Services = () => {
  const processes = [
    { 
      title: "Strategy & Architecture", 
      description: "We map out your offers, positioning, and how everything connects before touching design or code.",
      widget: <StrategyWidget />
    },
    { 
      title: "The Build", 
      description: "Website, funnel, email sequences, automations. The full system, built as one connected piece.",
      widget: <BuildWidget />
    },
    { 
      title: "Launch & Optimize", 
      description: "We go live, watch what's working, and tune from there.",
      widget: <LaunchWidget />
    },
    { 
      title: "Ongoing Partnership", 
      description: "Monthly retainer for new builds, tech decisions, and the \"I need this fixed yesterday\" moments.",
      widget: <PartnershipWidget />
    },
  ];

  return (
    <section id="our-process" className="section-spacing">
      <div className="section-header-spacing" style={{ 
        paddingLeft: '4vw',
        paddingRight: '4vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <AnimatedHeading 
          text="How We Work"
          highlightWords={["Work"]}
        />
      </div>

      <div className="services-grid">
        {processes.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              gap: '2rem'
            }}
          >
            {/* Widget Container - Matches Work Section Aspect Ratio */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1.2', 
              backgroundColor: '#f9f9f9', // Very subtle gray like projects
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Widgets - Scaled to fit comfortably */}
              <div style={{ transform: 'scale(1.0)', width: '100%', height: '100%' }}>
                {item.widget}
              </div>
            </div>

            <div style={{ width: '100%' }}>
              <div style={{
                fontFamily: 'Inter',
                fontSize: '0.9rem',
                color: '#0073E6',
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                0{index + 1}
              </div>
              <h3 style={{ 
                fontSize: '2rem', 
                marginBottom: '1rem', 
                lineHeight: 1.1, 
                fontFamily: 'Instrument Serif',
                fontWeight: 400,
                color: '#1a1a1a',
                margin: '0 0 1rem 0'
              }}>
                {item.title}
              </h3>
              <p style={{ 
                fontSize: '1rem', 
                opacity: 0.7, 
                lineHeight: 1.5, 
                fontFamily: 'Inter', 
                fontWeight: 300, 
                margin: 0,
                color: '#4a4a4a'
              }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
