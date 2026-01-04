import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [showHamburger, setShowHamburger] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

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
    const isMobile = viewportWidth < 900;

    // Mobile/Tablet Logic: Always show sticky white header with hamburger
    if (isMobile) {
      setShowHamburger(true);
      // Reset scroll state immediately to avoid any flash
      setHasScrolled(false);
    } else if (!isHomePage) {
      // Desktop - Not Home Page
      setShowHamburger(false); // Hide hamburger on other pages
      
      // Prevent flash: Always start as false on new page
      setHasScrolled(false);
      
      // Check scroll after a brief delay to allow page transitions/scroll-to-top to finish
      const timer = setTimeout(() => {
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
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      // Desktop - Home Page
      // Re-evaluate based on current scroll
      setShowHamburger(scrollY.get() > viewportHeight * 0.8);
    }
  }, [isHomePage, viewportHeight, viewportWidth, scrollY, location.pathname]); // Added viewportWidth

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isMobile = viewportWidth < 900;
    
    if (isMobile) {
        // Always show hamburger on mobile
        setShowHamburger(true);
        // On mobile, show border only when scrolled
        setHasScrolled(latest > 10);
    } else if (isHomePage) {
      // Desktop Home: Show hamburger when scrolled past 80% of the viewport (hero)
      const threshold = viewportHeight * 0.8;
      setShowHamburger(latest > threshold);
    } else {
      // Desktop Other: Hide hamburger, use full nav
      setShowHamburger(false);
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
      navigate('/work');
      return;
    }

    if (item === 'Services') {
      navigate('/services');
      return;
    }

    if (item === 'Contact') {
      navigate('/contact');
      return;
    }

    if (item === 'Our Process') {
      navigate('/process');
      return;
    }

    if (item === 'About') {
      navigate('/about');
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
      navigate(`/#${targetId}`);
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
            position: viewportWidth < 900 ? 'fixed' : 'absolute', // Fixed on mobile, Absolute on Desktop
            top: 0,
            left: 0,
            width: viewportWidth < 900 ? '100%' : '70vw', // Full width on mobile
            zIndex: viewportWidth < 900 ? 1000 : 9, // Higher Z on mobile
            backgroundColor: viewportWidth < 900 ? '#ffffff' : 'transparent', // White bg on mobile
            boxShadow: (viewportWidth < 900 && hasScrolled) ? '0 1px 0 0 #e5e5e5' : 'none', // Only border on scroll for mobile
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: viewportWidth < 900 ? '60px' : '120px', // Tighter height on mobile
            padding: '0 4vw',
            transition: 'box-shadow 0.3s ease' // Smooth border transition
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/assets/dg-logo-dark.svg" 
              alt="Design Groove" 
              style={{ 
                height: viewportWidth < 900 ? '26px' : '32px', // Slightly larger logo on mobile
                width: 'auto' 
              }} 
            />
          </div>

          {/* Desktop Links - Hidden on Mobile via CSS */}
          <div 
            className="desktop-only"
            style={{ 
              alignItems: 'center', 
              gap: viewportWidth < 1400 ? '2rem' : '4rem', // Dynamic gap for laptops
              display: 'flex' 
            }}
          >
            {['Work', 'Services', 'Our Process', 'About', 'Contact'].map((item) => (
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
                navigate('/book');
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
                marginLeft: viewportWidth < 1400 ? '1rem' : '2rem', // Reduced margin
                transition: 'all 0.3s ease'
              }}
            >
              Get in Touch
            </a>
          </div>
        </nav>
      ) : (
        /* 1.5 Standard Navigation - OTHER PAGES (Fixed/Sticky) */
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000, // On top of content
            backgroundColor: (hasScrolled && !isAtBottom) ? '#ffffff' : 'transparent',
            // Use box-shadow for the line to avoid border layout/color issues and prevent black flash
            boxShadow: (hasScrolled && !isAtBottom) ? '0 1px 0 0 #e5e5e5' : 'none',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            height: viewportWidth < 900 ? '64px' : '100px', // Responsive height
            padding: 0 // Padding moved to inner container
          }}
        >
          <div style={{
            maxWidth: '1800px',
            margin: '0 auto',
            padding: '0 2vw', // Matches Work grid padding
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src="/assets/dg-logo-dark.svg" alt="Design Groove" style={{ height: '32px', width: 'auto' }} />
            </div>

            {/* Desktop Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
              {['Work', 'Services', 'Our Process', 'About', 'Contact'].map((item) => (
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
                  navigate('/book');
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
                  marginLeft: '2rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Get in Touch
              </a>
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
          opacity: showHamburger ? 1 : 0,
          y: showHamburger ? 0 : -10,
          pointerEvents: showHamburger ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: viewportWidth < 900 ? '10px' : '2rem', // Center in 60px nav (10 top + 40 height + 10 bottom = 60)
          right: '4vw',
          zIndex: 1000,
          width: viewportWidth < 900 ? '40px' : '50px', // Larger button on mobile
          height: viewportWidth < 900 ? '40px' : '50px',
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
          width: viewportWidth < 900 ? '20px' : '24px', // Larger icon
          height: viewportWidth < 900 ? '14px' : '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <svg 
            width={viewportWidth < 900 ? "20" : "24"} 
            height={viewportWidth < 900 ? "14" : "16"} 
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
              fontSize: viewportWidth < 900 ? '2.5rem' : '4rem', // Smaller text on mobile
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;