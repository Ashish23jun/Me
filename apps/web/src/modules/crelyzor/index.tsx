import { PALETTE, FONTS } from '@tokens';
import { CustomCursor } from '@/modules/shared/components/CustomCursor';
import { CaseNav } from '@/modules/shared/components/CaseNav';
import { CaseHero, CaseSection, Prose, BuildList, MetricGrid, StackBlock, ArchDiagram, CaseFooter } from '@/modules/shared/components/CaseComponents';

const ARCH_NODES = [
  { id: 'fe',    label: 'Next.js Frontend', sub: 'meeting · tasks · identity', x: 20,  y: 60,  w: 200, h: 60 },
  { id: 'api',   label: 'Node.js API',       sub: 'TS microservices',           x: 280, y: 60,  w: 180, h: 60, accent: true },
  { id: 's3',    label: 'S3',                sub: 'media · presigned uploads',  x: 280, y: 300, w: 180, h: 60 },
  { id: 'pg',    label: 'PostgreSQL',        sub: 'tasks · identity · users',   x: 520, y: 40,  w: 180, h: 60 },
  { id: 'mongo', label: 'MongoDB',           sub: 'transcripts · search',       x: 520, y: 130, w: 180, h: 60 },
  { id: 'q',     label: 'Job Queue',         sub: 'AWS · async workers',        x: 520, y: 260, w: 180, h: 60 },
  { id: 'dg',    label: 'Deepgram',          sub: 'transcription · diarization',x: 760, y: 200, w: 180, h: 60, accent: true },
  { id: 'oa',    label: 'OpenAI',            sub: 'summaries · task extraction',x: 760, y: 290, w: 180, h: 60, accent: true },
  { id: 'cal',   label: 'Calendar Sync',     sub: 'Google · iCal',              x: 760, y: 60,  w: 180, h: 60 },
];

const ARCH_EDGES = [
  { from: 'fe',  to: 'api' },
  { from: 'fe',  to: 's3',   label: 'presigned' },
  { from: 'api', to: 'pg' },
  { from: 'api', to: 'mongo' },
  { from: 'api', to: 'q',    label: 'enqueue' },
  { from: 'q',   to: 'dg' },
  { from: 'q',   to: 'oa' },
  { from: 'api', to: 'cal',  dashed: true },
  { from: 'dg',  to: 'mongo',dashed: true },
  { from: 'oa',  to: 'pg',   dashed: true, label: 'tasks' },
];

export function CrelyzorPage() {
  return (
    <>
      <CustomCursor />
      <CaseNav current="03.1 / Crelyzor" />

      <CaseHero
        n="03.1" name="Crelyzor"
        tagline={<>AI-powered productivity platform — <em style={{ fontFamily: FONTS.serifIt, color: PALETTE.accent }}>meetings, tasks, identity</em></>}
        live="crelyzor.app" status="LIVE" year="2024 — 2025" role="Fullstack · end-to-end build"
      />

      <CaseSection n="01" kicker="THE PROBLEM" title="Meetings make context. Almost none of it survives.">
        <Prose>
          <p>Meetings produce a mountain of context that never makes it into your task list. Existing tools record OR transcribe OR extract action items — none unify scheduling, identity, and post-meeting follow-through in one place.</p>
        </Prose>
      </CaseSection>

      <CaseSection n="02" kicker="WHAT I BUILT" title="End-to-end, full-stack.">
        <BuildList items={[
          { h: 'Real-time meeting intelligence', b: 'Auto-recording, transcription with speaker diarization, AI summarization, action-item extraction.' },
          { h: 'Automatic task extraction', b: 'Conversations become structured to-dos linked back to the source moment in the recording.' },
          { h: 'Smart scheduling + calendar sync', b: 'Global search across meetings, tasks, and contacts.' },
          { h: 'Shareable digital identity cards', b: 'A modern business-card layer that sits on top of the productivity stack.' },
          { h: 'Hybrid real-time + async pipelines', b: 'Deepgram for transcription, OpenAI for summaries, S3 for media, EC2 for steady-state workloads.' },
        ]} />
      </CaseSection>

      <CaseSection n="03" kicker="ARCHITECTURE" title="Hybrid pipeline — real-time on the way in, structured on the way out.">
        <Prose>
          <p>Media is uploaded direct from client to S3 via presigned URLs. The Node.js API enqueues post-upload work — Deepgram for transcription + diarization, OpenAI for summarization and task extraction. Transcripts land in MongoDB for search; extracted tasks and identity data live in Postgres.</p>
        </Prose>
        <div style={{ marginTop: 32 }}>
          <ArchDiagram title="Crelyzor pipeline" nodes={ARCH_NODES} edges={ARCH_EDGES} />
        </div>
      </CaseSection>

      <CaseSection n="04" kicker="SIGNALS" title="What the build delivered.">
        <MetricGrid items={[
          { v: 'Real-time', k: 'transcription + diarization', sub: 'speaker-attributed meeting outputs' },
          { v: 'AI-native', k: 'summaries + tasks',           sub: 'OpenAI-driven extraction pipeline' },
          { v: 'Unified',   k: 'meetings · tasks · identity', sub: 'one schema across the product' },
          { v: 'Hybrid',    k: 'sync + async',                sub: 'live recording, queued post-processing' },
        ]} />
      </CaseSection>

      <CaseSection n="05" kicker="STACK" title="What's underneath.">
        <StackBlock groups={[
          { k: '', items: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'OpenAI', 'Deepgram', 'AWS S3 / EC2'] },
        ]} />
      </CaseSection>

      <CaseSection n="06" kicker="WHAT I LEARNED" title="Lessons that stuck.">
        <Prose>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>The pipeline is the product.</strong> Users don't care about Deepgram or OpenAI — they care that "task extraction" is reliable. Build the pipeline as a first-class object with clear stage boundaries and you can swap providers later.</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>Linking back to the source moment is the unlock.</strong> The feature that makes Crelyzor feel different isn't transcription — it's that clicking a task jumps you to the exact sentence it came from. That's the differentiator; build the data model to support it from day one.</p>
          <p><strong style={{ color: PALETTE.fg, fontWeight: 500 }}>Presigned S3 uploads are non-negotiable at scale.</strong> Routing video through the API server is a death sentence for latency and cost. Get media off the hot path early.</p>
        </Prose>
      </CaseSection>

      <CaseFooter next={{ href: '/work-holo', name: 'Work Holo', tagline: 'Multi-tenant agent platform for outbound voice — FreeSWITCH, RabbitMQ, ElectricSQL.' }} />

    </>
  );
}
