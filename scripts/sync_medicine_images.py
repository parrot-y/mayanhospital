import os
import json
import re
import difflib

# Paths
MEDICINES_DATA = 'public/data/medicines.json'
AVAILABLE_IMAGES_DATA = 'public/data/available_images.json'
ASSETS_DIR = 'public/assets/medicines'

GLOBAL_PLACEHOLDERS = {
    'generic_syrup.webp', 'generic_capsules.webp', 'generic_tablets.webp', 
    'generic_ointment.webp', 'generic_spray.webp', 'asprin_300mg_tabs_1000s.webp',
    'ashton_and_parsons_20s.webp', 'hospital_clinic.webp'
}

def slugify(text):
    if not text: return ""
    text = text.lower()
    # Replace non-alphanumeric with underscores
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

def sync():
    # 1. Get actual files on disk
    if not os.path.exists(ASSETS_DIR):
        print(f"Error: {ASSETS_DIR} not found")
        return
        
    actual_files = [f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f))]
    actual_files.sort()
    
    # 2. Update available_images.json
    print(f"Updating {AVAILABLE_IMAGES_DATA} with {len(actual_files)} files...")
    with open(AVAILABLE_IMAGES_DATA, 'w') as f:
        json.dump(actual_files, f, indent=2)
        
    # 3. Load medicines.json
    with open(MEDICINES_DATA, 'r') as f:
        medicines = json.load(f)
        
    # 4. Find mismatches and try to fix them
    updated_count = 0
    actual_files_lower = {f.lower(): f for f in actual_files}
    
    # Map slugified names to actual filenames for quick lookup
    slug_map = {}
    for f in actual_files:
        # Strip extension for slug mapping
        base = os.path.splitext(f)[0]
        slug = slugify(base)
        if slug not in slug_map:
            slug_map[slug] = f
            
    for item in medicines:
        name = item.get('name', '')
        img = item.get('image', '')
        
        # Determine if current image is missing or a placeholder/trap
        is_missing = not img or img not in actual_files
        is_placeholder = img.startswith('0000') or img in GLOBAL_PLACEHOLDERS
        
        if is_missing or is_placeholder:
            # TRY 1: Slugified name match
            name_slug = slugify(name)
            if name_slug in slug_map:
                old_img = img
                item['image'] = slug_map[name_slug]
                if old_img != item['image']:
                    print(f"Found match by slug: '{name}' -> {item['image']} (was {old_img})")
                    updated_count += 1
                continue
                
            # TRY 2: Prefix match (product name starts with a file's slug or vice versa)
            matched = False
            for slug, filename in slug_map.items():
                if (name_slug.startswith(slug) and len(slug) > 5) or (slug.startswith(name_slug) and len(name_slug) > 5):
                    old_img = img
                    item['image'] = filename
                    if old_img != item['image']:
                        print(f"Found match by prefix: '{name}' -> {item['image']} (was {old_img})")
                        updated_count += 1
                    matched = True
                    break
            if matched: continue
            
            # TRY 3: Fuzzy matching on filenames if we have an image field but it's wrong
            if img and not is_placeholder:
                matches = difflib.get_close_matches(img, actual_files, n=1, cutoff=0.7)
                if matches:
                    old_img = img
                    item['image'] = matches[0]
                    if old_img != item['image']:
                        print(f"Found match by fuzzy filename: '{name}' -> {item['image']} (was {old_img})")
                        updated_count += 1
                    continue

    if updated_count > 0:
        print(f"Updating {MEDICINES_DATA} with {updated_count} fixes...")
        with open(MEDICINES_DATA, 'w') as f:
            json.dump(medicines, f, indent=2)
    else:
        print("No changes needed in medicines.json")

if __name__ == "__main__":
    sync()
