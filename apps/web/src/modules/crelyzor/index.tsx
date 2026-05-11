import { PALETTE, FONTS } from '@tokens';
import { CustomCursor } from '@/modules/shared/components/CustomCursor';
import { CaseNav } from '@/modules/shared/components/CaseNav';
import { CaseHero, CaseSection, Prose, BuildList, MetricGrid, StackBlock, ArchDiagram, CaseFooter } from '@/modules/shared/components/CaseComponents';

// ─── Architecture diagram ───────────────────────────────────────────────────
// Actual infra: GCP Cloud Run (backend) · Vercel (frontends)
// Storage: Google Cloud Storage · DB: PostgreSQL (Neon) · Queues: Bull + Redis
// AI: Gemini 2.0 Flash · Transcription: Deepgram Nova-3 · Bots: Recall.ai

const ARCH_NODES = [
  { id: 'dash',    label: 'React Dashboard',    sub: 'Vite · Zustand · TanStack',   x: 20,  y: 40,  w: 200, h: 60 },
  { id: 'pub',     label: 'Next.js Public',     sub: 'SSR · cards · booking · mtg', x: 20,  y: 160, w: 200, h: 60 },
  { id: 'api',     label: 'Node.js API',         sub: 'Express 5 · TypeScript',      x: 290, y: 100, w: 180, h: 60, accent: true },
  { id: 'pg',      label: 'PostgreSQL',          sub: 'Neon · Prisma 6 ORM',         x: 540, y: 20,  w: 180, h: 60 },
  { id: 'redis',   label: 'Redis + Bull',        sub: 'async job queues',            x: 540, y: 110, w: 180, h: 60 },
  { id: 'gcs',     label: 'Google Cloud Storage',sub: 'recordings · presigned',      x: 540, y: 200, w: 180, h: 60 },
  { id: 'dg',      label: 'Deepgram Nova-3',     sub: 'transcription · diarization', x: 790, y: 20,  w: 180, h: 60, accent: true },
  { id: 'gem',     label: 'Gemini 2.0 Flash',    sub: 'summary · tasks · Ask AI',    x: 790, y: 110, w: 180, h: 60, accent: true },
  { id: 'recall',  label: 'Recall.ai',           sub: 'bot joins Meet / Zoom',       x: 790, y: 200, w: 180, h: 60 },
  { id: 'gcal',    label: 'Google Calendar',     sub: 'read + write sync',           x: 790, y: 290, w: 180, h: 60 },
];

const ARCH_EDGES = [
  { from: 'dash',   to: 'api' },
  { from: 'pub',    to: 'api' },
  { from: 'api',    to: 'pg' },
  { from: 'api',    to: 'redis',  label: 'enqueue' },
  { from: 'api',    to: 'gcs',    label: 'presigned' },
  { from: 'redis',  to: 'dg' },
  { from: 'redis',  to: 'gem' },
  { from: 'dg',     to: 'pg',     dashed: true, label: 'transcript' },
  { from: 'gem',    to: 'pg',     dashed: true, label: 'tasks' },
  { from: 'api',    to: 'recall', dashed: true },
  { from: 'recall', to: 'dg',    dashed: true },
  { from: 'api',    to: 'gcal',   dashed: true },
];

export function CrelyzorPage() {
  return (
    <>
      <CustomCursor />
      <CaseNav current="03.1 / Crelyzor" />

      <CaseHero
        n="03.1" name="Crelyzor"
        tagline={<>AI-powered productivity platform — <em style={{ fontFamily: FONTS.serifIt, color: PALETTE.accent }}>meetings, tasks, identity</em></>}
        live="crelyzor.app" status="LIVE" year="2024 — 2025" role="Fullstack · end-to-end solo build"
      />

      <CaseSection n="01" kicker="THE PROBLEM" title="Meetings make context. Almost none of it survives.">
        <Prose>
          <p>Meetings produce a mountain of context that never makes it into your task list. Existing tools record OR transcribe OR extract action items — none unify scheduling, identity, and post-meeting follow-through in one place.</p>
          <p>Professionals juggle 5+ disconnected tools: HiHello for identity, Otter.ai for transcription, Cal.com for scheduling, Todoist for tasks. Crelyzor collapses them into one product where everything knows about everything else — a card contact becomes a meeting participant, a meeting auto-generates tasks, a booked meeting auto-deploys a recording bot.</p>
        </Prose>
      </CaseSection>

      <CaseSection n="02" kicker="WHAT I BUILT" title="End-to-end, full-stack.">
        <BuildList items={[
          { h: 'Real-time meeting intelligence', b: 'Auto-recording, transcription with speaker diarization (Deepgram Nova-3 Multilingual, 45+ languages), AI summarization, action-item extraction. Every meeting comes out searchable, attributed, and summarized — no manual work.' },
          { h: 'Recall.ai online meeting bot', b: 'For online meetings: a bot auto-joins Google Meet or Zoom at the scheduled time, records the call, and feeds audio into the same Deepgram + Gemini pipeline. Users just toggle "Record online meetings" — no API key needed.' },
          { h: 'Automatic task extraction', b: 'Conversations become structured to-dos via Gemini 2.0 Flash. Each task links back to the exact transcript sentence it came from — one click jumps you to the source moment. Also supports Ask AI (streaming SSE) and one-click content generation: report, tweet, blog post, follow-up email.' },
          { h: 'Timezone-aware scheduling engine', b: 'Cal.com-style booking built from scratch. Slot calculation: your availability − existing meetings − confirmed bookings − Google Calendar busy-time − buffers. Serializable transactions prevent double-booking race conditions. Full email flow via Resend: confirmation, reminder, cancellation.' },
          { h: 'Google Calendar bidirectional sync', b: 'OAuth read sync for busy-time injection into the slot engine. Write sync creates a GCal event (with auto-generated Meet link) for every Crelyzor meeting. Unified calendar view merges Crelyzor meetings, GCal events, and scheduled tasks in one grid.' },
          { h: 'Full task manager + unified calendar', b: 'Todoist-quality tasks with natural language parsing ("call John tomorrow at 3pm high priority"), board view, subtasks, recurring rules, AI-extracted source, and calendar time-blocking. Global search and universal tags span meetings, tasks, cards, and contacts.' },
        ]} />
      </CaseSection>

      <CaseSection n="03" kicker="ARCHITECTURE" title="Async pipeline — fast on the way in, structured on the way out.">
        <Prose>
          <p>Media is uploaded directly from the client to Google Cloud Storage via presigned URLs — never touches the API server. The Node.js API (Express 5, GCP Cloud Run) enqueues a Bull job backed by Redis. Workers pull from the queue: Deepgram transcribes with speaker diarization, then Gemini processes the transcript for summary, key points, and task extraction. Outputs land in PostgreSQL (Neon) via Prisma 6.</p>
          <p>For online meetings, Recall.ai deploys a bot to the meeting URL at the scheduled time. The bot streams audio, and its output feeds into the same Deepgram → Gemini pipeline. Three apps on Vercel: the authenticated React dashboard (Vite), the SSR public site (Next.js App Router — card pages, booking pages, published meetings).</p>
        </Prose>
        <div style={{ marginTop: 32 }}>
          <ArchDiagram title="Crelyzor pipeline" nodes={ARCH_NODES} edges={ARCH_EDGES} />
        </div>
      </CaseSection>

      <CaseSection n="04" kicker="SIGNALS" title="What the build delivered.">
        <MetricGrid items={[
          { v: 'Nova-3',    k: 'Deepgram model',              sub: '45+ languages · speaker diarization' },
          { v: 'Gemini',    k: '2.0 Flash for AI',            sub: 'summary · tasks · Ask AI · content gen' },
          { v: 'Recall.ai', k: 'online meeting bots',         sub: 'auto-joins Meet + Zoom, no user API key' },
          { v: '3-repo',    k: 'architecture',                sub: 'backend · dashboard · public SSR site' },
          { v: 'Async',     k: 'Bull + Redis queues',         sub: 'media never on hot path · scales per stage' },
          { v: 'Phase 4',   k: 'billing + monetization',      sub: 'Free · Pro $19/mo · Business (custom)' },
        ]} />
      </CaseSection>

      <CaseSection n="05" kicker="STACK" title="What's underneath.">
        <StackBlock groups={[
          { k: '', items: ['Node.js', 'Express 5', 'TypeScript', 'Prisma 6', 'PostgreSQL', 'Redis', 'Bull', 'React 19', 'Vite', 'Next.js', 'Deepgram Nova-3', 'Gemini 2.0 Flash', 'Recall.ai', 'Google Cloud Storage', 'GCP Cloud Run', 'Vercel', 'Resend'] },
        ]} />
      </CaseSection>

      <CaseSection n="06" kicker="WHAT I LEARNED" title="Lessons that stuck.">
        <Prose>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>The pipeline is the product.</strong> Users don't care about Deepgram or Gemini — they care that "task extraction" is reliable. Build the pipeline as a first-class object with clear stage boundaries and swap providers without touching the frontend. (This is why the OpenAI → Gemini migration was a one-file change.)</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>Linking back to the source moment is the unlock.</strong> The feature that makes Crelyzor feel different isn't transcription — it's that clicking an AI-extracted task jumps you to the exact sentence it came from. That's the differentiator; build the data model to support it from day one.</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>Presigned uploads are non-negotiable at scale.</strong> Routing audio/video through the API server is a death sentence for latency and cost. Get media off the hot path immediately — let the client talk directly to GCS and let the API just orchestrate.</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>Serializable transactions for double-booking.</strong> The slot engine calculates availability across multiple sources simultaneously. Without serializable isolation, concurrent bookings could land on the same slot. SERIALIZABLE transactions catch the conflict at commit time — simpler than application-level locking.</p>
        </Prose>
      </CaseSection>

      <CaseFooter next={{ href: '/work-holo', name: 'Work Holo', tagline: 'Multi-tenant agent platform for outbound voice — FreeSWITCH, RabbitMQ, ElectricSQL.' }} />

    </>
  );
}
