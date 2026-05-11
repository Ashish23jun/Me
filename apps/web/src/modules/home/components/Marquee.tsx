import { PALETTE, FONTS } from '@tokens';

const ITEMS = ['Fullstack', 'AI Engineer', 'Founding', 'Builder', 'Shipping at scale', 'Available May 2026'];

export function Marquee() {
  return (
    <div style={{ borderTop: `1px solid ${PALETTE.hairline}`, borderBottom: `1px solid ${PALETTE.hairline}`, padding: '24px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-block', animation: 'apMarquee 40s linear infinite', whiteSpace: 'nowrap' }}>
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 22, marginRight: 22, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 38, letterSpacing: '-0.015em', color: PALETTE.fg }}>
            {it}
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: PALETTE.accent }} />
          </span>
        ))}
      </div>
    </div>
  );
}
