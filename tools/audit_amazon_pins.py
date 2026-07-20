import json, os, re, glob, urllib.request

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.json')
PINS_DIR = os.path.join(HERE, 'amazon-pins')

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

products = []
for cat in data['categories']:
    for p in cat['products']:
        p['_category'] = cat['name']
        products.append(p)

print(f"Products in JSON: {len(products)}")
print(f"HTML files in amazon-pins/: {len(glob.glob(os.path.join(PINS_DIR, '*.html')))}")

asin_re = re.compile(r'/dp/([A-Z0-9]{10})')
img_re = re.compile(r'/P/([A-Z0-9]{10})\\.01\\._SCL')
issues = []
mismatches = []
missing_pages = []

# Validate every product page uses exact ASIN in the canonical link and primary image.
asin_re = re.compile(r'/dp/([A-Z0-9]{10})')
img_asin_re = re.compile(r'/P/([A-Z0-9]{10})\.01\._SCL')
issues = []
mismatches = []
missing_pages = []

for p in products:
    slug = slugify(p['title'])
    page_path = os.path.join(PINS_DIR, f"{slug}.html")
    if not os.path.exists(page_path):
        missing_pages.append((p['title'], slug))
        continue
    with open(page_path, 'r', encoding='utf-8') as f:
        html = f.read()
    expected = p['asin']
    # First affiliate link should be the product's own
    link_match = asin_re.search(html)
    link_asin = link_match.group(1) if link_match else None
    # Primary image is the first Amazon image on the page
    img_match = img_asin_re.search(html)
    img_asin = img_match.group(1) if img_match else None
    if link_asin != expected:
        mismatches.append(('link', p['title'], expected, link_asin))
    if img_asin != expected:
        mismatches.append(('image', p['title'], expected, img_asin))

print(f"Missing pin pages: {len(missing_pages)}")
for title, slug in missing_pages[:10]:
    print(f"  - {title} ({slug}.html)")

print(f"ASIN mismatches: {len(mismatches)}")
for kind, title, expected, actual in mismatches[:20]:
    print(f"  - {title}: expected {expected}, {kind} has {actual}")

# Check Amazon image availability for first 10
print("\nSpot-checking Amazon product images (first 10):")
for p in products[:10]:
    url = f"https://m.media-amazon.com/images/P/{p['asin']}.01._SCLZZZZZZZ_SL600_.jpg"
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent':'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=10)
        print(f"  {p['asin']}: HTTP {resp.status}")
    except Exception as e:
        print(f"  {p['asin']}: FAIL - {e}")

print("\nAudit complete.")
