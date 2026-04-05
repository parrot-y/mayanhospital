import os
import json

MEDICINES_DATA = 'public/data/medicines.json'
ASSETS_DIR = 'public/assets/medicines'

if not os.path.exists(MEDICINES_DATA):
    print(f"Error: {MEDICINES_DATA} not found")
    exit(1)

with open(MEDICINES_DATA, 'r') as f:
    medicines = json.load(f)

GLOBAL_PLACEHOLDERS = {'generic_syrup.webp', 'generic_capsules.webp', 'generic_tablets.webp', 'generic_ointment.webp', 'generic_spray.webp'}

# All 0000 images on disk
numbered_on_disk = [f for f in os.listdir(ASSETS_DIR) if f.startswith('0000')]

# Check what is actually USED in the json
used_placeholders = set()
for item in medicines:
    img = item.get('image', '')
    if img.startswith('0000') or img in GLOBAL_PLACEHOLDERS:
        used_placeholders.add(img)

print('--- GLOBAL PLACEHOLDER IMAGES ---')
for img in sorted(list(GLOBAL_PLACEHOLDERS)):
    print(f'  - {img}')

print('\n--- NUMBERED PLACEHOLDER ICONS (starting with 0000) ---')
for img in sorted(numbered_on_disk):
    print(f'  - {img}')

print('\n--- PLACEHOLDERS CURRENTLY ASSIGNED TO PRODUCTS ---')
if not used_placeholders:
    print('  - None (Every product now has a specific image!)')
else:
    for img in sorted(list(used_placeholders)):
        count = sum(1 for item in medicines if item.get('image') == img)
        print(f'  - {img} (used by {count} products)')
