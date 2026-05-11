import { useState, useEffect } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { CustomCursor } from '@/modules/shared/components/CustomCursor';
import { ThemeToggle } from '@/modules/shared/components/ThemeToggle';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedWork } from './components/FeaturedWork';
import { SelectedWork } from './components/SelectedWork';
import { Stack } from './components/Stack';
import { Now } from './components/Now';
import { Marquee } from './components/Marquee';
import { HomeContact } from './components/HomeContact';
import { EasterEggs } from './components/EasterEggs';

function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="ap-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 56px' : '24px 56px',
      transition: 'all .25s ease',
      background: scrolled ? 'color-mix(in srgb, var(--ap-bg) 78%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${PALETTE.hairline}` : '1px solid transparent',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.06em', color: PALETTE.fgSoft,
    }}>
      <a href="#top" style={{ display: 'flex', gap: 12, alignItems: 'center', color: PALETTE.fg }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: PALETTE.good, boxShadow: `0 0 12px ${PALETTE.good}88`, animation: 'apPulse 2.4s ease infinite' }} />
        <span>AP</span>
        <span style={{ color: PALETTE.fgFaint }}>—</span>
        <span style={{ color: PALETTE.fgMute }}>PORTFOLIO / 2026</span>
      </a>
      <div className="ap-nav-links" style={{ display: 'flex', gap: 28 }}>
        <a href="#work" className="ap-link">WORK</a>
        <a href="#about" className="ap-link">ABOUT</a>
        <a href="#stack" className="ap-link">STACK</a>
        <a href="#selected" className="ap-link">NOW</a>
        <a href="/listening" className="ap-link">LISTENING</a>
        <a href="/contact" className="ap-link" style={{ color: PALETTE.fg }}>CONTACT ↗</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export function HomePage() {
  return (
    <>
      <CustomCursor />
      <EasterEggs />
      <TopNav />
      <Hero />
      <About />
      <Marquee />
      <FeaturedWork />
      <SelectedWork />
      <Stack />
      <Now />
      <HomeContact />
    </>
  );
}
