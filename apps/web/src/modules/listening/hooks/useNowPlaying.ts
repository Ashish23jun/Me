import { useQuery } from '@tanstack/react-query';
import type { NowPlaying } from '../types';

const MOCK: NowPlaying = {
  isPlaying: true,
  title: 'Khairiyat',
  artist: 'Arijit Singh',
  album: 'Chhichhore',
  albumArt: null,
  progressMs: 92_000,
  durationMs: 234_000,
  progressLabel: '1:32',
  durationLabel: '3:54',
  url: 'https://open.spotify.com/track/0eHrVjCCnpTKlpUkzPFjPp',
};

async function fetchNowPlaying(): Promise<NowPlaying> {
  const res = await fetch('/api/spotify/now-playing');
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

export function useNowPlaying() {
  return useQuery<NowPlaying, Error>({
    queryKey: ['nowPlaying'],
    queryFn: fetchNowPlaying,
    refetchInterval: 30_000,
    placeholderData: MOCK,
  });
}
