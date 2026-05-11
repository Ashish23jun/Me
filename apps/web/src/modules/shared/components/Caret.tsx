import { PALETTE } from '@tokens';

interface CaretProps {
  color?: string;
  w?: string;
  h?: string;
}

export function Caret({ color = PALETTE.accent, w = '0.08em', h = '0.7em' }: CaretProps) {
  return (
    <span style={{
      display: 'inline-block', width: w, height: h, background: color,
      marginLeft: 2, transform: 'translateY(0.12em)',
      animation: 'apBlink 1.05s steps(1,end) infinite',
    }} />
  );
}
