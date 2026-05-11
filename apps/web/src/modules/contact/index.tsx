import { useState } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { CustomCursor } from '@/modules/shared/components/CustomCursor';
import { Navigation } from '@/modules/shared/components/Navigation';
import { useUIStore } from '@/modules/shared/store/uiStore';

function useCalUrl(slug: string) {
  const theme = useUIStore(s => s.theme);
  return `https://cal.com/${slug}?embed=1&theme=${theme}`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => {
      try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch (_) {}
    }} style={{ background: 'transparent', color: PALETTE.fgMute, border: `1px solid ${PALETTE.hairline}`, padding: '4px 10px', fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer', borderRadius: 0, transition: 'all .15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.accent; (e.currentTarget as HTMLButtonElement).style.color = PALETTE.accent; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.hairline; (e.currentTarget as HTMLButtonElement).style.color = PALETTE.fgMute; }}>
      {copied ? 'COPIED ✓' : 'COPY'}
    </button>
  );
}

interface ChannelRowProps { k: string; label: string; value: string; href: string; copy?: string; }

function ChannelRow({ k, label, value, href, copy }: ChannelRowProps) {
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto auto', gap: 24, alignItems: 'center', padding: '20px 0', borderTop: `1px solid ${PALETTE.hairline}`, transition: 'padding-left .25s, background .2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '12px'; (e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${PALETTE.accent}08, transparent 60%)`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: PALETTE.accent }}>{k}</div>
      <div>
        <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 22, letterSpacing: '-0.012em', color: PALETTE.fg }}>{label}</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: PALETTE.fgMute, marginTop: 2 }}>{value}</div>
      </div>
      {copy && <div onClick={e => e.preventDefault()}><CopyButton text={copy} /></div>}
      <span style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgSoft }}>{href.startsWith('http') ? '↗' : '→'}</span>
    </a>
  );
}

function Logistics({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.16em', color: PALETTE.fgMute, marginBottom: 8 }}>{k}</div>
      <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 22, letterSpacing: '-0.015em', color: PALETTE.fg }}>{v}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: PALETTE.fgMute, fontWeight: 300, lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

function BookingEmbed({ calUrl }: { calUrl: string }) {
  return (
    <div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: PALETTE.accent, marginBottom: 18 }}>№02 — BOOK A 15-MIN INTRO</div>

      {/* Cal.com iframe */}
      <div style={{ border: `1px solid ${PALETTE.hairline}`, background: PALETTE.bgRaised, overflow: 'hidden' }}>
        <iframe
          src={calUrl}
          width="100%"
          height="640"
          frameBorder={0}
          loading="lazy"
          style={{ display: 'block' }}
          title="Book a call"
        />
      </div>

      {/* Crelyzor alt — blocked by X-Frame-Options, open in new tab instead */}
      <a
        href="https://crelyzor.app/schedule/ashish-pandey/15-min-introduction"
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          border: `1px solid ${PALETTE.hairline}`,
          background: 'transparent',
          transition: 'border-color .15s, background .15s',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = PALETTE.accent;
          (e.currentTarget as HTMLElement).style.background = `${PALETTE.accent}08`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = PALETTE.hairline;
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
      >
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.16em', color: PALETTE.accent, marginBottom: 4 }}>OR BOOK VIA MY OWN APP</div>
          <div style={{ fontFamily: FONTS.serif, fontWeight: 300, fontSize: 18, color: PALETTE.fg, letterSpacing: '-0.01em' }}>Crelyzor — 15-min intro</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: PALETTE.fgMute, marginTop: 2 }}>crelyzor.app/schedule/ashish-pandey/15-min-introduction</div>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 18, color: PALETTE.accent }}>↗</span>
      </a>
    </div>
  );
}

export function ContactPage() {
  const calUrl = useCalUrl('ashish23jun/15-min-intro');
  return (
    <>
      <CustomCursor />
      <Navigation />

      <section style={{ padding: '160px 56px 60px' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.22em', color: PALETTE.fgMute, marginBottom: 36, display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: PALETTE.good, boxShadow: `0 0 8px ${PALETTE.good}`, animation: 'apBlink 2s ease infinite' }} />
          <span style={{ color: PALETTE.good }}>OPEN TO OPPORTUNITIES — SDE I · SDE II · FOUNDING</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(72px, 11vw, 168px)', lineHeight: 0.92, letterSpacing: '-0.04em', maxWidth: 1200 }}>
          Got something{' '}
          <span style={{ fontFamily: FONTS.serifIt, fontStyle: 'italic', color: PALETTE.accent }}>worth building</span>?<br />
          Let's talk.
        </h1>
        <div style={{ marginTop: 32, fontSize: 20, color: PALETTE.fgSoft, maxWidth: 720, fontWeight: 300, lineHeight: 1.5 }}>
          Email is fastest. Cal.com if you want a 15-min intro on the books. I read everything and reply within 24 hours.
        </div>
      </section>

      <section style={{ padding: '40px 56px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: PALETTE.accent, marginBottom: 18 }}>№01 — REACH ME</div>
          <ChannelRow k="EMAIL" label="pandey.k.ashish.86@gmail.com" value="usually replies within a day" href="mailto:pandey.k.ashish.86@gmail.com" copy="pandey.k.ashish.86@gmail.com" />
          <ChannelRow k="LINKEDIN" label="/in/ashish23jun" value="for recruiters + intros" href="https://linkedin.com/in/ashish23jun" />
          <ChannelRow k="GITHUB" label="@ashish23jun" value="code + side projects" href="https://github.com/Ashish23jun" />
          <ChannelRow k="X" label="@ig_ashish_23" value="builder + AI eng updates" href="https://twitter.com/ig_ashish_23" />
          <ChannelRow k="LEETCODE" label="/ashish23june" value="for technical screens" href="https://leetcode.com/ashish23june" />
          <ChannelRow k="CODEFORCES" label="/ash_lie" value="competitive history" href="https://codeforces.com/profile/ash_lie" />

          <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${PALETTE.hairline}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Logistics k="LOCATION" v="India 🇮🇳" sub="IST · UTC+5:30" />
            <Logistics k="WORKING HOURS" v="9am — 1am IST" sub="overlap with US PT mornings + EU afternoons" />
            <Logistics k="OPEN TO" v="SDE I · SDE II" sub="Founding · Full-time · Remote / relocation" />
            <Logistics k="RESPONSE" v="< 24 hours" sub="Email beats DMs" />
          </div>
        </div>

        <BookingEmbed calUrl={calUrl} />
      </section>

      <section style={{ padding: '60px 56px 120px', borderTop: `1px solid ${PALETTE.hairline}` }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: PALETTE.fgMute, marginBottom: 24 }}>№03 — OR JUST EMAIL</div>
        <a href="mailto:pandey.k.ashish.86@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 24, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(36px, 5vw, 72px)', color: PALETTE.fg, letterSpacing: '-0.025em', borderBottom: `1px solid ${PALETTE.hairline}`, paddingBottom: 16 }} className="ap-link">
          pandey.k.ashish.86@gmail.com
          <span style={{ fontSize: 32, color: PALETTE.accent }}>↗</span>
        </a>
        <div style={{ marginTop: 80, paddingTop: 28, borderTop: `1px solid ${PALETTE.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute }}>
          <span>© ASHISH PANDEY · MMXXVI</span>
          <span>SHIP FAST · LEARN FASTER</span>
        </div>
      </section>
    </>
  );
}
