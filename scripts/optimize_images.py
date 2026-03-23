import os
import json
from PIL import Image

def optimize_images():
    asset_dir = 'public/assets/medicines'
    data_file = 'public/data/medicines.json'
    
    if not os.path.exists(asset_dir):
        print(f"Error: {asset_dir} not found.")
        return

    # 1. Convert and Compress Images
    files = [f for f in os.listdir(asset_dir) if os.path.isfile(os.path.join(asset_dir, f))]
    image_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    print(f"Optimizing {len(image_files)} images...")
    
    count = 0
    for filename in image_files:
        filepath = os.path.join(asset_dir, filename)
        try:
            with Image.open(filepath) as img:
                # Resize if too large
                max_size = (800, 800)
                if img.width > max_size[0] or img.height > max_size[1]:
                    img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Save as WebP
                webp_filename = os.path.splitext(filename)[0] + '.webp'
                webp_path = os.path.join(asset_dir, webp_filename)
                
                # Preserve transparency if RGBA
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGBA')
                else:
                    img = img.convert('RGB')
                    
                img.save(webp_path, 'WEBP', quality=75, method=6)
                
                # If we transformed it, remove the old one if it's different
                if webp_path != filepath:
                    os.remove(filepath)
                
                count += 1
                if count % 100 == 0:
                    print(f"Processed {count} images...")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    # 2. Update medicines.json
    if os.path.exists(data_file):
        with open(data_file, 'r') as f:
            medicines = json.load(f)
        
        updated = False
        for med in medicines:
            if med.get('image') and not med['image'].endswith('.webp'):
                med['image'] = os.path.splitext(med['image'])[0] + '.webp'
                updated = True
        
        if updated:
            with open(data_file, 'w') as f:
                json.dump(medicines, f, indent=2)
            print("Updated medicines.json with .webp extensions.")

    print(f"Successfully optimized {count} images.")

if __name__ == "__main__":
    optimize_images()
