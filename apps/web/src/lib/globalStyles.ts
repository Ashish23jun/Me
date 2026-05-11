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

    /* ── Prevent overflow (global) ──────────────────────────── */
    html, body { overflow-x: hidden; }
    img, video, iframe { max-width: 100%; }

    /* ── Cal embed — scrollable on mobile ───────────────────── */
    .ap-cal-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }

    /* ── Hide custom cursor on touch devices ────────────────── */
    @media (hover: none), (pointer: coarse) {
      .ap-cursor-dot, .ap-cursor-ring { display: none !important; }
      .ap-cursor-host, .ap-cursor-host * { cursor: auto !important; }
    }

    /* ── Hamburger — hidden on desktop, shown on mobile ─────── */
    .ap-nav-hamburger { display: none; align-items: center; justify-content: center;
      width: 44px; height: 44px; background: transparent;
      border: 1px solid var(--ap-hairline); cursor: pointer;
      flex-direction: column; gap: 5px; }
    .ap-nav-hamburger span { display: block; width: 18px; height: 1px; background: var(--ap-fg); transition: transform .2s, opacity .2s; }

    /* ── Mobile nav overlay ─────────────────────────────────── */
    .ap-mobile-nav {
      position: fixed; inset: 0; z-index: 200;
      background: var(--ap-bg);
      display: flex; flex-direction: column;
      padding: 24px; gap: 0;
      opacity: 0; transform: translateY(-8px);
      transition: opacity .2s ease, transform .2s ease;
      pointer-events: none;
    }
    .ap-mobile-nav.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
    .ap-mobile-nav a { font-size: 32px; padding: 18px 0;
      border-bottom: 1px solid var(--ap-hairline);
      display: flex; align-items: center; justify-content: space-between; }

    /* ── 1024px — large tablet ──────────────────────────────── */
    @media (max-width: 1024px) {
      section { padding-left: 32px !important; padding-right: 32px !important; }
      .ap-about-grid { padding-left: 0 !important; gap: 40px !important; }
      .ap-stack-grid { padding-left: 0 !important; }
    }

    /* ── 880px — tablet ─────────────────────────────────────── */
    @media (max-width: 880px) {
      section { padding-left: 24px !important; padding-right: 24px !important; }

      /* Nav */
      .ap-nav { padding: 16px 24px !important; }
      .ap-nav-links { display: none !important; }
      .ap-nav-hamburger { display: flex !important; }

      /* Section headers */
      .ap-section-head { grid-template-columns: 1fr !important; gap: 8px !important; }

      /* Indent containers — zero out the 112px desktop offset */
      .ap-case-list { padding-left: 0 !important; }

      /* Hero */
      .ap-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      .ap-hero-portrait { order: -1; max-width: 260px; margin: 0; }
      .ap-hero-name { font-size: clamp(56px, 14vw, 168px) !important; }
      .ap-hero-index { border-left: none !important; padding-left: 0 !important;
        border-top: 1px solid var(--ap-hairline); padding-top: 24px !important; }
      .ap-hero-footer { flex-direction: column !important; gap: 12px; align-items: flex-start !important; }

      /* Home sections */
      .ap-stack-grid, .ap-now-grid, .ap-about-grid {
        grid-template-columns: 1fr !important; gap: 32px !important; padding-left: 0 !important; }

      /* Now items */
      .ap-now-item { grid-template-columns: 1fr !important; gap: 4px !important; }

      /* Featured work cards */
      .ap-case-head { grid-template-columns: 60px 1fr !important; }
      .ap-case-head .ap-case-actions { grid-column: 1 / -1; flex-direction: row !important; align-items: center !important; margin-top: 16px; }
      .ap-featured-body-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .ap-featured-signals { border-left: none !important; padding-left: 0 !important;
        border-top: 1px solid var(--ap-hairline); padding-top: 20px !important; }

      /* Selected work */
      .ap-selected-row { grid-template-columns: 1fr !important; gap: 24px !important; }
      .ap-selected-signals { border-left: none !important; padding-left: 0 !important;
        border-top: 1px solid var(--ap-hairline); padding-top: 20px !important; }
      .ap-selected-body-grid { grid-template-columns: 1fr !important; }

      /* Now section */
      .ap-now-grid { grid-template-columns: 1fr !important; }

      /* Listening */
      .ap-mood-grid { grid-template-columns: repeat(2, 1fr) !important; }

      /* Contact */
      .ap-contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .ap-logistics-grid { grid-template-columns: 1fr 1fr !important; }
      .ap-cal-grid-container { margin-left: -24px; margin-right: -24px; width: calc(100% + 48px) !important; }

      /* Case studies */
      .ap-case-section-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
      .ap-case-hero-meta { grid-template-columns: 1fr !important; gap: 40px !important; }
      .ap-case-hero-metabox { border-left: none !important; padding-left: 0 !important;
        border-top: 1px solid var(--ap-hairline); padding-top: 20px !important; }
      .ap-metric-grid { grid-template-columns: repeat(3, 1fr) !important; }
      .ap-case-footer-next { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
    }

    /* ── 480px — phone ──────────────────────────────────────── */
    @media (max-width: 480px) {
      section { padding-left: 20px !important; padding-right: 20px !important; }
      .ap-hero-portrait { max-width: 200px; }
      .ap-hero-name { font-size: clamp(48px, 16vw, 168px) !important; }
      .ap-metric-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .ap-mood-grid { grid-template-columns: 1fr !important; }
      .ap-logistics-grid { grid-template-columns: 1fr !important; }
      .ap-channel-row-copy { display: none !important; }
      .ap-cal-grid-container { margin-left: -20px; margin-right: -20px; width: calc(100% + 40px) !important; }
      .ap-contact-hero-h1 { font-size: clamp(52px, 14vw, 168px) !important; }
      .ap-contact-email-link { font-size: clamp(14px, 4.5vw, 36px) !important; gap: 12px !important; }
      .ap-home-contact-h2 { font-size: clamp(48px, 13vw, 144px) !important; }
      .ap-home-footer { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; margin-top: 48px !important; }
      .ap-home-footer-links { flex-wrap: wrap !important; gap: 14px !important; }
    }
  `;
  document.head.appendChild(s);
}
