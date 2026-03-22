import json
import os

def audit_images():
    with open('public/data/medicines.json', 'r') as f:
        medicines = json.load(f)
    
    with open('public/data/available_images.json', 'r') as f:
        available_assets = set(json.load(f))
    
    total = len(medicines)
    matched = 0
    missing = []
    
    for med in medicines:
        img_name = med.get('image')
        if img_name in available_assets:
            matched += 1
        else:
            missing.append(med['name'])
            
    print(f"Total Medicines: {total}")
    print(f"Matched Images: {matched} ({(matched/total)*100:.2f}%)")
    print(f"Missing Images: {len(missing)} ({(len(missing)/total)*100:.2f}%)")
    
    # Save missing list for reference
    with open('public/data/missing_images.json', 'w') as f:
        json.dump(missing, f, indent=2)

if __name__ == "__main__":
    audit_images()
