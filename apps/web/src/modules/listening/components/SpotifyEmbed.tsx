import { PALETTE, FONTS } from '@tokens';

const DEFAULT_PLAYLIST = 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0';

interface SpotifyEmbedProps {
  playlistUrl?: string;
}

export function SpotifyEmbed({ playlistUrl = DEFAULT_PLAYLIST }: SpotifyEmbedProps) {
  return (
    <div>
      <div style={{ border: `1px solid ${PALETTE.hairline}`, overflow: 'hidden' }}>
        <iframe
          src={playlistUrl}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ display: 'block', background: '#000' }}
          title="Spotify playlist"
        />
      </div>
      <div style={{
        marginTop: 12, fontFamily: FONTS.mono, fontSize: 11,
        letterSpacing: '0.14em', color: PALETTE.fgMute,
      }}>
        SWAP THE EMBED URL ABOVE WITH YOUR OWN PLAYLIST · OPEN.SPOTIFY.COM → SHARE → EMBED PLAYLIST
      </div>
    </div>
  );
}
