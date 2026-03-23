#!/usr/bin/env python3
"""Extract all wp-content/uploads paths from wp-xml-pages.json."""
import json, re

with open('/Users/nicole/Documents/AttorneyAssistant/scripts/output/wp-xml-pages.json', 'r') as f:
    data = json.load(f)

paths = set()
for page in data:
    content = page.get('content', '') or ''
    matches = re.findall(r'/wp-content/uploads/\d{4}/\d{2}/[^"\'\s<>)]+', content)
    paths.update(matches)

for p in sorted(paths):
    print(p)
print(f'\nTotal unique paths: {len(paths)}')
