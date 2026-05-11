import { useState, useEffect } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { ThemeToggle } from './ThemeToggle';

interface CaseNavProps {
  current: string;
}

export function CaseNav({ current }: CaseNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 56px' : '24px 56px',
      transition: 'all .25s ease',
      background: scrolled ? 'color-mix(in srgb, var(--ap-bg) 78%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${PALETTE.hairline}` : '1px solid transparent',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.06em',
      color: PALETTE.fgSoft,
    }}>
      <a href="/" style={{ display: 'flex', gap: 12, alignItems: 'center', color: PALETTE.fg }}>
        <span style={{ fontSize: 14 }}>←</span>
        <span>BACK / ASHISH PANDEY</span>
      </a>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <span style={{ color: PALETTE.fgMute }}>CASE</span>
        <span style={{ color: PALETTE.accent }}>{current.toUpperCase()}</span>
        <a href="/#work" className="ap-link">ALL WORK ↗</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
