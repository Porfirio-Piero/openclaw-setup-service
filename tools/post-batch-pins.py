import asyncio, json, os, sys
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = r"C:\Users\devpi\.openclaw\workspace\openclaw-gumroad-landing"

PINS = [
    {
        "img": Path(ROOT) / "woman-down-listening-nook.jpg",
        "title": "The Perfect Listening Nook",
        "desc": "Blanket. Headphones. Audible. Turn any corner into your cozy escape. Start your 30-day free trial. #ad #affiliate #audible #audiobooks #cozy #reading",
        "link": "https://porfirio-piero.github.io/openclaw-setup-service/woman-down-listening-nook.html",
        "board": "Audible Listens & Cozy Headphone Picks"
    },
    {
        "img": Path(ROOT) / "audible-cozy-read-2.jpg",
        "title": "Cozy Audiobook Escape",
        "desc": "Your favorite stories, wrapped in comfort. Start listening free with Audible. #ad #affiliate #audible #audiobooks #cozy #bookish",
        "link": "https://porfirio-piero.github.io/openclaw-setup-service/audible-cozy-read-2.html",
        "board": "Audible Listens & Cozy Headphone Picks"
    },
    {
        "img": Path(ROOT) / "audible-cozy-read-3.jpg",
        "title": "Cozy Audiobook Moment",
        "desc": "Wrap yourself in a story. Start listening free with Audible today. #ad #affiliate #audible #audiobooks #cozy #booktok",
        "link": "https://porfirio-piero.github.io/openclaw-setup-service/audible-cozy-read-3.html",
        "board": "Audible Listens & Cozy Headphone Picks"
    },
    {
        "img": Path(ROOT) / "audible-cozy-read-4.jpg",
        "title": "Cozy Audiobook Vibes",
        "desc": "When the setup is this good, the story gets even better. Start listening free. #ad #affiliate #audible #audiobooks #cozy #bookstagram",
        "link": "https://porfirio-piero.github.io/openclaw-setup-service/audible-cozy-read-4.html",
        "board": "Audible Listens & Cozy Headphone Picks"
    }
]

async def post_pin(page, pin):
    await page.goto("https://www.pinterest.com/pin-builder/")
    await page.wait_for_selector('textarea[placeholder="Add your title"]', timeout=15000)

    file_input = page.locator('input[type=file]')
    await file_input.set_input_files(str(pin['img']))
    await page.wait_for_timeout(5000)

    await page.locator('textarea[placeholder="Add your title"]').fill(pin['title'])
    await page.locator('div[contenteditable="true"]').first.fill(pin['desc'])
    await page.locator('textarea[placeholder="Add a destination link"]').fill(pin['link'])

    try:
        board_btn = page.locator('text=Choose a board').first
        if await board_btn.is_visible(timeout=3000):
            await board_btn.click()
            await page.wait_for_timeout(1500)
            board_opt = page.locator(f'text={pin["board"]}').first
            if await board_opt.is_visible(timeout=3000):
                await board_opt.click()
            else:
                await page.locator('text=Create board').first.click()
                await page.locator('input[placeholder="Add a board title"]').fill(pin['board'])
                await page.locator('text=Create').first.click()
                await page.wait_for_timeout(1500)
    except Exception as e:
        print(f"Board note for {pin['title']}: {e}")

    await page.get_by_text("Publish", exact=True).click()
    await page.wait_for_selector('text=You created a Pin!', timeout=15000)
    await page.wait_for_timeout(3000)

    link_el = await page.query_selector('a[href^="/pin/"]')
    pin_url = None
    if link_el:
        href = await link_el.get_attribute('href')
        pin_url = "https://www.pinterest.com" + href

    return {"title": pin['title'], "status": "ok", "url": pin_url, "board": pin['board']}

async def main():
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp("ws://127.0.0.1:18800/devtools/browser/84a17ca8-491f-490d-b54f-fe4eec346caa")
        ctx = browser.contexts[0]
        page = await ctx.new_page()

        for pin in PINS:
            try:
                result = await post_pin(page, pin)
                results.append(result)
                print(result)
            except Exception as e:
                err = {"title": pin['title'], "status": "error", "error": str(e)}
                results.append(err)
                print(err)
            await page.wait_for_timeout(2000)

        with open(os.path.join(ROOT, 'posted-batch-pins-result.json'), 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
