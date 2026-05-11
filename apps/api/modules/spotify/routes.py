from flask import Blueprint, jsonify
from core.extensions import cache
from .service import get_now_playing, get_top_tracks

spotify_bp = Blueprint("spotify", __name__, url_prefix="/api/spotify")


@spotify_bp.get("/now-playing")
@cache.cached(timeout=30, key_prefix="now_playing")
def now_playing():
    try:
        data = get_now_playing()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@spotify_bp.get("/top-tracks")
@cache.cached(timeout=3600, key_prefix="top_tracks")  # hourly — changes slowly
def top_tracks():
    try:
        data = get_top_tracks()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@spotify_bp.get("/health")
def health():
    return jsonify({"status": "ok"})
