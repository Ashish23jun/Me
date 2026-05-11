import { useState } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { SectionHead } from '@/modules/shared/components/SectionHead';

interface WorkItem {
  id: string; name: string; role: string; time: string;
  blurb: string; kpi: [string, string][]; stack: string;
}

const ITEMS: WorkItem[] = [
  {
    id: 'creators-mela', name: 'Creators Mela', role: 'Founding Engineer', time: 'Feb 2026 — Present',
    blurb: 'Designed the FastAPI backend for an end-to-end video SaaS — auth, billing, transcription, rendering across 3 microservices.',
    kpi: [['3–4min → 30–40s', 'render time, 60fps videos'], ['1,000+', 'jobs / day'], ['20GB+', 'rendered daily'], ['<100ms', 'word-level transcript accuracy']],
    stack: 'FastAPI · Remotion Lambda · Deepgram · Sarvam AI · Celery · Redis · S3',
  },
  {
    id: 'experiment-labs', name: 'Experiment Labs', role: 'Fullstack Engineer', time: 'Dec 2024 — Jan 2026',
    blurb: 'Architected multi-tenant SSO across 4 products and 4,000+ users. Shipped AI recs, fixed payments, delivered React frontends across the surface.',
    kpi: [['4,000+', 'users across 4 products'], ['<50ms', 'session validation, Redis-backed'], ['39+ permissions', '5 roles, multi-tenant orgs'], ['500+/mo', 'transactions, reliability fixed']],
    stack: 'Node.js · React · OpenAI · Pinecone · Redis · AWS · Postgres',
  },
];

function SelectedRow({ name, role, time, blurb, kpi, stack }: WorkItem) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="ap-selected-row"
      style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60, padding: '40px 0', borderTop: `1px solid ${PALETTE.hairline}`, transition: 'background .25s, padding-left .3s', paddingLeft: hover ? 16 : 0, background: hover ? `linear-gradient(90deg, ${PALETTE.accent}06, transparent 70%)` : 'transparent' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>
          <span style={{ color: PALETTE.accent }}>{role.toUpperCase()}</span>
          <span style={{ color: PALETTE.fgFaint }}>·</span>
          <span>{time.toUpperCase()}</span>
        </div>
        <h4 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 52, letterSpacing: '-0.025em', lineHeight: 1 }}>{name}</h4>
        <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.5, color: PALETTE.fgSoft, fontWeight: 300, maxWidth: 600 }}>{blurb}</p>
        <div style={{ marginTop: 18, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.06em', color: PALETTE.fgMute }}>{stack}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 28px', alignContent: 'start' }}>
        {kpi.map(([v, k], i) => (
          <div key={i}>
            <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.015em', color: PALETTE.fg }}>{v}</div>
            <div style={{ marginTop: 4, fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.14em', color: PALETTE.fgMute }}>{k.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="selected" style={{ padding: '120px 56px' }}>
      <SectionHead n="04" kicker="SELECTED WORK" title="Where I've shipped." />
      <div style={{ paddingLeft: 112, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {ITEMS.map(it => <SelectedRow key={it.id} {...it} />)}
      </div>
    </section>
  );
}
