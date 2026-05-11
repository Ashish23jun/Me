import { PALETTE, FONTS } from '@tokens';
import { useTopTracks } from '../hooks/useTopTracks';
import type { TopTrack } from '../types';

function TrackRow({ t }: { t: TopTrack }) {
  return (
    <a
      href={t.url || undefined}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 40px 1fr auto',
        gap: 20,
        alignItems: 'center',
        padding: '14px 0',
        borderTop: `1px solid ${PALETTE.hairline}`,
        textDecoration: 'none',
        transition: 'padding-left .2s',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = '8px'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = '0'}
    >
      {/* Rank */}
      <div style={{
        fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em',
        color: t.rank <= 3 ? PALETTE.accent : PALETTE.fgFaint,
        textAlign: 'right',
      }}>
        {String(t.rank).padStart(2, '0')}
      </div>

      {/* Album art */}
      {t.albumArt ? (
        <img src={t.albumArt} alt={t.album} style={{ width: 40, height: 40, objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{
          width: 40, height: 40, flexShrink: 0,
          background: `linear-gradient(135deg, ${PALETTE.accent}33, ${PALETTE.hairline})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 16, opacity: 0.5 }}>♪</span>
        </div>
      )}

      {/* Title + artist */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: FONTS.serif, fontWeight: 300, fontSize: 18,
          color: PALETTE.fg, letterSpacing: '-0.01em',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{t.title}</div>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.08em',
          color: PALETTE.fgMute, marginTop: 3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{t.artist}</div>
      </div>

      {/* Duration */}
      <div style={{
        fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.1em',
        color: PALETTE.fgFaint, textAlign: 'right', flexShrink: 0,
      }}>{t.durationLabel}</div>
    </a>
  );
}

export function TopTracksSection() {
  const { data, isError } = useTopTracks();

  if (isError) {
    return (
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: PALETTE.fgMute, padding: '20px 0' }}>
        Could not load top tracks — check <code style={{ color: PALETTE.fg }}>user-top-read</code> scope.
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 8,
      }}>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.16em', color: PALETTE.fgFaint,
        }}>LAST 4 WEEKS · SHORT TERM</div>
      </div>
      {(data ?? []).map(t => <TrackRow key={t.rank} t={t} />)}
      <div style={{ borderTop: `1px solid ${PALETTE.hairline}` }} />
    </div>
  );
}
