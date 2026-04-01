import os
import json
import subprocess
import shutil

def normalize_name(name):
    # Convert to lowercase and replace spaces/special characters with underscores
    name = name.lower()
    name = "".join([c if c.isalnum() else "_" for c in name])
    while "__" in name:
        name = name.replace("__", "_")
    return name.strip("_")

def update_medicine_images():
    images_dir = '/home/kali/mayanhospital/images'
    assets_dir = '/home/kali/mayanhospital/public/assets/medicines'
    placeholder_size = 10918  # Exact size of the generic vaccine box image

    # 1. Map available images in the source folder
    source_images = {}
    for filename in os.listdir(images_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            base = os.path.splitext(filename)[0]
            norm = normalize_name(base)
            full_path = os.path.join(images_dir, filename)
            size = os.path.getsize(full_path)
            
            # If multiple versions exist, pick the largest one (likely higher quality)
            if norm not in source_images or size > source_images[norm]['size']:
                source_images[norm] = {'path': full_path, 'size': size, 'filename': filename}

    print(f"Found {len(source_images)} unique source images in {images_dir}")

    # 2. Iterate through existing assets and replace placeholders
    replaced_count = 0
    for filename in os.listdir(assets_dir):
        if filename.lower().endswith('.webp'):
            filepath = os.path.join(assets_dir, filename)
            base = os.path.splitext(filename)[0]
            norm = normalize_name(base)
            
            # Check if it's a placeholder
            try:
                is_placeholder = abs(os.path.getsize(filepath) - placeholder_size) < 10
            except OSError:
                continue
            
            if norm in source_images:
                source_image = source_images[norm]
                print(f"Matching {filename} to {source_image['filename']}...")
                
                # Convert source image to webp and replace asset
                try:
                    subprocess.run(['convert', source_image['path'], filepath], check=True)
                    replaced_count += 1
                except subprocess.CalledProcessError as e:
                    print(f"Error converting {source_image['filename']}: {e}")

    print(f"Successfully replaced {replaced_count} placeholder(s) in {assets_dir}")

    # 3. Synchronize available_images.json
    files = [f for f in os.listdir(assets_dir) if os.path.isfile(os.path.join(assets_dir, f))]
    images_list = sorted([f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
    
    with open('/home/kali/mayanhospital/public/data/available_images.json', 'w') as f:
        json.dump(images_list, f, indent=2)
    
    print(f"Synchronized {len(images_list)} images to available_images.json")

if __name__ == "__main__":
    update_medicine_images()
