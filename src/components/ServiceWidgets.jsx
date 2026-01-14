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

// --- WIDGET 2: BRAND & DESIGN ---
// Concept: "The Style System" - A more elegant, less "UI builder" look.
// Focuses on typography, color, and spacing coming together.
export const BrandDesignWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  
  const W = 500;
  const H = 300;
  const centerX = W / 2;
  const centerY = H / 2;

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
        
        {/* Layer 1: Typography (Back) */}
        <motion.div
            style={{
                position: 'absolute',
                top: centerY - 100,
                left: centerX - 120,
                fontSize: '120px',
                fontFamily: 'Instrument Serif',
                color: 'rgba(0,0,0,0.03)',
                lineHeight: 1,
                whiteSpace: 'nowrap'
            }}
            animate={{ x: [-20, 0, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
            Aa
        </motion.div>

        {/* Layer 2: Color Palette Cards (Floating) - ENHANCED MOTION */}
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                style={{
                    position: 'absolute',
                    width: '60px',
                    height: '80px',
                    borderRadius: '12px',
                    background: i === 0 ? '#1a1a1a' : i === 1 ? '#0073E6' : '#ffffff',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    left: centerX - 140 + (i * 30),
                    top: centerY - 40 + (i * 20),
                    zIndex: i + 1
                }}
                initial={{ y: 0, rotate: 0 }}
                animate={{
                    y: [0, -15, 0], // Increased amplitude
                    rotate: [0, 8, -2, 0], // More complex rotation
                    scale: [1, 1.05, 1] // Subtle breathing
                }}
                transition={{
                    duration: 5,
                    delay: i * 0.8, // More staggered
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        ))}

        {/* Layer 3: The Design System Spec (Main Card) - ENHANCED INTERACTION */}
        <motion.div
            style={{
                ...glassStyle,
                width: '240px',
                height: '160px',
                left: centerX - 20,
                top: centerY - 60,
                zIndex: 10,
                borderRadius: '16px',
                alignItems: 'flex-start',
                padding: '24px',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(255,255,255,0.9)'
            }}
            animate={{
                y: [0, 8, 0],
                boxShadow: [
                    '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)',
                    '0 12px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.5)',
                    '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)'
                ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Header: Typography Spec - TYPING EFFECT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '24px', fontFamily: 'Instrument Serif', color: '#1a1a1a', display: 'flex' }}>
                    Heading
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ marginLeft: '2px', color: '#0073E6' }}
                    >|</motion.span>
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'Inter', color: '#94a3b8' }}>Instrument Serif • 400 • 32px</div>
            </div>

            {/* Grid/Spacing Spec - MEASUREMENT LINES */}
            <div style={{ display: 'flex', gap: '8px', width: '100%', position: 'relative' }}>
                <div style={{ flex: 1, height: '40px', background: 'rgba(0,115,230,0.05)', border: '1px dashed rgba(0,115,230,0.2)', borderRadius: '4px' }} />
                <div style={{ flex: 1, height: '40px', background: 'rgba(0,115,230,0.05)', border: '1px dashed rgba(0,115,230,0.2)', borderRadius: '4px' }} />
                
                {/* Animated measurement bracket */}
                <motion.div
                    style={{ 
                        position: 'absolute', top: -8, left: '50%', width: '100%', height: '6px', 
                        borderTop: '1px solid #0073E6', borderLeft: '1px solid #0073E6', borderRight: '1px solid #0073E6',
                        x: '-50%'
                    }}
                    initial={{ opacity: 0, width: '0%' }}
                    animate={{ opacity: [0, 1, 1, 0], width: ['0%', '100%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                    style={{ position: 'absolute', top: -20, left: '50%', x: '-50%', fontSize: '9px', color: '#0073E6', fontWeight: 600 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                    16px
                </motion.div>
            </div>

            {/* Button Spec - HOVER STATE ANIMATION */}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.div 
                    style={{ width: '80px', height: '28px', background: '#1a1a1a', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={{ scale: [1, 0.95, 1], background: ['#1a1a1a', '#333333', '#1a1a1a'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                    <div style={{ width: '40%', height: '2px', background: 'white', opacity: 0.8 }} />
                </motion.div>
                <div style={{ width: '80px', height: '28px', border: '1px solid #e2e8f0', borderRadius: '14px' }} />
            </div>

            {/* Cursor interacting - MORE DYNAMIC PATH */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: '#0073E6',
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    zIndex: 20
                }}
                animate={{
                    x: [0, -40, -40, 0, 0], // Move to button
                    y: [0, 20, 20, 0, 0],
                    scale: [1, 1, 0.8, 1, 1], // Click effect
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>

      </motion.div>
    </div>
  );
};
