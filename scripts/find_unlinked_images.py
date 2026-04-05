import json
import os
import re

def slugify(text):
    if not text: return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

MEDICINES_DATA = 'public/data/medicines.json'
ASSETS_DIR = 'public/assets/medicines'

with open(MEDICINES_DATA, 'r') as f:
    medicines = json.load(f)

linked_images = {item.get('image') for item in medicines if item.get('image')}
actual_files = {f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f))}

unlinked = actual_files - linked_images

# Filter out placeholders from unlinked
GLOBAL_PLACEHOLDERS = {'generic_syrup.webp', 'generic_capsules.webp', 'generic_tablets.webp', 'generic_ointment.webp', 'generic_spray.webp'}
unlinked = {u for u in unlinked if not u.startswith('0000') and u not in GLOBAL_PLACEHOLDERS and u != 'hospital_clinic.webp'}

print(f"Found {len(unlinked)} unlinked images on disk.")
if unlinked:
    print("Top 20 unlinked images:")
    for u in sorted(list(unlinked))[:20]:
        print(f"  - {u}")
        
    # See if any of these match a product name in medicines.json
    print("\nAttempting to find products for these unlinked images...")
    for u in unlinked:
        u_base = os.path.splitext(u)[0]
        u_slug = slugify(u_base)
        
        for item in medicines:
            name_slug = slugify(item.get('name', ''))
            if u_slug == name_slug or u_slug.startswith(name_slug) or name_slug.startswith(u_slug):
                if len(u_slug) > 5 or len(name_slug) > 5:
                    print(f"  MATCH FOUND: Filename '{u}' matches Product '{item.get('name')}'")
