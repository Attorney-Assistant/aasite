#!/bin/bash
# Reorganize wp-content/uploads into categorized public/uploads structure
cd /Users/nicole/Documents/AttorneyAssistant

mkdir -p public/uploads/blog public/uploads/icons public/uploads/team public/uploads/guides public/uploads/logos public/uploads/site public/uploads/scripts

find public/wp-content/uploads/ -type f -print0 | while IFS= read -r -d '' f; do
  base=$(basename "$f")
  lower=$(echo "$base" | tr '[:upper:]' '[:lower:]')

  # Categorize by filename patterns
  if echo "$lower" | grep -qiE '(blog|thumbnail|Blog20Thumbnail)'; then
    cp "$f" "public/uploads/blog/$base"
  elif echo "$lower" | grep -qiE '(icon|iconoir|vector|arrow|svg\.|symbol|component|figure|rcv-icon)'; then
    cp "$f" "public/uploads/icons/$base"
  elif echo "$lower" | grep -qiE '(headshot|portrait|james-d|removebg|testimonial|team-)'; then
    cp "$f" "public/uploads/team/$base"
  elif echo "$lower" | grep -qiE '(logo|aa-logo)'; then
    cp "$f" "public/uploads/logos/$base"
  elif echo "$lower" | grep -qiE '(_intake|intake.script|intake-script|_scripts|estate_planning|practice_area|litigation_intake|compensation_intake|disability_intake|premises.intake|criminal_law_intake|consumer_law|family_law|personal_injury|1_family_law)' && echo "$lower" | grep -qiE '\.pdf$'; then
    cp "$f" "public/uploads/scripts/$base"
  elif echo "$lower" | grep -qiE '(intake-strategy|intake-script|onboarding.?script)' && echo "$lower" | grep -qiE '\.(png|jpg|jpeg|webp)$'; then
    cp "$f" "public/uploads/scripts/$base"
  elif echo "$lower" | grep -qiE '\.pdf$'; then
    cp "$f" "public/uploads/guides/$base"
  else
    cp "$f" "public/uploads/site/$base"
  fi
done

echo "Reorganization complete!"
echo "blog: $(ls public/uploads/blog/ | wc -l) files"
echo "icons: $(ls public/uploads/icons/ | wc -l) files"
echo "team: $(ls public/uploads/team/ | wc -l) files"
echo "guides: $(ls public/uploads/guides/ | wc -l) files"
echo "logos: $(ls public/uploads/logos/ | wc -l) files"
echo "site: $(ls public/uploads/site/ | wc -l) files"
echo "scripts: $(ls public/uploads/scripts/ | wc -l) files"
