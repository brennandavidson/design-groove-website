'use client';

import React, { useState, useEffect } from 'react';

const logoFiles = [
  'top-tech-air.png',
  'trustworthy-services.png',
  'air-assurance.png',
  'az-cooling-specialists.png',
  'ash-cooling-and-heating.png', // This one exists
  'arizona-family-air.png'
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
  // With only 6 logos, we need more duplications to fill the width and scroll smoothly
  const displayLogos = [...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles];
  const gapSize = isMobile ? '1.5rem' : '5rem';
  const minWidth = isMobile ? '100px' : '160px';

  return (
    <section className="section-spacing" style={{ 
      backgroundColor: '#ffffff',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '0', // Reduced top padding since it's inside the layout
      paddingBottom: '4rem'
    }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        {/* Removed the "Trusted by..." text as it's handled in the parent section header */}

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
            gap: gapSize,
            animation: 'scrollLogos 30s linear infinite' // Faster animation for fewer logos? Or keep consistent.
          }}>
            {/* First Set */}
            <div style={{ display: 'flex', gap: gapSize, alignItems: 'center' }}>
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
                    alt={file.replace(/-/g, ' ').replace('.png', '')}
                    onError={(e) => {
                      // Fallback for missing images to show text so user knows to upload
                      e.target.style.display = 'none';
                      e.target.parentElement.innerText = file.replace('.png', '');
                      e.target.parentElement.style.color = '#ccc';
                      e.target.parentElement.style.fontSize = '0.8rem';
                      e.target.parentElement.style.fontWeight = '600';
                    }}
                    style={{
                      maxHeight: '40px',
                      maxWidth: '160px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) opacity(0.7)',
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
                    onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.7)'}
                  />
                </div>
              ))}
            </div>
            {/* Second Set for Loop - Not needed if we duplicated enough in displayLogos? 
                Actually the CSS animation transforms by -50%. So we need two identical children containers usually.
                Let's stick to the Credibility.jsx pattern exactly.
            */}
             <div style={{ display: 'flex', gap: gapSize, alignItems: 'center' }}>
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
                    alt={file.replace(/-/g, ' ').replace('.png', '')}
                     onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerText = file.replace('.png', '');
                      e.target.parentElement.style.color = '#ccc';
                      e.target.parentElement.style.fontSize = '0.8rem';
                      e.target.parentElement.style.fontWeight = '600';
                    }}
                    style={{
                      maxHeight: '40px',
                      maxWidth: '160px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) opacity(0.7)',
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
                    onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.7)'}
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
          100% { transform: translateX(calc(-50% - ${isMobile ? '0.75rem' : '2.5rem'})); }
        }
      `}</style>
    </section>
  );
};

export default HVACCredibility;
