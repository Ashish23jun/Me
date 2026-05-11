import { PALETTE, FONTS } from '@tokens';
import { SectionHead } from '@/modules/shared/components/SectionHead';
import { Pill } from '@/modules/shared/components/Pill';

function NowItem({ k, v, sub, pulse }: { k: string; v: string; sub?: string; pulse?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 28, paddingBottom: 24, borderBottom: `1px solid ${PALETTE.hairline}` }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: PALETTE.accent, paddingTop: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {pulse && <span style={{ width: 6, height: 6, borderRadius: '50%', background: PALETTE.accent, boxShadow: `0 0 8px ${PALETTE.accent}`, animation: 'apBlink 1.4s ease infinite' }} />}
        {k}
      </div>
      <div>
        <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 26, letterSpacing: '-0.018em', lineHeight: 1.15 }}>{v}</div>
        {sub && <div style={{ marginTop: 6, fontSize: 14, color: PALETTE.fgMute, fontWeight: 300, lineHeight: 1.5, maxWidth: 460 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Stat({ n, k }: { n: string; k: string }) {
  return (
    <div>
      <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 26, color: PALETTE.fg, letterSpacing: '-0.02em' }}>{n}</div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.14em', color: PALETTE.fgMute, marginTop: 4 }}>{k.toUpperCase()}</div>
    </div>
  );
}

function Heatmap() {
  const seed = (i: number, j: number) => {
    const n = Math.sin((i * 13.3 + j * 7.7) * 0.7) * 43758.5;
    const f = n - Math.floor(n);
    return f < 0.34 ? 0 : f < 0.62 ? 1 : f < 0.85 ? 2 : 3;
  };
  const colors = [PALETTE.hairlineSoft, `${PALETTE.accent}3a`, `${PALETTE.accent}80`, PALETTE.accent];
  const weeks = 26;
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: 3 }}>
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} style={{ display: 'grid', gap: 3 }}>
            {Array.from({ length: 7 }).map((_, d) => (
              <div key={d} style={{ width: '100%', aspectRatio: '1 / 1', background: colors[seed(w, d)], borderRadius: 1 }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.12em', color: PALETTE.fgMute }}>
        <span>26 WEEKS AGO</span>
        <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
          LESS {colors.map((c, i) => <span key={i} style={{ width: 9, height: 9, background: c, borderRadius: 1 }} />)} MORE
        </span>
        <span>TODAY</span>
      </div>
    </div>
  );
}

export function Now() {
  return (
    <section id="now" style={{ padding: '120px 56px' }}>
      <SectionHead n="06" kicker="NOW" title="What I'm into this month." />
      <div className="ap-now-grid" style={{ paddingLeft: 112, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <NowItem k="BUILDING" v="Work Holo · Crelyzor" sub="Work Holo: live VoIP dialer + multi-tenant agent infra. Crelyzor: AI meeting intelligence — transcription, summaries, structured tasks." />
          <NowItem k="LEARNING" v="AI engineering" sub="Going deep on agent design + retrieval. Living in Claude and Cursor for daily shipping." />
          <NowItem k="READING" v="The Pragmatic Engineer · Latent Space" sub="And every postmortem I can find." />
          <NowItem k="OPEN TO" v="SDE I · SDE II · Founding engineer" sub="~1 year of shipped production experience. Remote-first or relocation. Reach out." />
        </div>

        <div style={{ border: `1px solid ${PALETTE.hairline}`, padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>
            <span>GITHUB · @ASHISH23JUN</span>
            <Pill accent pulse>LIVE</Pill>
          </div>
          <Heatmap />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, paddingTop: 12, borderTop: `1px solid ${PALETTE.hairline}` }}>
            <Stat n="1.4k+" k="contributions / yr" />
            <Stat n="42" k="public repos" />
            <Stat n="68" k="day streak" />
          </div>
          <a href="https://github.com/Ashish23jun" target="_blank" rel="noreferrer" className="ap-link" style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fg }}>VIEW ON GITHUB ↗</a>
        </div>
      </div>
    </section>
  );
}
