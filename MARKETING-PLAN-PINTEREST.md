# Pinterest → Amazon Affiliate Marketing Plan
## OpenClaw Setup Service Product Pins

**Prepared:** 2026-07-19  
**Repo:** `Porfirio-Piero/openclaw-setup-service` (branch `main`)  
**Affiliate tag:** `porfirioinc-20`  
**Pin landing page:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/`

---

## 1. Audit: Are the pins already live or just ready to post?

### What exists today

| Asset | Status | Notes |
|---|---|---|
| 40 product pin pages on GitHub Pages | ✅ Live | `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/` lists all 40 products with affiliate links and links to individual pin pages. |
| `AMAZON-AFFILIATES.json` | ✅ In repo | Catalog of ~40 products across 11 categories; includes pre-written `pinterestTitle` and `pinterestDescription` for every item. |
| `pinterest-post-all.py` | ✅ In repo | Playwright automation script that posts all 40 pins to Pinterest. It expects local pin images and a running Chrome DevTools Protocol (CDP) session on `ws://127.0.0.1:18800`. |
| `PINTEREST-SETUP.md` | ✅ In repo | Written for the **Gumroad/OpenClaw service** itself, not the Amazon product pins. It instructs creating a business profile and pinning the service page. |
| Dedicated Pinterest pin images | ⚠️ Referenced, not verified | Script references `amazon-pin-*.png` files (e.g., `amazon-pin-obsbot.png`, `amazon-pin-airfryer.png`, etc.) plus fallback `pinterest-pin-1.png`. These need to exist in the same folder as the script or posting will fail. |
| Pinterest account presence | ❌ Not found in search | `site:pinterest.com` searches for the affiliate tag `porfirioinc-20` and unique pin titles like *“AI Tracking 4K Webcam Every Creator Needs”* returned **no indexed pins**. Either the pins were never posted, were posted to a private/unindexed account/board, or Pinterest has not indexed them yet. |

### Verdict

> **Pins are built and ready to post, but they are NOT confirmed live on Pinterest.** The script is a one-shot manual poster, not a scheduler, and it has hard dependencies on a local browser CDP session and image files. Treat this as a **pre-launch asset package**.

---

## 2. Recommended Pinterest Account Setup

### 2.1 Account conversion
- Go to `https://business.pinterest.com/` and convert/claim an existing account or create a new business account.
- **Claim the website** `porfirio-piero.github.io` (Settings → Claimed accounts → Claim website) so Pinterest trusts your outbound links and gives you analytics.

### 2.2 Profile SEO
| Field | Recommendation |
|---|---|
| **Display name** | Piero’s Picks — Home, Tech & Creator Gear |
| **Username** | `@porfiriopicks` (or match your existing handle) |
| **Bio** | Curated Amazon finds for creators, home offices, smart homes, and everyday life. Click a pin → shop the product. *(Affiliate disclosure recommended: “Some links are affiliate.”)* |
| **Website** | `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/` |
| **Profile photo** | Clean headshot or a simple brand mark (circle crop, 165×165 px). |

### 2.3 Board strategy (match the catalog)
Create one board per catalog category. Keep board titles keyword-first and descriptions natural.

| Board | Why it wins |
|---|---|
| Creator Tech & Gear | Webcams, mics, lighting — high-intent, growing audience. |
| Home Office Upgrades | Standing desks, mini PCs, SSDs — work-from-home evergreen. |
| Smart Home & Automation | Smart plugs, robot vacuums — strong search volume. |
| Kitchen Must-Haves | Air fryers, Instant Pots, blenders — mass-market appeal. |
| Health & Personal Care | Electric toothbrushes, water flossers — repeat buyers. |
| Cleaning & Organization | Vacuums, storage, magic erasers — problem/solution searches. |
| Everyday Tech Accessories | Chargers, cables, earbuds — low price, high volume. |
| Baby & Pet Essentials | Diapers, pet food containers, pee pads, hair removers — loyal niches. |
| Beauty & Grooming | Hair dryer brush, makeup wipes, nail lamp — visual, high save rate. |
| Fitness & Outdoor | Yoga mat, resistance bands, grill set — seasonal spikes. |

### 2.4 Rich Pins
- Apply for **Article Rich Pins** at `https://richpins.pinterest.com/` if you add value content to the pin pages.
- If pins stay as pure product landing pages, Rich Pins add less value; focus instead on **standard pins + keyworded descriptions**.

### 2.5 Posting cadence
| Phase | Pins/day | Notes |
|---|---|---|
| Launch week 1 | 5–7 | Seed every board with 4–5 pins. |
| Weeks 2–4 | 3–5 | Fill boards, test top performers. |
| Steady state | 2–3 | Refresh top 20% products; seasonal recycles. |
| Peak shopping (Nov–Dec) | 5–7 | Gift-guide angles, Black Friday, Prime Day. |

Pinterest favors **fresh pins** (new images/URLs) over reposts. Do not repin the same image+URL combo repeatedly.

---

## 3. Ready-to-Use Pin Titles & Descriptions (10 highest-converting products)

Picked for **price × search volume × buyer intent**: high-ticket electronics, problem-solving cleaning, mass-market kitchen, and repeat-purchase health.

### 1. OBSBOT Tiny 2 Lite 4K PTZ Webcam
**Board:** Creator Tech & Gear  
**Title:** AI Tracking 4K Webcam Every Creator Needs  
**Description:** OBSBOT Tiny 2 Lite auto-tracks you, shoots 4K, and makes every call or stream look pro. Perfect for YouTubers, remote workers, and AI creators. #creator #webcam #wfh #4kwebcam #streaminggear #homeoffice  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/obsbot-tiny-2-lite-4k-ptz-webcam.html`

### 2. Dyson V8 Cordless Vacuum
**Board:** Cleaning & Organization  
**Title:** Cordless Vacuum That Actually Picks Up Pet Hair  
**Description:** Dyson V8: powerful suction, cordless freedom, and pet-hair-ready. The upgrade that makes daily cleaning feel effortless. #cleaning #pets #cordlessvacuum #dyson #homecleaning  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/dyson-v8-cordless-vacuum-cleaner.html`

### 3. Apple AirPods Pro (2nd Gen)
**Board:** Everyday Tech Accessories  
**Title:** Noise-Canceling Earbuds for Daily Life  
**Description:** AirPods Pro 2: active noise cancellation, transparency mode, and all-day comfort. Commute, gym, focus — one pair does it all. #airpods #apple #noise cancelling #earbuds #tech  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/apple-airpods-pro-2nd-gen.html`

### 4. Cosori 9-in-1 TurboBlaze Air Fryer
**Board:** Kitchen Must-Haves  
**Title:** Air Fryer That Cooks Almost Everything  
**Description:** Cosori 9-in-1 TurboBlaze: air fry, roast, bake, broil, dehydrate. The weeknight dinner game-changer busy families love. #airfryer #kitchen #mealprep #quickdinner  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/cosori-9-in-1-turboblaze-air-fryer-6-qt.html`

### 5. FLEXISPOT EN1 Electric Standing Desk
**Board:** Home Office Upgrades  
**Title:** Quiet Dual-Motor Standing Desk  
**Description:** FLEXISPOT EN1: 4 memory presets, 176 lb capacity, whisper-quiet motor. The home office upgrade that pays for itself in comfort. #wfh #standingdesk #homeoffice #ergonomic  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/flexispot-en1-electric-standing-desk.html`

### 6. iRobot Roomba 694
**Board:** Smart Home & Automation  
**Title:** Robot Vacuum That Cleans While You Live  
**Description:** Roomba 694: schedule cleanings, control with voice, pick up daily dust and pet hair. Set it and forget it. #smarthome #robotvacuum #pets #cleaning  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/irobot-roomba-694-robot-vacuum.html`

### 7. Logitech Brio 4K Webcam
**Board:** Creator Tech & Gear  
**Title:** The 4K Webcam That Upgrades Every Call  
**Description:** Logitech Brio 4K: pro-level color, noise-canceling mics, and instant Windows Hello. Look sharp on every Zoom and stream. #webcam #homeoffice #tech #4k  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/logitech-brio-4k-webcam.html`

### 8. Waterpik Aquarius Water Flosser
**Board:** Health & Personal Care  
**Title:** Water Flosser for Easier Dental Care  
**Description:** Waterpik Aquarius: deep clean between teeth with water, no string needed. Dentist-recommended and braces-friendly. #dental #health #oralcare #waterflosser  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/waterpik-aquarius-water-flosser.html`

### 9. Revlon One-Step Hair Dryer & Volumizer
**Board:** Beauty & Grooming  
**Title:** Hair Dryer Brush That Cuts Styling Time in Half  
**Description:** Revlon One-Step: dry, smooth, and volumize in one pass. The viral blowout brush that lives up to the hype. #hair #beauty #hairtools #blowout  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/revlon-one-step-hair-dryer-and-volumizer.html`

### 10. SanDisk Extreme 1TB Portable SSD
**Board:** Home Office Upgrades / Creator Tech & Gear  
**Title:** 1TB Rugged SSD for Creators & Agents  
**Description:** SanDisk Extreme 1TB: fast, rugged, pocket-sized storage for video, backups, and AI project files. #ssd #backup #creator #tech  
**Destination:** `https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/sandisk-extreme-1tb-portable-ssd.html`

---

## 4. Traffic Funnel: Pinterest Pin → Pin Page → Amazon

```
Pinterest discovery feed / search
        ↓
Keyworded, vertical 2:3 pin image
        ↓
Pin page (GitHub Pages) — product image, short copy, CTA
        ↓
Amazon affiliate link (tag=porfirioinc-20)
        ↓
Purchase → commission
```

### CTR maximizers

1. **Pin image specs**
   - Aspect ratio 2:3 (1000×1500 px recommended).
   - Clear product photo, large readable text overlay, branded color.
   - Avoid too much blank space; Pinterest crops aggressively.

2. **Title formula**
   - `[Outcome]` + `[Product type]` + subtle urgency.
   - Examples: *“Air Fryer That Cooks Almost Everything”*, *“Cordless Vacuum That Actually Picks Up Pet Hair”*.

3. **Description formula**
   - 2 sentences of benefit + 4–8 keywords/hashtags.
   - Pinterest indexes the first 50–60 words most heavily.

4. **Destination page optimization**
   - Add a sticky **“Shop on Amazon”** button above the fold.
   - Include a short “Why you’ll love it” bullet list (3 bullets).
   - Add a small disclosure line: *“As an Amazon Associate I earn from qualifying purchases.”*
   - Page must load fast (<2 s); GitHub Pages is fine for this.

5. **Save-worthy content**
   - Create 2–3 pin designs **per product** so each is “fresh.”
   - Use product roundups: *“10 Home Office Upgrades Under $250”* linking to a comparison page or the category index.

---

## 5. Automation for Posting & Scheduling

### 5.1 Use the existing script as a launch tool
`pinterest-post-all.py` can post all 40 pins in one session, but it is brittle. Before running:

1. **Verify images exist.** Create one image per referenced file in `DEDICATED` + `CATEGORY_IMG`:
   - `amazon-pin-obsbot.png`, `amazon-pin-brio.png`, `amazon-pin-mic.png`, `amazon-pin-standingdesk.png`, `amazon-pin-minipc.png`, `amazon-pin-smartplug.png`, `amazon-pin-ssd.png`, `amazon-pin-airfryer.png`, `amazon-pin-instantpot.png`, `amazon-pin-toothbrush.png`, `amazon-pin-health.png`, `amazon-pin-vacuum.png`, `amazon-pin-electronics.png`, `amazon-pin-babypet.png`, `amazon-pin-beauty.png`, `amazon-pin-fitness.png`, `pinterest-pin-1.png`.
2. **Start a logged-in Chrome with remote debugging** on port `18800`:
   ```bash
   chrome.exe --remote-debugging-port=18800 --user-data-dir="C:\chrome-pinterest-profile"
   ```
3. Run the script from the repo folder so relative image paths resolve.
4. **Do not run daily** — Pinterest will flag repetitive automation. Use it once for initial seeding, then switch to a scheduler for ongoing content.

### 5.2 Recommended ongoing scheduler
- **Tailwind** (`tailwindapp.com`) — Pinterest-approved partner, supports affiliate links, interval pinning, Tribes for reach.
- **Buffer** — simpler, good for 2–3 pins/day cadence.
- **Pinterest Native Scheduler** — free, built into business account; easiest compliance path.

### 5.3 Image generation pipeline (recommended)
Create a small script that produces fresh 1000×1500 pins from `AMAZON-AFFILIATES.json`:

```python
# Suggested: generate-pinterest-pins.py
# Inputs: AMAZON-AFFILIATES.json + product image from Amazon (or placeholder)
# Outputs: amazon-pins/images/<product_id>.png at 1000x1500
# Overlay: title, short benefit, CTA arrow "Shop →"
```

Use **Canva Bulk Create** or a Python library like `Pillow` + a template PSD/PNG. Plan **3 designs per product** to keep the feed fresh without duplicating URLs.

---

## 6. Tracking & Analytics

### 6.1 Amazon Associates tracking
- All links already use `tag=porfirioinc-20`.
- In Amazon Associates Reports, filter by **Tracking ID** to see clicks, ordered items, conversion, and commission.
- Add a secondary tracking parameter to each product link for Pinterest source granularity:
  ```
  &ref_=as_li_ss_tl
  ```
  is already present. For deeper tracking append:
  ```
  &camp=2026&creative=PIN&subid=<product-id>
  ```
  *(Note: Amazon ignores arbitrary UTM-like params, but Associates’ native sub-tag works via `linkCode` and tag; use the `ref_` value or create separate tracking IDs per channel in Associates Central.)*

### 6.2 Pinterest Analytics
- Track **Outbound clicks**, **Pin clicks**, **Saves**, and **Impressions** per pin in Pinterest Business Hub.
- Sort by **highest outbound click rate**; double down on that product/category.

### 6.3 Simple dashboard
Create a weekly CSV or Notion table:

| Product | Impressions | Saves | Outbound Clicks | Amazon Clicks | Ordered Items | Revenue |
|---|---|---|---|---|---|---|
| OBSBOT Tiny 2 Lite | … | … | … | … | … | … |
| Dyson V8 | … | … | … | … | … | … |

Update every Sunday. Kill underperforming pins; create fresh variants of winners.

---

## 7. Compliance Risks & How to Avoid Them

### 7.1 Amazon Associates rules
| Risk | Mitigation |
|---|---|
| Missing affiliate disclosure | Add *“As an Amazon Associate I earn from qualifying purchases.”* to every pin page footer and optionally in the pin description. |
| Using raw Amazon product images without rights | Use your own pin designs; do not hotlink Amazon images directly as the pin media. The existing pages show Amazon product images inside the page — acceptable as an affiliate link destination, but the **Pinterest pin image itself** should be original. |
| Price in pin/copy not matching Amazon | Do not put prices or “$” claims on pins. Use ranges only if kept current, or omit prices. |
| Shortened/hidden affiliate links | Pinterest requires the destination URL to be visible and legitimate. Use the full landing page URL, not a link shortener masking Amazon. |
| Incentivized clicks | Never ask users to “click my link to support me.” |
| Amazon 180-day cookie via shortened link | Use SiteStripe-generated full links; the repo links already include `linkCode=ll2`. |

### 7.2 Pinterest spam policy
| Risk | Mitigation |
|---|---|
| Repetitive pinning (same image/URL) | Produce fresh designs per product. Use 2–3 pins per URL max in any 30-day window. |
| Automation footprint | Use Pinterest-approved tools (Tailwind, native scheduler) for ongoing posting. Avoid headless browser mass-posting once the account is warm. |
| Misleading claims | Do not promise income, weight loss, or health cures. Keep claims factual and product-specific. |
| Keyword stuffing | Use 5–8 hashtags max; write natural descriptions. |
| Landing-page quality | Pages must load, contain the promised product, and not redirect to unrelated offers. |

### 7.3 FTC disclosure
- Pin descriptions can include `#ad` or a brief line: *“Affiliate link — I may earn a small commission at no extra cost to you.”*
- Page footers must carry the standard Amazon disclosure.

---

## 8. 30-Day Execution Checklist

| Day | Task |
|---|---|
| 1 | Convert/claim business account; claim GitHub Pages domain. |
| 2 | Create 11 boards with keyworded names and descriptions. |
| 3–5 | Generate 2–3 fresh pin images per top-10 product (30 images total). |
| 6 | Add Amazon Associates disclosure to all 40 pin pages. |
| 7 | Run `pinterest-post-all.py` once to seed the top 20 products. |
| 8–14 | Pin 3–5 fresh pins/day across boards using native scheduler or Tailwind. |
| 15 | Review Pinterest Analytics; identify top 5 outbound-click products. |
| 16–21 | Create fresh pin variants for top 5 winners; pause low performers. |
| 22–28 | Add gift-guide/roundup pins for seasonal angles. |
| 30 | Export Amazon Associates + Pinterest data; update weekly dashboard. |

---

## 9. Expected Revenue Math (conservative)

Assumptions: 3% average commission, $75 average order value, 1% click-to-purchase conversion.

| Monthly Pinterest outbound clicks | Amazon clicks | Orders | Commission |
|---|---|---|---|
| 5,000 | 3,000 (60%) | 30 | ~$67.50 |
| 15,000 | 9,000 | 90 | ~$202.50 |
| 50,000 | 30,000 | 300 | ~$675.00 |

Higher-ticket products (Dyson $400, standing desk $230) can push the average order value toward $120–$150, which doubles the numbers above. Focus creative effort on the high-ticket + high-intent products first.

---

## Summary for Piero

- **The 40 Amazon affiliate pins are built, live on GitHub Pages, and ready to post — but not yet confirmed on Pinterest.**
- **Recommended next move:** claim a Pinterest business account, create 11 category boards, generate fresh 2:3 pin images, add Amazon disclosure to the pages, then seed the top 20 products using the existing Playwright script once.
- **Ongoing:** use Tailwind or Pinterest native scheduler at 2–5 fresh pins/day; track Amazon Associates + Pinterest Analytics weekly; double down on Dyson, AirPods Pro, Air Fryer, standing desk, and Roomba.
- **Compliance:** add disclosure, avoid repetitive pinning, use original pin images, and keep landing pages fast and honest.

Plan written to: `openclaw-gumroad-landing/MARKETING-PLAN-PINTEREST.md`
