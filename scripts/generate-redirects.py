#!/usr/bin/env python3
"""Generate redirect mapping from old wp-content paths to new uploads paths."""
import os, json, re

BASE = "/Users/nicole/Documents/AttorneyAssistant"
UPLOADS = os.path.join(BASE, "public/uploads")

# Build reverse lookup: filename -> category/filename
file_map = {}
for cat in ["blog", "icons", "team", "guides", "logos", "site", "scripts"]:
    cat_dir = os.path.join(UPLOADS, cat)
    if os.path.isdir(cat_dir):
        for fname in os.listdir(cat_dir):
            # Only map the base filename (without date prefix added for dupes)
            file_map[fname] = f"/uploads/{cat}/{fname}"

# Get all old paths referenced in wp-xml-pages.json
with open(os.path.join(BASE, 'scripts/output/wp-xml-pages.json'), 'r') as f:
    data = json.load(f)

old_paths = set()
for page in data:
    content = page.get('content', '') or ''
    matches = re.findall(r'/wp-content/uploads/\d{4}/\d{2}/[^"\'\s<>)]+', content)
    old_paths.update(matches)

# Also add the 46 paths from source code (already updated, but we want redirects for bookmarks etc.)
source_paths = [
    "/wp-content/uploads/2025/03/Untitled-design-4.png",
    "/wp-content/uploads/2025/01/Untitled-design-4.jpg",
    "/wp-content/uploads/2025/09/James-D-768x768-removebg-preview.png",
    "/wp-content/uploads/2025/09/KPT-logo.png",
    "/wp-content/uploads/2025/09/FGPC-logo.png",
    "/wp-content/uploads/2025/09/RCG-logo.png",
    "/wp-content/uploads/2025/09/MLF-logo.png",
    "/wp-content/uploads/2025/09/KM-logo.png",
    "/wp-content/uploads/2025/09/KIL-logo.png",
    "/wp-content/uploads/2025/09/ELG-logo.png",
    "/wp-content/uploads/2025/02/AA_Safeguarding_Client_Data_A_Cybersecurity_Guide_for_Businesses_Using_Virtual_Assistants_.pdf",
    "/wp-content/uploads/2025/07/Container-1.png",
    "/wp-content/uploads/2025/05/Intake-Systems.pdf",
    "/wp-content/uploads/2025/07/Container-Absolute-Wrapper.png",
    "/wp-content/uploads/2025/07/AA-Information-Brochure.pdf",
    "/wp-content/uploads/2025/07/Container-Absolute-Wrapper-1.png",
    "/wp-content/uploads/2025/07/Attorney-Assistant-vs.-Competitors.pdf",
    "/wp-content/uploads/2025/07/Container.png",
    "/wp-content/uploads/2025/07/The-CASE-MAXIMIZER-METHOD.pdf",
    "/wp-content/uploads/2025/07/Container-Absolute-Wrapper-2.png",
    "/wp-content/uploads/2025/05/LawyerE28099s_Guide_to_Virtual_Assistants_Why_Legal_VAs_Are_a_Must_for_Modern_Law_Firms.pdf",
    "/wp-content/uploads/2025/07/Container-Absolute-Wrapper-3.png",
    "/wp-content/uploads/2025/08/Client-Intake-SOP-Attorney-Assistant.pdf",
    "/wp-content/uploads/2025/08/AA-LeadMagnetThumbnails-Client-Intake-SOP.webp",
    "/wp-content/uploads/2025/05/Premises-Intake-Script-PDF.pdf",
    "/wp-content/uploads/2025/12/PremisesOnboardingScript1-.webp",
    "/wp-content/uploads/2025/04/Bankruptcy_Intake_Script.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-12.png",
    "/wp-content/uploads/2025/04/Worker_s_Compensation_Intake_Script.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-3.png",
    "/wp-content/uploads/2025/04/Short_Long_Term_Disability_Intake_Script.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-4.png",
    "/wp-content/uploads/2025/12/Personal_Injury_Law_scripts.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-6.png",
    "/wp-content/uploads/2025/04/Immigration_Practice_Area_Scripts.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-7.png",
    "/wp-content/uploads/2025/12/1_FAMILY_LAW_-_Intake.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-8.png",
    "/wp-content/uploads/2025/04/Scripts-_Estate_Planning.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-5.png",
    "/wp-content/uploads/2025/04/Employee_Litigation_Intake_Scripts.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-9.png",
    "/wp-content/uploads/2025/04/Criminal_Law_Intake_Scripts.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-10.png",
    "/wp-content/uploads/2025/04/Consumer_Law_Practice_Area_Script.pdf",
    "/wp-content/uploads/2025/07/Law-Firm-Intake-Strategy-11.png",
]
old_paths.update(source_paths)

# Build the redirect map
redirects = {}
unresolved = []
for old_path in sorted(old_paths):
    filename = old_path.rsplit('/', 1)[-1]
    if filename in file_map:
        redirects[old_path] = file_map[filename]
    else:
        # Try with date prefix
        match = re.match(r'/wp-content/uploads/(\d{4})/(\d{2})/(.*)', old_path)
        if match:
            prefixed = f"{match.group(1)}-{match.group(2)}-{match.group(3)}"
            if prefixed in file_map:
                redirects[old_path] = file_map[prefixed]
            else:
                unresolved.append(old_path)
        else:
            unresolved.append(old_path)

# Output as JSON for use by other scripts
output = {
    "redirects": redirects,
    "unresolved": unresolved
}
with open(os.path.join(BASE, 'scripts/output/redirect-map.json'), 'w') as f:
    json.dump(output, f, indent=2)

print(f"Mapped {len(redirects)} redirects")
print(f"Unresolved: {len(unresolved)} paths")
if unresolved:
    for u in unresolved[:20]:
        print(f"  UNRESOLVED: {u}")
    if len(unresolved) > 20:
        print(f"  ... and {len(unresolved) - 20} more")
