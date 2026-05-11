import { PALETTE, FONTS } from '@tokens';

interface PillProps {
  children: React.ReactNode;
  accent?: boolean;
  pulse?: boolean;
}

export function Pill({ children, accent, pulse }: PillProps) {
  return (
    <span style={{
      fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em',
      padding: '3px 8px', border: `1px solid ${accent ? PALETTE.accent + '66' : PALETTE.hairline}`,
      borderRadius: 2, color: accent ? PALETTE.accent : PALETTE.fgSoft,
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      {pulse && (
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: accent ? PALETTE.accent : PALETTE.good,
          boxShadow: `0 0 8px ${accent ? PALETTE.accent : PALETTE.good}`,
          animation: 'apBlink 1.4s ease infinite',
        }} />
      )}
      {children}
    </span>
  );
}
