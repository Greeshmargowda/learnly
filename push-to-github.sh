#!/bin/bash
# ============================================================
# Learnly — Push all files to GitHub
# Usage: bash push-to-github.sh YOUR_GITHUB_TOKEN
# Get token: https://github.com/settings/tokens (needs: repo)
# ============================================================

TOKEN="$1"
REPO="Greeshmargowda/learnly"
BRANCH="main"

if [ -z "$TOKEN" ]; then
  echo "❌ Usage: bash push-to-github.sh YOUR_GITHUB_TOKEN"
  exit 1
fi

API="https://api.github.com/repos/$REPO/contents"
HEADERS=(-H "Authorization: token $TOKEN" -H "Content-Type: application/json" -H "Accept: application/vnd.github.v3+json")

push_file() {
  local filepath="$1"
  local github_path="$2"
  
  echo "→ Pushing $github_path..."
  
  # Get current SHA if file exists (needed for updates)
  SHA=$(curl -s "${HEADERS[@]}" "$API/$github_path" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sha',''))" 2>/dev/null)
  
  # Base64 encode the file
  CONTENT=$(base64 -w 0 "$filepath")
  
  # Build JSON payload
  if [ -n "$SHA" ]; then
    PAYLOAD="{\"message\":\"fix: videos, auth, stay logged in on home nav\",\"content\":\"$CONTENT\",\"sha\":\"$SHA\",\"branch\":\"$BRANCH\"}"
  else
    PAYLOAD="{\"message\":\"feat: add $github_path\",\"content\":\"$CONTENT\",\"branch\":\"$BRANCH\"}"
  fi
  
  RESULT=$(curl -s -X PUT "${HEADERS[@]}" -d "$PAYLOAD" "$API/$github_path")
  
  if echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if 'content' in d else 'FAIL: '+d.get('message','unknown'))" 2>/dev/null | grep -q "OK"; then
    echo "  ✓ $github_path"
  else
    echo "  ✗ $github_path — $(echo $RESULT | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("message","unknown"))' 2>/dev/null)"
  fi
}

echo ""
echo "🚀 Pushing Learnly to github.com/$REPO..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

push_file "$SCRIPT_DIR/index.html"          "index.html"
push_file "$SCRIPT_DIR/package.json"        "package.json"
push_file "$SCRIPT_DIR/vite.config.js"      "vite.config.js"
push_file "$SCRIPT_DIR/vercel.json"         "vercel.json"
push_file "$SCRIPT_DIR/.gitignore"          ".gitignore"
push_file "$SCRIPT_DIR/README.md"           "README.md"
push_file "$SCRIPT_DIR/public/favicon.svg"  "public/favicon.svg"
push_file "$SCRIPT_DIR/src/main.jsx"        "src/main.jsx"
push_file "$SCRIPT_DIR/src/App.jsx"         "src/App.jsx"

echo ""
echo "✅ Done! Vercel will auto-redeploy in ~30 seconds."
echo "   Check: https://github.com/$REPO"
