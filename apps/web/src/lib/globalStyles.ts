import { DARK, LIGHT, FONTS } from '@tokens';

function vars(p: typeof DARK) {
  return `
    --ap-bg:            ${p.bg};
    --ap-bg-raised:     ${p.bgRaised};
    --ap-fg:            ${p.fg};
    --ap-fg-mute:       ${p.fgMute};
    --ap-fg-soft:       ${p.fgSoft};
    --ap-fg-faint:      ${p.fgFaint};
    --ap-accent:        ${p.accent};
    --ap-accent-deep:   ${p.accentDeep};
    --ap-accent-soft:   ${p.accentSoft};
    --ap-hairline:      ${p.hairline};
    --ap-hairline-soft: ${p.hairlineSoft};
    --ap-good:          ${p.good};
  `;
}

export function injectGlobalStyles() {
  if (document.getElementById('ap-global')) return;
  const s = document.createElement('style');
  s.id = 'ap-global';
  s.textContent = `
    /* ── Theme variables ───────────────────────────────────── */
    :root                  { ${vars(DARK)}  }   /* dark default */
    :root[data-theme="light"] { ${vars(LIGHT)} }

    /* ── Animations ────────────────────────────────────────── */
    @keyframes apBlink   { 0%,55%{opacity:1} 56%,100%{opacity:0} }
    @keyframes apFadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes apSweep   { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
    @keyframes apPulse   { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes apMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes apFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

    /* ── Reset / Base ───────────────────────────────────────── */
    html { scroll-behavior: smooth; }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--ap-bg);
      color: var(--ap-fg);
      font-family: ${FONTS.sans};
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      transition: background-color .3s ease, color .3s ease;
    }
    ::selection { background: var(--ap-accent); color: var(--ap-bg); }
    a { color: inherit; text-decoration: none; }

    /* ── Custom cursor ──────────────────────────────────────── */
    .ap-cursor-host, .ap-cursor-host * { cursor: none !important; }
    .ap-cursor-dot {
      position: fixed; top: 0; left: 0; width: 8px; height: 8px;
      background: var(--ap-accent); border-radius: 50%;
      transform: translate(-50%,-50%); pointer-events: none;
      z-index: 9999; mix-blend-mode: difference;
      transition: width .18s, height .18s;
    }
    .ap-cursor-ring {
      position: fixed; top: 0; left: 0; width: 34px; height: 34px;
      border: 1px solid var(--ap-fg); border-radius: 50%;
      transform: translate(-50%,-50%); pointer-events: none;
      z-index: 9999; mix-blend-mode: difference;
      transition: width .22s cubic-bezier(.2,.7,.3,1), height .22s cubic-bezier(.2,.7,.3,1);
    }
    .ap-cursor-host[data-hover="link"] .ap-cursor-dot  { width: 0; height: 0; }
    .ap-cursor-host[data-hover="link"] .ap-cursor-ring { width: 54px; height: 54px; }

    /* ── Underline link ─────────────────────────────────────── */
    .ap-link {
      position: relative;
      background-image: linear-gradient(var(--ap-fg), var(--ap-fg));
      background-size: 100% 1px; background-position: 0 100%;
      background-repeat: no-repeat;
      transition: color .2s, background-size .25s;
    }
    .ap-link:hover {
      color: var(--ap-accent);
      background-image: linear-gradient(var(--ap-accent), var(--ap-accent));
    }

    section[id] { scroll-margin-top: 80px; }

    /* ── Responsive ─────────────────────────────────────────── */
    @media (max-width: 880px) {
      .ap-hero-grid    { grid-template-columns: 1fr !important; gap: 36px !important; }
      .ap-hero-portrait{ order: -1; max-width: 320px; margin: 0 auto; }
      .ap-hero-index   { border-left: none !important; padding-left: 0 !important;
        border-top: 1px solid var(--ap-hairline); padding-top: 24px !important; }
      section          { padding-left: 24px !important; padding-right: 24px !important; }
      .ap-stack-grid, .ap-now-grid, .ap-about-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding-left: 0 !important; }
      .ap-case-head    { grid-template-columns: 60px 1fr !important; }
      .ap-case-head .ap-case-actions { grid-column: 1 / -1; flex-direction: row !important; align-items: center !important; margin-top: 16px; }
      .ap-selected-row { grid-template-columns: 1fr !important; gap: 24px !important; }
      .ap-hero-footer  { flex-direction: column; gap: 12px; align-items: flex-start !important; }
      .ap-nav          { padding: 16px 24px !important; gap: 12px; flex-wrap: wrap; }
      .ap-nav-links    { gap: 14px !important; flex-wrap: wrap; }
      .ap-mood-grid    { grid-template-columns: repeat(2, 1fr) !important; }
      .ap-now-grid     { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
}
