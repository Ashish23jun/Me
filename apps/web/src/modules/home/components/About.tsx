import { PALETTE, FONTS } from '@tokens';
import { SectionHead } from '@/modules/shared/components/SectionHead';

function Fact({ k, v, v2 }: { k: string; v: string; v2?: string }) {
  return (
    <div>
      <div style={{ color: PALETTE.fgMute, letterSpacing: '0.16em', fontSize: 10, marginBottom: 6 }}>{k.toUpperCase()}</div>
      <div style={{ color: PALETTE.fg, fontSize: 14 }}>{v}</div>
      {v2 && <div style={{ color: PALETTE.fgMute, fontSize: 12, marginTop: 2 }}>{v2}</div>}
    </div>
  );
}

export function About() {
  return (
    <section id="about" style={{ padding: '120px 56px' }}>
      <SectionHead n="02" kicker="ABOUT" title="An engineer who finishes."
        sub="I build production systems where the trade-offs are real — video pipelines that move 20GB a day, agent platforms that hold up under load, AI features that ship to thousands of users. I lean into ambiguity, ship fast, and learn faster." />

      <div className="ap-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr minmax(240px, 320px)', gap: 80, paddingLeft: 112 }}>
        <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(18px, 3.5vw, 30px)', lineHeight: 1.32, letterSpacing: '-0.012em', color: PALETTE.fg, maxWidth: 720 }}>
          Right now I'm a <em style={{ fontFamily: FONTS.serifIt, color: PALETTE.accent }}>Founding Engineer</em> at
          Creators Mela, where I designed the FastAPI backend powering a video SaaS that
          renders <span style={{ fontFamily: FONTS.mono, fontSize: 24, color: PALETTE.accent }}>1,000+</span> jobs
          a day — and an adaptive routing layer that pushes rendering to the user's
          browser when it can, eliminating infra cost at scale.
          <br /><br />
          Before that, at Experiment Labs, I architected multi-tenant SSO across four
          products and <span style={{ fontFamily: FONTS.mono, fontSize: 24, color: PALETTE.accent }}>4,000+</span> users,
          shipped an AI recommendation engine on OpenAI embeddings + Pinecone, and
          rebuilt the payment layer to actually be reliable.
          <br /><br />
          Lately I've been{' '}
          <span style={{ backgroundImage: `linear-gradient(180deg, transparent 60%, ${PALETTE.accent}33 60%, ${PALETTE.accent}33 92%, transparent 92%)`, padding: '0 4px' }}>
            living in Claude & Cursor
          </span>
          {' '}— learning AI engineering the way I learned the rest of the stack: by shipping with it.
        </div>

        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: PALETTE.fgSoft, display: 'flex', flexDirection: 'column', gap: 24, paddingLeft: 28, borderLeft: `1px solid ${PALETTE.hairline}` }}>
          <Fact k="Currently" v="Founding Engineer" v2="Creators Mela · Feb 2026 →" />
          <Fact k="Previously" v="Fullstack Engineer" v2="Experiment Labs · Dec 2024 – Jan 2026" />
          <Fact k="Education" v="B.Tech, IT" v2="KIET Group of Institutions · 2021–2025" />
          <Fact k="Based in" v="India 🇮🇳" v2="Open to remote / relocation" />
          <Fact k="Open to" v="SDE I · SDE II" v2="Founding eng · ~1 yr shipped exp." />
        </div>
      </div>
    </section>
  );
}
