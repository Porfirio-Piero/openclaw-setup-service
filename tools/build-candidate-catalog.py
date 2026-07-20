import json, os, re, html, random

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_PATH = os.path.join(HERE, 'AMAZON-CANDIDATES.json')
OUT_PATH = RAW_PATH

# Read raw scraped candidates
if os.path.exists(RAW_PATH):
    with open(RAW_PATH, 'r', encoding='utf-8') as f:
        raw = json.load(f)
else:
    raw = []

def clean_title(t):
    t = html.unescape(t)
    t = re.sub(r'\s+', ' ', t)
    # Remove leading brand up to first pipe if title is very long
    return t.strip()[:140]

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

# Map scraped loose category names to canonical catalog categories
CATEGORY_MAP = {
    'Office Chairs': 'Home Office & Productivity',
    'Outdoor & Patio': 'Outdoor, Patio & Garden',
    'Gaming & PC Accessories': 'Electronics & Accessories',
    'Baby & Parenting Gear': 'Baby & Pet Essentials',
    'Wearables & Smartwatches': 'Electronics & Accessories',
    'Travel & Luggage': 'Travel Gear',
    'Garden & Plants': 'Outdoor, Patio & Garden',
}

# Commission ranges by category (approx Amazon US rates)
COMMISSION = {
    'Creator Tech': '~3%',
    'Home Office & Productivity': '~3%',
    'Home Server & Automation': '~3%',
    'Smart Home & Security': '~3%',
    'Home & Kitchen': '~3%',
    'Health & Personal Care': '~3%',
    'Cleaning & Organization': '~3%',
    'Electronics & Accessories': '~3%',
    'Baby & Pet Essentials': '~1–3%',
    'Beauty & Personal Grooming': '~3%',
    'Fitness & Outdoor': '~3%',
    'Outdoor, Patio & Garden': '~3%',
    'Travel Gear': '~3%',
    'Automotive': '~3%',
    'Tools & Home Improvement': '~3%',
    'Sleep & Bedding': '~3%',
    'Everyday Carry & Safety': '~3%',
}

def estimate_price(title, category):
    # rough price tiers based on keywords
    t = title.lower()
    if any(x in t for x in ['watch','smartwatch','garmin','fitbit','apple watch','galaxy watch']):
        return '$150–$400'
    if any(x in t for x in ['keyboard','headset','mouse','cable','charger']):
        return '$30–$120'
    if 'chair' in t:
        return '$80–$200'
    if any(x in t for x in ['fire pit','bonfire','propane']):
        return '$80–$300'
    if any(x in t for x in ['backpack','luggage','suitcase']):
        return '$50–$180'
    if any(x in t for x in ['monitor','camera','webcam']):
        return '$80–$250'
    if 'baby' in t or 'bottle' in t or 'nipple' in t:
        return '$15–$40'
    if 'plant' in t or 'artificial' in t:
        return '$20–$80'
    if 'tool' in t or 'drill' in t or 'washer' in t:
        return '$80–$250'
    if 'mattress' in t or 'bedding' in t or 'sheet' in t:
        return '$30–$120'
    if 'car' in t or 'vacuum' in t or 'inflator' in t:
        return '$25–$100'
    return '$30–$100'

def generate_use_cases(title, category):
    t = title.lower()
    cases = []
    if 'chair' in t:
        cases = ['All-day desk work', 'Adjustable lumbar support', 'Home office upgrade']
    elif 'keyboard' in t or 'mouse' in t:
        cases = ['Gaming and work setup', 'Precise control and comfort', 'RGB customization']
    elif 'watch' in t:
        cases = ['Fitness tracking', 'Notifications on wrist', 'Health monitoring']
    elif 'fire pit' in t or 'bonfire' in t:
        cases = ['Backyard gatherings', 'Camping trips', 'Smokeless ambience']
    elif 'backpack' in t or 'luggage' in t:
        cases = ['Carry-on travel', 'Organized packing', 'Daily commute']
    elif 'baby' in t or 'bottle' in t:
        cases = ['Feeding routine', 'Anti-colic design', 'Easy to clean']
    elif 'plant' in t or 'artificial' in t or 'topiary' in t:
        cases = ['No-maintenance decor', 'Outdoor curb appeal', 'Year-round greenery']
    elif 'tool' in t or 'drill' in t:
        cases = ['Home repairs', 'DIY projects', 'Reliable power']
    elif 'mattress' in t or 'sheet' in t or 'comforter' in t:
        cases = ['Better sleep', 'Guest room refresh', 'Soft, breathable fabric']
    elif 'car' in t or 'vacuum' in t or 'charger' in t:
        cases = ['Road trip essential', 'Keep car clean', 'Fast device charging']
    else:
        cases = ['Everyday convenience', 'Top-rated by buyers', 'Worth the upgrade']
    return cases

def generate_pinterest(title, category):
    # Short benefit-driven title
    t = title.lower()
    if 'chair' in t:
        return ('Ergonomic Office Chair That Supports Long Workdays', f'{clean_title(title)}: comfort, support, and adjustability for your home office. #homeoffice #ergonomic #wfh')
    if 'keyboard' in t:
        return ('Mechanical Keyboard Upgrade for Gaming & Work', f'{clean_title(title)}: tactile keys, RGB, and wireless freedom. #gaming #keyboard #setup')
    if 'watch' in t:
        return ('Smartwatch That Tracks Everything You Need', f'{clean_title(title)}: fitness, sleep, and notifications on your wrist. #smartwatch #fitness')
    if 'fire pit' in t or 'bonfire' in t:
        return ('Backyard Fire Pit for Cozy Nights', f'{clean_title(title)}: smokeless flames and easy setup for patio or camping. #firepit #patio #outdoor')
    if 'backpack' in t or 'luggage' in t:
        return ('Travel Bag That Makes Packing Easier', f'{clean_title(title)}: organized compartments and travel-ready durability. #travel #luggage')
    if 'baby' in t or 'bottle' in t:
        return ('Baby Feeding Essential Parents Trust', f'{clean_title(title)}: designed for comfort and less fuss. #baby #newparent')
    if 'plant' in t or 'artificial' in t:
        return ('No-Maintenance Greenery for Home or Patio', f'{clean_title(title)}: looks real, lasts forever, zero watering. #homedecor #patio')
    if 'tool' in t or 'drill' in t:
        return ('Power Tool That Handles Home Projects', f'{clean_title(title)}: reliable, versatile, and ready for DIY. #tools #homeimprovement')
    if 'mattress' in t or 'sheet' in t:
        return ('Bedding Upgrade for Better Sleep', f'{clean_title(title)}: soft, breathable, and guest-room ready. #bedding #sleep')
    if 'car' in t or 'vacuum' in t or 'charger' in t:
        return ('Car Accessory Every Driver Needs', f'{clean_title(title)}: keeps your ride clean and devices powered. #car #travel')
    return ('Top-Rated Amazon Pick Worth Buying', f'{clean_title(title)}: highly rated and practical for everyday use. #amazonfinds')

# Build structured candidates from raw
candidates = []
seen_asins = set()
for r in raw:
    cat = CATEGORY_MAP.get(r.get('category', ''), r.get('category', 'General'))
    title = clean_title(r.get('title', ''))
    if not title or len(title) < 8:
        continue
    asin = r['asin']
    if asin in seen_asins:
        continue
    seen_asins.add(asin)
    pin_title, pin_desc = generate_pinterest(title, cat)
    candidates.append({
        'id': slugify(title),
        'title': title,
        'asin': asin,
        'category': cat,
        'priceRange': estimate_price(title, cat),
        'commission': COMMISSION.get(cat, '~3%'),
        'useCases': generate_use_cases(title, cat),
        'pinterestTitle': pin_title,
        'pinterestDescription': pin_desc,
        'source': 'scraped'
    })

# Hand-picked high-profit/niche candidates
HAND_PICKED = [
    # Sleep & Bedding
    {'asin':'B07VYW8DMZ', 'title':'Linenspa 3 Inch Memory Foam Mattress Topper', 'category':'Sleep & Bedding', 'priceRange':'$50–$90'},
    {'asin':'B07KJ7B9RH', 'title':'Mellanni Queen Sheet Set', 'category':'Sleep & Bedding', 'priceRange':'$30–$50'},
    {'asin':'B07H2MRHAP', 'title':'Bedsure Fleece Blanket Queen Size', 'category':'Sleep & Bedding', 'priceRange':'$20–$35'},
    {'asin':'B07J2MFZCH', 'title':'Utopia Bedding Comforter Duvet Insert', 'category':'Sleep & Bedding', 'priceRange':'$30–$55'},
    {'asin':'B08S35399Y', 'title':'BAGAIL Packing Cubes for Travel', 'category':'Travel Gear', 'priceRange':'$20–$30'},
    {'asin':'B07QFTGGYF', 'title':'travel inspira Luggage Scale', 'category':'Travel Gear', 'priceRange':'$10–$15'},
    {'asin':'B07GRD5WLD', 'title':'BeautifyBeauties Continuous Spray Bottle', 'category':'Travel Gear', 'priceRange':'$8–$12'},
    # Automotive
    {'asin':'B07QH6ZS62', 'title':'VICSEED Universal Car Phone Mount', 'category':'Automotive', 'priceRange':'$15–$25'},
    {'asin':'B07ZPRWX3G', 'title':'Anker 24W Dual USB Car Charger', 'category':'Automotive', 'priceRange':'$12–$18'},
    {'asin':'B09C1X7T67', 'title':'AstroAI Tire Inflator Portable Air Compressor', 'category':'Automotive', 'priceRange':'$30–$50'},
    {'asin':'B00JJ4G170', 'title':'Armor All Car Cleaning Kit', 'category':'Automotive', 'priceRange':'$15–$25'},
    # Tools & Home Improvement
    {'asin':'B08H8H6GHY', 'title':'DEWALT 20V MAX Cordless Drill Kit', 'category':'Tools & Home Improvement', 'priceRange':'$120–$180'},
    {'asin':'B078964JPV', 'title':'BLACK+DECKER 20V MAX Drill Home Tool Kit', 'category':'Tools & Home Improvement', 'priceRange':'$80–$120'},
    {'asin':'B07WV2G23D', 'title':'Kasa Outdoor Smart Plug', 'category':'Tools & Home Improvement', 'priceRange':'$15–$25'},
    {'asin':'B091FXLMS8', 'title':'Kasa Smart Plug 4-Pack', 'category':'Smart Home & Security', 'priceRange':'$20–$30'},
    # Kitchen Niche
    {'asin':'B078HFRNP7', 'title':'Keurig K-Mini Single Serve Coffee Maker', 'category':'Home & Kitchen', 'priceRange':'$60–$90'},
    {'asin':'B07CK6MBLT', 'title':'Instant Pot Duo Crisp 11-in-1 Air Fryer', 'category':'Home & Kitchen', 'priceRange':'$130–$180'},
    {'asin':'B07V3G1PY1', 'title':'Hamilton Beach Breakfast Sandwich Maker', 'category':'Home & Kitchen', 'priceRange':'$25–$35'},
    {'asin':'B07W7W8WKH', 'title':'Nespresso Vertuo Next Coffee Maker', 'category':'Home & Kitchen', 'priceRange':'$120–$170'},
    # Everyday Carry & Safety
    {'asin':'B07TX9KPK5', 'title':'SABRE Pepper Spray Keychain', 'category':'Everyday Carry & Safety', 'priceRange':'$8–$12'},
    {'asin':'B089N3W1VG', 'title':'Swiss Safe 2-in-1 First Aid Kit', 'category':'Everyday Carry & Safety', 'priceRange':'$25–$40'},
    {'asin':'B07Q2M5FPQ', 'title':'LEATHERMAN Wingman Multitool', 'category':'Everyday Carry & Safety', 'priceRange':'$50–$70'},
    {'asin':'B08K2PQNVR', 'title':'Thrunite LED Flashlight Rechargeable', 'category':'Everyday Carry & Safety', 'priceRange':'$20–$35'},
    # More outdoor
    {'asin':'B07GR7RH3N', 'title':'Coleman Portable Camping Chair', 'category':'Outdoor, Patio & Garden', 'priceRange':'$25–$40'},
    {'asin':'B07Y3PZWQQ', 'title':'Coleman Sundome Camping Tent', 'category':'Outdoor, Patio & Garden', 'priceRange':'$80–$150'},
    {'asin':'B08P23NC54', 'title':'WEENFON Camping Hammock with Tree Straps', 'category':'Outdoor, Patio & Garden', 'priceRange':'$20–$35'},
    # More gaming
    {'asin':'B07W7KVRJS', 'title':'SteelSeries Arctis 3 Gaming Headset', 'category':'Electronics & Accessories', 'priceRange':'$50–$80'},
    {'asin':'B07GBZ4Q68', 'title':'Logitech G502 HERO Gaming Mouse', 'category':'Electronics & Accessories', 'priceRange':'$40–$60'},
    # More wearables/fitness
    {'asin':'B0B4MWLQ1K', 'title':'Garmin Forerunner 55 GPS Running Watch', 'category':'Fitness & Outdoor', 'priceRange':'$150–$200'},
    {'asin':'B08N3XCCRN', 'title':'Letsfit Fitness Tracker', 'category':'Fitness & Outdoor', 'priceRange':'$25–$40'},
    # More beauty/health
    {'asin':'B07S1XCK8R', 'title':'CeraVe Hydrating Facial Cleanser', 'category':'Beauty & Personal Grooming', 'priceRange':'$12–$18'},
    {'asin':'B07XV4NHH9', 'title':'Panasonic Electric Body Groomer', 'category':'Health & Personal Care', 'priceRange':'$40–$60'},
]

for hp in HAND_PICKED:
    asin = hp['asin']
    if asin in seen_asins:
        continue
    seen_asins.add(asin)
    title = clean_title(hp['title'])
    cat = hp['category']
    pin_title, pin_desc = generate_pinterest(title, cat)
    candidates.append({
        'id': slugify(title),
        'title': title,
        'asin': asin,
        'category': cat,
        'priceRange': hp['priceRange'],
        'commission': COMMISSION.get(cat, '~3%'),
        'useCases': generate_use_cases(title, cat),
        'pinterestTitle': pin_title,
        'pinterestDescription': pin_desc,
        'source': 'hand-picked'
    })

# Shuffle so daily pipeline gets variety
random.seed(42)
random.shuffle(candidates)

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(candidates, f, indent=2, ensure_ascii=False)

print(f"Wrote {len(candidates)} structured candidates to {OUT_PATH}")
# Category breakdown
from collections import Counter
print(Counter(c['category'] for c in candidates))
