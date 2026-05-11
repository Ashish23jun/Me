# Portfolio — Monorepo

```
apps/
  web/   React + TypeScript + Vite + React Query + Zustand
  api/   Flask + Spotify Web API
packages/
  tokens/   Shared design tokens (colors, fonts)
```

## Quick start

### 1. API (Flask)
```bash
cd apps/api
cp .env.example .env   # fill in Spotify credentials
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
Runs on http://localhost:5000

### 2. Web (React)
```bash
cd apps/web
npm install
npm run dev
```
Runs on http://localhost:5173 — proxies `/api/*` to Flask automatically.

## Spotify setup (get your refresh token)

1. Create an app at https://developer.spotify.com/dashboard
2. Add `http://localhost:8888/callback` as a Redirect URI
3. Use the Authorization Code flow to get a `refresh_token` (scope: `user-read-currently-playing user-read-recently-played`)
4. Paste `client_id`, `client_secret`, and `refresh_token` into `apps/api/.env`

## Env vars

| var | description |
|---|---|
| `SPOTIFY_CLIENT_ID` | From Spotify dashboard |
| `SPOTIFY_CLIENT_SECRET` | From Spotify dashboard |
| `SPOTIFY_REFRESH_TOKEN` | Long-lived token from OAuth flow |
| `CORS_ORIGINS` | Comma-separated allowed origins |
