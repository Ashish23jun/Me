import { useState } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { SectionHead } from '@/modules/shared/components/SectionHead';
import { Pill } from '@/modules/shared/components/Pill';

interface Metric { v: string; k: string; }
interface CaseCardProps {
  id: string; n: string; name: string; tagline: string;
  href: string; live: string; status: string;
  stack: string[]; problem: string; built: string[];
  metrics: Metric[];
}

function CaseCard({ id, n, name, tagline, href, live, status, stack, problem, built, metrics }: CaseCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} style={{ borderTop: `1px solid ${PALETTE.hairline}`, paddingTop: 36, paddingBottom: 36 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 32, alignItems: 'baseline' }} className="ap-case-head">
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.16em', color: PALETTE.fgMute }}>№{n}</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <Pill accent pulse>{status}</Pill>
            <a href={`https://${live}`} target="_blank" rel="noreferrer" style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }} className="ap-link">{live} ↗</a>
          </div>
          <h3 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 76, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            {name}<span style={{ color: PALETTE.accent, fontFamily: FONTS.serifIt, fontStyle: 'italic' }}>.</span>
          </h3>
          <div style={{ marginTop: 14, fontSize: 19, color: PALETTE.fgSoft, maxWidth: 620, fontWeight: 300, lineHeight: 1.4 }}>{tagline}</div>
        </div>
        <div className="ap-case-actions" style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          <button onClick={() => setOpen(o => !o)} style={{ background: 'transparent', color: PALETTE.fg, border: `1px solid ${PALETTE.hairline}`, padding: '10px 14px', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', cursor: 'pointer', borderRadius: 0, display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.accent; (e.currentTarget as HTMLButtonElement).style.color = PALETTE.accent; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.hairline; (e.currentTarget as HTMLButtonElement).style.color = PALETTE.fg; }}>
            {open ? 'COLLAPSE' : 'EXPAND'}
            <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s', display: 'inline-block' }}>↓</span>
          </button>
          <a href={href} className="ap-link" style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>FULL CASE ↗</a>
        </div>
      </div>

      {/* Expandable body */}
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .45s cubic-bezier(.2,.7,.3,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 280px', gap: 32, paddingTop: 36, opacity: open ? 1 : 0, transition: 'opacity .35s ease .1s' }}>
            <div />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.2em', color: PALETTE.accent, marginBottom: 10 }}>THE PROBLEM</div>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: PALETTE.fgSoft, maxWidth: 640, fontWeight: 300 }}>{problem}</p>
              </div>
              <div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.2em', color: PALETTE.accent, marginBottom: 10 }}>WHAT I BUILT</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {built.map((b, i) => (
                    <li key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 12, fontSize: 15, lineHeight: 1.5, color: PALETTE.fg, fontWeight: 300, maxWidth: 720 }}>
                      <span style={{ color: PALETTE.accent, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.1em', paddingTop: 4 }}>0{i + 1}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.2em', color: PALETTE.accent, marginBottom: 10 }}>STACK</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {stack.map(s => <span key={s} style={{ fontFamily: FONTS.mono, fontSize: 11, color: PALETTE.fgSoft, padding: '4px 10px', border: `1px solid ${PALETTE.hairline}`, borderRadius: 2 }}>{s}</span>)}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingLeft: 28, borderLeft: `1px solid ${PALETTE.hairline}` }}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.2em', color: PALETTE.fgMute }}>SIGNALS</div>
              {metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 36, lineHeight: 1, color: PALETTE.accent, letterSpacing: '-0.02em' }}>{m.v}</div>
                  <div style={{ marginTop: 6, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.1em', color: PALETTE.fgMute }}>{m.k}</div>
                </div>
              ))}
              <a href={href} style={{ marginTop: 8, padding: '12px 14px', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', background: PALETTE.fg, color: PALETTE.bg, textAlign: 'center' }}>READ FULL CASE →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" style={{ padding: '120px 56px' }}>
      <SectionHead n="03" kicker="FEATURED WORK" title="Two builds, end-to-end."
        sub="Both shipped to real users. Each card expands inline for the problem, build, metrics and stack — or open the full case study for the long version." />
      <div style={{ paddingLeft: 112, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <CaseCard
          id="crelyzor" n="03.1" name="Crelyzor"
          tagline="AI-powered productivity platform — meetings, tasks, identity"
          href="/crelyzor" live="crelyzor.app" status="LIVE"
          stack={['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'OpenAI', 'Deepgram', 'AWS S3 / EC2']}
          problem="Meetings produce a mountain of context that never makes it into your task list. Existing tools record OR transcribe OR extract action items — none unify scheduling, identity, and post-meeting follow-through in one place."
          built={[
            'Real-time meeting intelligence — auto-recording, transcription with speaker diarization, AI summarization, action-item extraction.',
            'Automatic task extraction — conversations become structured to-dos linked back to the source moment in the recording.',
            'Smart scheduling + calendar sync; global search across meetings, tasks, and contacts.',
            'Shareable digital identity cards — a modern business-card layer that sits on top of the productivity stack.',
            'Hybrid real-time + async pipelines — Deepgram for transcription, OpenAI for summaries, S3 for media, EC2 for steady-state workloads.',
          ]}
          metrics={[{ v: 'Real-time', k: 'transcription + diarization' }, { v: 'AI-native', k: 'summaries + task extraction' }, { v: 'Unified', k: 'meetings · tasks · identity' }]}
        />
        <CaseCard
          id="work-holo" n="03.2" name="Work Holo"
          tagline="Multi-tenant agent platform for outbound voice"
          href="/work-holo" live="app.workholo.com" status="LIVE"
          stack={['React', 'Hono', 'oRPC', 'Bun', 'PostgreSQL', 'Drizzle', 'RabbitMQ', 'FreeSWITCH', 'ElectricSQL', 'Better-Auth']}
          problem="Sales orgs running outbound campaigns need a single place to manage agents, route calls through SIP trunks, monitor live state, and isolate org data. Existing tools either cost a fortune or stop short of full RBAC."
          built={[
            'Built a VoIP dialer on FreeSWITCH — outbound calls via SIP trunks + DID numbers, with call routing, session management, and live state sync to the frontend.',
            'Real-time call monitoring dashboard — live agent status, call duration, disposition tagging for supervisor campaign management.',
            'ElectricSQL for instant message sync across clients; RabbitMQ for async delivery, receipts, and push notifications.',
            'Better-Auth + OAuth 2.0 with granular permission assignment and revocation across org hierarchies.',
            'Full multi-tenant data isolation — independent org boundaries, RBAC, channel-based comms, real-time attendance tracking.',
          ]}
          metrics={[{ v: 'Real-time', k: 'call state sync' }, { v: 'Multi-tenant', k: 'RBAC + isolation' }, { v: 'SIP', k: 'trunks + DID numbers' }]}
        />
      </div>
    </section>
  );
}
