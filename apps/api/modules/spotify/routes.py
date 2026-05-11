from fastapi import APIRouter
from fastapi.responses import JSONResponse
from .service import get_now_playing, get_top_tracks

spotify_router = APIRouter(prefix="/api/spotify")


@spotify_router.get("/now-playing")
def now_playing():
    try:
        return get_now_playing()
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)


@spotify_router.get("/top-tracks")
def top_tracks():
    try:
        return get_top_tracks()
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)


@spotify_router.get("/health")
def health():
    return {"status": "ok"}
