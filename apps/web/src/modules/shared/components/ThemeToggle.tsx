import { PALETTE, FONTS } from '@tokens';
import { useUIStore } from '@/modules/shared/store/uiStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'transparent',
        border: `1px solid ${PALETTE.hairline}`,
        color: PALETTE.fgMute,
        fontFamily: FONTS.mono,
        fontSize: 10,
        letterSpacing: '0.16em',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        transition: 'color .2s, border-color .2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.color = PALETTE.accent;
        (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.accent;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.color = PALETTE.fgMute;
        (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.hairline;
      }}
    >
      {theme === 'dark' ? (
        <>
          <span style={{ fontSize: 12 }}>○</span>
          LIGHT
        </>
      ) : (
        <>
          <span style={{ fontSize: 12 }}>●</span>
          DARK
        </>
      )}
    </button>
  );
}
