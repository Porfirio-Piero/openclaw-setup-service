import asyncio, json, os, re
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(HERE, 'AMAZON-AFFILIATES.json'), 'r', encoding='utf-8') as f:
    data = json.load(f)

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

DEDICATED = {
    'obsbot-tiny-2-lite-4k-ptz-webcam': 'amazon-pin-obsbot.png',
    'logitech-brio-4k-webcam': 'amazon-pin-brio.png',
    'wireless-lavalier-microphone-for-iphoneandroid': 'amazon-pin-mic.png',
    'veken-55-inch-large-electric-standing-desk': 'amazon-pin-standingdesk.png',
    'flexispot-en1-electric-standing-desk': 'amazon-pin-standingdesk.png',
    'beelink-mini-s12-mini-pc': 'amazon-pin-minipc.png',
    'origimagic-mini-pc-ryzen-5-dual-lan': 'amazon-pin-minipc.png',
    'smart-plug-4-pack-wi-fi-voice-compatible': 'amazon-pin-smartplug.png',
    'sandisk-extreme-1tb-portable-ssd': 'amazon-pin-ssd.png',
    'cosori-air-fryer': 'amazon-pin-airfryer.png',
    'instant-pot-duo': 'amazon-pin-instantpot.png',
    'oral-b-toothbrush': 'amazon-pin-toothbrush.png',
    'dyson-vacuum': 'amazon-pin-vacuum.png',
    'shark-vacuum': 'amazon-pin-vacuum.png',
    'robot-vacuum': 'amazon-pin-vacuum.png',
}

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
}

def image_for(prod, cat_name):
    slug = slugify(prod['title'])
    return DEDICATED.get(slug, CATEGORY_IMG.get(cat_name, 'pinterest-pin-1.png'))

PINS = []
for cat in data['categories']:
    for prod in cat['products']:
        PINS.append({
            "image": image_for(prod, cat['name']),
            "title": prod['pinterestTitle'],
            "desc": prod['pinterestDescription'],
            "link": f"https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/{slugify(prod['title'])}.html"
        })

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp("ws://127.0.0.1:18800/devtools/browser/7c5f7a10-9373-47a7-bf60-1d789e4f0c8c")
        ctx = browser.contexts[0]
        page = ctx.pages[0]
        await page.goto("https://www.pinterest.com/pin-builder/")
        results = []
        for i, pin in enumerate(PINS):
            try:
                await page.wait_for_selector('textarea[placeholder="Add your title"]', timeout=15000)
                file_input = page.locator('input[type=file]')
                img_path = os.path.join(HERE, pin['image']).replace('/', '\\')
                await file_input.set_input_files(img_path)
                await page.wait_for_timeout(2500)
                await page.locator('textarea[placeholder="Add your title"]').fill(pin['title'])
                await page.locator('[contenteditable="true"]').first.fill(pin['desc'])
                await page.locator('textarea[placeholder="Add a destination link"]').fill(pin['link'])
                await page.get_by_text("Publish", exact=True).click()
                await page.wait_for_selector('text=You created a Pin!', timeout=15000)
                await page.wait_for_timeout(2000)
                link_el = await page.query_selector('a[href^="/pin/"]')
                pin_url = None
                if link_el:
                    href = await link_el.get_attribute('href')
                    pin_url = "https://www.pinterest.com" + href
                results.append({"title": pin['title'], "status": "ok", "url": pin_url})
                print(f"{i+1}/{len(PINS)}: {pin['title']} -> {pin_url}")
                await page.goto("https://www.pinterest.com/pin-builder/")
                await page.wait_for_timeout(2500)
            except Exception as e:
                results.append({"title": pin['title'], "status": "error", "error": str(e)})
                print(f"{i+1}/{len(PINS)}: ERROR {pin['title']} - {e}")
                try:
                    await page.goto("https://www.pinterest.com/pin-builder/")
                    await page.wait_for_timeout(2500)
                except Exception:
                    pass
        print("\nDONE")
        print(results)
        await browser.close()

asyncio.run(main())
