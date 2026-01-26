'use client';

import React, { useState, useEffect } from 'react';

// HVAC-specific logos - separate from main site's client-logos
const logoFiles = [
  'arizona-family-air',
  'trustworthy-air',
  'ash-heating-cooling',
  'top-tech-air',
  'air-assurance',
  'az-cooling-specialists'
];

const HVACCredibility = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gapSize = isMobile ? 48 : 100;
  const logoHeight = isMobile ? '45px' : '50px';

  const LogoSet = () => (
    <>
      {logoFiles.map((file, index) => (
        <picture key={index}>
          <source srcSet={`/assets/hvac-logos/${file}.webp`} type="image/webp" />
          <img
            src={`/assets/hvac-logos/${file}.png`}
            alt="HVAC Client"
            width="100"
            height="50"
            loading="lazy"
            decoding="async"
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
        </picture>
      ))}
    </>
  );

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <div style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
      }}>
        <div className="hvac-logo-track" style={{ display: 'flex', width: 'max-content' }}>
          {/* Two identical sets for seamless loop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: `${gapSize}px`, paddingRight: `${gapSize}px` }}>
            <LogoSet />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: `${gapSize}px`, paddingRight: `${gapSize}px` }}>
            <LogoSet />
          </div>
        </div>
      </div>

      <style>{`
        .hvac-logo-track {
          animation: hvacScroll 25s linear infinite;
        }
        @keyframes hvacScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default HVACCredibility;
