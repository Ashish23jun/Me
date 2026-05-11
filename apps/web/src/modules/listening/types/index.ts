export interface NowPlaying {
  isPlaying: boolean;
  title: string | null;
  artist: string;
  album: string;
  albumArt: string | null;
  progressMs: number;
  durationMs: number;
  progressLabel: string;
  durationLabel: string;
  url: string;
}

export interface TopTrack {
  rank: number;
  title: string;
  artist: string;
  album: string;
  albumArt: string | null;
  durationMs: number;
  durationLabel: string;
  url: string;
  popularity: number;
}

export interface MoodItem {
  key: string;
  value: string;
  pct: number;
}
