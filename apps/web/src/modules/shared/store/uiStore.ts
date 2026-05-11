import { createWithEqualityFn as create } from 'zustand/traditional';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('ap-theme') as Theme | null;
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('ap-theme', t);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

interface UIState {
  theme: Theme;
  toggleTheme: () => void;
  cursorHover: 'link' | '';
  setCursorHover: (v: 'link' | '') => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: initialTheme,
  toggleTheme: () =>
    set((s) => {
      const next: Theme = s.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return { theme: next };
    }),
  cursorHover: '',
  setCursorHover: (v) => set({ cursorHover: v }),
}));
