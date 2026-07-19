import asyncio
from playwright.async_api import async_playwright

PINS = [
    {"image": "pinterest-pin-editorial.png", "title": "OpenClaw Setup Service — Stop Configuring. Start Shipping.", "desc": "Done-for-you OpenClaw setup: agents, skills, memory, security, automations. One-time $50. #openclaw #ai #automation", "link": "https://porfirio-piero.github.io/openclaw-setup-service/index.html"},
    {"image": "pinterest-pin-mission-control.png", "title": "OpenClaw Mission Control — Your AI Crew, Live.", "desc": "Deploy your AI command center in 15 minutes. BotFather, Dapper Dan, Breaking Ben, and the full crew configured. #ai #nocode", "link": "https://porfirio-piero.github.io/openclaw-setup-service/mission-control.html"},
    {"image": "pinterest-pin-minimal.png", "title": "OpenClaw Operating System — Installed for You", "desc": "Get your OpenClaw crew named, modeled, and routed. $50 one-time. #openclaw #aiagents #setup", "link": "https://porfirio-piero.github.io/openclaw-setup-service/minimal.html"},
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp("ws://127.0.0.1:18800/devtools/browser/7c5f7a10-9373-47a7-bf60-1d789e4f0c8c")
        ctx = browser.contexts[0]
        page = ctx.pages[0]
        await page.goto("https://www.pinterest.com/pin-builder/")
        results = []
        for pin in PINS:
            try:
                # wait for builder
                await page.wait_for_selector('textarea[placeholder="Add your title"]', timeout=15000)
                # upload image
                file_input = page.locator('input[type=file]')
                img_path = f"C:\\Users\\devpi\\.openclaw\\workspace\\openclaw-gumroad-landing\\{pin['image']}"
                await file_input.set_input_files(img_path)
                await page.wait_for_timeout(2000)
                # fill fields
                await page.locator('textarea[placeholder="Add your title"]').fill(pin['title'])
                await page.locator('[contenteditable="true"]').first.fill(pin['desc'])
                await page.locator('textarea[placeholder="Add a destination link"]').fill(pin['link'])
                # publish
                await page.get_by_text("Publish", exact=True).click()
                # wait for success
                await page.wait_for_selector('text=You created a Pin!', timeout=15000)
                await page.wait_for_timeout(2000)
                # capture pin url
                link_el = await page.query_selector('a[href^="/pin/"]')
                pin_url = None
                if link_el:
                    href = await link_el.get_attribute('href')
                    pin_url = "https://www.pinterest.com" + href
                results.append({"title": pin['title'], "status": "ok", "url": pin_url})
                # reset
                await page.goto("https://www.pinterest.com/pin-builder/")
                await page.wait_for_timeout(2000)
            except Exception as e:
                results.append({"title": pin['title'], "status": "error", "error": str(e)})
                try:
                    await page.goto("https://www.pinterest.com/pin-builder/")
                    await page.wait_for_timeout(2000)
                except Exception:
                    pass
        print(results)
        await browser.close()

asyncio.run(main())
