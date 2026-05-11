import { useState, useEffect } from 'react';

export type BP = 'sm' | 'md' | 'lg' | 'xl';

function get(): BP {
  if (typeof window === 'undefined') return 'xl';
  const w = window.innerWidth;
  if (w <= 480) return 'sm';
  if (w <= 768) return 'md';
  if (w <= 1024) return 'lg';
  return 'xl';
}

export function useBreakpoint() {
  const [bp, setBp] = useState<BP>(get);

  useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    bp,
    isMobile:  bp === 'sm' || bp === 'md',
    isPhone:   bp === 'sm',
    isTablet:  bp === 'md',
    isDesktop: bp === 'lg' || bp === 'xl',
  };
}
