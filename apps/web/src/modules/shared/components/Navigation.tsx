import { useState, useEffect } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="ap-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '24px 56px',
          background: 'color-mix(in srgb, var(--ap-bg) 78%, transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${PALETTE.hairline}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.06em',
          color: PALETTE.fgSoft,
        }}
      >
        <a href="/" style={{ display: 'flex', gap: 12, alignItems: 'center', color: PALETTE.fg, minHeight: 44 }}>
          <span style={{ fontSize: 14 }}>←</span>
          <span>BACK / ASHISH PANDEY</span>
        </a>
        <div className="ap-nav-links" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="/#work" className="ap-link">WORK</a>
          <a href="/#stack" className="ap-link">STACK</a>
          <a href="/listening" className="ap-link" style={{ color: PALETTE.accent }}>LISTENING</a>
          <a href="/contact" className="ap-link" style={{ color: PALETTE.fg }}>CONTACT ↗</a>
          <ThemeToggle />
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="ap-nav-hamburger-theme" style={{ display: 'none' }}><ThemeToggle /></span>
          <button className="ap-nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Open navigation">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`ap-mobile-nav${menuOpen ? ' open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24, borderBottom: `1px solid ${PALETTE.hairline}`, marginBottom: 8 }}>
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>AP / 2026</span>
          <button onClick={close} style={{ background: 'transparent', border: `1px solid ${PALETTE.hairline}`, color: PALETTE.fg, width: 44, height: 44, cursor: 'pointer', fontFamily: FONTS.mono, fontSize: 16 }}>✕</button>
        </div>
        {[
          { href: '/',          label: '← Home' },
          { href: '/#work',     label: 'Work' },
          { href: '/#stack',    label: 'Stack' },
          { href: '/listening', label: 'Listening' },
          { href: '/contact',   label: 'Contact ↗' },
        ].map(({ href, label }) => (
          <a key={href} href={href} onClick={close}
            style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(28px, 8vw, 40px)', color: PALETTE.fg, letterSpacing: '-0.02em' }}>
            {label}
            <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: PALETTE.accent }}>→</span>
          </a>
        ))}
      </div>
    </>
  );
}
