import { PALETTE, FONTS } from '@tokens';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
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
      <a href="/" style={{ display: 'flex', gap: 12, alignItems: 'center', color: PALETTE.fg }}>
        <span style={{ fontSize: 14 }}>←</span>
        <span>BACK / ASHISH PANDEY</span>
      </a>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <a href="/#work" className="ap-link">WORK</a>
        <a href="/#stack" className="ap-link">STACK</a>
        <a href="/listening" className="ap-link" style={{ color: PALETTE.accent }}>LISTENING</a>
        <a href="/contact" className="ap-link" style={{ color: PALETTE.fg }}>CONTACT ↗</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
