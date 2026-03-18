#!/bin/bash
# ============================================================
# EKO-OYLIS — Deploy to GoDaddy hosting via FTP
# Usage: bash deploy.sh
# ============================================================

# --- CONFIG (edit these) ---
FTP_HOST="ftp.eco-oylis.info"    # GoDaddy FTP host
FTP_USER=""                       # FTP username (from GoDaddy cPanel)
FTP_PASS=""                       # FTP password
REMOTE_DIR="/public_html"         # Remote directory on server
# ---------------------------

# Files/dirs to upload (production only, no docs/dev files)
INCLUDE=(
  "index.html"
  "robots.txt"
  "sitemap.xml"
  "css/"
  "js/"
  "images/"
  "en/"
  "politika-poveritelnost/"
  "politika-biskvitki/"
  "pravna-informacia/"
)

# Check config
if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
  echo "ERROR: Set FTP_USER and FTP_PASS in deploy.sh or as env vars"
  echo "  export FTP_USER=your_user"
  echo "  export FTP_PASS=your_pass"
  echo "  bash deploy.sh"
  exit 1
fi

echo "=== Deploying EKO-OYLIS to $FTP_HOST ==="

# Use lftp for reliable FTP upload with mirror
if command -v lftp &> /dev/null; then
  lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<SCRIPT
    set ssl:verify-certificate no
    cd $REMOTE_DIR
    mirror -R --verbose --delete \
      --include-glob="*.html" \
      --include-glob="*.css" \
      --include-glob="*.js" \
      --include-glob="*.xml" \
      --include-glob="*.txt" \
      --include-glob="*.svg" \
      --include-glob="*.png" \
      --include-glob="*.jpg" \
      --include-glob="*.webp" \
      --exclude-glob="docs/*" \
      --exclude-glob="CLAUDE.md" \
      --exclude-glob="TEAM.md" \
      --exclude-glob="DEVLOG.md" \
      --exclude-glob="STATUS.md" \
      --exclude-glob=".git/*" \
      --exclude-glob=".gitignore" \
      --exclude-glob="deploy.sh" \
      . $REMOTE_DIR
    bye
SCRIPT
  echo "=== Deploy complete (lftp) ==="

# Fallback: use curl FTP upload
else
  echo "lftp not found. Using curl for individual file upload..."

  upload_file() {
    local file="$1"
    local remote="$REMOTE_DIR/$file"
    curl -s --ftp-create-dirs -T "$file" \
      "ftp://$FTP_HOST$remote" \
      --user "$FTP_USER:$FTP_PASS" \
      && echo "  OK: $file" \
      || echo "  FAIL: $file"
  }

  upload_dir() {
    local dir="$1"
    find "$dir" -type f | while read -r file; do
      upload_file "$file"
    done
  }

  # Upload files
  for item in "${INCLUDE[@]}"; do
    if [ -d "$item" ]; then
      upload_dir "$item"
    elif [ -f "$item" ]; then
      upload_file "$item"
    fi
  done

  echo "=== Deploy complete (curl) ==="
fi
