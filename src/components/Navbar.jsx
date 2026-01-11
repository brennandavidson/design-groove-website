'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [showHamburger, setShowHamburger] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // SSR-safe defaults - will be updated in useEffect
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const isBookPage = pathname === '/book';

  // Control visibility of the absolute hero navbar
  const [isHeroNavVisible, setIsHeroNavVisible] = useState(true); // SSR-safe default

  useEffect(() => {
    // Scroll handler to toggle visibility based on position
    const handleScroll = () => {
      // Only relevant on home page
      if (pathname === '/') {
        // Show if we are in the first viewport (Hero)
        setIsHeroNavVisible(window.scrollY < window.innerHeight);
      }
    };

    // CRITICAL: Delay initial check by 50ms to allow browser scroll restoration
    // This prevents showing the nav when refreshing at the bottom (where scrollY is momentarily 0)
    const timer = setTimeout(handleScroll, 50);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
    const handleResize = () => {
        setViewportHeight(window.innerHeight);
        setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update hamburger visibility based on page and scroll
  useEffect(() => {
    // Check for mobile/tablet breakpoint
    const isMobile = viewportWidth <= 900;

    // Mobile/Tablet Logic: Always show sticky white header with hamburger
    if (isMobile) {
      setShowHamburger(true);
      // Reset scroll state immediately to avoid any flash - but respect current scroll
      setHasScrolled(window.scrollY > 10);
      setIsAtTop(window.scrollY < 50);
    } else if (!isHomePage) {
      // Desktop - Not Home Page
      setShowHamburger(false); // Hide hamburger on other pages
      
      // Update based on CURRENT scroll immediately (no timeout if possible)
      const currentScroll = window.scrollY;
      setHasScrolled(currentScroll > 10);
      
      // Check if at bottom logic...
      const checkBottom = () => {
          const layoutHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
          // Use a threshold, e.g. 50px
          if (layoutHeight > windowHeight) { // Ensure page is scrollable
             setIsAtBottom(layoutHeight - (currentScroll + windowHeight) < 50);
          } else {
             setIsAtBottom(true); // Short page, technically at bottom
          }
      };
      checkBottom();
    } else {
      // Desktop - Home Page
      // Re-evaluate based on current scroll
      const threshold = viewportHeight * 0.8;
      const currentScroll = window.scrollY || scrollY.get(); // Fallback to window if scrollY not ready
      setShowHamburger(currentScroll > threshold);
    }
  }, [isHomePage, viewportHeight, viewportWidth, scrollY, pathname]); // Added viewportWidth

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isMobile = viewportWidth <= 900;
    
    if (isMobile) {
        // Always show hamburger on mobile
        setShowHamburger(true);
        // On mobile, show border only when scrolled
        setHasScrolled(latest > 10);
    } else if (isHomePage) {
      // Desktop Home: Show hamburger when scrolled past 80% of the viewport (hero)
      const threshold = viewportHeight * 0.8;
      setShowHamburger(latest > threshold);
      setIsAtTop(latest < 50);
    } else {
      // Desktop Other: Hide hamburger, use full nav
      setShowHamburger(false);
      setIsAtTop(latest < 50);
      // Update hasScrolled for sticky border effect
      setHasScrolled(latest > 10);
      
      // Check if at bottom
      const layoutHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsAtBottom(layoutHeight - (latest + windowHeight) < 50);
    }
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (item) => {
    setIsMenuOpen(false);
    
    if (item === 'Work') {
      router.push('/work');
      return;
    }

    if (item === 'Services') {
      router.push('/services');
      return;
    }

    if (item === 'Contact') {
      router.push('/contact');
      return;
    }

    if (item === 'Our Process') {
      router.push('/process');
      return;
    }

    if (item === 'About') {
      router.push('/about');
      return;
    }

    const targetId = item.toLowerCase().replace(' ', '-');
    
    if (isHomePage) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home with hash
      router.push(`/#${targetId}`);
      // Note: We might need a helper in Home to handle scroll on mount if hash is present
      // But standard browser behavior often works with hashes if handled correctly
      // Alternatively, use state
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* 1. Original Hero Navigation - ONLY ON HOME PAGE */}
      {isHomePage ? (
        <nav
          style={{
            position: viewportWidth <= 900 ? 'fixed' : 'absolute', // Fixed on mobile, Absolute on Desktop
            top: 0,
            left: 0,
            width: viewportWidth <= 900 ? '100%' : '70vw', // Full width on mobile
            zIndex: viewportWidth <= 900 ? 1000 : 9, // Higher Z on mobile
            backgroundColor: viewportWidth <= 900 ? '#ffffff' : 'transparent', // White bg on mobile
            boxShadow: (viewportWidth <= 900 && hasScrolled) ? '0 1px 0 0 #e5e5e5' : 'none', // Only border on scroll for mobile
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: viewportWidth <= 900 ? '60px' : '120px', // Tighter height on mobile
            padding: '0 4vw',
            transition: 'box-shadow 0.3s ease, opacity 0.2s ease, visibility 0.2s ease', // Added opacity/vis transition
            // Hide on Desktop if scrolled down (prevents flash). Always visible on Mobile.
            visibility: (viewportWidth <= 900 || isHeroNavVisible) ? 'visible' : 'hidden',
            opacity: (viewportWidth <= 900 || isHeroNavVisible) ? 1 : 0
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/assets/dg-logo-dark.svg" 
              alt="Design Groove" 
              style={{ 
                height: viewportWidth <= 900 ? '26px' : '32px', // Slightly larger logo on mobile
                width: 'auto' 
              }} 
            />
          </div>

          {/* Desktop Links - Hidden on Mobile via CSS */}
          <div 
            className="desktop-only"
            style={{ 
              alignItems: 'center', 
              gap: viewportWidth < 1800 ? '1rem' : '4rem', // CHANGED: Apply tight gap up to 1800px
              display: 'flex' 
            }}
          >
            {viewportWidth >= 1800 && ['Work', 'Services', 'Our Process', 'About', 'Contact'].map((item) => (
              <a 
                key={item}
                href={
                  item === 'Work' ? '/work' : 
                  item === 'Services' ? '/services' : 
                  item === 'Our Process' ? '/process' :
                  item === 'Contact' ? '/contact' : 
                  `#${item.toLowerCase().replace(' ', '-')}`
                }
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  handleNavigation(item);
                }}
                style={{ 
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                {item}
              </a>
            ))}
            
            <a 
              href="/book"
              onClick={(e) => {
                e.preventDefault();
                router.push('/book');
              }}
              style={{ 
                padding: '12px 24px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #1a1a1a',
                borderRadius: '100px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                fontFamily: 'Inter',
                fontWeight: 500,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                color: '#ffffff',
                textDecoration: 'none',
                marginLeft: viewportWidth < 1800 ? '0' : '2rem', // Use gap for spacing when < 1800
                transition: 'all 0.3s ease'
              }}
            >
              Get in Touch
            </a>

            {/* Inline Hamburger for Compact Desktop (900-1800px) */}
            {viewportWidth > 900 && viewportWidth < 1800 && (
              <button
                onClick={toggleMenu}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: 0, // CHANGED: Removed explicit margin to rely on gap
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isAtTop ? 1 : 0, // Only show at very top
                  pointerEvents: isAtTop ? 'auto' : 'none',
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  border: '1px solid #e5e5e5', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#ffffff'
                }}>
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect width="24" height="2" rx="1" fill="#1a1a1a"/>
                     <rect y="7" width="24" height="2" rx="1" fill="#1a1a1a"/>
                     <rect y="14" width="24" height="2" rx="1" fill="#1a1a1a"/>
                  </svg>
                </div>
              </button>
            )}
          </div>
        </nav>
      ) : (
        /* 1.5 Standard Navigation - OTHER PAGES (Fixed/Sticky) */
        <nav
          style={{
            position: isBookPage ? 'relative' : 'fixed',
            top: isBookPage ? 'auto' : 0,
            left: isBookPage ? 'auto' : 0,
            width: '100%',
            zIndex: 1000, // On top of content
            backgroundColor: isBookPage ? '#ffffff' : (viewportWidth <= 900 ? '#ffffff' : ((hasScrolled && !isAtBottom) ? '#ffffff' : 'transparent')),
            // Use box-shadow for the line to avoid border layout/color issues and prevent black flash
            boxShadow: isBookPage ? 'none' : ((viewportWidth <= 900) ? (hasScrolled ? '0 1px 0 0 #e5e5e5' : 'none') : ((hasScrolled && !isAtBottom) ? '0 1px 0 0 #e5e5e5' : 'none')),
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            height: viewportWidth <= 900 ? '60px' : '100px', // Match Home mobile height (60px)
            padding: 0 // Padding moved to inner container
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            padding: viewportWidth <= 900 ? '0 4vw' : '0 4vw', // Always 4vw to match section-spacing
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1800px',
              height: '100%',
              padding: 0, // No extra padding on inner container
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push('/')}>
              <img 
                src="/assets/dg-logo-dark.svg" 
                alt="Design Groove" 
                style={{ 
                  height: viewportWidth <= 900 ? '26px' : '32px', // Match Home mobile logo size (26px)
                  width: 'auto' 
                }} 
              />
            </div>

            {/* Desktop Links */}
            <div className="desktop-only" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: viewportWidth < 1220 ? '1rem' : '4rem' // Reduced gap for compact mode (CTA + Hamburger)
            }}>
              {/* Show Desktop Links for widths >= 1220px */}
              {viewportWidth >= 1220 && ['Work', 'Services', 'Our Process', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={
                    item === 'Work' ? '/work' : 
                    item === 'Services' ? '/services' : 
                    item === 'Contact' ? '/contact' :
                    `#${item.toLowerCase().replace(' ', '-')}`
                  } // Direct hash link for other pages
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item);
                  }}
                  style={{ 
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  {item}
                </a>
              ))}
              
              <a 
                href="/book"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/book');
                }}
                style={{ 
                  padding: '12px 24px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #1a1a1a',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  color: '#ffffff',
                  textDecoration: 'none',
                  marginLeft: viewportWidth < 1220 ? '0' : '2rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Get in Touch
              </a>

               {/* Inline Hamburger for Compact Desktop (900-1220px) */}
               {viewportWidth > 900 && viewportWidth < 1220 && (
                <button
                  onClick={toggleMenu}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: 0, // Removed margin, relying on gap
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Always visible here as it replaces full nav
                    opacity: 1, 
                    pointerEvents: 'auto',
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    border: '1px solid #e5e5e5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#ffffff'
                  }}>
                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <rect width="24" height="2" rx="1" fill="#1a1a1a"/>
                       <rect y="7" width="24" height="2" rx="1" fill="#1a1a1a"/>
                       <rect y="14" width="24" height="2" rx="1" fill="#1a1a1a"/>
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
          </div>
        </nav>
      )}

      {/* 2. Sticky Hamburger Button */}
      <style>{`
        .hamburger-button {
          background-color: #ffffff;
          border-color: #e5e5e5;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .hamburger-button rect {
          fill: #1a1a1a;
          transition: fill 0.3s ease;
        }
        @media (hover: hover) {
          .hamburger-button:hover {
            background-color: #1a1a1a !important;
            border-color: #1a1a1a !important;
          }
          .hamburger-button:hover rect {
            fill: #ffffff !important;
          }
        }
      `}</style>
      <motion.button
        className="hamburger-button"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: (showHamburger || isMenuOpen) ? 1 : 0,
          y: (showHamburger || isMenuOpen) ? 0 : -10,
          pointerEvents: (showHamburger || isMenuOpen) ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: viewportWidth <= 900 ? '10px' : '2rem', // Center in 60px nav (10 top + 40 height + 10 bottom = 60)
          right: (isMenuOpen) ? '4vw' : // Menu Open: Top Right
                 (viewportWidth > 900 && viewportWidth < 1800 && isAtTop) ? '34vw' : // Compact Desktop + At Top: Inline (34vw)
                 '4vw', // All other cases (Standard Desktop, Mobile, Scrolled): Top Right
          zIndex: 1000,
          width: viewportWidth <= 900 ? '40px' : '50px', // Larger button on mobile
          height: viewportWidth <= 900 ? '40px' : '50px',
          borderRadius: '50%',
          borderWidth: '1px',
          borderStyle: 'solid',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: 'none',
          overflow: 'visible',
          outline: 'none'
        }}
      >
        {/* Hamburger Icon Container - SVG for pixel-perfect rendering */}
        <div style={{ 
          width: viewportWidth <= 900 ? '20px' : '24px', // Larger icon
          height: viewportWidth <= 900 ? '14px' : '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <svg 
            width={viewportWidth <= 900 ? "20" : "24"} 
            height={viewportWidth <= 900 ? "14" : "16"} 
            viewBox="0 0 24 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ overflow: 'visible', shapeRendering: 'geometricPrecision' }}
          >
            {/* Top Line */}
            <motion.rect 
              width="24" height="2" rx="1"
              initial={{ y: 0, rotate: 0 }}
              animate={{ 
                y: isMenuOpen ? 7 : 0,
                rotate: isMenuOpen ? 45 : 0
              }}
              style={{ originX: '12px', originY: '1px' }} // Pivot around center of the line
            />
            {/* Middle Line */}
            <motion.rect 
              y="7" width="24" height="2" rx="1"
              initial={{ opacity: 1 }}
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            {/* Bottom Line */}
            <motion.rect 
              y="14" width="24" height="2" rx="1"
              initial={{ y: 0, rotate: 0 }}
              animate={{ 
                y: isMenuOpen ? -7 : 0,
                rotate: isMenuOpen ? -45 : 0
              }}
              style={{ originX: '12px', originY: '1px' }} // Pivot around center of the line
            />
          </svg>
        </div>
      </motion.button>

      {/* 3. Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#ffffff',
              zIndex: 999, // Just below the hamburger button
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem' // Reduced gap for tighter layout
            }}
          >
            {['Work', 'Services', 'Our Process', 'About', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={
                  item === 'Work' ? '/work' : 
                  item === 'Services' ? '/services' : 
                  item === 'Contact' ? '/contact' :
                  `#${item.toLowerCase().replace(' ', '-')}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item);
                }}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.05 + index * 0.08,
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  },
                  hover: { 
                    scale: 1.05,
                    transition: { 
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0 // Crucial: Remove the stagger delay for hover
                    }
                  }
                }}
            style={{
              fontSize: viewportWidth <= 900 ? '2.5rem' : '4rem', // Smaller text on mobile
              fontFamily: 'Instrument Serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a1a',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'block', // Use block for better transform stability
              backfaceVisibility: 'hidden', // Force GPU
              WebkitFontSmoothing: 'antialiased',
              transform: 'translateZ(0)'
            }}
              >
                {item}
              </motion.a>
            ))}
            
            <motion.a
                href="/book"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  router.push('/book');
                }}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.05 + 5 * 0.08,
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  },
                  hover: { 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }
                }}
                style={{ 
                  marginTop: '1rem',
                  padding: '16px 32px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #1a1a1a',
                  borderRadius: '100px',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;