import os
import json
import difflib

# Paths
MEDICINES_DATA = 'public/data/medicines.json'
AVAILABLE_IMAGES_DATA = 'public/data/available_images.json'
ASSETS_DIR = 'public/assets/medicines'

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
    
    for item in medicines:
        img = item.get('image')
        if not img or img not in actual_files:
            # Try case-insensitive match
            if img and img.lower() in actual_files_lower:
                old_img = img
                item['image'] = actual_files_lower[img.lower()]
                print(f"Fixed case mismatch: {old_img} -> {item['image']}")
                updated_count += 1
                continue
                
            # Try to find a very close match if it's missing
            if img:
                matches = difflib.get_close_matches(img, actual_files, n=1, cutoff=0.8)
                if matches:
                    old_img = img
                    item['image'] = matches[0]
                    print(f"Fixed fuzzy mismatch: {old_img} -> {item['image']} (for {item['name']})")
                    updated_count += 1
                    continue
                    
            # Special case: Arimis
            if 'ARIMIS' in item['name'].upper() and 'milking_jelly' in img:
                arimis_files = [f for f in actual_files if 'arimis' in f.lower() and 'milking' in f.lower()]
                if arimis_files:
                    old_img = img
                    item['image'] = arimis_files[0]
                    print(f"Fixed Arimis special case: {old_img} -> {item['image']}")
                    updated_count += 1

    if updated_count > 0:
        print(f"Updating {MEDICINES_DATA} with {updated_count} fixes...")
        with open(MEDICINES_DATA, 'w') as f:
            json.dump(medicines, f, indent=2)
    else:
        print("No changes needed in medicines.json")

if __name__ == "__main__":
    sync()
