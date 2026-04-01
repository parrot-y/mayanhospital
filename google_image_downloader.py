"""
Medicine Product Image Downloader
==================================
Uses Bing Images (scraper-friendly) with DuckDuckGo as fallback.
No Google — Google blocks bots aggressively.

Requirements:
    pip install selenium pillow requests tqdm

Usage:
    1. Put product names (one per line) in products.txt
    2. Run: python image_downloader.py
"""

import os
import re
import ssl
import time
import shutil
import urllib3
import requests
from io import BytesIO
from requests.adapters import HTTPAdapter
from urllib3.util.ssl_ import create_urllib3_context

# Suppress SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class LegacySSLAdapter(HTTPAdapter):
    """
    Forces TLS 1.0–1.3 with legacy ciphers.
    Fixes SSLEOFError on Kali Linux where OpenSSL rejects certain
    server SSL configurations during the handshake.
    """
    def init_poolmanager(self, *args, **kwargs):
        ctx = create_urllib3_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ctx.options |= ssl.OP_LEGACY_SERVER_CONNECT
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        kwargs["ssl_context"] = ctx
        super().init_poolmanager(*args, **kwargs)

    def proxy_manager_for(self, proxy, **proxy_kwargs):
        ctx = create_urllib3_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ctx.options |= ssl.OP_LEGACY_SERVER_CONNECT
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        proxy_kwargs["ssl_context"] = ctx
        return super().proxy_manager_for(proxy, **proxy_kwargs)


def make_session() -> requests.Session:
    """Create a requests session that tolerates broken SSL on any host."""
    s = requests.Session()
    adapter = LegacySSLAdapter()
    s.mount("https://", adapter)
    s.mount("http://", adapter)
    return s


SESSION = make_session()
from PIL import Image
from tqdm import tqdm

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# ── CONFIG ───────────────────────────────────────────────────────────────────
INPUT_FILE  = "products.txt"
OUTPUT_DIR  = "images"
MIN_SIZE    = 150       # minimum pixel dimension to accept
HEADLESS    = True      # False = show browser window (useful for debugging)
PAGE_WAIT   = 2.5       # seconds after page load
MAX_THUMBS  = 5         # max thumbnails to try per product per source
# ─────────────────────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def clean_filename(name: str) -> str:
    safe = re.sub(r'[^\w\s-]', '', name).strip()
    safe = re.sub(r'\s+', '_', safe)
    return safe[:80]


def setup_driver() -> webdriver.Chrome:
    options = Options()
    if HEADLESS:
        options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--lang=en-US,en;q=0.9")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )
    chromedriver_path = shutil.which("chromedriver") or "/usr/bin/chromedriver"
    driver = webdriver.Chrome(service=Service(chromedriver_path), options=options)
    driver.execute_cdp_cmd(
        "Page.addScriptToEvaluateOnNewDocument",
        {"source": "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"}
    )
    return driver


def _validate_and_save(data: bytes, filepath: str) -> bool:
    """Validate image size and save. Returns True on success."""
    img = Image.open(BytesIO(data)).convert("RGB")
    if img.width < MIN_SIZE or img.height < MIN_SIZE:
        tqdm.write(f"    ⚠ Too small ({img.width}×{img.height}), skip.")
        return False
    img.save(filepath, "JPEG", quality=90)
    tqdm.write(f"    ✅ Saved {img.width}×{img.height}px → {os.path.basename(filepath)}")
    return True


def try_download(url: str, filepath: str, referer: str = "") -> bool:
    """
    Try downloading with 3 methods in order:
    1. requests + LegacySSLAdapter  (handles most SSL issues)
    2. curl subprocess               (handles remaining SSL edge cases)
    3. wget subprocess               (last resort)
    """
    h = dict(HEADERS)
    if referer:
        h["Referer"] = referer

    # ── Method 1: requests with legacy SSL ───────────────────────────────────
    try:
        r = SESSION.get(url, headers=h, timeout=20, verify=False)
        r.raise_for_status()
        if r.content:
            return _validate_and_save(r.content, filepath)
    except Exception as e:
        tqdm.write(f"    ⚠ requests failed: {type(e).__name__} — trying curl…")

    # ── Method 2: curl (uses system OpenSSL, much more permissive on Kali) ───
    try:
        import subprocess, tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix=".tmp") as tmp:
            tmp_path = tmp.name
        result = subprocess.run(
            [
                "curl", "-L", "-s", "-k",          # -k = ignore SSL errors
                "--tlsv1", "--tls-max", "1.3",      # allow any TLS version
                "--ciphers", "DEFAULT@SECLEVEL=0",  # lowest cipher restrictions
                "--max-time", "20",
                "--retry", "2",
                "-H", f"User-Agent: {HEADERS['User-Agent']}",
                "-H", f"Referer: {referer or 'https://www.bing.com/'}",
                "-o", tmp_path,
                url
            ],
            capture_output=True, timeout=30
        )
        if result.returncode == 0 and os.path.getsize(tmp_path) > 500:
            with open(tmp_path, "rb") as f:
                data = f.read()
            os.unlink(tmp_path)
            return _validate_and_save(data, filepath)
        else:
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
            tqdm.write(f"    ⚠ curl failed (exit {result.returncode}) — trying wget…")
    except Exception as e:
        tqdm.write(f"    ⚠ curl error: {e} — trying wget…")

    # ── Method 3: wget ────────────────────────────────────────────────────────
    try:
        import subprocess, tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix=".tmp") as tmp:
            tmp_path = tmp.name
        result = subprocess.run(
            [
                "wget", "-q", "--no-check-certificate",
                "--timeout=20", "--tries=2",
                f"--user-agent={HEADERS['User-Agent']}",
                "-O", tmp_path, url
            ],
            capture_output=True, timeout=30
        )
        if result.returncode == 0 and os.path.getsize(tmp_path) > 500:
            with open(tmp_path, "rb") as f:
                data = f.read()
            os.unlink(tmp_path)
            return _validate_and_save(data, filepath)
        else:
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
    except Exception as e:
        tqdm.write(f"    ✖ All download methods failed: {e}")

    return False


# ── SOURCE 1: Direct requests to Bing (fastest, no browser) ──────────────────

def search_bing_direct(product: str) -> str | None:
    """Pure requests scrape of Bing Images — no Selenium needed."""
    query = requests.utils.quote(f"{product} medicine")
    url = f"https://www.bing.com/images/search?q={query}&form=HDRSC2"
    try:
        r = SESSION.get(url, headers=HEADERS, timeout=15, verify=False)
        r.raise_for_status()
        murls = re.findall(r'"murl"\s*:\s*"(https?://[^"]+)"', r.text)
        for murl in murls[:MAX_THUMBS]:
            if any(ext in murl.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]):
                tqdm.write(f"    ⚡ Bing direct: {murl[:80]}...")
                return murl
        if murls:
            tqdm.write(f"    ⚡ Bing direct (no-ext): {murls[0][:80]}...")
            return murls[0]
    except Exception as e:
        tqdm.write(f"    ⚠ Bing direct error: {e}")
    return None


# ── SOURCE 2: Bing via Selenium ───────────────────────────────────────────────

def search_bing_selenium(driver: webdriver.Chrome, product: str) -> str | None:
    """Bing Images via Selenium — handles JS-rendered pages."""
    query = requests.utils.quote(f"{product} medicine")
    url = f"https://www.bing.com/images/search?q={query}&form=HDRSC2&first=1"
    try:
        driver.get(url)
        time.sleep(PAGE_WAIT)

        # Bing puts real image URL in .iusc div's 'm' attribute as JSON
        iusc_divs = driver.find_elements(By.CSS_SELECTOR, ".iusc")
        for div in iusc_divs[:MAX_THUMBS]:
            try:
                m_attr = div.get_attribute("m") or ""
                match = re.search(r'"murl"\s*:\s*"(https?://[^"]+)"', m_attr)
                if match:
                    img_url = match.group(1)
                    tqdm.write(f"    🔵 Bing Selenium: {img_url[:80]}...")
                    return img_url
            except Exception:
                continue

        # Fallback: <img class="mimg"> tags
        imgs = driver.find_elements(By.CSS_SELECTOR, "img.mimg")
        for img in imgs[:MAX_THUMBS]:
            for attr in ("src2", "src"):
                src = img.get_attribute(attr) or ""
                if src.startswith("http") and "bing.com" not in src:
                    tqdm.write(f"    🔵 Bing img tag: {src[:80]}...")
                    return src

    except Exception as e:
        tqdm.write(f"    ⚠ Bing Selenium error: {e}")
    return None


# ── SOURCE 3: DuckDuckGo via Selenium ────────────────────────────────────────

def search_duckduckgo(driver: webdriver.Chrome, product: str) -> str | None:
    """DuckDuckGo Images fallback."""
    query = requests.utils.quote(f"{product} medicine tablet")
    url = f"https://duckduckgo.com/?q={query}&iax=images&ia=images"
    try:
        driver.get(url)
        time.sleep(PAGE_WAIT + 1)

        tiles = driver.find_elements(By.CSS_SELECTOR, "[data-id]")
        for tile in tiles[:MAX_THUMBS]:
            try:
                data_id = tile.get_attribute("data-id") or ""
                if data_id.startswith("http") and any(
                    ext in data_id.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]
                ):
                    tqdm.write(f"    🟠 DDG: {data_id[:80]}...")
                    return data_id
            except Exception:
                continue

        imgs = driver.find_elements(By.CSS_SELECTOR, "div.tile--img img")
        for img in imgs[:MAX_THUMBS]:
            for attr in ("data-src", "src"):
                src = img.get_attribute(attr) or ""
                if src.startswith("http") and "duckduckgo.com" not in src:
                    tqdm.write(f"    🟠 DDG img: {src[:80]}...")
                    return src

    except Exception as e:
        tqdm.write(f"    ⚠ DuckDuckGo error: {e}")
    return None


# ── ORCHESTRATOR ──────────────────────────────────────────────────────────────

def get_image_url(driver: webdriver.Chrome, product: str) -> str | None:
    """Try all sources in order until one works."""
    url = search_bing_direct(product)
    if url:
        return url
    url = search_bing_selenium(driver, product)
    if url:
        return url
    url = search_duckduckgo(driver, product)
    return url


# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    if not os.path.isfile(INPUT_FILE):
        print(f"❌  '{INPUT_FILE}' not found.")
        return

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        products = [line.strip() for line in f if line.strip()]

    if not products:
        print("❌  products.txt is empty.")
        return

    print(f"📋  {len(products)} products loaded.\n")

    driver = setup_driver()
    failed = []
    saved = 0

    try:
        for product in tqdm(products, desc="Downloading", unit="product"):
            filename = clean_filename(product) + ".jpg"
            filepath = os.path.join(OUTPUT_DIR, filename)

            if os.path.exists(filepath):
                tqdm.write(f"⏭  Skip (exists): {filename}")
                saved += 1
                continue

            tqdm.write(f"\n🔍  {product}")

            img_url = get_image_url(driver, product)

            if img_url:
                success = try_download(img_url, filepath, referer="https://www.bing.com/")
            else:
                tqdm.write(f"    ✖ No URL found from any source.")
                success = False

            if success:
                saved += 1
            else:
                failed.append(product)

            time.sleep(1.0)

    finally:
        driver.quit()

    print("\n" + "─" * 55)
    print(f"✅  Done.  {saved}/{len(products)} images saved to '{OUTPUT_DIR}/'")

    if failed:
        failed_path = "failed_products.txt"
        with open(failed_path, "w", encoding="utf-8") as f:
            f.write("\n".join(failed))
        print(f"⚠   {len(failed)} failed → '{failed_path}'")


if __name__ == "__main__":
    main()
