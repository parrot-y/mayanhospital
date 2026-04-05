import json
import os
import re
import difflib

def slugify(text):
    if not text: return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

MEDICINES_DATA = 'public/data/medicines.json'
with open(MEDICINES_DATA, 'r') as f:
    medicines = json.load(f)

print(f"{'Product Name':<40} | {'Image Filename':<40} | Similarity")
print("-" * 95)

discrepancies = []

for item in medicines:
    name = item.get('name', '')
    img = item.get('image', '')
    if not img: continue
    
    name_slug = slugify(name)
    img_base = os.path.splitext(img)[0]
    img_slug = slugify(img_base)
    
    # Use SequenceMatcher to find similarity between slugified names
    similarity = difflib.SequenceMatcher(None, name_slug, img_slug).ratio()
    
    if similarity < 0.5:
        discrepancies.append((name, img, similarity))

# Sort by lowest similarity
discrepancies.sort(key=lambda x: x[2])

for name, img, sim in discrepancies[:20]:
    print(f"{name[:40]:<40} | {img[:40]:<40} | {sim:.2f}")

print(f"\nFound {len(discrepancies)} products with low naming similarity.")
