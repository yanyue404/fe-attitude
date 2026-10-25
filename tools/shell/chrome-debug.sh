#!/usr/bin/env bash
# 启动独立调试 Chrome，供 chrome-devtools MCP 连接 127.0.0.1:9222
set -euo pipefail

CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
PROFILE="${HOME}/chrome-debug-profile"
PORT=9222
URL="http://127.0.0.1:${PORT}/json/version"

if curl -sS --max-time 2 "$URL" >/dev/null 2>&1; then
  echo "调试 Chrome 已在运行: $URL"
  exit 0
fi

if [[ ! -f "$CHROME" ]]; then
  echo "找不到 Chrome: $CHROME" >&2
  exit 1
fi

mkdir -p "$PROFILE"
"$CHROME" --remote-debugging-port="$PORT" --remote-allow-origins=* --user-data-dir="$PROFILE" >/dev/null 2>&1 &

for _ in $(seq 1 15); do
  if curl -sS --max-time 1 "$URL" >/dev/null 2>&1; then
    echo "调试 Chrome 已启动: $URL"
    exit 0
  fi
  sleep 0.3
done

echo "已拉起 Chrome，但 ${PORT} 尚未就绪，稍后打开 $URL" >&2
exit 1
