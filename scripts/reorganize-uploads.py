#!/usr/bin/env python3
"""Reorganize wp-content/uploads into categorized public/uploads structure."""
import os
import re
import shutil

BASE = "/Users/nicole/Documents/AttorneyAssistant"
SRC = os.path.join(BASE, "public/wp-content/uploads")
DST = os.path.join(BASE, "public/uploads")

# Ensure destination dirs exist
for d in ["blog", "icons", "team", "guides", "logos", "site", "scripts"]:
    os.makedirs(os.path.join(DST, d), exist_ok=True)

def categorize(filename):
    lower = filename.lower()

    # Blog / thumbnails
    if re.search(r'(blog|thumbnail)', lower):
        return "blog"

    # Icons - SVG icon files, vectors, arrows, symbols, components
    if re.search(r'(icon|iconoir|vector|arrow|symbol|component|figure.*vector|rcv-icon)', lower):
        return "icons"

    # Team photos - headshots, portraits, team member names
    if re.search(r'(headshot|portrait|james-d|removebg|testimonial_thumb|team-\d)', lower):
        return "team"

    # Logos
    if re.search(r'(logo)', lower):
        return "logos"

    # Script PDFs - intake scripts by practice area
    if lower.endswith('.pdf') and re.search(
        r'(_intake|intake.script|intake-script|_scripts|estate_planning|'
        r'practice_area|litigation_intake|compensation_intake|disability_intake|'
        r'premises.intake|criminal_law|consumer_law|family_law|personal_injury|'
        r'1_family_law)', lower):
        return "scripts"

    # Script cover images
    if re.search(r'\.(png|jpg|jpeg|webp)$', lower) and re.search(
        r'(intake-strategy|intake-script|onboarding.?script|law-firm-intake-strategy)', lower):
        return "scripts"

    # Practice area cover images for scripts page
    if re.search(r'\.(png|jpg|jpeg|webp)$', lower) and re.search(
        r'(bankruptcy-intake|criminal-law-intake|consumer-law-practice|'
        r'employee-litigation-intake|estate-planning-script|family-law-intake|'
        r'immigration-practice|personal-injury-case-script|workers-compensation-intake|'
        r'short.*long.*disability)', lower):
        return "scripts"

    # All other PDFs -> guides
    if lower.endswith('.pdf'):
        return "guides"

    # Everything else -> site
    return "site"

copied = 0
skipped = 0
categories = {}

for root, dirs, files in os.walk(SRC):
    for fname in files:
        src_path = os.path.join(root, fname)
        cat = categorize(fname)
        dst_path = os.path.join(DST, cat, fname)

        # Handle duplicates by checking if file already exists
        if os.path.exists(dst_path):
            # Check if it's the same file (same size)
            if os.path.getsize(src_path) == os.path.getsize(dst_path):
                skipped += 1
                continue
            # Different file, add date prefix
            rel = os.path.relpath(root, SRC)
            prefix = rel.replace("/", "-")
            dst_path = os.path.join(DST, cat, f"{prefix}-{fname}")

        shutil.copy2(src_path, dst_path)
        copied += 1
        categories[cat] = categories.get(cat, 0) + 1

print(f"Copied {copied} files, skipped {skipped} duplicates")
for cat in sorted(categories.keys()):
    count = len(os.listdir(os.path.join(DST, cat)))
    print(f"  {cat}: {count} files")
