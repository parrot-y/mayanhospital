import os
import json
from PIL import Image

def optimize_all_images():
    # Directories to optimize
    target_dirs = [
        'public/assets/images',
        'public/assets'
    ]
    
    # Extensions to convert
    image_exts = ('.jpg', '.jpeg', '.png')
    
    print("Starting global image optimization...")
    
    count = 0
    for base_dir in target_dirs:
        if not os.path.exists(base_dir):
            continue
            
        print(f"Checking directory: {base_dir}")
        for root, dirs, files in os.walk(base_dir):
            # Skip medicines directory since it has its own script or is already handled
            if 'medicines' in root:
                continue
                
            for filename in files:
                if filename.lower().endswith(image_exts):
                    filepath = os.path.join(root, filename)
                    try:
                        with Image.open(filepath) as img:
                            # 1. Resize if too large (Max 1200px width/height for standard hero/content images)
                            max_size = (1200, 1200)
                            if img.width > max_size[0] or img.height > max_size[1]:
                                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                            
                            # 2. Convert and Save as WebP
                            webp_filename = os.path.splitext(filename)[0] + '.webp'
                            webp_path = os.path.join(root, webp_filename)
                            
                            # Preserve transparency if RGBA
                            if img.mode in ('RGBA', 'P'):
                                img = img.convert('RGBA')
                            else:
                                img = img.convert('RGB')
                                
                            img.save(webp_path, 'WEBP', quality=80, method=6)
                            
                            # 3. Clean up old file if it's different and not already a webp
                            if webp_path != filepath:
                                os.remove(filepath)
                                print(f"Optimized: {filename} -> {webp_filename}")
                            
                            count += 1
                    except Exception as e:
                        print(f"Error processing {filename} in {root}: {e}")

    print(f"Successfully optimized {count} images to WebP.")

if __name__ == "__main__":
    optimize_all_images()
