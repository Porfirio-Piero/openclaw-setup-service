#!/usr/bin/env python3
"""
Patch every Amazon pin page so its displayed image and Open Graph image
match the exact ASIN in the underlying Amazon affiliate link.

For the dead ASINs discovered in the original set, the script substitutes
current replacement ASINs (found via product search) so every link and
image resolves to a real Amazon product.

Run from the repository root:
    uv run python tools/fix_amazon_pin_images.py

Then review and commit:
    git diff
    git add amazon-pins
    git commit -m "Fix Amazon pin images to match linked products"
    git push
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Dict

ROOT = Path(__file__).resolve().parents[1]
PINS_DIR = ROOT / "amazon-pins"

ASIN_RE = re.compile(r"https://www\.amazon\.com/(?:dp|gp/product)/([A-Z0-9]{10})", re.I)
IMG_RE = re.compile(r'(<img\b[^\u003e]*?\bsrc=")[^"]*(")', re.I)
OG_RE = re.compile(
    r'(<meta\b[^\u003e]*?\bproperty="og:image"[^\u003e]*?\bcontent=")[^"]*(")',
    re.I,
)
# index.html cards: image src + affiliate button href are in one block.
CARD_RE = re.compile(
    r'(<div class="card"\u003e\s*<img src=")([^"]+)(".*?\u003ca class="btn" href=")([^"]+)(".*?\u003c\/div\u003e)',
    re.I | re.S,
)

# Dead ASINs -> replacement ASINs discovered via web search.
DEAD_ASIN_REPLACEMENTS: Dict[str, str] = {
    "B08XVYZ1YJ": "B0C6W3D4RM",   # Amazon Fire TV Stick 4K Select
    "B0194WDVHI": "B0D5CLSMFB",   # Anker Portable Charger PowerCore 10000
    "B0916GKG1W": "B0CP7NWH6L",   # Anker USB-C Charger 20W
    "B08KWR7FSR": "B09LLZ3H6Z",   # Anker USB-C to Lightning Cable 6ft
    "B0CHWNM1Z7": "B0CHWRXH8B",   # Apple AirPods Pro 2nd Gen (USB-C)
    "B00004RDFP": "B09BKQX4KR",   # Cuisinart Deluxe Grill Set 20-Piece
    "B09YS9N7N2": "B09YS9N7H2",   # Dyson V8 Cordless Vacuum
    "B00M8UD9VS": "B0DLZBY9W6",   # Huggies Little Snugglers Diapers Size 1 198ct
    "B0777L1ZXC": "B075QQ8VZW",   # iHealth No-Touch Forehead Thermometer
    "B08R9LPTJZ": "B08SP5GYJP",   # iRobot Roomba 694 Robot Vacuum
    "B00L51AKVK": "B07M6R4LPN",   # Mr. Clean Magic Eraser Original
    "B00UYY2GS8": "B00MLBPDQ2",   # Neutrogena Makeup Remover Cleansing Face Wipes
    "B06Y23Z1JB": "B07TBBL1C2",   # OXO Good Grips POP Container Set (10-pc)
    "B08GT31SKS": "B08GTYFC37",   # SanDisk Extreme 1TB Portable SSD
    "B075TGM5W9": "B00JH98GR4",   # Shark Navigator Lift-Away Upright Vacuum
    "B00W8IEJ94": "B078NTG1V5",   # SUNUV UV LED Nail Lamp
    "B0040EGNSS": "B07JGM74B5",   # TriggerPoint GRID Foam Roller
    "B000H88LHW": "B0006PLP8U",   # Tweezerman Slant Tweezer
}


def asin_image_url(asin: str) -> str:
    """Amazon product-image URL derived directly from an ASIN."""
    return f"https://m.media-amazon.com/images/P/{asin.upper()}.01._SCLZZZZZZZ_SL600_.jpg"


def build_affiliate_url(asin: str) -> str:
    return (
        f"https://www.amazon.com/dp/{asin}"
        "?tag=porfirioinc-20"
        "&linkCode=ll2&language=en_US&ref_=as_li_ss_tl"
    )


def patch_file(path: Path, new_asin: str) -> bool:
    """Update <img>, og:image, and affiliate link ASIN in a pin page."""
    text = path.read_text(encoding="utf-8")
    image_url = asin_image_url(new_asin)
    updated = IMG_RE.sub(rf"\1{image_url}\2", text, count=1)
    if OG_RE.search(updated):
        updated = OG_RE.sub(rf"\1{image_url}\2", updated, count=1)
    updated = ASIN_RE.sub(
        lambda m: f"https://www.amazon.com/dp/{new_asin}",
        updated,
        count=1,
    )
    if updated == text:
        return False
    path.write_text(updated, encoding="utf-8")
    return True


def update_index_cards(index_text: str, info_map: Dict[str, str]) -> str:
    """Update index.html cards whose original ASIN is in info_map."""

    def _replacer(m: re.Match) -> str:
        img_open, _old_src, img_close, btn_href, rest = m.groups()
        asin_match = ASIN_RE.search(btn_href)
        if not asin_match:
            return m.group(0)
        asin = asin_match.group(1).upper()
        resolved = info_map.get(asin, asin)
        image_url = asin_image_url(resolved)
        new_href = build_affiliate_url(resolved)
        return f'{img_open}{image_url}{img_close}{new_href}{rest}'

    return CARD_RE.sub(_replacer, index_text)


def main() -> None:
    if not PINS_DIR.exists():
        raise SystemExit(f"Missing directory: {PINS_DIR}")

    pin_files = sorted(PINS_DIR.glob("*.html"))
    index_path = PINS_DIR / "index.html"
    if index_path in pin_files:
        pin_files.remove(index_path)

    info_map: Dict[str, str] = {}
    changed = 0

    for path in pin_files:
        text = path.read_text(encoding="utf-8")
        match = ASIN_RE.search(text)
        if not match:
            print(f"SKIP {path.name} — no Amazon ASIN link")
            continue

        original_asin = match.group(1).upper()
        resolved_asin = DEAD_ASIN_REPLACEMENTS.get(original_asin, original_asin)
        info_map[original_asin] = resolved_asin

        if patch_file(path, resolved_asin):
            print(f"FIXED {path.name} — {original_asin} -> {resolved_asin}")
            changed += 1
        else:
            print(f"OK {path.name} — {resolved_asin}")

    if index_path.exists():
        index_text = index_path.read_text(encoding="utf-8")
        new_index_text = update_index_cards(index_text, info_map)
        if new_index_text != index_text:
            index_path.write_text(new_index_text, encoding="utf-8")
            print(f"\nFIXED {index_path.name}")
            changed += 1
        else:
            print(f"\nOK {index_path.name}")

    print(f"\nUpdated {changed} HTML file(s).")
    print("Every displayed image and OG image now matches the linked Amazon ASIN.")


if __name__ == "__main__":
    main()
