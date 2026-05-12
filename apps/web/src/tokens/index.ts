// Raw values — used ONLY in globalStyles.ts to inject CSS variables.
// Components must NOT import these directly; use PALETTE (CSS vars) instead.
export const DARK = {
  bg:           '#0a0a0a',
  bgRaised:     '#111111',
  fg:           '#f4f1ea',
  fgMute:       'rgba(244,241,234,0.55)',
  fgSoft:       'rgba(244,241,234,0.75)',
  fgFaint:      'rgba(244,241,234,0.18)',
  accent:       '#8b5cf6',
  accentDeep:   '#6E40C9',
  accentSoft:   'rgba(139,92,246,0.12)',
  hairline:     'rgba(244,241,234,0.12)',
  hairlineSoft: 'rgba(244,241,234,0.07)',
  good:         '#34d399',
} as const;

export const LIGHT = {
  bg:           '#f4f1ea',
  bgRaised:     '#ffffff',
  fg:           '#0a0a0a',
  fgMute:       'rgba(10,10,10,0.50)',
  fgSoft:       'rgba(10,10,10,0.72)',
  fgFaint:      'rgba(10,10,10,0.16)',
  accent:       '#7c3aed',
  accentDeep:   '#6E40C9',
  accentSoft:   'rgba(124,58,237,0.10)',
  hairline:     'rgba(10,10,10,0.12)',
  hairlineSoft: 'rgba(10,10,10,0.06)',
  good:         '#059669',
} as const;

// CSS variable references — used by every component via inline styles.
// `var()` works in inline styles; the actual value comes from the injected :root/:root[data-theme].
export const PALETTE = {
  bg:           'var(--ap-bg)',
  bgRaised:     'var(--ap-bg-raised)',
  fg:           'var(--ap-fg)',
  fgMute:       'var(--ap-fg-mute)',
  fgSoft:       'var(--ap-fg-soft)',
  fgFaint:      'var(--ap-fg-faint)',
  accent:       'var(--ap-accent)',
  accentDeep:   'var(--ap-accent-deep)',
  accentSoft:   'var(--ap-accent-soft)',
  hairline:     'var(--ap-hairline)',
  hairlineSoft: 'var(--ap-hairline-soft)',
  good:         'var(--ap-good)',
} as const;

export const FONTS = {
  serif:   '"Fraunces", "Instrument Serif", Georgia, serif',
  serifIt: '"Instrument Serif", "Fraunces", Georgia, serif',
  mono:    '"JetBrains Mono", ui-monospace, Menlo, monospace',
  sans:    'Inter, -apple-system, system-ui, sans-serif',
} as const;
