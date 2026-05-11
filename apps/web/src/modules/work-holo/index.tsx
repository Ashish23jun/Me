import { PALETTE, FONTS } from '@tokens';
import { CustomCursor } from '@/modules/shared/components/CustomCursor';
import { CaseNav } from '@/modules/shared/components/CaseNav';
import { CaseHero, CaseSection, Prose, BuildList, MetricGrid, StackBlock, ArchDiagram, CaseFooter } from '@/modules/shared/components/CaseComponents';

const ARCH_NODES = [
  { id: 'fe',   label: 'React Frontend', sub: 'live state · oRPC client',  x: 20,  y: 60,  w: 180, h: 60 },
  { id: 'api',  label: 'Hono API',        sub: 'oRPC · Bun',               x: 260, y: 60,  w: 180, h: 60, accent: true },
  { id: 'auth', label: 'Better-Auth',     sub: 'OAuth 2.0 · RBAC',         x: 260, y: 180, w: 180, h: 60 },
  { id: 'pg',   label: 'PostgreSQL',      sub: 'Drizzle ORM',              x: 500, y: 60,  w: 180, h: 60 },
  { id: 'esql', label: 'ElectricSQL',     sub: 'real-time sync',           x: 500, y: 180, w: 180, h: 60, accent: true },
  { id: 'mq',   label: 'RabbitMQ',        sub: 'async pipelines',          x: 500, y: 300, w: 180, h: 60 },
  { id: 'fsw',  label: 'FreeSWITCH',      sub: 'SIP · DID · routing',      x: 740, y: 60,  w: 180, h: 60, accent: true },
  { id: 'sip',  label: 'SIP Trunk',       sub: 'PSTN egress',              x: 980, y: 60,  w: 100, h: 60 },
  { id: 'push', label: 'Push / Receipts', sub: 'delivery worker',          x: 740, y: 300, w: 180, h: 60 },
];

const ARCH_EDGES = [
  { from: 'fe',   to: 'api' },
  { from: 'api',  to: 'pg' },
  { from: 'api',  to: 'auth', dashed: true },
  { from: 'fe',   to: 'esql', label: 'sync' },
  { from: 'esql', to: 'pg' },
  { from: 'api',  to: 'mq',   label: 'enqueue' },
  { from: 'mq',   to: 'push' },
  { from: 'api',  to: 'fsw',  label: 'originate' },
  { from: 'fsw',  to: 'sip' },
];

export function WorkHoloPage() {
  return (
    <>
      <CustomCursor />
      <CaseNav current="03.1 / Work Holo" />

      <CaseHero
        n="03.1" name="Work Holo"
        tagline={<>A multi-tenant agent platform for outbound voice — <em style={{ fontFamily: FONTS.serifIt, color: PALETTE.accent }}>FreeSWITCH-powered VoIP</em>, real-time call monitoring, and full org-level RBAC. Sales teams come in, dial out, and stay supervised.</>}
        live="app.workholo.com" status="LIVE" year="2025 — present" role="Solo build · architecture → ship"
      />

      <CaseSection n="01" kicker="THE PROBLEM" title="Outbound voice is fragmented. Sales orgs were duct-taping it.">
        <Prose>
          <p>Sales orgs running outbound campaigns end up with three or four disconnected tools — one for the dialer, one for CRM, one for monitoring, one for messaging. None talk cleanly. Org boundaries leak. Supervisors can't see live agent state without screen-sharing.</p>
          <p>Existing all-in-one platforms either price out small teams or skip the parts that matter — granular RBAC, true multi-tenant data isolation, and a real-time supervisor view that doesn't lag.</p>
          <p>Work Holo is one place: dialer, monitoring, messaging, RBAC, attendance. Built so an org can drop in and run a campaign on day one.</p>
        </Prose>
      </CaseSection>

      <CaseSection n="02" kicker="WHAT I BUILT" title="The system, end-to-end.">
        <BuildList items={[
          { h: 'VoIP dialer on FreeSWITCH', b: 'Outbound calls via SIP trunks and DID numbers, with call routing, session management, and live state sync to the frontend. Every event — ring, answer, hangup, hold — pushes to the agent UI in real time.' },
          { h: 'Real-time call monitoring dashboard', b: 'Live agent status, call duration, and disposition tagging — so supervisors can manage dialer campaigns across the org. Built so a 50-seat floor reads at a glance.' },
          { h: 'ElectricSQL + RabbitMQ messaging layer', b: 'ElectricSQL gives instant message sync across clients with conflict-free reads. RabbitMQ handles async delivery, receipts, and push notifications without blocking the API.' },
          { h: 'Better-Auth + OAuth 2.0', b: 'Granular permission assignment and revocation across agents and org hierarchies. Roles compose; permissions are leaf-level; revocation is immediate.' },
          { h: 'Multi-tenant data isolation', b: 'Each org\'s data is fully partitioned. RBAC policies, channel-based comms, and real-time attendance tracking are all org-scoped by design — not bolted on.' },
        ]} />
      </CaseSection>

      <CaseSection n="03" kicker="ARCHITECTURE" title="Three layers, one event spine.">
        <Prose>
          <p>The frontend talks to a Hono API over oRPC for typed end-to-end calls. Drizzle on PostgreSQL is the source of truth; ElectricSQL syncs the relevant slice of state to clients in real time. RabbitMQ handles everything that isn't allowed to block. FreeSWITCH sits behind the API for VoIP.</p>
        </Prose>
        <div style={{ marginTop: 32 }}>
          <ArchDiagram title="Work Holo system" nodes={ARCH_NODES} edges={ARCH_EDGES} />
        </div>
      </CaseSection>

      <CaseSection n="04" kicker="SIGNALS" title="What the build delivered.">
        <MetricGrid items={[
          { v: 'Real-time', k: 'call state sync',       sub: 'live ring/answer/hangup events to the agent UI' },
          { v: 'Multi-tenant', k: 'RBAC + isolation',   sub: '39+ permissions · 5 roles · org-scoped' },
          { v: 'SIP',       k: 'trunks + DID',          sub: 'PSTN egress via FreeSWITCH' },
          { v: '0',         k: 'page reloads',           sub: 'ElectricSQL keeps clients in sync' },
        ]} />
      </CaseSection>

      <CaseSection n="05" kicker="STACK" title="What's underneath.">
        <StackBlock groups={[
          { k: 'FRONTEND', items: ['React', 'oRPC client', 'TypeScript', 'Tailwind'] },
          { k: 'API',      items: ['Hono', 'oRPC', 'Bun', 'Better-Auth'] },
          { k: 'DATA',     items: ['PostgreSQL', 'Drizzle', 'ElectricSQL'] },
          { k: 'INFRA',    items: ['RabbitMQ', 'FreeSWITCH', 'SIP / DID'] },
        ]} />
      </CaseSection>

      <CaseSection n="06" kicker="WHAT I LEARNED" title="Lessons that stuck.">
        <Prose>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>FreeSWITCH is unforgiving.</strong> Telephony state is lossy by default — every event is a chance to drift. Push the state machine into a single typed reducer, replay events on reconnect, and assume nothing.</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>ElectricSQL is the right shape for this.</strong> Treating the DB as the sync surface eliminated a category of "is the UI up to date?" bugs. The clients converge; you don't manage it.</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>RBAC needs to be a first-class object.</strong> Bolting permissions on after the schema exists means you're adding WHERE clauses everywhere. Design org-scoping into the data model from row one.</p>
        </Prose>
      </CaseSection>

      <CaseFooter next={{ href: '/crelyzor', name: 'Crelyzor', tagline: 'AI-powered productivity platform — meetings, tasks, identity. Deepgram + OpenAI + Next.js.' }} />

    </>
  );
}
