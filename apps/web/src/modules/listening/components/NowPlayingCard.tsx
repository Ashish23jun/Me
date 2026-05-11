import { PALETTE, FONTS } from '@tokens';
import { useNowPlaying } from '../hooks/useNowPlaying';
import type { NowPlaying } from '../types';

function AlbumArt({ src, title }: { src: string | null; title: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={title}
        style={{ width: 180, height: 180, objectFit: 'cover', display: 'block' }}
      />
    );
  }
  return (
    <div style={{
      width: 180, height: 180,
      background: `linear-gradient(135deg, ${PALETTE.accent}, #2a1856)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${PALETTE.fgFaint} 0.8px, transparent 0.8px)`,
        backgroundSize: '14px 14px', opacity: 0.6,
      }} />
      <span style={{ fontFamily: FONTS.serifIt, fontStyle: 'italic', fontSize: 64, color: PALETTE.fg, opacity: 0.85 }}>♪</span>
    </div>
  );
}

function ProgressBar({ pct, isPlaying }: { pct: number; isPlaying: boolean }) {
  return (
    <div style={{ height: 2, background: PALETTE.hairline, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: `${pct}%`, background: PALETTE.accent,
        transition: 'width 1s linear',
      }} />
      {isPlaying && (
        <div style={{
          position: 'absolute', left: `${pct}%`, top: 0, bottom: 0,
          width: 40,
          background: `linear-gradient(90deg, transparent, ${PALETTE.accent}88)`,
          animation: 'apSweep 2s linear infinite',
        }} />
      )}
    </div>
  );
}

function TrackInfo({ np }: { np: NowPlaying }) {
  const pct = np.durationMs > 0 ? (np.progressMs / np.durationMs) * 100 : 0;

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.18em',
        color: PALETTE.accent, marginBottom: 14,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: '#1DB954',
          boxShadow: '0 0 8px #1DB954',
          animation: np.isPlaying ? 'apBlink 1.4s ease infinite' : 'none',
          flexShrink: 0,
        }} />
        {np.isPlaying ? 'NOW PLAYING' : 'LAST PLAYED'}
        <span style={{ color: PALETTE.fgFaint, marginLeft: 8 }}>· spotify</span>
      </div>

      <div style={{
        fontFamily: FONTS.serif, fontWeight: 300,
        fontSize: 'clamp(28px, 4vw, 44px)',
        lineHeight: 1.05, letterSpacing: '-0.02em', color: PALETTE.fg,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {np.title ?? '—'}
      </div>

      <div style={{ marginTop: 10, fontSize: 17, color: PALETTE.fgSoft, fontWeight: 300 }}>
        {np.artist}
        {np.album && (
          <>
            <span style={{ color: PALETTE.fgFaint, margin: '0 6px' }}>·</span>
            {np.album}
          </>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <ProgressBar pct={pct} isPlaying={np.isPlaying} />
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: FONTS.mono, fontSize: 11, color: PALETTE.fgMute, marginTop: 8,
        }}>
          <span>{np.progressLabel}</span>
          {np.url && (
            <a href={np.url} target="_blank" rel="noreferrer" className="ap-link" style={{ color: PALETTE.fgSoft }}>
              OPEN IN SPOTIFY ↗
            </a>
          )}
          <span>{np.durationLabel}</span>
        </div>
      </div>
    </div>
  );
}

export function NowPlayingCard() {
  const { data, isError } = useNowPlaying();

  if (isError) {
    return (
      <div style={{
        border: `1px solid ${PALETTE.hairline}`, padding: 32,
        fontFamily: FONTS.mono, fontSize: 12, color: PALETTE.fgMute,
      }}>
        Could not reach Spotify API — check your server .env
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{
      border: `1px solid ${PALETTE.hairline}`, padding: 32,
      display: 'grid', gridTemplateColumns: '180px 1fr',
      gap: 32, alignItems: 'center',
      background: `linear-gradient(135deg, ${PALETTE.accent}10, transparent 60%)`,
    }}
      className="ap-now-grid"
    >
      <AlbumArt src={data.albumArt} title={data.title ?? ''} />
      <TrackInfo np={data} />
    </div>
  );
}
