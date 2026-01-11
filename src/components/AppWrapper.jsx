'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './Navbar';
import Preloader from './Preloader';

// ScrollToTop component for Next.js
const ScrollToTop = () => {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Scroll to top on route change
    const handleScroll = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    };

    handleScroll();

    const rafId = requestAnimationFrame(() => {
      handleScroll();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, lenis]);

  return null;
};

export default function AppWrapper({ children }) {
  // Lazy initialization to prevent flashes and handle "first touch" logic correctly
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasVisited');
    }
    return true;
  });

  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('hasVisited');
    }
    return false;
  });

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 900);

    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', checkMobile);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Clone children with isLoaded prop for Home page
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isLoaded });
    }
    return child;
  });

  const content = (
    <div className="App">
      <ScrollToTop />
      {showPreloader && <Preloader onComplete={() => setIsLoaded(true)} />}
      <Navbar />
      {childrenWithProps}
    </div>
  );

  // Don't render Lenis on server or before mount
  if (!mounted) {
    return (
      <div className="App">
        <Navbar />
        {children}
      </div>
    );
  }

  return !isMobile ? (
    <ReactLenis root options={{
      lerp: 0.1,
      duration: 1.5,
      smoothTouch: false,
    }}>
      {content}
    </ReactLenis>
  ) : (
    content
  );
}
