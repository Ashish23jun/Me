import os
from dataclasses import dataclass


@dataclass
class Config:
    SPOTIFY_CLIENT_ID: str = os.getenv("SPOTIFY_CLIENT_ID", "")
    SPOTIFY_CLIENT_SECRET: str = os.getenv("SPOTIFY_CLIENT_SECRET", "")
    SPOTIFY_REFRESH_TOKEN: str = os.getenv("SPOTIFY_REFRESH_TOKEN", "")
    CORS_ORIGINS: list = None
    CACHE_TTL: int = 30  # seconds

    def __post_init__(self):
        raw = os.getenv("CORS_ORIGINS", "http://localhost:5173")
        self.CORS_ORIGINS = [o.strip() for o in raw.split(",")]


config = Config()
