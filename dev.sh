#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
API="$ROOT/apps/api"
WEB="$ROOT/apps/web"

G='\033[0;32m'; Y='\033[0;33m'; R='\033[0;31m'; NC='\033[0m'

# Find next available port starting from $1
find_port() {
  local port=$1
  while lsof -ti :"$port" &>/dev/null; do
    echo -e "${Y}  Port $port in use — trying $((port + 1))${NC}" >&2
    port=$((port + 1))
  done
  echo "$port"
}

cleanup() {
  echo -e "\n${Y}Shutting down...${NC}"
  kill "$API_PID" "$WEB_PID" 2>/dev/null
  exit 0
}
trap cleanup INT TERM

# ── API ────────────────────────────────────────────────────────
echo -e "${G}▶ Starting FastAPI...${NC}"

if [ ! -f "$API/.env" ]; then
  echo -e "${Y}  No .env found — copying .env.example${NC}"
  cp "$API/.env.example" "$API/.env"
fi

if [ ! -d "$API/.venv" ]; then
  echo -e "${Y}  Creating virtualenv...${NC}"
  python3 -m venv "$API/.venv"
fi

source "$API/.venv/bin/activate"
pip install -q -r "$API/requirements.txt"

API_PORT=$(find_port 5000)
(cd "$API" && uvicorn app:app --host 0.0.0.0 --port "$API_PORT" --reload) &
API_PID=$!

# ── Web ────────────────────────────────────────────────────────
echo -e "${G}▶ Starting React frontend...${NC}"

if [ ! -d "$WEB/node_modules" ]; then
  echo -e "${Y}  Installing npm packages...${NC}"
  (cd "$WEB" && npm install)
fi

WEB_PORT=$(find_port 5173)
(cd "$WEB" && npm run dev -- --port "$WEB_PORT") &
WEB_PID=$!

# ── Summary ────────────────────────────────────────────────────
echo -e "\n${G}✓ Running:${NC}"
echo -e "  API  → http://localhost:${API_PORT}"
echo -e "  Web  → http://localhost:${WEB_PORT}"
echo -e "\n${Y}Press Ctrl+C to stop both  ·  run ./kill.sh to force-kill${NC}\n"

wait
