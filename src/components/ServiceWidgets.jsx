import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// --- SHARED STYLES ---
const glassStyle = {
  background: 'rgba(255, 255, 255, 0.65)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '8px',
  border: '1px solid #ffffff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: '12px',
  color: '#1a1a1a',
  position: 'absolute',
  zIndex: 2
};

const Z_SVG = 1;
const Z_NODES = 2;
const Z_DOTS = 3;

// --- WIDGET 1: STRATEGY & MESSAGING ---
// Concept: "The Lens" - Focusing inputs into clear messaging
export const StrategyWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  
  // Dimensions
  const W = 500;
  const H = 300;
  
  // Node Config
  const cardW = 100;
  const cardH = 40;
  
  // Positions
  const centerY = H / 2;
  const leftX = 60;
  const centerX = W / 2;
  const rightX = W - 60;

  // Input Nodes (Left)
  const inputs = [
    { id: 'audience', label: 'Audience', x: leftX, y: centerY - 80 },
    { id: 'goals', label: 'Goals', x: leftX, y: centerY },
    { id: 'offer', label: 'Offer', x: leftX, y: centerY + 80 }
  ];

  // Core Node (Center)
  const core = { id: 'strategy', label: 'STRATEGY', x: centerX, y: centerY };

  // Output Node (Right)
  const output = { id: 'messaging', label: 'MESSAGING', x: rightX, y: centerY };

  // Animation Variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#f8f9fa' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      {/* Main Container */}
      <motion.div 
        style={{ width: `${W}px`, height: `${H}px`, position: 'relative', flexShrink: 0, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* SVG Layer */}
        <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: Z_SVG }}>
          <defs>
             <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#0073E6" />
             </marker>
             <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0073E6" stopOpacity="0.8" />
             </linearGradient>
          </defs>

          {/* Lines from Inputs to Core */}
          {inputs.map((input, i) => (
            <motion.path 
              key={`line-${i}`}
              d={`M ${input.x + cardW/2} ${input.y} L ${core.x - cardW/2} ${core.y}`}
              stroke="url(#beam-grad)"
              strokeWidth="2"
              fill="none"
              variants={lineVariants}
            />
          ))}

          {/* Line from Core to Output */}
          <motion.path 
            d={`M ${core.x + cardW/2} ${core.y} L ${output.x - cardW/2} ${output.y}`}
            stroke="#0073E6"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrow-blue)"
            variants={lineVariants}
            custom={1} // Delay index
          />

          {/* Pulse Animations: Inputs -> Core */}
          {inputs.map((input, i) => (
             <motion.circle 
               key={`pulse-${i}`}
               r="4" 
               fill="#94a3b8"
             >
               <animateMotion 
                 dur="2s"
                 repeatCount="indefinite"
                 path={`M ${input.x + cardW/2} ${input.y} L ${core.x - cardW/2} ${core.y}`}
                 begin={`${i * 0.3}s`}
                 calcMode="linear"
               />
               <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
             </motion.circle>
          ))}

          {/* Pulse Animations: Core -> Output (Stronger, Faster) */}
          <motion.circle r="5" fill="#0073E6">
             <animateMotion 
               dur="1.5s"
               repeatCount="indefinite"
               path={`M ${core.x + cardW/2} ${core.y} L ${output.x - cardW/2} ${output.y}`}
               begin="1s"
               calcMode="linear"
             />
             <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="1s" />
          </motion.circle>

        </svg>

        {/* Input Nodes */}
        {inputs.map((input, i) => (
          <motion.div
            key={input.id}
            style={{ 
              ...glassStyle, 
              left: input.x - cardW/2, 
              top: input.y - cardH/2, 
              width: cardW, 
              height: cardH,
              color: '#64748b'
            }}
            variants={itemVariants}
            custom={i}
          >
            {input.label}
          </motion.div>
        ))}

        {/* Core Node */}
        <motion.div
          style={{ 
            ...glassStyle,
            left: core.x - cardW/2,
            top: core.y - cardH/2,
            width: cardW,
            height: cardH,
            border: '2px solid #0073E6',
            color: '#0073E6',
            boxShadow: '0 0 20px rgba(0, 115, 230, 0.2)'
          }}
          variants={itemVariants}
          custom={3}
        >
          {core.label}
        </motion.div>

        {/* Output Node */}
        <motion.div
          style={{ 
            ...glassStyle,
            left: output.x - cardW/2,
            top: output.y - cardH/2,
            width: cardW,
            height: cardH,
            background: '#0073E6',
            color: 'white',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(0, 115, 230, 0.4)'
          }}
          variants={itemVariants}
          custom={4}
        >
          {output.label}
        </motion.div>

      </motion.div>
    </div>
  );
};
