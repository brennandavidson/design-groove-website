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
export const StrategyWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  
  const W = 500;
  const H = 300;
  const cardW = 100;
  const cardH = 40;
  
  const centerY = H / 2;
  const leftX = 60;
  const centerX = W / 2;
  const rightX = W - 60;

  const inputs = [
    { id: 'audience', label: 'Audience', x: leftX, y: centerY - 80 },
    { id: 'goals', label: 'Goals', x: leftX, y: centerY },
    { id: 'offer', label: 'Offer', x: leftX, y: centerY + 80 }
  ];

  const core = { id: 'strategy', label: 'STRATEGY', x: centerX, y: centerY };
  const output = { id: 'messaging', label: 'MESSAGING', x: rightX, y: centerY };

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
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      <motion.div 
        style={{ width: `${W}px`, height: `${H}px`, position: 'relative', flexShrink: 0, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
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

          <motion.path 
            d={`M ${core.x + cardW/2} ${core.y} L ${output.x - cardW/2} ${output.y}`}
            stroke="#0073E6"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrow-blue)"
            variants={lineVariants}
            custom={1}
          />

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

        {inputs.map((input, i) => (
          <motion.div
            key={input.id}
            style={{ ...glassStyle, left: input.x - cardW/2, top: input.y - cardH/2, width: cardW, height: cardH, color: '#64748b' }}
            variants={itemVariants}
            custom={i}
          >
            {input.label}
          </motion.div>
        ))}

        <motion.div
          style={{ ...glassStyle, left: core.x - cardW/2, top: core.y - cardH/2, width: cardW, height: cardH, border: '2px solid #0073E6', color: '#0073E6', boxShadow: '0 0 20px rgba(0, 115, 230, 0.2)' }}
          variants={itemVariants}
          custom={3}
        >
          {core.label}
        </motion.div>

        <motion.div
          style={{ ...glassStyle, left: output.x - cardW/2, top: output.y - cardH/2, width: cardW, height: cardH, background: '#0073E6', color: 'white', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 115, 230, 0.4)' }}
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
export const BrandDesignWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  const W = 500;
  const H = 300;
  const centerX = W / 2;
  const centerY = H / 2;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#f8f9fa' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      <motion.div 
        style={{ width: `${W}px`, height: `${H}px`, position: 'relative', flexShrink: 0, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
            style={{ position: 'absolute', top: centerY - 100, left: centerX - 120, fontSize: '120px', fontFamily: 'Instrument Serif', color: 'rgba(0,0,0,0.03)', lineHeight: 1, whiteSpace: 'nowrap' }}
            animate={{ x: [-20, 0, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
            Aa
        </motion.div>

        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                style={{
                    position: 'absolute', width: '60px', height: '80px', borderRadius: '12px',
                    background: i === 0 ? '#1a1a1a' : i === 1 ? '#0073E6' : '#ffffff',
                    border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    left: centerX - 140 + (i * 30), top: centerY - 40 + (i * 20), zIndex: i + 1
                }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
        ))}

        <motion.div
            style={{
                ...glassStyle, width: '240px', height: '160px', left: centerX - 20, top: centerY - 60, zIndex: 10,
                borderRadius: '16px', alignItems: 'flex-start', padding: '24px', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.9)'
            }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '24px', fontFamily: 'Instrument Serif', color: '#1a1a1a' }}>Heading</div>
                <div style={{ fontSize: '10px', fontFamily: 'Inter', color: '#94a3b8' }}>Instrument Serif • 400 • 32px</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <div style={{ flex: 1, height: '40px', background: 'rgba(0,115,230,0.05)', border: '1px dashed rgba(0,115,230,0.2)', borderRadius: '4px' }} />
                <div style={{ flex: 1, height: '40px', background: 'rgba(0,115,230,0.05)', border: '1px dashed rgba(0,115,230,0.2)', borderRadius: '4px' }} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '80px', height: '28px', background: '#1a1a1a', borderRadius: '14px' }} />
                <div style={{ width: '80px', height: '28px', border: '1px solid #e2e8f0', borderRadius: '14px' }} />
            </div>
            <motion.div
                style={{
                    position: 'absolute', width: '20px', height: '20px', background: '#0073E6', borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)', right: '-10px', bottom: '-10px', boxShadow: '0 4px 12px rgba(0,115,230,0.3)'
                }}
                animate={{ x: [0, -20, 0], y: [0, -20, 0], scale: [1, 0.9, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- WIDGET 3: DEVELOPMENT & AUTOMATION ---
// Concept: "The Vertical Tech Stack" - A robust, integrated system view.
// Represents the full stack: Infrastructure -> Logic -> Experience.
export const DevelopmentWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  
  const W = 500;
  const H = 300;
  const centerX = W / 2;
  const centerY = H / 2;

  // Configuration
  const cardW = 260;
  const cardH = 60;
  const gap = 20;
  
  // Positions
  const topY = centerY - (cardH + gap);
  const midY = centerY;
  const botY = centerY + (cardH + gap);

  // Animation Cycle
  const duration = 6;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#f8f9fa' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      <motion.div 
        style={{ width: `${W}px`, height: `${H}px`, position: 'relative', flexShrink: 0, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Central Data Spine (Back) */}
        <div style={{ position: 'absolute', left: centerX - 1, top: topY + cardH/2, bottom: botY - cardH/2, width: '2px', background: '#e2e8f0', zIndex: 0 }} />
        
        {/* Active Data Pulse along Spine */}
        <motion.div
            style={{ 
                position: 'absolute', left: centerX - 2, width: '4px', height: '40px', 
                background: 'linear-gradient(to bottom, rgba(0,115,230,0), #0073E6, rgba(0,115,230,0))',
                zIndex: 1, borderRadius: '2px'
            }}
            animate={{ 
                top: [botY - cardH/2, topY - cardH],
                opacity: [0, 1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* --- LAYERS --- */}

        {/* 1. TOP: EXPERIENCE (Frontend) */}
        <motion.div
            style={{
                ...glassStyle,
                width: cardW, height: cardH,
                left: centerX - cardW/2, top: topY - cardH/2,
                justifyContent: 'space-between', padding: '0 24px',
                zIndex: 10
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0,115,230,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0073E6', fontSize: '16px' }}>
                    ✦
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>Experience</span>
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>Frontend & UI</span>
                </div>
            </div>
            {/* Status Light */}
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
        </motion.div>

        {/* 2. MIDDLE: INTELLIGENCE (Automation/Logic) */}
        <motion.div
            style={{
                ...glassStyle,
                width: cardW, height: cardH,
                left: centerX - cardW/2, top: midY - cardH/2,
                justifyContent: 'space-between', padding: '0 24px',
                zIndex: 9
            }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0,115,230,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0073E6', fontSize: '16px' }}>
                    ⚡
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>Intelligence</span>
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>Automation & Logic</span>
                </div>
            </div>
            {/* Processing Activity */}
            <div style={{ display: 'flex', gap: '3px' }}>
                {[0, 1, 2].map(i => (
                    <motion.div 
                        key={i}
                        style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#0073E6' }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </div>
        </motion.div>

        {/* 3. BOTTOM: INFRASTRUCTURE (Backend/Data) */}
        <motion.div
            style={{
                ...glassStyle,
                width: cardW, height: cardH,
                left: centerX - cardW/2, top: botY - cardH/2,
                justifyContent: 'space-between', padding: '0 24px',
                zIndex: 8
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0,115,230,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0073E6', fontSize: '16px' }}>
                    ⚓
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>Infrastructure</span>
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>Backend & Data</span>
                </div>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>API: OK</div>
        </motion.div>

        {/* Floating Code Snippets / Particles - Adds "Tech" feel */}
        {[0, 1, 2, 3].map(i => (
            <motion.div
                key={i}
                style={{
                    position: 'absolute',
                    fontSize: '10px', fontFamily: 'monospace', color: 'rgba(0,115,230,0.4)',
                    left: i % 2 === 0 ? centerX + cardW/2 + 20 : centerX - cardW/2 - 60,
                    top: centerY + (i - 1.5) * 40
                }}
                animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
            >
                {i === 0 ? '{ status: 200 }' : i === 1 ? 'GET /api/v1' : i === 2 ? 'await fetch()' : 'sync: true'}
            </motion.div>
        ))}

      </motion.div>
    </div>
  );
};
