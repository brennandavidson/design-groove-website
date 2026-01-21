'use client';

import React, { useState, useEffect } from 'react';

const logoFiles = [
  'ash-cooling-and-heating.png',
  'group-20.png',
  'image-6.png',
  'image-7.png',
  'image-8.png',
  'image-9.png',
  'image-10.png',
  'mask-group.png'
];

const HVACCredibility = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Duplicate the logos enough times to ensure smooth scrolling
  const displayLogos = [...logoFiles, ...logoFiles, ...logoFiles];
  const gapSize = isMobile ? '1.5rem' : '3rem';
  const minWidth = isMobile ? '100px' : '140px';

  return (
    <section className="section-spacing" style={{ 
      backgroundColor: '#ffffff',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '0', 
      paddingBottom: '4rem'
    }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}>
          <div style={{
            display: 'flex',
            width: 'fit-content',
            // gap: gapSize, // REMOVED parent gap to fix loop math
            animation: 'scrollLogos 40s linear infinite'
          }}>
            {/* First Set */}
            <div style={{ display: 'flex', gap: gapSize, alignItems: 'center', paddingRight: gapSize }}>
              {displayLogos.map((file, index) => (
                <div key={`set1-${index}`} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minWidth: minWidth,
                  height: '80px'
                }}>
                  <img 
                    src={`/assets/client-logos/${file}`} 
                    alt="Client Logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.display = 'none'; // Hide parent to prevent gaps
                    }}
                    style={{
                      maxHeight: '50px',
                      maxWidth: '160px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) opacity(0.8)',
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
                    onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.8)'}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: gapSize, alignItems: 'center', paddingRight: gapSize }}>
              {displayLogos.map((file, index) => (
                <div key={`set2-${index}`} style={{  
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minWidth: minWidth,
                  height: '80px'
                }}>
                  <img 
                    src={`/assets/client-logos/${file}`} 
                    alt="Client Logo"
                     onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    style={{
                      maxHeight: '50px',
                      maxWidth: '160px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) opacity(0.8)',
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
                    onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.8)'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default HVACCredibility;
