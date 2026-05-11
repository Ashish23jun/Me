import { useEffect, useRef } from 'react';
import { PALETTE, FONTS } from '@tokens';

interface SectionHeadProps {
  n: string;
  kicker: string;
  title: string;
  sub?: string;
}

export function SectionHead({ n, kicker, title, sub }: SectionHeadProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32,
      paddingBottom: 28, marginBottom: 56,
      borderBottom: `1px solid ${PALETTE.hairline}`,
      alignItems: 'end',
      opacity: 0, transform: 'translateY(14px)',
      transition: 'opacity .7s ease, transform .7s ease',
    }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.18em', color: PALETTE.fgMute, paddingBottom: 8 }}>
        №{n}
      </div>
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: PALETTE.accent, marginBottom: 14 }}>
          {kicker}
        </div>
        <h2 style={{ margin: 0, fontFamily: FONTS.serif, fontWeight: 300, fontSize: 64, lineHeight: 1, letterSpacing: '-0.025em' }}>
          {title}
        </h2>
        {sub && (
          <div style={{ marginTop: 18, fontSize: 17, color: PALETTE.fgSoft, maxWidth: 640, lineHeight: 1.55, fontWeight: 300 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
