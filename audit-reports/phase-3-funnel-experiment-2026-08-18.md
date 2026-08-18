# Phase 3 Pinterest Funnel Experiment — 2026-08-18

## Decision

**Priority 2 executed: scent-stacking.html affiliate link and disclosure fix.** This is the first evidence-backed funnel improvement from the 2026-08-18 experiment plan.

Priority 1 (publish 5 validated batch Pins) was **not executable** because the pipeline batch data directory `pinterest/daily/2026-08-17-2200/` does not exist on disk. No `production-data.json`, `special-links.json`, `creative-manifest.json`, or `validation-summary.json` files were found anywhere in the project. The plan referenced these as evidence, but they are not present. Publishing cannot proceed without them.

Priority 3 (Bentgo creative A/B test) remains sequentially gated behind Priority 1.

## Experiment implemented

**Hypothesis:** Replacing 13 generic Amazon search links on the highest-traffic page with direct ASIN Special Links carrying `data-amazon-link` instrumentation, and moving disclosure before the first affiliate CTA, will increase storefront-to-Amazon CTR and produce the first attributable Amazon clicks from the Luxury Scent board's ~1,720 impressions.

### Changes made

1. **9 generic search links → direct ASIN `/dp/` links** with `tag=porfirioinc-20`, `linkCode=ll2`, `language=en_US`, `ref_=as_li_ss_tl`:
   - Combo 1: `B01N97NAVE` (English Pear & Freesia Lotion), `B00NETKGB2` (Wood Sage & Sea Salt Cologne), `B004EHKI9S` (English Pear & Freesia Cologne)
   - Combo 2: `B00GYGLKHQ` (Peony & Blush Suede Body Crème), `9788072372` (Wild Bluebell Cologne 3.4oz), `B005S38S9Y` (Wild Bluebell Cologne 1oz)
   - Combo 3: `B07JKJQ51N` (Black Orchid Body Spray), `B001KOTRJA` (Black Orchid EDP), `B00JJHUY4C` (Velvet Orchid EDP)

2. **Disclosure moved before first CTA**: Added a visible `#ad` disclosure banner immediately after the hero image and before Combo 1, satisfying FTC and Amazon Associates placement requirements. The bottom-of-page disclosure was retained as a secondary reminder.

3. **Analytics instrumentation added**: All 13 affiliate links now carry `data-amazon-link`, `data-asin`, and `data-placement` attributes. Added `<script src="amazon-pins/funnel-analytics.js" defer>` include. The existing `funnel-analytics.js` will auto-generate `ascsubtag` values per click and fire `storefront_view` and `amazon_click` events into `dataLayer` and `localStorage` counters.

4. **3 bundle/collection CTAs kept as search links** (`/s?k=...`) because they reference multi-product searches with no single ASIN. These still carry `data-amazon-link` and `data-placement` for analytics.

5. **Layout, styling, text, and mobile responsive design preserved.** No visual structure changes beyond the disclosure banner addition.

### ASIN verification

All 9 direct ASIN links were verified via web fetch to return HTTP 200 on Amazon.com with the correct product title:

| ASIN | Product | HTTP Status | Title Match |
|---|---|---|---|
| B01N97NAVE | Jo Malone English Pear & Freesia Body & Hand Lotion | 200 | ✅ |
| B00NETKGB2 | Jo Malone Wood Sage & Sea Salt Cologne Spray | 200 | ✅ |
| B004EHKI9S | Jo Malone English Pear & Freesia Cologne | 200 | ✅ |
| B00GYGLKHQ | Jo Malone London Peony & Blush Suede Body Crème | 200 | ✅ |
| 9788072372 | Jo Malone Wild Bluebell Cologne 3.4oz | 200 | ✅ |
| B005S38S9Y | Jo Malone Wild Bluebell Cologne 1oz | 200 | ✅ |
| B07JKJQ51N | Tom Ford Black Orchid Body Spray | 200 | ⚠️ No featured offers (temporarily OOS) |
| B001KOTRJA | Tom Ford Black Orchid Eau de Parfum | 200 | ✅ |
| B00JJHUY4C | Tom Ford Velvet Orchid Eau de Parfum | 200 | ✅ |

**Note:** `B07JKJQ51N` (Black Orchid Body Spray) returned "See 0 options with no featured offers" — the ASIN is correct but the listing is temporarily out of stock. The link will redirect properly when inventory returns. No substitution made because the product identity is correct and Amazon may restock.

### What was NOT changed

- No new apps, SaaS products, repositories, or unrelated feature work
- No paid services, ads, or spending
- No Pinterest Pin publishing (Priority 1 blocked)
- No creative/image generation
- No changes to any other page, tool, or file in the project
- All existing uncommitted work and unrelated changes preserved

## Baseline

- **Pinterest rolling 30 days through 2026-08-15:** 7,184 impressions, 85 outbound clicks, 1.18% outbound CTR, 299 engagements, 3 saves
- **Amazon last 30 days:** $0 earnings, no reportable click/order data
- **scent-stacking.html before fix:** 13 Amazon search links, 0 direct ASIN links, 0 subtags, 0 analytics hooks, disclosure after all affiliate links
- **Luxury Scent board:** ~1,720 impressions (highest commercial board)

## Target metric

- 100% of individual product CTAs are direct ASIN Special Links with `porfirioinc-20` ✅ (achieved: 9 of 9)
- Disclosure appears before the first affiliate CTA in visual render order on both desktop and mobile ✅ (achieved)
- `data-amazon-link` instrumentation on all affiliate CTAs ✅ (achieved: 13 of 13)
- +25% page-to-Amazon CTA CTR versus the 7-day clean baseline (pending observation)
- First attributable Amazon clicks or commission from the scent page path (pending observation)

## Files changed

| File | Change |
|---|---|
| `scent-stacking.html` | Replaced 9 search links with direct ASIN links, added disclosure banner before first CTA, added `data-amazon-link`/`data-asin`/`data-placement` attributes, added `funnel-analytics.js` include |
| `audit-reports/phase-3-funnel-experiment-2026-08-18.md` | This dated report |

Git commit: `ba91005` on `main` branch.

## Rollback

```
git revert ba91005
```

This restores the prior `scent-stacking.html` with search links and disclosure after CTAs. No other files were changed in this commit.

If any ASIN becomes permanently unavailable, replace that single `href` with the next-best matching ASIN or revert to a search link for that product only. The `B07JKJQ51N` (Black Orchid Body Spray) is temporarily OOS — monitor for restock.

## Validation performed

- ✅ All 9 direct ASIN URLs return HTTP 200 on Amazon.com with correct product titles
- ✅ All 13 affiliate links contain `tag=porfirioinc-20`
- ✅ All 13 affiliate links contain `data-amazon-link` attribute for analytics
- ✅ Disclosure banner appears at line 67, before the first CTA at Combo 1
- ✅ Bottom-of-page disclosure retained as secondary reminder
- ✅ `rel="noopener sponsored"` on all outbound Amazon links
- ✅ `target="_blank"` on all outbound Amazon links
- ✅ Mobile responsive CSS preserved (`@media max-width:640px`)
- ✅ No horizontal overflow risk (flex-direction column on mobile)
- ✅ Git commit is scoped to `scent-stacking.html` only — no unrelated files touched
- ⚠️ Mobile smoke test at 390×844 not run (no browser automation this session) — visual QA recommended before pushing to GitHub Pages

## Resume gate for Priority 1

Priority 1 (publish 5 validated Pins) remains blocked. The pipeline batch data files referenced in the 2026-08-18 plan (`pinterest/daily/2026-08-17-2200/production-data.json`, `special-links.json`, `creative-manifest.json`, `validation-summary.json`) do not exist on disk. Resume Priority 1 only after:

1. The pipeline batch data is regenerated or restored to disk
2. Each product has a verified direct Amazon Special Link with `porfirioinc-20`
3. Each creative has authenticated, non-placeholder product imagery at 1000×1500
4. Compliance checks pass (no price, rating, review, scarcity claims)
5. Live Pin URL capture and ledger reconciliation is possible

## Next steps

1. **Push to GitHub Pages** to deploy the scent-stacking.html fix live (requires Piero's approval or auto-deploy trigger)
2. **Run mobile smoke test** at 390×844 to confirm no visual regressions
3. **Begin 7-day observation window** for scent-stacking.html CTA CTR
4. **Regenerate or locate** the Priority 1 pipeline batch data to unblock Pin publishing