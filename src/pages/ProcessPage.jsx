import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';

// --- NEW WIDGET DEFINITIONS ---

// 1. Strategy: "The Audit to Blueprint"
// Concept: Audit -> Breakdown (Brand/Offers/Tech/Customers) -> Convergence -> Blueprint
const StrategyWidget = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  
  // Dimensions
  const W = 400;
  
  // Centers
  const cx = W / 2; // 200
  
  // Y-Levels (Centers)
  const y1 = 40;  // Audit
  const y2 = 130; // Mid
  const y3 = 240; // Blueprint
  
  // Line Bend Y-Levels
  const ySplit = 80;
  const yMerge = 180;

  // X-Centers for Mid Nodes
  const xNodes = [80, 160, 240, 320];

  // Box Dimensions
  const auditDim = { w: 100, h: 40 };
  const midDim = { w: 70, h: 40 }; 
  const blueDim = { w: 140, h: 50 };

  // Z-Indices
  const Z_SVG = 1;
  const Z_DOTS = 2;
  const Z_NODES = 3;

  // Styles
  const baseBoxStyle = {
    position: 'absolute',
    // Glass Effect: Semi-transparent white + Blur
    background: 'rgba(255, 255, 255, 0.65)', 
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '8px', // Tighter radius
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '12px',
    color: '#1a1a1a',
    overflow: 'hidden', // Ensure scanner stays inside
    // Border & Glow: Crisp white border + White outer glow + Soft depth shadow
    border: '1px solid #ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.5)', 
    zIndex: Z_NODES
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      {/* Main Container */}
      <motion.div 
        style={{ width: '400px', height: '300px', position: 'relative', flexShrink: 0, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* SVG Layer */}
        <svg width="400" height="300" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: Z_SVG }}>
          <motion.g variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* 1. Stem from Audit */}
            <motion.path d={`M ${cx} ${y1 + auditDim.h/2} L ${cx} ${ySplit}`} stroke="#94a3b8" strokeWidth="2" fill="none" variants={lineVariants} />
            
            {/* 2. Top Crossbar */}
            <motion.path d={`M ${xNodes[0]} ${ySplit} L ${xNodes[3]} ${ySplit}`} stroke="#94a3b8" strokeWidth="2" fill="none" variants={lineVariants} />
            
            {/* 3. Drop to Mids */}
            {xNodes.map((x, i) => (
              <motion.path key={`drop-${i}`} d={`M ${x} ${ySplit} L ${x} ${y2 - midDim.h/2}`} stroke="#94a3b8" strokeWidth="2" fill="none" variants={lineVariants} />
            ))}
            
            {/* 4. Drop from Mids */}
            {xNodes.map((x, i) => (
              <motion.path key={`drop-b-${i}`} d={`M ${x} ${y2 + midDim.h/2} L ${x} ${yMerge}`} stroke="#94a3b8" strokeWidth="2" fill="none" variants={lineVariants} />
            ))}
            
            {/* 5. Bottom Crossbar */}
            <motion.path d={`M ${xNodes[0]} ${yMerge} L ${xNodes[3]} ${yMerge}`} stroke="#94a3b8" strokeWidth="2" fill="none" variants={lineVariants} />
            
            {/* 6. Stem to Blueprint */}
            <motion.path 
              d={`M ${cx} ${yMerge} L ${cx} ${y3 - blueDim.h/2}`} 
              stroke="#94a3b8" 
              strokeWidth="2" 
              fill="none" 
              markerEnd="url(#arrow)"
              variants={lineVariants} 
            />
            
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
              </marker>
              <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </motion.g>
        </svg>

        {/* Node Layer - Explicitly Defined */}
        
        {/* AUDIT */}
        <motion.div 
          style={{ 
            ...baseBoxStyle, 
            left: cx - auditDim.w/2, 
            top: y1 - auditDim.h/2, 
            width: auditDim.w, 
            height: auditDim.h,
            fontSize: '13px',
            letterSpacing: '1px',
            color: '#1a1a1a'
          }}
          variants={itemVariants}
        >
          AUDIT
        </motion.div>

        {/* Brand (Node 0) - Pulse hits when dot is INSIDE card (slower transit) */}
        <motion.div 
          style={{ ...baseBoxStyle, left: xNodes[0] - midDim.w/2, top: y2 - midDim.h/2, width: midDim.w, height: midDim.h, fontSize: '11px', color: '#64748b' }}
          variants={itemVariants}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Brand</span>
          {/* Pulse Overlay: Smooth Wash */}
          <motion.div
            style={{ 
              position: 'absolute', 
              left: 0, right: 0, height: '120%', // Taller beam for smoother feel
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,115,230,0.1) 40%, rgba(0,115,230,0.2) 50%, rgba(0,115,230,0.1) 60%, rgba(255,255,255,0) 100%)',
              zIndex: 0 
            }}
            animate={{ top: ['-120%', '-120%', '120%', '120%'] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              times: [0, 0.3, 0.6, 1], // Extended transit time (0.3 to 0.6)
              ease: "linear", 
              delay: 1.5 
            }}
          />
        </motion.div>

        {/* Offers (Node 1) */}
        <motion.div 
          style={{ ...baseBoxStyle, left: xNodes[1] - midDim.w/2, top: y2 - midDim.h/2, width: midDim.w, height: midDim.h, fontSize: '11px', color: '#64748b' }}
          variants={itemVariants}
        >
          Offers
        </motion.div>

        {/* Tech (Node 2) */}
        <motion.div 
          style={{ ...baseBoxStyle, left: xNodes[2] - midDim.w/2, top: y2 - midDim.h/2, width: midDim.w, height: midDim.h, fontSize: '11px', color: '#64748b' }}
          variants={itemVariants}
        >
          Tech
        </motion.div>

        {/* Customers (Node 3) - Pulse hits when dot is INSIDE card (slower transit) */}
        <motion.div 
          style={{ ...baseBoxStyle, left: xNodes[3] - midDim.w/2, top: y2 - midDim.h/2, width: midDim.w, height: midDim.h, fontSize: '11px', color: '#64748b' }}
          variants={itemVariants}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Customers</span>
          {/* Pulse Overlay: Smooth Wash */}
          <motion.div
            style={{ 
              position: 'absolute', 
              left: 0, right: 0, height: '120%', // Taller beam for smoother feel
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,115,230,0.1) 40%, rgba(0,115,230,0.2) 50%, rgba(0,115,230,0.1) 60%, rgba(255,255,255,0) 100%)',
              zIndex: 0 
            }}
            animate={{ top: ['-120%', '-120%', '120%', '120%'] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              times: [0, 0.3, 0.6, 1], // Extended transit time (0.3 to 0.6)
              ease: "linear", 
              delay: 3.0 
            }}
          />
        </motion.div>

        {/* BLUEPRINT */}
        <motion.div 
          style={{ 
            ...baseBoxStyle,
            left: cx - blueDim.w/2,
            top: y3 - blueDim.h/2,
            width: blueDim.w,
            height: blueDim.h,
            background: '#0073E6', // Solid Brand Blue to match other elements
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1px',
            border: '1px solid rgba(255,255,255,0.1)',
            // Premium Button: Depth shadow + Inner top bevel highlight
            boxShadow: '0 10px 25px -5px rgba(0, 115, 230, 0.4), 0 8px 10px -6px rgba(0, 115, 230, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
          variants={itemVariants}
        >
          BLUEPRINT
        </motion.div>

        {/* Pulse Animations */}
        {/* Pulse 1: Travels left path */}
        <motion.div
          style={{ 
            width: '6px', height: '6px', borderRadius: '50%', background: '#0073E6', 
            position: 'absolute', zIndex: Z_DOTS, 
            boxShadow: '0 0 8px 1px rgba(0, 115, 230, 0.3)', // Reduced shadow severity
            transform: 'translate(-50%, -50%)',
            top: 0, left: 0 
          }}
          animate={{
            left: [cx, cx, xNodes[0], xNodes[0], xNodes[0], xNodes[0], cx, cx],
            top: [y1 + auditDim.h/2, ySplit, ySplit, y2 - midDim.h/2, y2 + midDim.h/2, yMerge, yMerge, y3 - blueDim.h/2],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.3, 0.3, 0.6, 0.65, 0.9, 1], // Slower card transit (0.3 -> 0.6 = 30%)
            delay: 1.5
          }}
        />

        {/* Pulse 2: Travels right path (Customers) */}
        <motion.div
          style={{ 
            width: '6px', height: '6px', borderRadius: '50%', background: '#0073E6', 
            position: 'absolute', zIndex: Z_DOTS, 
            boxShadow: '0 0 8px 1px rgba(0, 115, 230, 0.3)', // Reduced shadow severity
            transform: 'translate(-50%, -50%)',
            top: 0, left: 0 
          }}
          animate={{
            left: [cx, cx, xNodes[3], xNodes[3], xNodes[3], xNodes[3], cx, cx],
            top: [y1 + auditDim.h/2, ySplit, ySplit, y2 - midDim.h/2, y2 + midDim.h/2, yMerge, yMerge, y3 - blueDim.h/2],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.3, 0.3, 0.6, 0.65, 0.9, 1], // Slower card transit (0.3 -> 0.6 = 30%)
            delay: 3.0
          }}
        />

      </motion.div>
    </div>
  );
};

// 2. Build: "The Layer Stack"
// Concept: Isometric layers (Foundation -> Structure -> Polish) merging into a final product.
const ConstructionWidget = ({ scale = 1 }) => {
  const cycle = 4;
  
  // Dimensions
  const cardW = 160;
  const cardH = 220;

  // Consistent Glass Style
  const glassLayerStyle = {
    position: 'absolute',
    width: `${cardW}px`,
    height: `${cardH}px`,
    background: 'rgba(255, 255, 255, 0.65)', 
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px', // Slightly more rounded
    border: '1px solid #ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    gap: '16px',
    transformOrigin: 'center center'
  };

  // Vertical offsets for expansion
  const z2 = 80; 
  const z3 = 160;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      {/* Rotated Container - Centered Vertically */}
      <motion.div 
        style={{ position: 'relative', width: cardW, height: cardH, flexShrink: 0, transformStyle: 'preserve-3d', transform: `scale(${scale})`, transformOrigin: 'center center' }}
        animate={{ rotateX: 60, rotateZ: -45, y: 60, x: 0 }} // Adjusted y to 60 to center fully expanded state
        transition={{ duration: 0 }}
      >
        
        {/* Ground Shadow */}
        <motion.div
            style={{ 
                position: 'absolute', width: '100%', height: '100%', 
                background: 'black', borderRadius: '16px', filter: 'blur(30px)',
                zIndex: 0
            }}
            animate={{ opacity: [0.1, 0.2, 0.15, 0.1, 0.1], scale: [1, 0.9, 0.9, 1, 1] }}
            transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Connector Lines (Guide wires) */}
        {[
          { left: 0, top: 0 },
          { right: 0, top: 0 },
          { left: 0, bottom: 0 },
          { right: 0, bottom: 0 }
        ].map((pos, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: '1px',
              background: 'repeating-linear-gradient(to bottom, #94a3b8 0, #94a3b8 4px, transparent 4px, transparent 8px)',
              transformOrigin: 'top center',
              zIndex: 0
            }}
            initial={{ rotateX: -90, height: 0, opacity: 0 }} // Rotate to stand up along Z-axis
            animate={{ height: [0, z3, z3, 0, 0], opacity: [0, 0.5, 0.5, 0, 0] }}
            transition={{ duration: cycle, times: [0, 0.2, 0.5, 0.7, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Layer 1: Foundation (Code/Architecture) */}
        <motion.div
          style={{ ...glassLayerStyle, zIndex: 1, background: 'rgba(255,255,255,0.9)', alignItems: 'flex-start', padding: '20px' }}
          animate={{ z: [0, 0, 0, 0, 0] }}
          transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Editor Window Layout */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', height: '100%' }}>
            {/* Sidebar */}
            <div style={{ width: '30px', height: '100%', display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
               {[...Array(6)].map((_, i) => (
                 <div key={i} style={{ width: '100%', height: '4px', background: i === 1 ? '#3b82f6' : '#cbd5e1', borderRadius: '2px', opacity: i === 1 ? 1 : 0.5 }} />
               ))}
            </div>
            
            {/* Code Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '30%', height: '6px', background: '#ef4444', borderRadius: '3px' }} />
                  <div style={{ width: '40%', height: '6px', background: '#cbd5e1', borderRadius: '3px' }} />
               </div>
               <div style={{ width: '80%', height: '6px', background: '#cbd5e1', borderRadius: '3px', marginLeft: '12px' }} />
               <div style={{ width: '60%', height: '6px', background: '#cbd5e1', borderRadius: '3px', marginLeft: '12px' }} />
               
               <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <div style={{ width: '25%', height: '6px', background: '#3b82f6', borderRadius: '3px' }} />
                  <div style={{ width: '50%', height: '6px', background: '#cbd5e1', borderRadius: '3px' }} />
               </div>
               <div style={{ width: '70%', height: '6px', background: '#cbd5e1', borderRadius: '3px', marginLeft: '12px' }} />
               
               <div style={{ width: '90%', height: '6px', background: '#cbd5e1', borderRadius: '3px', marginTop: '4px' }} />
               <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '20%', height: '6px', background: '#10b981', borderRadius: '3px' }} />
                  <div style={{ width: '40%', height: '6px', background: '#cbd5e1', borderRadius: '3px' }} />
               </div>
            </div>
          </div>
          
          {/* Subtle Grid overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.2, pointerEvents: 'none' }} />
        </motion.div>

        {/* Layer 2: Structure (Wireframe) */}
        <motion.div
          style={{ ...glassLayerStyle, zIndex: 2, background: 'rgba(255,255,255,0.75)' }}
          animate={{ z: [0, z2, z2, 0, 0] }}
          transition={{ duration: cycle, times: [0, 0.2, 0.5, 0.7, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Wireframe Layout - Solid Lines */}
          <div style={{ width: '100%', height: '40px', border: '1.5px solid #94a3b8', borderRadius: '8px', background: 'rgba(241, 245, 249, 0.5)' }} />
          <div style={{ display: 'flex', gap: '10px', width: '100%', height: '60px' }}>
             <div style={{ flex: 1, border: '1.5px solid #94a3b8', borderRadius: '8px', background: 'rgba(241, 245, 249, 0.5)' }} />
             <div style={{ flex: 1, border: '1.5px solid #94a3b8', borderRadius: '8px', background: 'rgba(241, 245, 249, 0.5)' }} />
          </div>
          <div style={{ width: '100%', height: '30px', border: '1.5px solid #94a3b8', borderRadius: '8px', marginTop: 'auto', background: 'rgba(241, 245, 249, 0.5)' }} />
        </motion.div>

        {/* Layer 3: Polish (UI + Brand) */}
        <motion.div
          style={{ 
            ...glassLayerStyle, 
            zIndex: 3,
            background: 'rgba(255,255,255,0.95)',
          }}
          animate={{ 
            z: [0, z3, z3, 0, 0],
            boxShadow: [
              '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)',
              '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.5)',
              '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.5)',
              '0 0 60px rgba(0,115,230,0.6), 0 0 0 2px rgba(0,115,230,0.5)', // Impact Glow
              '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)'
            ]
          }} 
          transition={{ duration: cycle, times: [0, 0.2, 0.5, 0.7, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Final UI Header */}
          <div style={{ width: '100%', height: '40px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '24px', height: '8px', borderRadius: '4px', background: '#cbd5e1' }} />
            <div style={{ width: '16px', height: '8px', borderRadius: '4px', background: '#e2e8f0', marginLeft: 'auto' }} />
          </div>
          
          {/* Content Columns */}
          <div style={{ display: 'flex', gap: '10px', width: '100%', height: '60px' }}>
             <div style={{ flex: 1, background: 'linear-gradient(180deg, #f1f5f9 0%, white 100%)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
             <div style={{ flex: 1, background: 'linear-gradient(180deg, #f1f5f9 0%, white 100%)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
          </div>

          {/* Call to Action Button - Brand Blue */}
          <div style={{ width: '100%', height: '36px', background: 'linear-gradient(135deg, #0073E6, #2563eb)', borderRadius: '8px', marginTop: 'auto', boxShadow: '0 4px 12px rgba(0,115,230,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ width: '40%', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

// 3. Launch: "The Launch Protocol"
// Concept: Sequential checklist completion -> System Launch -> Live Status
const OptimizationWidget = ({ scale = 1 }) => {
  const cycle = 6; // Total duration in seconds

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.65)', 
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid #ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)',
  };

  const tasks = ['Performance', 'SEO & Meta', 'Analytics', 'Integrations'];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      {/* Main Dashboard Card */}
      <motion.div
        style={{ 
          ...glassStyle,
          width: '280px', 
          padding: '24px',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          scale: scale,
          transformOrigin: 'center center'
        }}
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 8px rgba(59,130,246,0.5)' }} />
             <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '1px' }}>SYSTEM CHECK</span>
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94a3b8' }}>v1.0</span>
        </div>

        {/* Dynamic Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks.map((task, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '24px', overflow: 'hidden' }}>
              
              {/* Task Label - Slides In */}
              <motion.span 
                style={{ fontFamily: 'Inter', fontSize: '13px', color: '#334155', fontWeight: 500 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 1, 1, 0], x: [-20, 0, 0, 0, 10] }}
                transition={{ 
                   duration: cycle, 
                   times: [0, 0.1, 0.8, 0.9, 1],
                   delay: i * 0.5, // Stagger appearance
                   repeat: Infinity,
                   repeatDelay: 1
                }}
              >
                {task}
              </motion.span>
              
              {/* Checkbox / Status */}
              <div style={{ position: 'relative', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {/* Empty Circle */}
                 <motion.div 
                    style={{ position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #cbd5e1' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0, 0], scale: [0, 1, 0, 0] }}
                    transition={{ duration: cycle, times: [0, 0.1, 0.2 + (i*0.1), 1], delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                 />
                 
                 {/* Spinner (Optional - skipped for cleanliness) */}

                 {/* Completed Checkmark */}
                 <motion.div
                    style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', background: '#0073E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 1, 1, 0] }}
                    transition={{ 
                        duration: cycle, 
                        // Appears slightly after text (i*0.5 + 0.4s processing)
                        times: [0, 0.05, 0.8, 0.9, 1], 
                        delay: (i * 0.5) + 0.4, 
                        repeat: Infinity, 
                        repeatDelay: 1 
                    }}
                 >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1.5 4L3.5 6L8.5 1" />
                    </svg>
                 </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Launch Status Bar */}
        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
             <div style={{ position: 'relative', height: '40px', background: 'rgba(241,245,249,0.5)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                
                {/* Progress Fill */}
                <motion.div
                    style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: '#0073E6', zIndex: 0 }}
                    animate={{ width: ['0%', '0%', '100%', '100%', '0%'] }}
                    transition={{ 
                        duration: cycle, 
                        // Starts after last item (4 items * 0.5s = 2.0s + 0.4s = 2.4s). Let's say starts at 2.5s.
                        times: [0, 0.45, 0.6, 0.9, 1], 
                        repeat: Infinity, 
                        repeatDelay: 1 
                    }}
                />
                
                {/* Text 1: Optimizing */}
                <motion.span 
                    style={{ position: 'absolute', zIndex: 1, fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.5px' }}
                    animate={{ opacity: [1, 1, 0, 0, 1], y: [0, 0, -10, -10, 0] }}
                    transition={{ duration: cycle, times: [0, 0.45, 0.5, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
                >
                   OPTIMIZING...
                </motion.span>

                {/* Text 2: System Live */}
                <motion.span 
                    style={{ position: 'absolute', zIndex: 1, fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#ffffff', letterSpacing: '1px' }}
                    animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9] }}
                    transition={{ duration: cycle, times: [0, 0.5, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
                >
                   SYSTEM LIVE
                </motion.span>
                
                {/* Success Glow Pulse */}
                <motion.div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 2 }}
                    animate={{ opacity: [0, 0, 0.5, 0, 0] }}
                    transition={{ duration: cycle, times: [0, 0.55, 0.6, 1, 1], repeat: Infinity, repeatDelay: 1 }}
                />
             </div>
        </div>

      </motion.div>
    </div>
  );
};

// 4. Partnership: "The Loop"
// Concept: Continuous Iteration (Build -> Measure -> Improve -> Loop)
// Style: 2D Glass Cards in a horizontal flow with a returning loop arrow.

const EvolutionWidget = ({ scale = 1 }) => {
  // Dimensions
  const W = 400;
  const H = 300;
  
  // Card Config
  const cardW = 90;
  const cardH = 36;
  const gap = 30;
  const totalW = (cardW * 3) + (gap * 2);
  const startX = (W - totalW) / 2;
  const centerY = H / 2;

  // Nodes
  const nodes = [
    { id: 'build', label: 'BUILD', x: startX, color: '#3b82f6' },
    { id: 'measure', label: 'MEASURE', x: startX + cardW + gap, color: '#8b5cf6' },
    { id: 'improve', label: 'IMPROVE', x: startX + (cardW + gap) * 2, color: '#10b981' }
  ];

  // Path Calculations
  // P1: Build -> Measure
  // P2: Measure -> Improve
  // P3: Improve -> Down -> Left -> Up -> Build (The Loop)
  
  const yLine = centerY;
  const yLoop = centerY + 60; // Bottom of the loop
  
  // Card Style
  const cardStyle = {
    position: 'absolute',
    width: `${cardW}px`,
    height: `${cardH}px`,
    top: centerY - (cardH / 2),
    background: 'rgba(255, 255, 255, 0.75)', 
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '8px',
    border: '1px solid #ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter',
    fontSize: '10px',
    fontWeight: 700,
    color: '#334155',
    zIndex: 2,
    letterSpacing: '0.5px'
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />

      {/* Main Container - Fixed Stage */}
      <div style={{ position: 'relative', width: `${W}px`, height: `${H}px`, flexShrink: 0, transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        
        {/* SVG Layer for Arrows */}
        <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
            <defs>
                <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
                </marker>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Segment 1: Build -> Measure */}
            <path d={`M ${nodes[0].x + cardW} ${yLine} L ${nodes[1].x - 5} ${yLine}`} stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowHead)" />
            
            {/* Segment 2: Measure -> Improve */}
            <path d={`M ${nodes[1].x + cardW} ${yLine} L ${nodes[2].x - 5} ${yLine}`} stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowHead)" />

            {/* Segment 3: The Return Loop */}
            {/* Improve Right -> Down -> Left -> Up -> Build Left */}
            <path 
                d={`
                    M ${nodes[2].x + cardW / 2} ${yLine + cardH / 2} 
                    L ${nodes[2].x + cardW / 2} ${yLoop} 
                    L ${nodes[0].x + cardW / 2} ${yLoop} 
                    L ${nodes[0].x + cardW / 2} ${yLine + cardH / 2 + 8}
                `} 
                fill="none" 
                stroke="#cbd5e1" 
                strokeWidth="2" 
                markerEnd="url(#arrowHead)"
                strokeDasharray="4 4"
            />

            {/* Animated Particle traveling the WHOLE loop */}
            {/* Path definition for animation: Needs to be one continuous line or separate segments */}
            {/* Let's do separate pulses for each stage for clarity */}
            
            {/* Pulse 1: Build -> Measure */}
            <motion.circle r="3" fill="#3b82f6">
                <animateMotion 
                    dur="2s" 
                    repeatCount="indefinite"
                    path={`M ${nodes[0].x + cardW} ${yLine} L ${nodes[1].x - 10} ${yLine}`}
                    begin="0s"
                    calcMode="linear"
                    keyPoints="0;1" keyTimes="0;1"
                />
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
            </motion.circle>

            {/* Pulse 2: Measure -> Improve */}
            <motion.circle r="3" fill="#8b5cf6">
                <animateMotion 
                    dur="2s" 
                    repeatCount="indefinite"
                    path={`M ${nodes[1].x + cardW} ${yLine} L ${nodes[2].x - 10} ${yLine}`}
                    begin="0.66s"
                    calcMode="linear"
                    keyPoints="0;1" keyTimes="0;1"
                />
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.66s" />
            </motion.circle>

            {/* Pulse 3: The Return Loop */}
            <motion.circle r="3" fill="#10b981">
                <animateMotion 
                    dur="6s" 
                    repeatCount="indefinite"
                    path={`
                        M ${nodes[2].x + cardW / 2} ${yLine + cardH / 2} 
                        L ${nodes[2].x + cardW / 2} ${yLoop} 
                        L ${nodes[0].x + cardW / 2} ${yLoop} 
                        L ${nodes[0].x + cardW / 2} ${yLine + cardH / 2}
                    `}
                    begin="1.33s"
                    calcMode="linear"
                    keyPoints="0;0.2;0.8;1" keyTimes="0;0.2;0.8;1"
                />
                <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" begin="1.33s" />
            </motion.circle>

        </svg>

        {/* Cards */}
        {nodes.map((node, i) => (
            <motion.div
                key={node.id}
                style={{
                    ...cardStyle,
                    left: node.x,
                    borderTop: `2px solid ${node.color}`
                }}
                animate={{
                    boxShadow: [
                        '0 4px 15px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.5)',
                        `0 8px 25px ${node.color}20, 0 0 0 1px ${node.color}40`,
                        '0 4px 15px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.5)'
                    ],
                    y: [0, -2, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.66, // Faster stagger
                    times: [0, 0.2, 1]
                }}
            >
                {node.label}
            </motion.div>
        ))}

      </div>
    </div>
  );
};


// FAQ Data (Borrowed from Services)
const faqData = [
  { 
    q: "How do I get started?", 
    a: (
      <>
        <Link to="/book" style={{ color: '#1a1a1a', textDecoration: 'underline', fontWeight: 500 }}>Book a call</Link> or fill out our <Link to="/contact" style={{ color: '#1a1a1a', textDecoration: 'underline', fontWeight: 500 }}>contact form</Link>. We’ll schedule a quick intro call to align on your goals, scope, and timeline. From there, we’ll craft a tailored proposal and set a clear start date that works for both of us.
      </>
    )
  },
  { q: "What if I only need part of the system?", a: "Some clients need the full build. Others need us to fix what's broken or fill specific gaps. We figure out the right scope on a call." },
  { q: "What do we need to provide to get started?", a: "Access to your existing assets (brand files, copy docs, current site) and clarity on what you're selling. If you don't have clarity on the offer yet, that's part of what we sort out in Phase 1." },
  { q: "Do you work with what I already have?", a: "Yes. If your brand, messaging, or tech is working, we build around it. The infrastructure wraps around what's already there." },
  { q: "What services does Design Groove offer?", a: "We build complete revenue systems: strategy, positioning, brand, website, funnel, automations, and ongoing tech support. Most clients need the full build. Some need specific pieces. Either way, everything we do is designed to work together." },
  { q: "How long does a project take?", a: "Most full scope projects run 4 to 6 weeks." },
  { q: "Will we have a dedicated project manager?", a: "You work directly with me. No account managers, no handoffs, no game of telephone. One point of contact from strategy through launch and beyond." },
  { q: "Do you offer ongoing support?", a: "Most clients stay on retainer after launch for tech support, new builds, and iteration. We become your embedded tech team." }
];

const AccordionItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div style={{ borderBottom: '1px solid #e5e5e5' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          padding: '2rem 0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', // Align to top for multi-line questions
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: '#999', paddingTop: '0.4rem' }}>{formattedIndex}</span>
            <span style={{ fontFamily: 'Instrument Serif', fontSize: '1.5rem', color: '#1a1a1a', maxWidth: '600px' }}>{q}</span>
        </div>
        <span style={{ fontSize: '1.5rem', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', opacity: 0.5 }}>+</span>
      </button>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ paddingLeft: 'calc(2rem + 0.9rem + 4px)', paddingBottom: '2rem', maxWidth: '800px' }}>
             <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.6, color: '#4a4a4a' }}>{a}</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- PAGE COMPONENT ---

const ProcessPage = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 900;

  useEffect(() => {
    // window.scrollTo(0, 0); // Managed by App.jsx
  }, []);

  const scrollToContact = () => {
    // Navigate to /book instead of scrolling
    window.location.href = '/book';
  };

  const phases = [
    {
      id: "01",
      title: "Strategy & Architecture",
      duration: "1-2 weeks",
      subtitle: "We figure out what you're building and why before touching design.",
      description: "Every project starts here. We audit what you already have, clarify your positioning and messaging, and map the customer journey from first touch to purchase. If your offer structure needs work, we sort that out too.\n\nThe goal is a clear blueprint that everything else builds on. No guessing. No \"let's figure it out as we go.\"",
      whatWeDo: [
        "Audit your existing brand, offers, and tech",
        "Clarify positioning and messaging",
        "Map the customer journey",
        "Define offer structure (if needed)",
        "Create the blueprint for the entire system"
      ],
      deliverables: [
        "Documented strategy and site architecture",
        "Messaging foundation",
        "System blueprint the rest of the project builds on"
      ],
      widget: <StrategyWidget />
    },
    {
      id: "02",
      title: "The Build",
      duration: "4-6 weeks",
      subtitle: "Design, development, copy, and automations built together by one team.",
      description: "This is where the system comes to life. We design the site, write the copy, build it out, and connect all the backend pieces: email sequences, automations, payment integrations, CRM. Everything built by the same team means nothing falls through the cracks.\n\nYou approve the design before we build. If you're not happy with how it looks, we keep iterating until you are.",
      whatWeDo: [
        "Brand identity or refinement of existing assets",
        "Website design (approved before development begins)",
        "Copywriting and messaging for all pages",
        "Website development",
        "Email sequences and automation setup",
        "CRM, payment, and tech stack integrations"
      ],
      deliverables: [
        "Complete website, designed and developed",
        "Sales pages and landing pages",
        "Email sequences connected and ready",
        "All systems integrated and tested"
      ],
      widget: <ConstructionWidget />
    },
    {
      id: "03",
      title: "Launch & Optimize",
      duration: "1-2 weeks",
      subtitle: "We go live, watch the data, and fix what needs fixing.",
      description: "Launch is the starting line. We handle final QA, get everything live, and set up analytics so you can see what's working. Then we monitor early performance and tune anything that needs attention.\n\nWe also train you on making simple updates yourself, so you're not dependent on us for every small text change.",
      whatWeDo: [
        "Final QA and testing",
        "Launch execution",
        "Analytics and tracking setup",
        "Monitor early performance",
        "Identify and fix conversion leaks",
        "Training on day-to-day updates"
      ],
      deliverables: [
        "Live, optimized website",
        "Analytics configured and tracking",
        "Training on how to manage simple updates",
        "Clear picture of what's working"
      ],
      widget: <OptimizationWidget mobileScale={0.85} />
    },
    {
      id: "04",
      title: "Ongoing Partnership",
      duration: "",
      subtitle: "We become your embedded tech team.",
      description: "Most clients stay on after launch. New landing pages, email sequences, automations, tech decisions, troubleshooting. One point of contact for everything technical, without hiring in-house.\n\nYour business evolves. Your system should too.",
      whatWeDo: [
        "Ongoing support and troubleshooting",
        "New landing pages, email sequences, automations as needed",
        "Tech stack decisions and recommendations",
        "Conversion optimization based on real data"
      ],
      deliverables: [
        "Tech partner on call",
        "Continuous iteration and improvement",
        "No more duct-taped fixes or random freelancers"
      ],
      widget: <EvolutionWidget mobileScale={0.85} />
    }
  ];

  const checklist = {
    forYou: [
      "You're ready to invest in a complete system, not just a pretty design",
      "You have an existing audience or a clear plan to drive traffic",
      "You want a partner, not a one-time transaction",
      "You're done duct-taping your tech together"
    ],
    notForYou: [
      "You're looking for the cheapest option",
      "You need something live in under two weeks",
      "You want to maintain complete technical control yourself"
    ]
  };

  // Scroll Progress Line Logic
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', paddingTop: 0, position: 'relative' }}>
      
      {/* Scroll Thread - Connecting Line */}
      <motion.div 
        style={{
          position: 'absolute',
          top: isMobile ? '400px' : '650px', // Adjusted for responsive header height
          bottom: '100px',
          left: '50%',
          width: '2px',
          background: 'rgba(0,0,0,0.05)',
          zIndex: 0,
          transform: 'translateX(-50%)',
          display: isMobile ? 'none' : 'block' // Hide on mobile as layout stacks differently
        }}
      >
        <motion.div 
          style={{
            width: '100%',
            height: '100%',
            background: '#0073E6',
            scaleY: scrollYProgress,
            transformOrigin: 'top'
          }}
        />
      </motion.div>

      {/* Header */}
      <section style={{
        padding: isMobile ? '10rem 4vw 4rem' : '16rem 4vw 12rem',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ 
            fontFamily: 'Instrument Serif', 
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)', 
            lineHeight: 1, 
            fontWeight: 400, 
            color: '#1a1a1a', 
            marginBottom: 0 // Standardized
          }}
        >
          Our Process
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            fontFamily: 'Inter', 
            fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', 
            lineHeight: 1.6, 
            color: '#4a4a4a', 
            maxWidth: '800px', 
            margin: '1rem auto 2rem auto' // Standardized margin
          }}
        >
          Most agencies hand you a design and wish you luck. We build the complete system: strategy, messaging, design, development, and automations, all connected and ready to convert.
        </motion.p>

        {/* Main CTA Button */}
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={scrollToContact}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
                backgroundColor: isButtonHovered ? '#333' : '#1a1a1a',
                color: '#fff',
                border: '1px solid #1a1a1a', // Added border
                padding: '12px 24px', // Updated padding to match nav
                borderRadius: '100px', // Updated radius to match nav
                fontFamily: 'Inter',
                fontSize: '0.9rem', // Updated font size
                textTransform: 'uppercase', // Added transform
                fontWeight: 500, // Added weight
                letterSpacing: '0.05em', // Added letter spacing
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                display: 'inline-block'
            }}
        >
            Get in Touch
        </motion.button>
        </div>
      </section>

      {/* Phases */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4vw' }}>
        {phases.map((phase, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={phase.id}
              id={`phase-${phase.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column-reverse' : (isEven ? 'row' : 'row-reverse'), // Stack on mobile, content bottom
                alignItems: 'center',
                gap: isMobile ? '4rem' : '6rem',
                marginBottom: index === phases.length - 1 ? 0 : (isMobile ? '4rem' : '12rem'),
                position: 'relative',
                zIndex: 1
              }}
            >
              
              {/* Text Side */}
              <div style={{ flex: 1, textAlign: 'left', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, color: '#0073E6' }}>PHASE {phase.id}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: '#888' }}>{phase.duration}</span>
                </div>
                <h2 style={{ fontFamily: 'Instrument Serif', fontSize: isMobile ? '2.5rem' : '3rem', color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.1 }}>{phase.title}</h2>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: 500, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.5 }}>{phase.subtitle}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: '3rem', whiteSpace: 'pre-line' }}>{phase.description}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <h4 style={{ fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>What we do</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {phase.whatWeDo.map((item, i) => (
                        <li key={i} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#555', display: 'flex', gap: '0.8rem', lineHeight: 1.4 }}>
                          <span style={{ color: '#0073E6', flexShrink: 0 }}>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>What you get</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {phase.deliverables.map((item, i) => (
                        <li key={i} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#555', display: 'flex', gap: '0.8rem', lineHeight: 1.4 }}>
                          <span style={{ color: '#0073E6', flexShrink: 0 }}>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Side */}
              <div style={{ flex: isMobile ? 'none' : 1, width: '100%', height: isMobile ? '400px' : '500px', position: 'relative' }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '24px', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  background: 'white', // The "frame" background
                }}>
                  {/* Widget Wrapper */}
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    {/* Clone the widget element to inject the scale prop */}
                    {React.cloneElement(phase.widget, { 
                      scale: windowWidth < 500 ? (phase.widget.props.mobileScale || 0.65) : 1 // Adjusted scale for mobile
                    })}
                  </div>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Is This Right For You + FAQ */}
      <section style={{ 
        padding: isMobile ? '4rem 4vw' : '8rem 4vw', 
        backgroundColor: '#ffffff', 
        color: '#1a1a1a', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Fit Check Section */}
          <div style={{ marginBottom: isMobile ? '6rem' : '12rem' }}>
            <h2 style={{ 
              fontFamily: 'Instrument Serif', 
              fontSize: isMobile ? '2.5rem' : '3rem', 
              textAlign: 'center', 
              marginBottom: '2rem', // Reduced from 4rem to 2rem
              color: '#1a1a1a' 
            }}>
              Is This Right For You?
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: isMobile ? '2rem' : '4rem' 
            }}>
              {/* For You */}
              <div style={{ 
                padding: isMobile ? '2rem' : '3rem', 
                backgroundColor: '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' // Subtle shadow
              }}>
                <h3 style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', marginBottom: '2rem', color: '#0073E6' }}>This is for you if:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {checklist.forYou.map((item, i) => (
                    <li key={i} style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#4b5563', marginBottom: '1.5rem', display: 'flex', gap: '1rem', lineHeight: 1.5 }}>
                      <span style={{ color: '#0073E6', fontWeight: 'bold' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Not For You */}
              <div style={{ 
                padding: isMobile ? '2rem' : '3rem', 
                backgroundColor: '#f9fafb', // Light gray background for contrast
                borderRadius: '16px', 
                border: '1px solid #f3f4f6'
              }}>
                <h3 style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', marginBottom: '2rem', color: '#6b7280' }}>This might not be the right fit if:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {checklist.notForYou.map((item, i) => (
                    <li key={i} style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#6b7280', marginBottom: '1.5rem', display: 'flex', gap: '1rem', lineHeight: 1.5 }}>
                      <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
             <h2 style={{ 
               fontFamily: 'Instrument Serif', 
               fontSize: isMobile ? 'clamp(2.5rem, 4vw, 4rem)' : '3rem', 
               fontWeight: 400, 
               color: '#1a1a1a', 
               marginBottom: '2rem', // Reduced to 2rem standard
               textAlign: 'center' 
             }}>
               Questions?
             </h2>
             <div>
               {faqData.map((item, i) => (
                 <AccordionItem key={i} q={item.q} a={item.a} index={i} />
               ))}
             </div>
          </div>

        </div>
      </section>

      <div id="contact" style={{ position: 'relative', zIndex: 1, backgroundColor: 'white' }}>
        <Contact />
      </div>
    </div>
  );
};

export default ProcessPage;