import { PALETTE, FONTS } from '@tokens';
import { CustomCursor } from '../shared/components/CustomCursor';
import { Navigation } from '../shared/components/Navigation';
import { NowPlayingCard } from './components/NowPlayingCard';
import { TopTracksSection } from './components/TopTracksSection';
import { MoodMap } from './components/MoodMap';

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div style={{
      fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em',
      color: PALETTE.accent, marginBottom: 18,
    }}>
      {n} — {label}
    </div>
  );
}

export function ListeningPage() {
  return (
    <>
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section style={{ padding: '160px 56px 80px' }}>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.22em',
          color: PALETTE.fgMute, marginBottom: 36,
        }}>
          SIDE B — WHAT’S IN MY EARS
        </div>

        <h1 style={{
          margin: 0, fontFamily: FONTS.serif, fontWeight: 300,
          fontSize: 'clamp(64px, 13vw, 200px)', lineHeight: 0.88,
          letterSpacing: '-0.04em',
        }}>
          Listening
          <span style={{ color: PALETTE.accent, fontFamily: FONTS.serifIt, fontStyle: 'italic' }}>.</span>
        </h1>

        <p style={{
          marginTop: 32, fontSize: 'clamp(17px, 4.5vw, 22px)', color: PALETTE.fgSoft,
          fontWeight: 300, maxWidth: 720, lineHeight: 1.4,
        }}>
          What’s running while I’m shipping. Lo-fi for deep work,
          Hindi indie for the long sessions, Bollywood OSTs when the
          build finally goes green.
        </p>
      </section>

      {/* Now Playing */}
      <section style={{ padding: '40px 56px 60px' }}>
        <SectionLabel n="№01" label="NOW PLAYING" />
        <NowPlayingCard />
      </section>

      {/* Top Tracks */}
      <section style={{ padding: '40px 56px 60px' }}>
        <SectionLabel n="№02" label="MOST PLAYED" />
        <TopTracksSection />
      </section>

      {/* Mood map */}
      <section style={{ padding: '60px 56px 120px' }}>
        <SectionLabel n="№03" label="MOOD MAP" />
        <MoodMap />
      </section>

      {/* Footer */}
      <section style={{
        padding: '0 56px 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em',
        color: PALETTE.fgMute,
      }}>
        <span>© ASHISH PANDEY · MMXXVI</span>
        <a href="/contact" className="ap-link" style={{ color: PALETTE.fg }}>
          FIND ME → CONTACT ↗
        </a>
      </section>
    </>
  );
}
