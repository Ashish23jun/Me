import { ReactNode } from 'react';
import { PALETTE, FONTS } from '@tokens';

// ── CaseHero ──────────────────────────────────────────────────
interface CaseHeroProps {
  n: string;
  name: string;
  tagline: ReactNode;
  live: string;
  status: string;
  year: string;
  role: string;
}

function Meta({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.16em', color: PALETTE.fgMute, marginBottom: 6 }}>{k}</div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: PALETTE.fg }}>{v}</div>
    </div>
  );
}

export function CaseHero({ n, name, tagline, live, status, year, role }: CaseHeroProps) {
  return (
    <section style={{ padding: '160px 56px 80px', borderBottom: `1px solid ${PALETTE.hairline}` }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.22em',
        color: PALETTE.fgMute, marginBottom: 36,
        display: 'flex', gap: 16, alignItems: 'center',
      }}>
        <span>CASE №{n}</span>
        <span style={{ color: PALETTE.fgFaint }}>·</span>
        <span style={{ color: PALETTE.accent, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: PALETTE.accent, boxShadow: `0 0 8px ${PALETTE.accent}`, animation: 'apBlink 1.4s ease infinite' }} />
          {status}
        </span>
        <span style={{ color: PALETTE.fgFaint }}>·</span>
        <span>{year}</span>
      </div>
      <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(80px, 14vw, 220px)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
        {name}<span style={{ color: PALETTE.accent, fontFamily: FONTS.serifIt, fontStyle: 'italic' }}>.</span>
      </h1>
      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 80, alignItems: 'end', paddingTop: 24 }}>
        <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 30, lineHeight: 1.3, letterSpacing: '-0.012em', maxWidth: 760, color: PALETTE.fgSoft }}>
          {tagline}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 28px', paddingLeft: 24, borderLeft: `1px solid ${PALETTE.hairline}` }}>
          <Meta k="ROLE" v={role} />
          <Meta k="YEAR" v={year} />
          <Meta k="LIVE" v={<a href={`https://${live}`} target="_blank" rel="noreferrer" className="ap-link" style={{ color: PALETTE.accent }}>{live} ↗</a>} />
          <Meta k="STATUS" v={status} />
        </div>
      </div>
    </section>
  );
}

// ── CaseSection ───────────────────────────────────────────────
interface CaseSectionProps {
  n: string;
  kicker: string;
  title: string;
  children: ReactNode;
}

export function CaseSection({ n, kicker, title, children }: CaseSectionProps) {
  return (
    <section style={{ padding: '100px 56px', borderBottom: `1px solid ${PALETTE.hairline}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.22em', color: PALETTE.fgMute }}>№{n}</div>
          <div style={{ marginTop: 8, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: PALETTE.accent }}>{kicker}</div>
        </div>
        <div>
          <h2 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: 880 }}>{title}</h2>
          <div style={{ marginTop: 36 }}>{children}</div>
        </div>
      </div>
    </section>
  );
}

// ── Prose ─────────────────────────────────────────────────────
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 19, lineHeight: 1.55, color: PALETTE.fgSoft, maxWidth: 740, fontWeight: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {children}
    </div>
  );
}

// ── BuildList ─────────────────────────────────────────────────
interface BuildItem { h: string; b: string; }

export function BuildList({ items }: { items: BuildItem[] }) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 880 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, padding: '24px 0', borderTop: i ? `1px solid ${PALETTE.hairline}` : 'none' }}>
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.16em', color: PALETTE.accent, paddingTop: 6 }}>0{i + 1}</span>
          <div>
            <div style={{ fontFamily: FONTS.serif, fontWeight: 400, fontSize: 24, letterSpacing: '-0.015em', marginBottom: 8, color: PALETTE.fg }}>{it.h}</div>
            <div style={{ fontSize: 16, lineHeight: 1.55, color: PALETTE.fgSoft, fontWeight: 300 }}>{it.b}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ── MetricGrid ────────────────────────────────────────────────
interface MetricItem { v: string; k: string; sub?: string; }

export function MetricGrid({ items }: { items: MetricItem[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, borderTop: `1px solid ${PALETTE.hairline}`, borderBottom: `1px solid ${PALETTE.hairline}` }}>
      {items.map((m, i) => (
        <div key={i} style={{ padding: '32px 28px', borderRight: i < items.length - 1 ? `1px solid ${PALETTE.hairline}` : 'none' }}>
          <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em', color: PALETTE.accent }}>{m.v}</div>
          <div style={{ marginTop: 12, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>{m.k.toUpperCase()}</div>
          {m.sub && <div style={{ marginTop: 6, fontSize: 13, color: PALETTE.fgSoft, fontWeight: 300 }}>{m.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ── StackBlock ────────────────────────────────────────────────
interface StackGroup { k: string; items: string[]; }

export function StackBlock({ groups }: { groups: StackGroup[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 60px', maxWidth: 880 }}>
      {groups.map(g => (
        <div key={g.k} style={{ padding: '20px 0', borderTop: `1px solid ${PALETTE.hairline}`, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'baseline' }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: PALETTE.accent }}>{g.k}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px' }}>
            {g.items.map((s, i) => (
              <span key={s} style={{ fontSize: 14, color: PALETTE.fg, fontWeight: 300 }}>
                {s}{i < g.items.length - 1 && <span style={{ color: PALETTE.fgFaint, marginLeft: 12 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ArchDiagram ───────────────────────────────────────────────
interface ArchNode { id: string; label: string; sub?: string; x: number; y: number; w: number; h: number; accent?: boolean; }
interface ArchEdge { from: string; to: string; label?: string; dashed?: boolean; }

export function ArchDiagram({ title, nodes, edges }: { title: string; nodes: ArchNode[]; edges: ArchEdge[] }) {
  const W = 1100, H = 480;
  const find = (id: string) => nodes.find(n => n.id === id);

  return (
    <div style={{ border: `1px solid ${PALETTE.hairline}`, padding: 32, background: PALETTE.bgRaised }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.16em', color: PALETTE.fgMute }}>
        <span>FIG.01 — {title.toUpperCase()}</span>
        <span style={{ color: PALETTE.accent }}>▮ data flow</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={PALETTE.accent} />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = find(e.from), b = find(e.to);
          if (!a || !b) return null;
          const x1 = a.x + a.w, y1 = a.y + a.h / 2;
          const x2 = b.x, y2 = b.y + b.h / 2;
          const mx = (x1 + x2) / 2;
          return (
            <g key={i}>
              <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                stroke={PALETTE.accent} strokeOpacity="0.5" strokeWidth="1.2"
                fill="none" markerEnd="url(#ah)" strokeDasharray={e.dashed ? '4 4' : undefined} />
              {e.label && <text x={mx} y={(y1 + y2) / 2 - 6} textAnchor="middle" fill={PALETTE.fgMute} fontSize="11" fontFamily="JetBrains Mono">{e.label}</text>}
            </g>
          );
        })}
        {nodes.map(n => (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="2"
              fill={n.accent ? `${PALETTE.accent}18` : PALETTE.bgRaised}
              stroke={n.accent ? PALETTE.accent : PALETTE.hairline} strokeWidth="1" />
            <text x={n.x + n.w / 2} y={n.y + 22} textAnchor="middle" fill={n.accent ? PALETTE.accent : PALETTE.fg} fontSize="13" fontFamily="Inter" fontWeight="500">{n.label}</text>
            {n.sub && <text x={n.x + n.w / 2} y={n.y + 40} textAnchor="middle" fill={PALETTE.fgMute} fontSize="10" fontFamily="JetBrains Mono">{n.sub}</text>}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── CaseFooter ────────────────────────────────────────────────
interface CaseFooterProps {
  next: { href: string; name: string; tagline: string };
}

export function CaseFooter({ next }: CaseFooterProps) {
  return (
    <section style={{ padding: '120px 56px' }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: PALETTE.fgMute, marginBottom: 24 }}>NEXT CASE</div>
      <a href={next.href} style={{ display: 'block', borderTop: `1px solid ${PALETTE.hairline}`, borderBottom: `1px solid ${PALETTE.hairline}`, padding: '40px 0', transition: 'padding-left .25s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '20px'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0px'; }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 84, letterSpacing: '-0.035em', lineHeight: 1 }}>
            {next.name}<span style={{ color: PALETTE.accent, fontStyle: 'italic', fontFamily: FONTS.serifIt }}>.</span>
          </h3>
          <span style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.16em', color: PALETTE.accent }}>READ CASE →</span>
        </div>
        <div style={{ marginTop: 14, fontSize: 17, color: PALETTE.fgSoft, fontWeight: 300, maxWidth: 720 }}>{next.tagline}</div>
      </a>
      <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>
        <span>© ASHISH PANDEY · MMXXVI</span>
        <a href="mailto:pandey.k.ashish.86@gmail.com" className="ap-link" style={{ color: PALETTE.fg }}>PANDEY.K.ASHISH.86@GMAIL.COM ↗</a>
      </div>
    </section>
  );
}
