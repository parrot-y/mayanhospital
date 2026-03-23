import json
import os

def sync_images():
    asset_dir = 'public/assets/medicines'
    files = [f for f in os.listdir(asset_dir) if os.path.isfile(os.path.join(asset_dir, f))]
    
    # Filter for image extensions
    images = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    images.sort()
    
    with open('public/data/available_images.json', 'w') as f:
        json.dump(images, f)
        
    print(f"Synchronized {len(images)} images to available_images.json")

if __name__ == "__main__":
    sync_images()
