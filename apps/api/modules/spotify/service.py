import base64
import requests
from core.config import config
from core.extensions import ttl_cache

TOKEN_URL = "https://accounts.spotify.com/api/token"
NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing"
RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1"
TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10"


def _get_access_token() -> str:
    creds = base64.b64encode(
        f"{config.SPOTIFY_CLIENT_ID}:{config.SPOTIFY_CLIENT_SECRET}".encode()
    ).decode()
    resp = requests.post(
        TOKEN_URL,
        headers={"Authorization": f"Basic {creds}"},
        data={
            "grant_type": "refresh_token",
            "refresh_token": config.SPOTIFY_REFRESH_TOKEN,
        },
        timeout=8,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


def _ms_to_str(ms: int) -> str:
    s = ms // 1000
    return f"{s // 60}:{str(s % 60).zfill(2)}"


def _shape_track(item: dict, progress_ms: int, is_playing: bool) -> dict:
    album = item.get("album", {})
    images = album.get("images", [])
    return {
        "isPlaying": is_playing,
        "title": item.get("name", ""),
        "artist": ", ".join(a["name"] for a in item.get("artists", [])),
        "album": album.get("name", ""),
        "albumArt": images[0]["url"] if images else None,
        "progressMs": progress_ms,
        "durationMs": item.get("duration_ms", 0),
        "progressLabel": _ms_to_str(progress_ms),
        "durationLabel": _ms_to_str(item.get("duration_ms", 0)),
        "url": item.get("external_urls", {}).get("spotify", ""),
    }


@ttl_cache(seconds=30)
def get_now_playing() -> dict:
    token = _get_access_token()
    headers = {"Authorization": f"Bearer {token}"}

    resp = requests.get(NOW_PLAYING_URL, headers=headers, timeout=8)

    if resp.status_code == 204:
        # Nothing playing — fall back to recently played
        return _get_recently_played(headers)

    if resp.status_code != 200:
        resp.raise_for_status()

    data = resp.json()
    if data.get("currently_playing_type") != "track" or not data.get("item"):
        return _get_recently_played(headers)

    return _shape_track(data["item"], data.get("progress_ms", 0), data.get("is_playing", False))


def _get_recently_played(headers: dict) -> dict:
    resp = requests.get(RECENTLY_PLAYED_URL, headers=headers, timeout=8)
    resp.raise_for_status()
    items = resp.json().get("items", [])
    if not items:
        return {"isPlaying": False, "title": None}
    track = items[0]["track"]
    return _shape_track(track, 0, False)


@ttl_cache(seconds=3600)
def get_top_tracks() -> list[dict]:
    token = _get_access_token()
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(TOP_TRACKS_URL, headers=headers, timeout=8)
    resp.raise_for_status()
    tracks = resp.json().get("items", [])
    result = []
    for i, item in enumerate(tracks):
        album = item.get("album", {})
        images = album.get("images", [])
        result.append({
            "rank": i + 1,
            "title": item.get("name", ""),
            "artist": ", ".join(a["name"] for a in item.get("artists", [])),
            "album": album.get("name", ""),
            "albumArt": images[-1]["url"] if images else None,  # smallest image
            "durationMs": item.get("duration_ms", 0),
            "durationLabel": _ms_to_str(item.get("duration_ms", 0)),
            "url": item.get("external_urls", {}).get("spotify", ""),
            "popularity": item.get("popularity", 0),
        })
    return result
