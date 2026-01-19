import { useEffect, useState } from 'react';

/**
 * SSR-safe "mobile overlay" breakpoint detector.
 *
 * - Uses matchMedia("(max-width: 767px)") to match Tailwind's <md breakpoint.
 * - Defaults to false until mounted to avoid hydration mismatch.
 */
export function useIsMobileOverlay(): boolean {
  const [isMobileOverlay, setIsMobileOverlay] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 767px)');

    const update = () => setIsMobileOverlay(mql.matches);
    update();

    // Safari < 14 uses addListener/removeListener
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }

    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  return isMobileOverlay;
}

