"""Scrape Amazon best-seller pages for candidate ASINs.
This is meant to seed the candidate pool, not run daily at high volume.
"""
import json, os, re, time, urllib.request, urllib.error

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, 'AMAZON-CANDIDATES.json')

CATEGORIES = [
    {"name": "Office Chairs", "url": "https://www.amazon.com/Best-Sellers-Office-Chairs/zgbs/home-garden/18682064011"},
    {"name": "Outdoor & Patio", "url": "https://www.amazon.com/Best-Sellers-Outdoor-Fire-Pits/zgbs/lawn-garden/14107621"},
    {"name": "Gaming & PC Accessories", "url": "https://www.amazon.com/Best-Sellers-PC-Gaming-Keyboards/zgbs/videogames/402051011"},
    {"name": "Baby & Parenting Gear", "url": "https://www.amazon.com/Best-Sellers-Baby-Monitors/zgbs/baby/166777011"},
    {"name": "Wearables & Smartwatches", "url": "https://www.amazon.com/Best-Sellers-Smart-Watches/zgbs/electronics/7939901011"},
    {"name": "Travel & Luggage", "url": "https://www.amazon.com/Best-Sellers-Luggage/zgbs/fashion/9479199011"},
    {"name": "Car Accessories", "url": "https://www.amazon.com/Best-Sellers-Cell-Phones-Car/Chargers/zgbs/wireless/2407755011"},
    {"name": "Kitchen Niche Appliances", "url": "https://www.amazon.com/Best-Sellers-Home-Kitchen-Espresso-Machines/zgbs/home-garden/289993"},
    {"name": "Home Improvement & Tools", "url": "https://www.amazon.com/Best-Sellers-Patio-Lawn-Garden-Pressure-Washers/zgbs/lawn-garden/5522268011"},
    {"name": "Sleep & Bedding", "url": "https://www.amazon.com/Best-Sellers-Home-Kitchen-Mattress-Topper-Pads/zgbs/home-garden/3733231"},
    {"name": "Garden & Plants", "url": "https://www.amazon.com/Best-Sellers-Patio-Lawn-Garden-Raised-Beds/zgbs/lawn-garden/14087361"},
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

def fetch(url, retries=2):
    req = urllib.request.Request(url, headers=HEADERS)
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                return resp.read().decode('utf-8', errors='replace')
        except urllib.error.HTTPError as e:
            if attempt < retries:
                time.sleep(2 ** attempt)
                continue
            print(f"HTTP error fetching {url}: {e.code}")
            return None
        except Exception as e:
            if attempt < retries:
                time.sleep(2 ** attempt)
                continue
            print(f"Error fetching {url}: {e}")
            return None

def asin_img_url(asin, size=600):
    return f"https://m.media-amazon.com/images/P/{asin}.01._SCLZZZZZZZ_SL{size}_.jpg"

def validate_image(asin):
    url = asin_img_url(asin, 400)
    req = urllib.request.Request(url, method='HEAD', headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception:
        return False

def parse_page(html, category, max_items=8):
    items = []
    # Amazon best-seller grid uses data-asin on a div enclosing each item
    # Find each data-asin block and nearby title/price
    pattern = re.compile(
        r'<div[^>]*data-asin="([A-Z0-9]{10})"[^>]*>.*?(?=<div[^>]*data-asin="[A-Z0-9]{10}"|$))',
        re.S
    )
    blocks = pattern.findall(html)
    # The regex above only returns ASINs; we need full blocks. Use split approach.
    return []

# Better parser: split on data-asin blocks
RE_ASIN_BLOCK = re.compile(r'data-asin="([A-Z0-9]{10})"')

def extract_items(html, category, max_items=8):
    items = []
    parts = RE_ASIN_BLOCK.split(html)
    # parts[0] is preamble, then alternating asin, block
    seen = set()
    for i in range(1, len(parts), 2):
        if len(items) >= max_items:
            break
        asin = parts[i]
        block = parts[i+1] if i+1 < len(parts) else ''
        if asin in seen:
            continue
        seen.add(asin)
        # Title: look for alt text in image near this block
        title = None
        # Common Amazon title alt pattern
        m = re.search(r'alt="([^"]{20,200})"', block)
        if m:
            title = m.group(1)
        else:
            # Try span with id containing title
            m = re.search(r'<span[^>]*class="[^"]*a-size-base-plus[^"]*"[^>]*>([^<]+)</span>', block)
            if m:
                title = re.sub(r'<[^>]+>', '', m.group(1))
        # Price
        price = None
        pm = re.search(r'\$([0-9,]+(?:\.\d{2})?)', block)
        if pm:
            price = f"${pm.group(1)}"
        # Skip items without a usable title
        if not title or len(title) < 10 or 'Amazon' in title and 'Basics' not in title:
            # still keep if we have asin; title can be filled manually later
            pass
        items.append({"asin": asin, "title": title or f"Amazon Best Seller {asin}", "price": price, "category": category})
    return items

def main():
    all_candidates = []
    for cat in CATEGORIES:
        print(f"\nResearching {cat['name']}...")
        html = fetch(cat['url'])
        if not html:
            continue
        items = extract_items(html, cat['name'], max_items=8)
        print(f"  Found {len(items)} ASINs")
        for it in items:
            ok = validate_image(it['asin'])
            print(f"    {it['asin']} {'OK' if ok else 'BAD'} - {it['title'][:60]}")
            if ok:
                all_candidates.append(it)
        time.sleep(2)
    print(f"\nTotal valid candidates: {len(all_candidates)}")
    # Load existing if present
    existing = []
    if os.path.exists(OUT):
        try:
            with open(OUT, 'r', encoding='utf-8') as f:
                existing = json.load(f)
        except Exception:
            pass
    # Merge by ASIN
    seen = {c['asin'] for c in existing}
    added = 0
    for c in all_candidates:
        if c['asin'] not in seen:
            existing.append(c)
            seen.add(c['asin'])
            added += 1
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
    print(f"Added {added} new candidates. Total in {OUT}: {len(existing)}")

if __name__ == '__main__':
    main()
