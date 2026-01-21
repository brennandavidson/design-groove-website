'use client';

import React, { useState, useEffect } from 'react';

// HVAC-specific logos - separate from main site's client-logos
const logoFiles = [
  'arizona-family-air.png',
  'trustworthy-air.png',
  'ash-heating-cooling.png',
  'top-tech-air.png',
  'air-assurance.png',
  'az-cooling-specialists.png'
];

const HVACCredibility = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gapSize = isMobile ? 32 : 60; // px values for calculation
  const logoHeight = isMobile ? '45px' : '50px';

  return (
    <section style={{
      backgroundColor: '#ffffff',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '0',
      paddingBottom: '3rem'
    }}>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div style={{
          position: 'relative',
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}>
          <div
            className="hvac-logo-track"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${gapSize}px`,
              width: 'max-content'
            }}
          >
            {/* Render logos 4 times for seamless infinite scroll */}
            {[...Array(4)].map((_, setIndex) => (
              logoFiles.map((file, index) => (
                <img
                  key={`logo-${setIndex}-${index}`}
                  src={`/assets/hvac-logos/${file}`}
                  alt="HVAC Client"
                  style={{
                    height: logoHeight,
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(100%) opacity(0.6)',
                    transition: 'filter 0.3s ease',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
                  onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.6)'}
                />
              ))
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hvac-logo-track {
          animation: hvacScroll 20s linear infinite;
        }
        @keyframes hvacScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default HVACCredibility;
