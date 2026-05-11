#!/usr/bin/env bash

G='\033[0;32m'; Y='\033[0;33m'; R='\033[0;31m'; NC='\033[0m'

killed=0

kill_port() {
  local port=$1
  local pids
  pids=$(lsof -ti :"$port" 2>/dev/null)
  if [ -n "$pids" ]; then
    echo -e "${Y}  Killing port $port (PID $pids)${NC}"
    echo "$pids" | xargs kill -9 2>/dev/null
    killed=$((killed + 1))
  fi
}

kill_by_name() {
  local name=$1
  local pids
  pids=$(pgrep -f "$name" 2>/dev/null)
  if [ -n "$pids" ]; then
    echo -e "${Y}  Killing $name (PID $pids)${NC}"
    echo "$pids" | xargs kill -9 2>/dev/null
    killed=$((killed + 1))
  fi
}

echo -e "${R}▶ Killing portfolio services...${NC}"

# Kill by port range (API 5000-5010, Vite 5173-5183)
for port in $(seq 5000 5010); do kill_port "$port"; done
for port in $(seq 5173 5183); do kill_port "$port"; done

# Kill by process name as fallback
kill_by_name "uvicorn"
kill_by_name "vite"

if [ $killed -eq 0 ]; then
  echo -e "${G}  Nothing was running.${NC}"
else
  echo -e "${G}✓ Done — $killed process group(s) killed.${NC}"
fi
