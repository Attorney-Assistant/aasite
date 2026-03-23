#!/usr/bin/env python3
"""Generate .htaccess and Astro redirect files from redirect map."""
import json, os

BASE = "/Users/nicole/Documents/AttorneyAssistant"

with open(os.path.join(BASE, 'scripts/output/redirect-map.json'), 'r') as f:
    data = json.load(f)

redirects = data['redirects']

# --- Generate .htaccess ---
htaccess_lines = [
    "# Redirect old wp-content/uploads paths to new categorized uploads structure",
    "# Auto-generated - do not edit manually",
    "",
    "RewriteEngine On",
    "",
]

for old_path, new_path in sorted(redirects.items()):
    # Escape special chars in old path for regex
    escaped = old_path.replace('.', r'\.').replace('(', r'\(').replace(')', r'\)')
    htaccess_lines.append(f'RewriteRule ^{escaped.lstrip("/")}$ {new_path} [R=301,L]')

htaccess_content = '\n'.join(htaccess_lines) + '\n'

with open(os.path.join(BASE, 'public/.htaccess'), 'w') as f:
    f.write(htaccess_content)

print(f"Generated .htaccess with {len(redirects)} redirect rules")

# --- Generate Astro catch-all redirect page ---
# Build a JS map object for the Astro file
js_entries = []
for old_path, new_path in sorted(redirects.items()):
    # Extract the path portion after /wp-content/uploads/
    rest = old_path.replace('/wp-content/uploads/', '')
    js_entries.append(f'  "{rest}": "{new_path}"')

js_map = ',\n'.join(js_entries)

astro_content = f'''---
// Catch-all redirect for old wp-content/uploads paths
// Maps old WordPress date-based paths to new categorized uploads structure

const pathMap: Record<string, string> = {{
{js_map}
}};

const {{ path }} = Astro.params;
const requestedPath = Array.isArray(path) ? path.join("/") : path || "";
const newUrl = pathMap[requestedPath];

if (newUrl) {{
  return Astro.redirect(newUrl, 301);
}}

// If no mapping found, serve the file from the old location (backup)
// The old wp-content folder is kept as a backup
return new Response(null, {{
  status: 404,
  statusText: "Not Found"
}});
---
'''

# Ensure directory exists
astro_dir = os.path.join(BASE, 'src/pages/wp-content/uploads')
os.makedirs(astro_dir, exist_ok=True)

with open(os.path.join(astro_dir, '[...path].astro'), 'w') as f:
    f.write(astro_content)

print(f"Generated Astro catch-all redirect at src/pages/wp-content/uploads/[...path].astro")
