# Amazon Affiliate Marketing Playbook
## Piero's Picks — OpenClaw Setup Service

**Live storefront:** https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/  
**Affiliate tag:** `porfirioinc-20`  
**Repo:** `Porfirio-Piero/openclaw-setup-service` (branch `main`)  
**FTC disclosure (use everywhere):** *As an Amazon Associate I earn from qualifying purchases.*

---

## 1. Current State

| Asset | Status |
|---|---|
| Pin pages | ✅ 45 live pages, exact-ASIN images + links |
| Storefront index | ✅ Redesigned with search, category chips, sticky header |
| Catalog source | `AMAZON-AFFILIATES.json` |
| Expansion pool | `AMAZON-CANDIDATES.json` (84 researched products) |
| Daily pipeline | `tools/daily-pipeline.py` — adds up to 25/day, validates images, regenerates, commits |
| Pinterest poster | `tools/post-new-pins.py` — posts new products via Chrome CDP |
| Audit tool | `tools/audit_amazon_pins.py` — verifies ASIN/image alignment |

**Verdict:** The site is now a real affiliate storefront. Traffic and posting execution are the next levers.

---

## 2. Pinterest Strategy

### 2.1 Account Setup
1. Go to https://business.pinterest.com/ and create/convert a **business account**.
2. **Claim the website:** `porfirio-piero.github.io` (Settings → Claimed accounts).
3. **Profile:**
   - **Name:** Piero's Picks — Home, Tech & Everyday Gear
   - **Username:** `@porfiriopicks`
   - **Bio:** Curated Amazon finds for creators, home offices, smart homes, and everyday life. *(Some links are affiliate.)*
   - **Website:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/`

### 2.2 Board Plan (one per catalog category)
- Creator Tech & Gear
- Home Office Upgrades
- Smart Home & Automation
- Kitchen Must-Haves
- Health & Personal Care
- Cleaning & Organization
- Everyday Tech Accessories
- Baby & Pet Essentials
- Beauty & Grooming
- Fitness & Outdoor
- Outdoor, Patio & Garden
- Travel Gear
- Automotive
- Tools & Home Improvement
- Sleep & Bedding
- Everyday Carry & Safety

### 2.3 Pin Specs
- **Aspect ratio:** 2:3 (1000×1500 px)
- **Text overlay:** short outcome headline, product name, price/CTA
- **Description:** 2 sentences + 4–8 hashtags
- **Destination:** individual pin page on GitHub Pages
- **Cadence:** 3–5 fresh pins/day at steady state; 5–7 during launch/peak shopping

### 2.4 Posting Workflow
1. Run `tools/daily-pipeline.py --max 25 --commit --push`
2. Start Chrome with remote debugging and log into Pinterest:
   ```powershell
   chrome.exe --remote-debugging-port=18800 --user-data-dir="C:\chrome-pinterest-profile"
   ```
3. Run `tools/post-new-pins.py --cdp-url ws://127.0.0.1:18800/devtools/browser/`
4. The script reads `DAILY-PIPELINE-LOG.json`, posts only newly added products, and saves state to `posted-pins.json`.

### 2.5 Pinterest Paid Ads (ask Piero before spending)
- **Best first test:** $5–$10/day Promoted Pin on high-ticket winners (Dyson, standing desks, Apple Watch, air fryer)
- **Target:** interest-based audiences — Home Office, Smart Home, Cooking, Fitness, Pets
- **Creative angle:** "Shop the exact product" with price in overlay
- **Landing page:** pin page, not direct Amazon link (Pinterest sometimes throttles direct affiliate links)

---

## 3. Reddit Strategy

See `REDDIT-POST-PLAN.md` for the full playbook and 10 ready-to-post comments.

**Rules to stay unbanned:**
- Only post in subreddits that allow helpful links
- Always include FTC disclosure adjacent to the link
- Answer the actual question; don't drop a link and leave
- Spread posts across days, never carpet-bomb
- Build account karma with genuine comments first

**First 3 posts to make this week:**
1. `r/workspaces` — FLEXISPOT EN1 standing desk recommendation
2. `r/VacuumCleaners` — Roomba 694 for pet hair under $300
3. `r/homelab` — origimagic Ryzen 5 dual-LAN mini PC

---

## 4. Other Traffic Channels

### 4.1 Niche Forums
- **Tech/creator:** r/obsbot, r/webcams, r/Zoom, r/streaming, r/YouTubers
- **Smart home:** r/homeautomation, r/smarthome, r/homelab
- **Parenting:** r/beyondthebump, r/NewParents, r/dogs, r/puppy101
- **Fitness:** r/homegym, r/yoga, r/running
- **Travel:** r/onebag, r/travel, r/BuyItForLife
- **Auto:** r/cars, r/AutoDetailing, r/roadtrip

### 4.2 Facebook Groups
- Search for groups around home office setup, smart home, air fryer recipes, new parents, dog owners. Post value first, link second.

### 4.3 Quora
- Answer "What is the best X for Y?" questions with a short recommendation and the pin page link. Include disclosure.

### 4.4 SEO (long-term)
- Each pin page targets a specific product query (e.g., "OBSBOT Tiny 2 Lite review")
- Add comparison pages later (e.g., `/amazon-pins/compare-standing-desks.html`) to rank for "best X" terms
- GitHub Pages + fast load is fine for this; content volume matters more than hosting

### 4.5 Email / Newsletter (future)
- Collect emails via a simple Gumroad/ConvertKit form
- Weekly "5 Amazon finds that actually work" newsletter

---

## 5. Tracking & Optimization

### 5.1 Amazon Associates Reports
- Log in to https://affiliate-program.amazon.com/
- Track: clicks, ordered items, shipped items, conversion rate, earnings per click (EPC)
- Review weekly: which categories convert? Double down.

### 5.2 Pinterest Analytics
- Track impressions, saves, outbound clicks, top boards
- A/B test pin titles and images for the same product

### 5.3 Reddit / Forum Tracking
- Use `?ref=reddit` or `?ref=pinterest` appended **after** the affiliate tag only if it doesn't break the link. Safer: track by day and channel in a simple sheet.

### 5.4 Weekly Dashboard
Create a weekly habit each Monday:
1. Export Amazon earnings (last 7 days)
2. Note top 5 products by revenue
3. Create 5 new pins for each top product with fresh images/angles
4. Post 3 new Reddit replies in high-intent threads
5. Run `tools/daily-pipeline.py` to add 25 more products

---

## 6. Compliance Checklist

- [ ] Every affiliate link/page has FTC disclosure
- [ ] Pinterest bio says "Some links are affiliate"
- [ ] Reddit comments include disclosure line
- [ ] Do not mask Amazon links with URL shorteners on Reddit
- [ ] Do not claim products are "free" or misrepresent pricing
- [ ] Do not use Amazon product images in paid ads without checking brand rights
- [ ] Respect each platform's spam rules

---

## 7. 30-Day Execution Checklist

| Day | Action |
|---|---|
| 1 | Convert/create Pinterest business account, claim website |
| 2–3 | Create all 16 boards, post 5–7 pins each |
| 4 | Run `daily-pipeline.py --max 25 --commit --push` |
| 5 | Post the 25 new products to Pinterest with `post-new-pins.py` |
| 6–7 | Post the 10 Reddit replies from `REDDIT-POST-PLAN.md` |
| 8–14 | Maintain 3–5 pins/day, 2–3 Reddit replies/week, run pipeline twice more |
| 15 | Review Amazon/Pinterest analytics, identify top 5 products |
| 16–21 | Create fresh pins for top 5, add comparison pages if needed |
| 22–28 | Scale Pinterest posting, test $5/day promoted pin if approved by Piero |
| 29–30 | Audit, remove underperforming categories, plan next month's expansion |

### Conservative revenue math
- 45 products × $100 avg price × ~3% commission × 50 clicks/day × 1% conversion = **~$6.75/day**
- Scale to 300 products + Pinterest traffic → **$30–$100/day** is realistic within 90 days

---

## 8. Files Reference

| File | Purpose |
|---|---|
| `AMAZON-AFFILIATES.json` | Master catalog |
| `AMAZON-CANDIDATES.json` | Research pool for daily pipeline |
| `AMAZON-AFFILIATES.md` | Human-readable catalog |
| `generate-amazon-pin-pages.py` | Builds storefront + pin pages |
| `tools/daily-pipeline.py` | Adds 25 products/day, regenerates, commits |
| `tools/post-new-pins.py` | Posts new products to Pinterest |
| `tools/audit_amazon_pins.py` | Validates ASIN/image accuracy |
| `tools/research-products.py` | Scrapes Amazon best sellers to refill candidates |
| `MARKETING-PLAN-PINTEREST.md` | Deep-dive Pinterest audit + strategy |
| `REDDIT-POST-PLAN.md` | Reddit replies + compliance |
| `AFFILIATE-MARKETING-PLAYBOOK.md` | This consolidated playbook |
