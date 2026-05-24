#!/usr/bin/env bash
set -euo pipefail

REMOTE_USER="artshgwf"
REMOTE_HOST="server395.web-hosting.com"
REMOTE_PORT="21098"
REMOTE_DIR="/home/artshgwf/public_html"
KEY_FILE="$HOME/.ssh/artshgwf_wmcc_deploy"

SSH_ARGS=(-p "$REMOTE_PORT" -o "StrictHostKeyChecking=accept-new")

if [[ -f "$KEY_FILE" ]]; then
  chmod 600 "$KEY_FILE"
  SSH_ARGS+=(-i "$KEY_FILE" -o IdentitiesOnly=yes)
fi

ssh "${SSH_ARGS[@]}" "$REMOTE_USER@$REMOTE_HOST" "
  set -e
  cd '$REMOTE_DIR'
  echo 'Before permissions:'
  ls -ld . assets config legal 2>/dev/null || true
  ls -l index.html robots.txt sitemap.xml site.webmanifest sw.js 2>/dev/null || true

  chmod 755 '$REMOTE_DIR'
  find . -type d -not -path './cgi-bin*' -not -path './.well-known*' -exec chmod 755 {} +
  find . -type f -not -path './cgi-bin*' -not -path './.well-known*' -exec chmod 644 {} +
  chmod 644 .htaccess index.html robots.txt sitemap.xml site.webmanifest sw.js 2>/dev/null || true

  echo 'After permissions:'
  ls -ld . assets config legal 2>/dev/null || true
  ls -l index.html robots.txt sitemap.xml site.webmanifest sw.js 2>/dev/null || true
"

echo "Checking live site..."
curl -I --max-time 20 https://artstyle.live/
curl -I --max-time 20 https://artstyle.live/index.html
