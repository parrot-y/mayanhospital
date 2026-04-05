import os
import json
import re
import difflib

MEDICINES_DATA = 'public/data/medicines.json'
AVAILABLE_IMAGES_DATA = 'public/data/available_images.json'
ASSETS_DIR = 'public/assets/medicines'

GLOBAL_PLACEHOLDERS = {'generic_syrup.webp', 'generic_capsules.webp', 'generic_tablets.webp', 'generic_ointment.webp', 'generic_spray.webp'}

def slugify(text):
    if not text: return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

def run():
    actual_files = [f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f))]
    actual_files_lower = {f.lower(): f for f in actual_files}
    
    slug_map = {}
    for f in actual_files:
        base = os.path.splitext(f)[0]
        slug = slugify(base)
        if slug not in slug_map:
            slug_map[slug] = f

    with open(MEDICINES_DATA, 'r') as f:
        medicines = json.load(f)

    placeholder_items = []
    for item in medicines:
        img = item.get('image', '')
        if not img or img not in actual_files or img.startswith('0000') or img in GLOBAL_PLACEHOLDERS:
            placeholder_items.append(item)

    print(f"Total products using placeholders: {len(placeholder_items)}")
    
    for item in placeholder_items:
        name = item.get('name', '')
        img = item.get('image', '')
        name_slug = slugify(name)
        
        print(f"\nProduct: '{name}' (uses {img})")
        
        # Strategy 1: Slug match
        if name_slug in slug_map:
            print(f"  -> SUCCESS! Found slug match: {slug_map[name_slug]}")
            continue
            
        # Strategy 2: Partial slug match
        potential_matches = []
        for slug, filename in slug_map.items():
            if slug in name_slug or name_slug in slug:
                if len(slug) > 5 or len(name_slug) > 5:
                    potential_matches.append(filename)
        
        if potential_matches:
            print(f"  -> Potential matches: {', '.join(potential_matches[:5])}")
        else:
            # Strategy 3: Fuzzy filename match
            if img and not img.startswith('0000') and img not in GLOBAL_PLACEHOLDERS:
                matches = difflib.get_close_matches(img, actual_files, n=3, cutoff=0.5)
                if matches:
                    print(f"  -> Fuzzy filename matches: {', '.join(matches)}")
            else:
                print("  -> No easy match found.")

run()
