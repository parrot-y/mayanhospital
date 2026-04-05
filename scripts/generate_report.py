import json
import os
import re
import difflib

def slugify(text):
    if not text: return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

MEDICINES_DATA = 'public/data/medicines.json'
ASSETS_DIR = 'public/assets/medicines'

if not os.path.exists(MEDICINES_DATA):
    print(f"Error: {MEDICINES_DATA} not found")
    exit(1)

with open(MEDICINES_DATA, 'r') as f:
    medicines = json.load(f)

actual_files = [f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f))]
actual_files.sort()

# Map slugified names to filenames
slug_map = {}
for f in actual_files:
    base = os.path.splitext(f)[0]
    slug = slugify(base)
    if slug not in slug_map:
        slug_map[slug] = f

GLOBAL_PLACEHOLDERS = {'generic_syrup.webp', 'generic_capsules.webp', 'generic_tablets.webp', 'generic_ointment.webp', 'generic_spray.webp'}

proposed_changes = []

for item in medicines:
    name = item.get('name', '')
    img = item.get('image', '')
    
    is_placeholder = img.startswith('0000') or img in GLOBAL_PLACEHOLDERS or not img
    
    if is_placeholder:
        name_slug = slugify(name)
        
        # 1. Exact slug match
        if name_slug in slug_map:
            proposed_changes.append({
                "name": name,
                "current": img,
                "new": slug_map[name_slug],
                "confidence": "High (Exact Name Match)"
            })
            continue

        # 2. Suffix/Prefix match (e.g. name is in filename or vice-versa)
        matched = False
        for sl, filename in slug_map.items():
            if (name_slug.startswith(sl) and len(sl) > 5) or (sl.startswith(name_slug) and len(name_slug) > 5):
                proposed_changes.append({
                    "name": name,
                    "current": img,
                    "new": filename,
                    "confidence": "Medium (Partial Match / Suffix)"
                })
                matched = True
                break
        if matched: continue

# Generate Markdown Report
with open('reconciliation_report.md', 'w') as f:
    f.write("# Image Reconciliation Report\n\n")
    f.write(f"Found **{len(proposed_changes)}** potential image improvements for products currently using placeholders.\n\n")
    f.write("| Product Name | Current Image | Proposed Image | Confidence |\n")
    f.write("| :--- | :--- | :--- | :--- |\n")
    for ch in proposed_changes:
        f.write(f"| {ch['name']} | `{ch['current']}` | **{ch['new']}** | {ch['confidence']} |\n")

print(f"Report generated: reconciliation_report.md with {len(proposed_changes)} items.")
