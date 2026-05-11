import { PALETTE, FONTS } from '@tokens';
import type { MoodItem } from '../types';

const MOODS: MoodItem[] = [
  { key: 'DEEP WORK',     value: 'Lo-fi · Ambient',   pct: 42 },
  { key: 'LONG SESSIONS', value: 'Hindi indie',        pct: 26 },
  { key: 'BUILD GREEN',   value: 'Bollywood OSTs',     pct: 20 },
  { key: 'LATE NIGHT',    value: 'Arijit · Pritam',    pct: 12 },
];

function MoodCell({ item, last }: { item: MoodItem; last: boolean }) {
  return (
    <div style={{
      padding: 28,
      borderRight: last ? 'none' : `1px solid ${PALETTE.hairline}`,
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.16em',
        color: PALETTE.fgMute, marginBottom: 12,
      }}>
        {item.key}
      </div>
      <div style={{
        fontFamily: FONTS.serif, fontWeight: 300, fontSize: 24,
        letterSpacing: '-0.015em', color: PALETTE.fg, marginBottom: 18,
      }}>
        {item.value}
      </div>
      <div style={{ height: 2, background: PALETTE.hairline, position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${item.pct}%`, background: PALETTE.accent,
        }} />
      </div>
      <div style={{ marginTop: 8, fontFamily: FONTS.mono, fontSize: 11, color: PALETTE.accent }}>
        {item.pct}%
      </div>
    </div>
  );
}

export function MoodMap() {
  return (
    <div
      className="ap-mood-grid"
      style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: `1px solid ${PALETTE.hairline}`,
        borderBottom: `1px solid ${PALETTE.hairline}`,
      }}
    >
      {MOODS.map((item, i) => (
        <MoodCell key={item.key} item={item} last={i === MOODS.length - 1} />
      ))}
    </div>
  );
}
