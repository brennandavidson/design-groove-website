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
export const DevelopmentWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  
  const W = 500;
  const H = 300;
  const centerX = W / 2;
  const centerY = H / 2;

  // Orbit parameters
  const orbitRadius = 120;
  
  const satellites = [
    { id: 'payments', label: 'Payments', icon: '$', angle: -90 }, // Top
    { id: 'crm', label: 'CRM', icon: '👤', angle: 30 }, // Bottom Right
    { id: 'email', label: 'Email', icon: '@', angle: 150 } // Bottom Left
  ];

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
        
        {/* Connecting Lines Layer */}
        <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: Z_SVG }}>
            <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0073E6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#0073E6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0073E6" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            {satellites.map((sat) => {
                // Calculate satellite position relative to center
                const rad = sat.angle * (Math.PI / 180);
                const x = centerX + orbitRadius * Math.cos(rad);
                const y = centerY + orbitRadius * Math.sin(rad);
                
                return (
                    <g key={`link-${sat.id}`}>
                        {/* Static Line */}
                        <motion.line 
                            x1={centerX} y1={centerY} x2={x} y2={y} 
                            stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4"
                        />
                        
                        {/* Active Pulse (Data Packet) - Outward */}
                        <motion.circle r="3" fill="#0073E6">
                            <animateMotion 
                                dur="2s"
                                repeatCount="indefinite"
                                path={`M ${centerX} ${centerY} L ${x} ${y}`}
                                begin="0s"
                                calcMode="linear"
                            />
                            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </motion.circle>

                        {/* Active Pulse (Data Packet) - Inward (Response) */}
                        <motion.circle r="3" fill="#10b981">
                            <animateMotion 
                                dur="2s"
                                repeatCount="indefinite"
                                path={`M ${x} ${y} L ${centerX} ${centerY}`}
                                begin="1s"
                                calcMode="linear"
                            />
                            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                        </motion.circle>
                    </g>
                );
            })}
        </svg>

        {/* Central Hub: The Platform */}
        <motion.div
            style={{
                ...glassStyle,
                width: '100px', height: '100px',
                borderRadius: '50%',
                left: centerX - 50, top: centerY - 50,
                border: '4px solid rgba(255,255,255,0.8)',
                boxShadow: '0 0 30px rgba(0,115,230,0.15), 0 0 0 1px rgba(0,115,230,0.1)',
                zIndex: 10,
                flexDirection: 'column',
                gap: '4px'
            }}
            animate={{
                boxShadow: [
                    '0 0 30px rgba(0,115,230,0.15), 0 0 0 1px rgba(0,115,230,0.1)',
                    '0 0 50px rgba(0,115,230,0.3), 0 0 0 4px rgba(0,115,230,0.1)',
                    '0 0 30px rgba(0,115,230,0.15), 0 0 0 1px rgba(0,115,230,0.1)'
                ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            <div style={{ fontSize: '24px' }}>⚡</div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>CORE</div>
        </motion.div>

        {/* Satellites */}
        {satellites.map((sat, i) => {
            const rad = sat.angle * (Math.PI / 180);
            const x = centerX + orbitRadius * Math.cos(rad);
            const y = centerY + orbitRadius * Math.sin(rad);

            return (
                <motion.div
                    key={sat.id}
                    style={{
                        ...glassStyle,
                        width: '80px', height: '60px',
                        left: x - 40, top: y - 30,
                        flexDirection: 'column',
                        gap: '2px',
                        zIndex: 5
                    }}
                    animate={{
                        y: [0, -5, 0]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div style={{ fontSize: '18px', marginBottom: '2px' }}>{sat.icon}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{sat.label}</div>
                    
                    {/* Status Dot */}
                    <motion.div
                        style={{
                            position: 'absolute', top: '6px', right: '6px',
                            width: '6px', height: '6px', borderRadius: '50%', background: '#10b981'
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            );
        })}

      </motion.div>
    </div>
  );
};
