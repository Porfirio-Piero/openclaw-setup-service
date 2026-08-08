import asyncio, json, os, time
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = r"C:\Users\devpi\.openclaw\workspace\openclaw-gumroad-landing"
CDP = "ws://127.0.0.1:18800/devtools/browser/84a17ca8-491f-490d-b54f-fe4eec346caa"
BOARD = "Audible Listens & Cozy Headphone Picks"

PINS = [
    ("woman-down-listening-nook.jpg", "woman-down-listening-nook.html", "The Perfect Listening Nook", "Blanket. Headphones. Audible. Turn any corner into your cozy escape. Start your 30-day free trial. #ad #affiliate #audible #audiobooks #cozy #reading"),
    ("audible-cozy-read-2.jpg", "audible-cozy-read-2.html", "Cozy Audiobook Escape", "Your favorite stories, wrapped in comfort. Start listening free with Audible. #ad #affiliate #audible #audiobooks #cozy #bookish"),
    ("audible-cozy-read-3.jpg", "audible-cozy-read-3.html", "Cozy Audiobook Moment", "Wrap yourself in a story. Start listening free with Audible today. #ad #affiliate #audible #audiobooks #cozy #booktok"),
    ("audible-cozy-read-5.jpg", "audible-cozy-read-5.html", "Cozy Audiobook Corner", "Soft light, warm blanket, and a story in your ears. Start listening free with Audible. #ad #affiliate #audible #audiobooks #cozy #readingnook"),
    ("audible-cozy-read-6.jpg", "audible-cozy-read-6.html", "Cozy Audiobook Setup", "The right vibe makes every chapter better. Start your free Audible trial. #ad #affiliate #audible #audiobooks #cozy #booklover"),
    ("audible-cozy-read-7.jpg", "audible-cozy-read-7.html", "Cozy Audiobook Retreat", "Create your own retreat with a great story. Start listening free with Audible. #ad #affiliate #audible #audiobooks #cozy #retreat"),
    ("evelyn-hugo-audible-1.jpg", "evelyn-hugo-audible-1.html", "The Seven Husbands of Evelyn Hugo on Audible", "Taylor Jenkins Reid's Hollywood epic. Listen free with an Audible trial. #ad #affiliate #audible #evelynhugo #booktok #audiobooks"),
    ("evelyn-hugo-audible-2.jpg", "evelyn-hugo-audible-2.html", "Listen to Evelyn Hugo Free", "The audiobook everyone re-listens to. Start your free Audible trial. #ad #affiliate #audible #evelynhugo #audiobooks"),
    ("evelyn-hugo-audible-3.jpg", "evelyn-hugo-audible-3.html", "Evelyn Hugo Audiobook Vibes", "Old Hollywood glamour meets unforgettable audio. Try Audible free. #ad #affiliate #audible #evelynhugo #bookstagram"),
    ("evelyn-hugo-audible-4.jpg", "evelyn-hugo-audible-4.html", "Evelyn Hugo Free Audiobook Trial", "Seven marriages. One truth. Listen to The Seven Husbands of Evelyn Hugo free. #ad #affiliate #audible #evelynhugo"),
    ("evelyn-hugo-audible-5.jpg", "evelyn-hugo-audible-5.html", "Evelyn Hugo on Audible", "The perfect audiobook for your next cozy night in. Start free. #ad #affiliate #audible #evelynhugo #cozy"),
]

RESULTS_FILE = os.path.join(ROOT, 'posted-all-backlog-result.json')

async def safe_goto(page, url, retries=2):
    for attempt in range(retries):
        try:
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_load_state("networkidle", timeout=20000)
            return
        except Exception as e:
            print(f"goto attempt {attempt+1} failed: {e}")
            await page.wait_for_timeout(3000)
    await page.goto(url, wait_until="domcontentloaded", timeout=30000)

async def post_pin(page, img, html, title, desc):
    link = f"https://porfirio-piero.github.io/openclaw-setup-service/{html}"
    await safe_goto(page, "https://www.pinterest.com/pin-builder/")
    await page.wait_for_selector('textarea[placeholder="Add your title"]', timeout=20000)

    file_input = page.locator('input[type=file]')
    await file_input.set_input_files(str(Path(ROOT) / img))
    await page.wait_for_timeout(8000)

    await page.locator('textarea[placeholder="Add your title"]').fill(title)
    await page.wait_for_timeout(500)
    await page.locator('div[contenteditable="true"]').first.fill(desc)
    await page.wait_for_timeout(500)
    await page.locator('textarea[placeholder="Add a destination link"]').fill(link)
    await page.wait_for_timeout(500)

    try:
        board_btn = page.locator('text=Choose a board').first
        if await board_btn.is_visible(timeout=5000):
            await board_btn.click()
            await page.wait_for_timeout(2500)
            board_opt = page.locator(f'text={BOARD}').first
            if await board_opt.is_visible(timeout=5000):
                await board_opt.click()
            else:
                await page.locator('text=Create board').first.click()
                await page.locator('input[placeholder="Add a board title"]').fill(BOARD)
                await page.locator('text=Create').first.click()
                await page.wait_for_timeout(2000)
    except Exception as e:
        print(f"Board note for {title}: {e}")

    await page.get_by_text("Publish", exact=True).click()
    await page.wait_for_selector('text=You created a Pin!', timeout=30000)
    await page.wait_for_timeout(5000)

    link_el = await page.query_selector('a[href^="/pin/"]')
    pin_url = None
    if link_el:
        href = await link_el.get_attribute('href')
        pin_url = "https://www.pinterest.com" + href

    return {"title": title, "status": "ok", "url": pin_url, "board": BOARD}

async def main():
    results = []
    if os.path.exists(RESULTS_FILE):
        try:
            with open(RESULTS_FILE, 'r', encoding='utf-8') as f:
                results = json.load(f)
        except Exception:
            results = []

    posted_titles = {r.get('title') for r in results if r.get('status') == 'ok'}

    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp(CDP)
        ctx = browser.contexts[0]
        page = await ctx.new_page()

        for img, html, title, desc in PINS:
            if title in posted_titles:
                print(f"Skipping already posted: {title}")
                continue

            try:
                result = await post_pin(page, img, html, title, desc)
                results.append(result)
                print(result)
                posted_titles.add(title)
            except Exception as e:
                err = {"title": title, "status": "error", "error": str(e)}
                results.append(err)
                print(err)

            with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
                json.dump(results, f, indent=2)

            await page.wait_for_timeout(7000)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
