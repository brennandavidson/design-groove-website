'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
  const pathname = usePathname();
  const lenis = useLenis();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Skip on initial mount (same pathname)
    if (prevPathname.current === pathname) {
      prevPathname.current = pathname;
      return;
    }

    prevPathname.current = pathname;

    // New navigation event (like clicking a link).
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
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;