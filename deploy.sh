#!/usr/bin/env bash
set -euo pipefail

LOCAL_DIR="/Volumes/WMCC/web/"
REMOTE_USER="artshgwf"
REMOTE_HOST="server395.web-hosting.com"
REMOTE_PORT="21098"
REMOTE_DIR="/home/artshgwf/public_html/"
KEY_FILE="$HOME/.ssh/artshgwf_wmcc_deploy"

SSH_ARGS=(-p "$REMOTE_PORT" -o "StrictHostKeyChecking=accept-new")

if [[ -f "$KEY_FILE" ]]; then
  chmod 600 "$KEY_FILE"
  [[ -f "$KEY_FILE.pub" ]] && chmod 644 "$KEY_FILE.pub"
  SSH_ARGS+=(-i "$KEY_FILE" -o IdentitiesOnly=yes)
else
  echo "Private key not found. Falling back to SSH password prompt." >&2
fi

rsync -avz \
  --delete \
  --delete-excluded \
  --filter "P .well-known/***" \
  --filter "P cgi-bin/***" \
  --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  -e "ssh ${SSH_ARGS[*]}" \
  --exclude "/.git/" \
  --exclude "/.gitignore" \
  --exclude "/.env" \
  --exclude "/.env.*" \
  --exclude ".DS_Store" \
  --exclude "._*" \
  --exclude ".AppleDouble/" \
  --exclude "*.symbols" \
  --exclude "*.map" \
  --exclude "/.output/" \
  --exclude "/.next/" \
  --exclude "/api/" \
  --exclude "/build/" \
  --exclude "/dist/" \
  --exclude "/functions/" \
  --exclude "/assets/site/" \
  --exclude "/assets/all game/" \
  --exclude "/tools/" \
  --exclude "/docs/" \
  --exclude "/images/" \
  --exclude "/images 2/" \
  --exclude "/logo/" \
  --exclude "/roms/" \
  --exclude "/supabase/" \
  --exclude "/nanny_1.png" \
  --exclude "/View or Download SSH Keys/" \
  --exclude "/deploy.sh" \
  --exclude "/fix-namecheap-permissions.sh" \
  "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

ssh "${SSH_ARGS[@]}" "$REMOTE_USER@$REMOTE_HOST" "
  set -e
  cd '$REMOTE_DIR'
  chmod 755 .
  find . -type d -not -path './cgi-bin*' -not -path './.well-known*' -exec chmod 755 {} +
  find . -type f -not -path './cgi-bin*' -not -path './.well-known*' -exec chmod 644 {} +
  test -f index.html
  test -f .htaccess
  rm -rf docs images 'images 2' logo roms supabase 'View or Download SSH Keys'
  rm -rf tools
  rm -f 'index (1).html' AssetManifest.bin.json FontManifest.json MaterialIcons-Regular.otf NOTICES main.dart.js flutter.js flutter_bootstrap.js flutter_service_worker.js canvaskit.js canvaskit.wasm canvaskit.js.symbols
"

echo "Deployment complete: https://artstyle.live/"
