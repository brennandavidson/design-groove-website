'use client';

import React, { useState, useEffect } from 'react';

const logoFiles = [
  'ash-cooling-and-heating.png',
  'big-solve.png',
  'blake-atwood.png',
  'derrick-kinney.png',
  'dr-viviana-coles.png',
  'fisher-firm.png',
  'halcyon.png',
  'jefferson-fisher.png',
  'jule-salem.png',
  'lauren-hodge.png',
  'law-mother-asset-protection-estate-planning.png',
  'money-holistics.png',
  'slightwrks-digital-agency.png',
  'sr-brander.png',
  'the-angry-therapist.png',
  'the-law-mother-pamela-maass-garrett.png',
  'visto-ai.png',
  'wolfpack-security.png'
];

const Credibility = () => {
  const [isMobile, setIsMobile] = useState(false); // SSR-safe default

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile(); // Set initial value on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Duplicate the logos enough times to ensure smooth scrolling
  // We have 18 logos, which is a good amount. We probably just need 2 sets for the loop.
  const displayLogos = [...logoFiles, ...logoFiles];
  const gapSize = isMobile ? '1.5rem' : '5rem';
  const minWidth = isMobile ? '100px' : '160px';

  return (
    <section className="section-spacing" style={{ 
      backgroundColor: '#ffffff',
      width: '100%',
      display: 'flex', // Flex to center
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: isMobile ? '3rem' : '5rem' // Responsive top padding
    }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}> {/* Increased max-width to fit more logos */}
      <p style={{ 
        marginBottom: '1rem', // Tighter lockup with logos
        opacity: 0.5, 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        fontSize: '0.8rem',
        fontFamily: 'Inter',
        color: '#1a1a1a',
        textAlign: 'center' // Center text
      }}>
        Trusted by creators, startups, and service businesses
      </p>

        <div style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', // Fade both sides
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}>
          <div style={{
            display: 'flex',
            width: 'fit-content',
            gap: gapSize, // Space between the two sets of logos
            animation: 'scrollLogos 60s linear infinite' // Slower animation for more logos
          }}>
            {/* First Set */}
            <div style={{ display: 'flex', gap: gapSize, alignItems: 'center' }}>
              {logoFiles.map((file, index) => (
                <div key={`set1-${index}`} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minWidth: minWidth, // Ensure logos have space
                  height: '80px' // Fixed height container
                }}>
                  <img 
                    src={`/assets/client-logos/${file}`} 
                    alt={file.replace(/-/g, ' ').replace('.png', '')}
                    style={{
                      maxHeight: '40px', // Restrict height for balance
                      maxWidth: '160px', // Restrict width for balance
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) opacity(0.7)', // Match minimal aesthetic
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
                    onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.7)'}
                  />
                </div>
              ))}
            </div>

            {/* Duplicate Set for Loop */}
            <div style={{ display: 'flex', gap: gapSize, alignItems: 'center' }}>
              {logoFiles.map((file, index) => (
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
                    style={{
                      maxHeight: '40px', // Restrict height for balance
                      maxWidth: '160px', // Restrict width for balance
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
          100% { transform: translateX(calc(-50% - ${isMobile ? '1rem' : '2.5rem'})); } /* Move by 50% + half the gap */
        }
      `}</style>
    </section>
  );
};

export default Credibility;