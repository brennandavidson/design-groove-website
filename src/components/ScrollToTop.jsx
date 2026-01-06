import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const lenis = useLenis();

  useEffect(() => {
    // 'POP' means a refresh or back/forward navigation.
    // In these cases, we want to let the browser restore the scroll position (handled by scrollRestoration='auto').
    if (navType === 'POP') {
      return;
    }
    
    // 'PUSH' or 'REPLACE' means a new navigation event (like clicking a link).
    const handleScroll = () => {
      // Prioritize Lenis if active
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      
      // Fallback/Ensure window scroll is also set (essential for root: true)
      window.scrollTo(0, 0);
    };

    // Execute immediately
    handleScroll();

    // And again after a tick to ensure layout is settled and overrides any browser persistence
    const rafId = requestAnimationFrame(() => {
        handleScroll();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, navType, lenis]);

  return null;
};

export default ScrollToTop;