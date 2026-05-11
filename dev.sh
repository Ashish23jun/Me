#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
API="$ROOT/apps/api"
WEB="$ROOT/apps/web"

# Colors
G='\033[0;32m'; Y='\033[0;33m'; R='\033[0;31m'; NC='\033[0m'

cleanup() {
  echo -e "\n${Y}Shutting down...${NC}"
  kill "$API_PID" "$WEB_PID" 2>/dev/null
  exit 0
}
trap cleanup INT TERM

# ── API ────────────────────────────────────────────────────────
echo -e "${G}▶ Starting Flask API...${NC}"

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

(cd "$API" && python app.py) &
API_PID=$!

# ── Web ────────────────────────────────────────────────────────
echo -e "${G}▶ Starting React frontend...${NC}"

if [ ! -d "$WEB/node_modules" ]; then
  echo -e "${Y}  Installing npm packages...${NC}"
  (cd "$WEB" && npm install)
fi

(cd "$WEB" && npm run dev) &
WEB_PID=$!

# ── Wait ───────────────────────────────────────────────────────
echo -e "\n${G}✓ Running:${NC}"
echo -e "  API  → http://localhost:5000"
echo -e "  Web  → http://localhost:5173/listening"
echo -e "\n${Y}Press Ctrl+C to stop both${NC}\n"

wait
