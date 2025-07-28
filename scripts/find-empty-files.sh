#!/bin/bash

# Simple script to find empty files using find command
# This provides a quick alternative to the comprehensive Node.js script

echo "🔍 Finding all empty files in the codebase..."
echo "================================================"

# Exclude common build/cache directories
find . -type f -size 0 \
  ! -path "./.git/*" \
  ! -path "./node_modules/*" \
  ! -path "./dist/*" \
  ! -path "./build/*" \
  ! -path "./coverage/*" \
  ! -path "./.next/*" \
  ! -path "./.nuxt/*" \
  ! -path "./.cache/*" \
  ! -path "./playwright-report/*" \
  ! -path "./test-results/*" \
  | sort

echo ""
echo "📊 Summary:"
TOTAL_EMPTY=$(find . -type f -size 0 \
  ! -path "./.git/*" \
  ! -path "./node_modules/*" \
  ! -path "./dist/*" \
  ! -path "./build/*" \
  ! -path "./coverage/*" \
  ! -path "./.next/*" \
  ! -path "./.nuxt/*" \
  ! -path "./.cache/*" \
  ! -path "./playwright-report/*" \
  ! -path "./test-results/*" \
  | wc -l)

echo "Total empty files found: $TOTAL_EMPTY"

# Count by file type
echo ""
echo "📂 By file type:"
echo "Documentation (.md): $(find . -name "*.md" -type f -size 0 ! -path "./.git/*" ! -path "./node_modules/*" | wc -l)"
echo "TypeScript (.ts/.tsx): $(find . \( -name "*.ts" -o -name "*.tsx" \) -type f -size 0 ! -path "./.git/*" ! -path "./node_modules/*" | wc -l)"
echo "JavaScript (.js/.jsx): $(find . \( -name "*.js" -o -name "*.jsx" \) -type f -size 0 ! -path "./.git/*" ! -path "./node_modules/*" | wc -l)"
echo "Other files: $(find . -type f -size 0 ! -name "*.md" ! -name "*.ts" ! -name "*.tsx" ! -name "*.js" ! -name "*.jsx" ! -path "./.git/*" ! -path "./node_modules/*" | wc -l)"

echo ""
echo "💡 Tip: Use 'node scripts/find-empty-files.js' for a more detailed analysis"