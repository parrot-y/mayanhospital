import os
import time
import requests
from urllib.parse import quote
from io import BytesIO
from PIL import Image
from tqdm import tqdm

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options


# ----------------------------
# SETTINGS
# ----------------------------
INPUT_FILE = "products.txt"
OUTPUT_DIR = "images"
DELAY = 2


# ----------------------------
# CLEAN FILE NAME
# ----------------------------
def clean_filename(name):
    return "".join(c for c in name if c.isalnum() or c in " _-").rstrip()


# ----------------------------
# DOWNLOAD IMAGE
# ----------------------------
def download_image(url, filepath):
    try:
        response = requests.get(url, timeout=10)
        img = Image.open(BytesIO(response.content)).convert("RGB")

        # Skip tiny useless images
        if img.width < 200 or img.height < 200:
            return False

        img.save(filepath, "JPEG", quality=90)
        return True
    except:
        return False


# ----------------------------
# SETUP FIREFOX
# ----------------------------
def setup_driver():
    options = Options()
    options.add_argument("--width=1200")
    options.add_argument("--height=800")

    driver = webdriver.Firefox(options=options)
    return driver


# ----------------------------
# GET BEST IMAGE
# ----------------------------
def get_best_image(driver, product):
    queries = [
        f"{product} Kenya",
        f"{product} product",
        f"{product} pack",
        f"{product} box",
    ]

    for query in queries:
        try:
            url = f"https://www.google.com/search?q={quote(query)}&tbm=isch"
            driver.get(url)
            time.sleep(DELAY)

            thumbnails = driver.find_elements(By.CSS_SELECTOR, "img")

            for thumb in thumbnails[:10]:
                try:
                    thumb.click()
                    time.sleep(1.5)

                    images = driver.find_elements(By.CSS_SELECTOR, "img")

                    for img in images:
                        src = img.get_attribute("src")

                        if src and "http" in src and not src.startswith("data:"):
                            return src

                except:
                    continue

        except:
            continue

    return None


# ----------------------------
# MAIN
# ----------------------------
def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        products = [line.strip() for line in f if line.strip()]

    driver = setup_driver()

    for product in tqdm(products, desc="Downloading images"):
        try:
            img_url = get_best_image(driver, product)

            if not img_url:
                print(f"❌ No image found for: {product}")
                continue

            filename = clean_filename(product) + ".jpg"
            filepath = os.path.join(OUTPUT_DIR, filename)

            success = download_image(img_url, filepath)

            if not success:
                print(f"⚠️ Bad image skipped for: {product}")

        except Exception as e:
            print(f"❌ Error for {product}: {e}")

    driver.quit()
    print("✅ DONE — High accuracy images downloaded!")


if __name__ == "__main__":
    main()
