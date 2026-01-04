import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useAnimationControls } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615715757401-f30e7b27b912?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
];

const InfiniteSlider = () => {
  const controls = useAnimationControls();
  
  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        y: '-50%',
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };
    startAnimation();
  }, [controls]);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start({
      y: '-50%',
      transition: {
        duration: 20, // Resume with same duration logic (simplified)
        ease: "linear",
        repeat: Infinity,
        // Calculate remaining duration based on position for perfect resume (advanced)
        // For simple resume, restarting or continuing is tricky with basic framer motion loop
        // A simpler approach for "pause" is to set timeScale to 0 if using a motionValue, 
        // but with controls.stop() it just halts. 
        // Let's use a ref-based approach or simply let it jump back to loop start for MVP robustness,
        // or accept a simple stop/start. 
        // BETTER: Use CSS animation play-state for true pause.
      }
    });
  };

  // Using CSS for reliable pause-on-hover infinite scroll
  return (
    <div 
      className="infinite-slider-container"
      style={{ 
        height: '100%', 
        width: '100%', 
        overflow: 'hidden', 
        borderLeft: '1px solid #e5e5e5',
        position: 'relative'
      }}
    >
      <div 
        className="infinite-slider-track"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        {/* Double the images for seamless loop */}
        {[...images, ...images].map((src, index) => (
          <div 
            key={index}
            style={{ 
              width: '100%', 
              aspectRatio: '1/1', 
              borderBottom: '1px solid #e5e5e5',
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)',
              transition: 'filter 0.3s'
            }}
            className="slider-image"
          />
        ))}
      </div>
      <style jsx>{`
        .infinite-slider-track {
          animation: scrollUp 30s linear infinite;
        }
        .infinite-slider-container:hover .infinite-slider-track {
          animation-play-state: paused;
        }
        .slider-image:hover {
          filter: grayscale(0%) !important;
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

export default InfiniteSlider;

