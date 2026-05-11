# Ashish Pandey — Portfolio

Personal portfolio site + the source that powers it.  
Live → **[ashishpandey.me](https://ashishpandey.me)**

---

## Currently Building

### [Crelyzor](https://crelyzor.app) — `React · Express.js · PostgreSQL · Redis · OpenAI · Deepgram`

A productivity OS where identity, meetings, scheduling, and tasks are one connected system — built solo.

- **End-to-end meeting intelligence pipeline** — Deepgram Nova-2 transcription with speaker diarization, GPT-4o-mini extraction of summaries & action items, and streaming SSE chat (Ask AI) with full transcript context.
- **Timezone-aware booking engine** — slot calculation across availability schedules, Google Calendar busy-time, and existing bookings; serializable transactions prevent double-booking race conditions.
- **Google Calendar bidirectional sync** — OAuth, read sync for busy-time injection, write sync for event creation/cancellation, auto-generated Meet links; Recall.ai bots auto-join online meetings and feed into the same transcription pipeline.
- **Dual-frontend architecture** — React + Vite for the authenticated dashboard; Next.js for SSR public pages (card profiles, booking pages, shared meetings) with OG previews and vCard downloads.

---

## This Repo

```
apps/
  web/      React + TypeScript + Vite + React Query + Zustand   (portfolio site)
  api/      Flask + Spotify Web API                              (listening data)
packages/
  tokens/   Shared design tokens — colors, fonts
```

---

## Local Development

### API (Flask)
```bash
cd apps/api
cp .env.example .env        # fill in Spotify credentials
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py               # → http://localhost:5000
```

### Web (React + Vite)
```bash
cd apps/web
npm install
npm run dev                 # → http://localhost:5173  (proxies /api/* to Flask)
```

---

## Spotify Setup

1. Create an app at https://developer.spotify.com/dashboard
2. Add `http://localhost:8888/callback` as a Redirect URI
3. Run the Authorization Code flow to get a `refresh_token`  
   (scopes: `user-read-currently-playing user-read-recently-played`)
4. Paste credentials into `apps/api/.env`

## Env Vars

| Variable | Description |
|---|---|
| `SPOTIFY_CLIENT_ID` | From Spotify dashboard |
| `SPOTIFY_CLIENT_SECRET` | From Spotify dashboard |
| `SPOTIFY_REFRESH_TOKEN` | Long-lived token from OAuth flow |
| `CORS_ORIGINS` | Comma-separated allowed origins |
