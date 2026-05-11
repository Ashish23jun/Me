import { useQuery } from '@tanstack/react-query';
import type { TopTrack } from '../types';

const MOCK: TopTrack[] = [
  { rank: 1, title: 'Tum Se Hi',        artist: 'Mohit Chauhan',  album: 'Jab We Met',      albumArt: null, durationMs: 261000, durationLabel: '4:21', url: '', popularity: 82 },
  { rank: 2, title: 'Khairiyat',         artist: 'Arijit Singh',   album: 'Chhichhore',      albumArt: null, durationMs: 234000, durationLabel: '3:54', url: '', popularity: 90 },
  { rank: 3, title: 'Ek Vaari Aa',       artist: 'Arijit Singh',   album: 'Raabta',          albumArt: null, durationMs: 242000, durationLabel: '4:02', url: '', popularity: 78 },
  { rank: 4, title: 'Channa Mereya',     artist: 'Arijit Singh',   album: 'Ae Dil Hai Mushkil', albumArt: null, durationMs: 275000, durationLabel: '4:35', url: '', popularity: 88 },
  { rank: 5, title: 'Raabta',            artist: 'Arijit Singh',   album: 'Agent Sai Srinivasa', albumArt: null, durationMs: 253000, durationLabel: '4:13', url: '', popularity: 75 },
];

async function fetchTopTracks(): Promise<TopTrack[]> {
  const res = await fetch('/api/spotify/top-tracks');
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

export function useTopTracks() {
  return useQuery<TopTrack[], Error>({
    queryKey: ['topTracks'],
    queryFn: fetchTopTracks,
    refetchInterval: 3_600_000, // hourly
    placeholderData: MOCK,
  });
}
