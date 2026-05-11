from flask import Blueprint, jsonify
from core.extensions import cache
from .service import get_now_playing

spotify_bp = Blueprint("spotify", __name__, url_prefix="/api/spotify")


@spotify_bp.get("/now-playing")
@cache.cached(timeout=30, key_prefix="now_playing")
def now_playing():
    try:
        data = get_now_playing()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@spotify_bp.get("/health")
def health():
    return jsonify({"status": "ok"})
