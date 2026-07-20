"""Post newly added Amazon pin pages to Pinterest via an existing Chrome CDP session.

Requirements:
  1. Start Chrome with remote debugging on ws://127.0.0.1:18800
       chrome.exe --remote-debugging-port=18800 --user-data-dir="C:\chrome-pinterest-profile"
  2. Log in to pinterest.com in that Chrome window.
  3. Run: uv run python tools/post-new-pins.py [--cdp-url ws://127.0.0.1:18800/devtools/browser/...]

The script reads the latest daily-pipeline log, posts only unposted products,
and records results in posted-pins.json.
"""
import argparse, asyncio, json, os, random, re
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.json')
LOG_PATH = os.path.join(HERE, 'DAILY-PIPELINE-LOG.json')
POSTED_PATH = os.path.join(HERE, 'posted-pins.json')

DEFAULT_CDP = "ws://127.0.0.1:18800/devtools/browser/"

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

def amazon_image(asin, width=1000):
    return f"https://m.media-amazon.com/images/P/{asin}.01._SCLZZZZZZZ_SL{width}_.jpg"

CATEGORY_IMG = {
    'Creator Tech': 'amazon-pin-obsbot.png',
    'Home Office & Productivity': 'amazon-pin-standingdesk.png',
    'Home Server & Automation': 'amazon-pin-minipc.png',
    'Smart Home & Security': 'amazon-pin-smartplug.png',
    'Home & Kitchen': 'amazon-pin-airfryer.png',
    'Health & Personal Care': 'amazon-pin-health.png',
    'Cleaning & Organization': 'amazon-pin-vacuum.png',
    'Electronics & Accessories': 'amazon-pin-electronics.png',
    'Baby & Pet Essentials': 'amazon-pin-babypet.png',
    'Beauty & Personal Grooming': 'amazon-pin-beauty.png',
    'Fitness & Outdoor': 'amazon-pin-fitness.png',
    'Outdoor, Patio & Garden': 'amazon-pin-fitness.png',
    'Travel Gear': 'amazon-pin-fitness.png',
    'Automotive': 'amazon-pin-electronics.png',
    'Tools & Home Improvement': 'amazon-pin-electronics.png',
    'Sleep & Bedding': 'amazon-pin-health.png',
    'Everyday Carry & Safety': 'amazon-pin-electronics.png',
}

def image_for(prod, cat_name):
    return CATEGORY_IMG.get(cat_name, 'pinterest-pin-1.png')

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

async def get_browser_page(p, cdp_url):
    browser = await p.chromium.connect_over_cdp(cdp_url)
    ctx = browser.contexts[0] if browser.contexts else await browser.new_context()
    page = ctx.pages[0] if ctx.pages else await ctx.new_page()
    return browser, page

async def post_pin(page, pin, results, dry_run=False):
    try:
        await page.goto("https://www.pinterest.com/pin-builder/")
        await page.wait_for_selector('textarea[placeholder*="title"]', timeout=15000)
        if not dry_run:
            file_input = page.locator('input[type=file]')
            img_path = os.path.join(HERE, pin['image']).replace('/', '\\')
            if os.path.exists(img_path):
                await file_input.set_input_files(img_path)
            else:
                # fallback: download amazon image to temp and use it
                import urllib.request
                tmp = os.path.join(HERE, f"tmp-pin-{pin['asin']}.jpg")
                urllib.request.urlretrieve(amazon_image(pin['asin'], 1000), tmp)
                await file_input.set_input_files(tmp)
            await page.wait_for_timeout(2500)
            await page.locator('textarea[placeholder*="title"]').fill(pin['title'])
            await page.locator('[contenteditable="true"]').first.fill(pin['desc'])
            await page.locator('textarea[placeholder*="destination"]').fill(pin['link'])
            await page.get_by_text("Publish", exact=True).click()
            await page.wait_for_selector('text=/created|published|success/i', timeout=15000)
            await page.wait_for_timeout(2000)
        results.append({"title": pin['title'], "status": "ok", "asin": pin['asin']})
        return True
    except Exception as e:
        results.append({"title": pin['title'], "status": "error", "error": str(e), "asin": pin['asin']})
        try:
            await page.goto("https://www.pinterest.com/pin-builder/")
            await page.wait_for_timeout(2000)
        except Exception:
            pass
        return False

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--cdp-url', default=DEFAULT_CDP)
    parser.add_argument('--dry-run', action='store_true', help='Print pins without posting')
    parser.add_argument('--max', type=int, default=25)
    args = parser.parse_args()

    data = load_json(JSON_PATH)
    log = load_json(LOG_PATH) if os.path.exists(LOG_PATH) else []
    posted = load_json(POSTED_PATH) if os.path.exists(POSTED_PATH) else {"posted": []}
    posted_asins = {p['asin'] for p in posted.get('posted', [])}

    # Build product lookup by ASIN
    products_by_asin = {}
    for cat in data['categories']:
        for prod in cat['products']:
            products_by_asin[prod['asin']] = (prod, cat['name'])

    # Collect newly added ASINs from latest log entry
    new_asins = []
    if log:
        latest = log[-1]
        for a in latest.get('added', []):
            if a['asin'] not in posted_asins and a['asin'] in products_by_asin:
                new_asins.append(a['asin'])

    if not new_asins:
        print("No new products to post to Pinterest.")
        return

    pins = []
    for asin in new_asins[:args.max]:
        prod, cat_name = products_by_asin[asin]
        slug = slugify(prod['title'])
        pins.append({
            "image": image_for(prod, cat_name),
            "title": prod['pinterestTitle'],
            "desc": prod['pinterestDescription'] + " *(Affiliate link — I may earn a commission.)*",
            "link": f"https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/{slug}.html",
            "asin": asin,
            "category": cat_name,
        })

    print(f"Ready to post {len(pins)} pins to Pinterest.")
    if args.dry_run:
        for p in pins:
            print(f"  [{p['category']}] {p['title']} -> {p['link']}")
        return

    async with async_playwright() as p:
        browser, page = await get_browser_page(p, args.cdp_url)
        results = []
        for i, pin in enumerate(pins):
            print(f"Posting {i+1}/{len(pins)}: {pin['title']}")
            ok = await post_pin(page, pin, results)
            if ok:
                posted['posted'].append({"asin": pin['asin'], "title": pin['title'], "date": __import__('time').strftime('%Y-%m-%d')})
                save_json(POSTED_PATH, posted)
            await __import__('asyncio').sleep(random.uniform(3, 6))
        await browser.close()

    ok_count = sum(1 for r in results if r['status'] == 'ok')
    print(f"\nPosted {ok_count}/{len(pins)} pins.")
    for r in results:
        status = 'OK' if r['status'] == 'ok' else 'ERR'
        print(f"  [{status}] {r['title']}")

if __name__ == '__main__':
    asyncio.run(main())
