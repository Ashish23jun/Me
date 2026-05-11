import { useState, useEffect } from 'react';
import { PALETTE, FONTS } from '@tokens';

export function EasterEggs() {
  const [konami, setKonami] = useState(false);

  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === seq[i]) {
        i++;
        if (i === seq.length) { setKonami(true); i = 0; }
      } else {
        i = e.key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!konami) return null;

  return (
    <div onClick={() => setKonami(false)} style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'color-mix(in srgb, var(--ap-bg) 96%, transparent)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.mono, color: PALETTE.fg, animation: 'apFadeUp .35s ease', cursor: 'pointer' }}>
      <div style={{ textAlign: 'center', maxWidth: 600, padding: 32 }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 96, fontStyle: 'italic', color: PALETTE.accent, letterSpacing: '-0.03em', marginBottom: 24 }}>
          you found it.
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: PALETTE.fgSoft }}>
          $ secret unlocked: konami<br />
          you're the kind of person I want to work with.<br />
          drop me a line — pandey.k.ashish.86@gmail.com<br /><br />
          <span style={{ color: PALETTE.fgMute }}>(click anywhere to dismiss)</span>
        </div>
      </div>
    </div>
  );
}
