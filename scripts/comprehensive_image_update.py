import os
import json
import subprocess
import re

def canonicalize(name):
    # Remove all non-alphanumeric, lowercase
    name = name.lower()
    # Replace common variations with canonical forms
    variations = {
        r'\bsuspension\b': 'susp',
        r'\btablets\b': 'tabs',
        r'\btablet\b': 'tabs',
        r'\btab\b': 'tabs',
        r'\bcapsules\b': 'caps',
        r'\bcapsule\b': 'caps',
        r'\bcap\b': 'caps',
        r'\binjection\b': 'inj',
        r'\bsyrup\b': 'syr',
        r'\bsyp\b': 'syr',
        r'\bointment\b': 'oint',
        r'\bsuppository\b': 'supp',
        r'\bsupp\b': 'supp',
        r'\bmillilitre\b': 'ml',
        r'\bmillilitres\b': 'ml',
        r'\bmls\b': 'ml',
        r'\bmilligram\b': 'mg',
        r'\bmilligrams\b': 'mg',
        r'\bmgs\b': 'mg',
        r'\bgm\b': 'g',
        r'\bgram\b': 'g',
        r'\bgrams\b': 'g',
    }
    for pattern, replacement in variations.items():
        name = re.sub(pattern, replacement, name)
    
    # Remove all non-alphanumeric characters
    name = re.sub(r'[^a-z0-9]', '', name)
    return name

def update_images():
    images_dir = '/home/kali/mayanhospital/images'
    assets_dir = '/home/kali/mayanhospital/public/assets/medicines'
    medicines_file = '/home/kali/mayanhospital/public/data/medicines.json'
    placeholder_size = 10918

    with open(medicines_file, 'r') as f:
        medicines = json.load(f)

    # 1. Map source images
    source_images = {}
    for filename in os.listdir(images_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            base = os.path.splitext(filename)[0]
            canon = canonicalize(base)
            full_path = os.path.join(images_dir, filename)
            size = os.path.getsize(full_path)
            
            if canon not in source_images or size > source_images[canon]['size']:
                source_images[canon] = {'path': full_path, 'size': size, 'filename': filename}

    print(f"Mapped {len(source_images)} unique source images (canonicalized).")

    # 2. Iterate through existing assets and replace based on filename matches
    updated_assets = set()
    for filename in os.listdir(assets_dir):

        if filename.lower().endswith('.webp'):
            base = os.path.splitext(filename)[0]
            canon = canonicalize(base)
            
            if canon in source_images:
                source = source_images[canon]
                target_path = os.path.join(assets_dir, filename)
                print(f"Matched asset filename '{filename}' -> {source['filename']}")
                try:
                    subprocess.run(['convert', source['path'], target_path], check=True)
                    updated_assets.add(filename)
                except subprocess.CalledProcessError as e:
                    print(f"Error converting {source['filename']}: {e}")

    # 3. Iterate through medicines to find matches from database (handles cases where asset don't exist yet)
    for med in medicines:
        name = med['name']
        image_name = med.get('image')
        if not image_name or image_name in updated_assets:
            continue
            
        canon_name = canonicalize(name)
        
        if canon_name in source_images:
            source = source_images[canon_name]
            target_path = os.path.join(assets_dir, image_name)
            
            print(f"Matched database name '{name}' -> {source['filename']} (Target: {image_name})")
            try:
                subprocess.run(['convert', source['path'], target_path], check=True)
                updated_assets.add(image_name)
            except subprocess.CalledProcessError as e:
                print(f"Error converting {source['filename']}: {e}")


    print(f"Successfully updated {len(updated_assets)} images in assets folder.")

    # 3. Final synchronization of available_images.json
    files = [f for f in os.listdir(assets_dir) if os.path.isfile(os.path.join(assets_dir, f))]
    images_list = sorted([f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
    
    with open('/home/kali/mayanhospital/public/data/available_images.json', 'w') as f:
        json.dump(images_list, f, indent=2)
    
    print(f"Synchronized {len(images_list)} images to available_images.json")

if __name__ == "__main__":
    update_images()
