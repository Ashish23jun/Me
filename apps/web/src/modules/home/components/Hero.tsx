import { useState, useEffect } from 'react';
import { PALETTE, FONTS } from '@tokens';
import { Caret } from '@/modules/shared/components/Caret';
import { Pill } from '@/modules/shared/components/Pill';

const ROLES = ['Fullstack Engineer', 'AI Engineer', 'Founding Engineer', 'Builder'];

function useCyclingWord(words: string[], ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % words.length), ms);
    return () => clearInterval(t);
  }, [words.length, ms]);
  return [words[i], i] as const;
}

function useTyped(str: string, speed = 70, startDelay = 350) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setN(prev => { if (prev >= str.length) { clearInterval(id); return prev; } return prev + 1; });
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [str, speed, startDelay]);
  return str.slice(0, n);
}

function CornerMarks() {
  const m = (style: React.CSSProperties) => (
    <div style={{ position: 'absolute', width: 14, height: 14, borderColor: PALETTE.accent, ...style }} />
  );
  return (
    <>
      {m({ top: 8, left: 8, borderTop: '1px solid', borderLeft: '1px solid' })}
      {m({ top: 8, right: 8, borderTop: '1px solid', borderRight: '1px solid' })}
      {m({ bottom: 8, left: 8, borderBottom: '1px solid', borderLeft: '1px solid' })}
      {m({ bottom: 8, right: 8, borderBottom: '1px solid', borderRight: '1px solid' })}
    </>
  );
}

function IndexLine({ n, label, tag, pulse, href }: { n: string; label: string; tag?: string; pulse?: boolean; href: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 10, paddingRight: 4, paddingLeft: hover ? 4 : 0,
        color: hover ? PALETTE.fg : PALETTE.fgSoft,
        transition: 'color .15s, padding-left .2s',
      }}>
      <span style={{ display: 'flex', gap: 14 }}>
        <span style={{ color: PALETTE.fgFaint, width: 18 }}>{n}</span>
        <span>{label}</span>
      </span>
      {tag && <Pill accent={true} pulse={pulse}>{tag.toUpperCase()}</Pill>}
    </a>
  );
}

export function Hero() {
  const [role, roleIdx] = useCyclingWord(ROLES, 2400);
  const typed = useTyped('Ashish Pandey.', 70, 350);
  const done = typed.length >= 'Ashish Pandey.'.length;

  return (
    <section id="top" style={{ minHeight: '100vh', padding: '120px 56px 48px', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 0 }}>
      <div />
      <div className="ap-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.7fr 320px', gap: 56, alignItems: 'end', paddingBottom: 60 }}>
        {/* Name + role */}
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.22em', color: PALETTE.fgMute, marginBottom: 36 }}>
            №01 — INDEX <span style={{ color: PALETTE.accent }}>·</span> INDIA · EST. 2002
          </div>
          <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(72px, 10vw, 168px)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
            {typed.replace('.', '')}
            {typed.includes('.') && <span style={{ color: PALETTE.accent, fontStyle: 'italic', fontFamily: FONTS.serifIt }}>.</span>}
            {!done && <Caret w="0.08em" h="0.65em" />}
          </h1>
          <div style={{ marginTop: 36, display: 'flex', gap: 18, alignItems: 'baseline', flexWrap: 'wrap', fontSize: 'clamp(20px, 1.8vw, 28px)', color: PALETTE.fg, fontWeight: 300 }}>
            <span style={{ color: PALETTE.fgMute }}>is a</span>
            <span key={roleIdx} style={{ position: 'relative', display: 'inline-block', minWidth: 320, fontFamily: FONTS.serifIt, fontStyle: 'italic', fontSize: 'clamp(26px, 2.4vw, 40px)', color: PALETTE.fg }}>
              <span style={{ display: 'inline-block', animation: 'apFadeUp .5s ease' }}>{role}</span>
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -4, height: 1, background: PALETTE.accent, opacity: 0.4 }} />
              <span style={{ position: 'absolute', left: 0, bottom: -4, width: '40%', height: 1, background: PALETTE.accent, animation: 'apSweep 2.4s linear infinite' }} />
            </span>
            <span style={{ color: PALETTE.fgMute }}>shipping at the edge of</span>
            <span style={{ color: PALETTE.accent, fontFamily: FONTS.mono, fontSize: 'clamp(16px, 1.4vw, 20px)' }}>AI × infra.</span>
          </div>
        </div>

        {/* Portrait */}
        <div className="ap-hero-portrait" style={{ position: 'relative', alignSelf: 'end', aspectRatio: '2 / 3', width: '100%', animation: 'apFadeUp 1.2s ease' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/assets/ashish-portrait.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 18%', filter: 'grayscale(0.85) contrast(1.15) brightness(0.78)', maskImage: 'radial-gradient(ellipse 70% 75% at 52% 38%, #000 38%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.35) 78%, transparent 95%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 75% at 52% 38%, #000 38%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.35) 78%, transparent 95%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${PALETTE.accent}1a 0%, transparent 40%, ${PALETTE.bg} 95%)`, mixBlendMode: 'overlay', maskImage: 'radial-gradient(ellipse 70% 75% at 52% 38%, #000 38%, transparent 90%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 75% at 52% 38%, #000 38%, transparent 90%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, ${PALETTE.bg} 92%)` }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none', backgroundImage: `radial-gradient(${PALETTE.fg} 0.5px, transparent 0.5px)`, backgroundSize: '3px 3px', mixBlendMode: 'overlay' }} />
          <CornerMarks />
          <div style={{ position: 'absolute', left: 0, bottom: -28, fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: PALETTE.fgMute }}>FIG.01 — A.P. / 2026</div>
        </div>

        {/* Index column */}
        <div className="ap-hero-index" style={{ fontFamily: FONTS.mono, fontSize: 12, lineHeight: 1.85, color: PALETTE.fgMute, borderLeft: `1px solid ${PALETTE.hairline}`, paddingLeft: 22, alignSelf: 'end' }}>
          <div style={{ color: PALETTE.fg, fontSize: 11, letterSpacing: '0.18em', marginBottom: 14 }}>INDEX</div>
          <IndexLine n="01" label="About" href="#about" />
          <IndexLine n="02" label="Crelyzor" href="#crelyzor" tag="case" />
          <IndexLine n="03" label="Work Holo" href="#work-holo" tag="case" />
          <IndexLine n="04" label="Selected work" href="#selected" />
          <IndexLine n="05" label="Stack" href="#stack" />
          <IndexLine n="06" label="Now" href="#now" tag="live" pulse />
          <IndexLine n="07" label="Contact" href="#contact" />
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${PALETTE.hairline}`, color: PALETTE.fg, fontSize: 11 }}>
            <div style={{ color: PALETTE.fgMute, marginBottom: 6 }}>NOW</div>
            <div>Founding Eng @ Creators Mela</div>
            <div style={{ color: PALETTE.fgMute }}>Building Work Holo · learning AI eng</div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="ap-hero-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute, paddingTop: 18, borderTop: `1px solid ${PALETTE.hairline}` }}>
        <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <span style={{ display: 'inline-block', animation: 'apPulse 2s ease infinite' }}>↓</span>
          SCROLL FOR THE WORK
        </span>
        <span style={{ display: 'inline-flex', gap: 22 }}>
          <a href="https://github.com/Ashish23jun" target="_blank" rel="noreferrer" className="ap-link">GITHUB</a>
          <a href="https://linkedin.com/in/ashish23jun" target="_blank" rel="noreferrer" className="ap-link">LINKEDIN</a>
          <a href="https://twitter.com/ig_ashish_23" target="_blank" rel="noreferrer" className="ap-link">X</a>
          <a href="mailto:pandey.k.ashish.86@gmail.com" className="ap-link">MAIL</a>
        </span>
        <span style={{ color: PALETTE.fg }}>MAY 2026</span>
      </div>
    </section>
  );
}
