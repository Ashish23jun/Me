import { PALETTE, FONTS } from '@tokens';
import { SectionHead } from '@/modules/shared/components/SectionHead';

const GROUPS = [
  { k: 'LANGUAGES', items: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
  { k: 'FRONTEND', items: ['React', 'Next.js', 'Angular', 'Tailwind', 'React Query', 'Redux'] },
  { k: 'BACKEND', items: ['Node.js', 'Express', 'Hono', 'FastAPI', 'Django', 'Bun', 'GraphQL', 'RabbitMQ', 'Kafka'] },
  { k: 'DATA', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Drizzle', 'Pinecone'] },
  { k: 'INFRA', items: ['AWS · S3 · EC2 · Lambda', 'Docker', 'CI/CD', 'FreeSWITCH'] },
  { k: 'AI / TOOLS', items: ['OpenAI', 'Deepgram', 'Sarvam AI', 'Remotion', 'Claude', 'Cursor'] },
];

export function Stack() {
  return (
    <section id="stack" style={{ padding: '120px 56px' }}>
      <SectionHead n="05" kicker="STACK" title="Tools I reach for."
        sub="Polyglot by necessity — Python where the data lives, TS everywhere else, infra wherever the bottleneck is." />
      <div className="ap-stack-grid" style={{ paddingLeft: 112, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 80px' }}>
        {GROUPS.map(g => (
          <div key={g.k} style={{ padding: '28px 0', borderTop: `1px solid ${PALETTE.hairline}`, display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'baseline' }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: PALETTE.accent }}>{g.k}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
              {g.items.map((s, i) => (
                <span key={s} style={{ fontSize: 16, color: PALETTE.fg, fontWeight: 300 }}>
                  {s}{i < g.items.length - 1 && <span style={{ color: PALETTE.fgFaint, marginLeft: 14 }}>·</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
