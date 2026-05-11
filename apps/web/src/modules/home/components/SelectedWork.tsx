import { useState } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { SectionHead } from '@/modules/shared/components/SectionHead';
import { Pill } from '@/modules/shared/components/Pill';

interface WorkItem {
  id: string; n: string; name: string; role: string; time: string;
  blurb: string;
  bullets: { h: string; b: string }[];
  kpi: { v: string; k: string }[];
  stack: string[];
}

const ITEMS: WorkItem[] = [
  {
    id: 'creators-mela', n: '04.1',
    name: 'Creators Mela', role: 'Founding Engineer', time: 'Feb 2026 — Present',
    blurb: 'Designed the FastAPI backend for an end-to-end video SaaS — auth, billing, transcription, rendering across 3 microservices.',
    bullets: [
      { h: 'Designed & built FastAPI backend', b: 'End-to-end video SaaS covering auth, billing, transcription, and rendering workflows across 3 microservices.' },
      { h: 'Migrated rendering to Remotion Lambda', b: 'Distributed frame rendering across Lambda workers, cutting render time from 3-4 min to 30-40s for 60fps videos; handling 20GB+ renders daily across 1,000+ jobs.' },
      { h: 'Eliminated infra cost via browser rendering', b: 'Dynamically routes jobs to the user\'s browser for capable machines, offloading CPU entirely to the client; falls back to Remotion Lambda for low-end devices.' },
      { h: 'Integrated dual transcription engines', b: 'Deepgram Nova-3 and Sarvam AI with cost-optimised routing: Batch API for short videos, webhooks for longer, word-level timestamp accuracy under 100ms.' },
      { h: 'Implemented S3 presigned URL upload flow', b: 'Direct client-to-S3 uploads up to 3GB per video, bypassing backend entirely; webhook-triggered async pipeline via Celery + Redis processing 1,000+ jobs daily.' },
      { h: 'Developed advanced caption editor', b: 'Real-time styling controls (fonts, colors, shadows, stroke, animation) with immutable timestamp locking, ensuring consistent rendering across all video outputs.' },
    ],
    kpi: [
      { v: '3–4min → 30–40s', k: 'render time' },
      { v: '1,000+',           k: 'jobs / day' },
      { v: '20GB+',            k: 'rendered daily' },
      { v: '<100ms',           k: 'transcript accuracy' },
    ],
    stack: ['FastAPI', 'Remotion Lambda', 'Deepgram', 'Sarvam AI', 'Celery', 'Redis', 'S3'],
  },
  {
    id: 'experiment-labs', n: '04.2',
    name: 'Experiment Labs', role: 'Fullstack Engineer', time: 'Dec 2024 — Jan 2026',
    blurb: 'Architected multi-tenant SSO across 4 products and 4,000+ users. Shipped AI recs, fixed payments, delivered React frontends.',
    bullets: [
      { h: 'Architected a multi-tenant SSO system', b: 'Unified auth across 4 products, 4,000+ users, shared user database with secure cross-domain sessions.' },
      { h: 'Cut session validation to under 50ms', b: 'Redis-backed session layer with auth & RBAC system — 39+ permissions, 5 user roles, multi-tenant org isolation.' },
      { h: 'Shipped an AI recommendation engine', b: 'OpenAI embeddings + Pinecone vector search delivering personalised career insights to 3,000+ students.' },
      { h: 'Migrated from AWS Lambda to EC2', b: 'Serverless timeouts were causing payment failures; moved to persistent servers with webhook listeners, fixing transaction reliability across 500+ monthly transactions.' },
      { h: 'Delivered React frontends across 3 products', b: 'Optimised server-state caching, generated personalised student PDF reports with career roadmaps and AI-driven recommendations; handled secure file uploads via S3 presigned URLs.' },
    ],
    kpi: [
      { v: '4,000+',          k: 'users across 4 products' },
      { v: '<50ms',           k: 'session validation' },
      { v: '39+ permissions', k: '5 roles, multi-tenant' },
      { v: '500+/mo',         k: 'transactions fixed' },
    ],
    stack: ['Node.js', 'React', 'OpenAI', 'Pinecone', 'Redis', 'AWS', 'Postgres'],
  },
];

function SelectedRow(item: WorkItem) {
  const { n, name, role, time, blurb, bullets, kpi, stack } = item;
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: `1px solid ${PALETTE.hairline}` }}>
      {/* ── Always-visible row ─────────────────────────── */}
      <div className="ap-selected-row" style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 280px',
        gap: 32,
        padding: '40px 0 32px',
        alignItems: 'start',
      }}>
        {/* Number */}
        <div style={{
          fontFamily: FONTS.mono, fontSize: 12,
          letterSpacing: '0.16em', color: PALETTE.fgMute, paddingTop: 6,
        }}>№{n}</div>

        {/* Main content */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10,
          }}>
            <Pill accent pulse>{role.toUpperCase()}</Pill>
            <span style={{
              fontFamily: FONTS.mono, fontSize: 11,
              letterSpacing: '0.14em', color: PALETTE.fgMute,
            }}>{time}</span>
          </div>

          <h4 style={{
            margin: 0, fontFamily: FONTS.serif, fontWeight: 300,
            fontSize: 'clamp(26px, 8vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1,
          }}>{name}</h4>

          <p style={{
            margin: '14px 0 0', fontSize: 16, lineHeight: 1.5,
            color: PALETTE.fgSoft, fontWeight: 300, maxWidth: 600,
          }}>{blurb}</p>

          <div style={{
            marginTop: 18, fontFamily: FONTS.mono, fontSize: 11,
            letterSpacing: '0.06em', color: PALETTE.fgMute,
          }}>{stack.join(' · ')}</div>

          {/* Expand toggle */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              marginTop: 20, background: 'transparent',
              color: open ? PALETTE.accent : PALETTE.fg,
              border: `1px solid ${open ? PALETTE.accent : PALETTE.hairline}`,
              padding: '8px 14px',
              fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em',
              cursor: 'pointer', borderRadius: 0,
              display: 'inline-flex', alignItems: 'center', gap: 10,
              transition: 'all .15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.accent;
              (e.currentTarget as HTMLButtonElement).style.color = PALETTE.accent;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = open ? PALETTE.accent : PALETTE.hairline;
              (e.currentTarget as HTMLButtonElement).style.color = open ? PALETTE.accent : PALETTE.fg;
            }}
          >
            {open ? 'COLLAPSE' : 'EXPAND'}
            <span style={{
              display: 'inline-block',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .3s cubic-bezier(.2,.7,.3,1)',
            }}>↓</span>
          </button>
        </div>

        {/* Signals — always visible */}
        <div className="ap-selected-signals" style={{
          paddingLeft: 28,
          borderLeft: `1px solid ${PALETTE.hairline}`,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div style={{
            fontFamily: FONTS.mono, fontSize: 10,
            letterSpacing: '0.2em', color: PALETTE.fgMute,
          }}>SIGNALS</div>
          {kpi.map((m, i) => (
            <div key={i}>
              <div style={{
                fontFamily: FONTS.serif, fontWeight: 300,
                fontSize: 32, lineHeight: 1.1,
                color: PALETTE.accent, letterSpacing: '-0.02em',
              }}>{m.v}</div>
              <div style={{
                marginTop: 5, fontFamily: FONTS.mono, fontSize: 10,
                letterSpacing: '0.14em', color: PALETTE.fgMute,
              }}>{m.k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Animated bullets panel ─────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows .45s cubic-bezier(.2,.7,.3,1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="ap-selected-body-grid" style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 280px',
            gap: 32, paddingBottom: 40,
            opacity: open ? 1 : 0,
            transition: 'opacity .3s ease .1s',
          }}>
            <div />
            <ol style={{
              margin: 0, padding: 0, listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 0,
              borderTop: `1px solid ${PALETTE.hairline}`,
            }}>
              {bullets.map((b, i) => (
                <li key={i} style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14,
                  padding: '16px 0',
                  borderBottom: `1px solid ${PALETTE.hairline}`,
                }}>
                  <span style={{
                    fontFamily: FONTS.mono, fontSize: 11,
                    letterSpacing: '0.12em', color: PALETTE.accent, paddingTop: 2,
                  }}>0{i + 1}</span>
                  <div style={{ fontSize: 15, lineHeight: 1.6, fontWeight: 300 }}>
                    <span style={{
                      fontFamily: FONTS.serif, fontWeight: 400,
                      fontSize: 16, color: PALETTE.fg, letterSpacing: '-0.01em',
                    }}>{b.h}</span>
                    <span style={{ color: PALETTE.fgSoft }}> — {b.b}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div />
          </div>
        </div>
      </div>

    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="selected" style={{ padding: '120px 56px' }}>
      <SectionHead n="04" kicker="SELECTED WORK" title="Where I've shipped." />
      <div className="ap-case-list" style={{ paddingLeft: 112, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {ITEMS.map(it => <SelectedRow key={it.id} {...it} />)}
      </div>
    </section>
  );
}
