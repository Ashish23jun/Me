import { PALETTE, FONTS } from '@tokens';

export function HomeContact() {
  return (
    <section id="contact" style={{ padding: '160px 56px 120px' }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.2em', color: PALETTE.fgMute, marginBottom: 36 }}>№07 — CONTACT</div>
      <h2 className="ap-home-contact-h2" style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(64px, 9vw, 144px)', lineHeight: 0.95, letterSpacing: '-0.035em', maxWidth: 1200 }}>
        Got something{' '}
        <span style={{ fontFamily: FONTS.serifIt, fontStyle: 'italic', color: PALETTE.accent }}>worth building</span>?<br />
        Let's talk.
      </h2>
      <a href="mailto:pandey.k.ashish.86@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginTop: 56, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 'clamp(18px, 4.5vw, 36px)', color: PALETTE.fg, letterSpacing: '-0.015em', borderBottom: `1px solid ${PALETTE.hairline}`, paddingBottom: 12 }} className="ap-link ap-home-contact-email">
        pandey.k.ashish.86@gmail.com
        <span style={{ fontSize: 24, color: PALETTE.accent }}>↗</span>
      </a>
      <div className="ap-home-footer" style={{ marginTop: 80, paddingTop: 32, borderTop: `1px solid ${PALETTE.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: PALETTE.fgMute, flexWrap: 'wrap', gap: 16 }}>
        <span>© ASHISH PANDEY · MMXXVI</span>
        <span className="ap-home-footer-links" style={{ display: 'inline-flex', gap: 22 }}>
          <a href="https://github.com/Ashish23jun" target="_blank" rel="noreferrer" className="ap-link">GITHUB ↗</a>
          <a href="https://linkedin.com/in/ashish23jun" target="_blank" rel="noreferrer" className="ap-link">LINKEDIN ↗</a>
          <a href="https://twitter.com/ig_ashish_23" target="_blank" rel="noreferrer" className="ap-link">X ↗</a>
          <a href="https://leetcode.com/ashish23june" target="_blank" rel="noreferrer" className="ap-link">LEETCODE ↗</a>
          <a href="/Ashish_Resume.pdf" target="_blank" className="ap-link" style={{ color: PALETTE.fg }}>RESUME.PDF ↓</a>
        </span>
        <span>SHIP FAST · LEARN FASTER</span>
      </div>
    </section>
  );
}
