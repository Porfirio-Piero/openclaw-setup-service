import json, os, re
from PIL import Image, ImageDraw, ImageFont

ROOT = r'C:\Users\devpi\.openclaw\workspace\openclaw-gumroad-landing\gut-garden'
JSON_PATH = r'C:\Users\devpi\.openclaw\workspace\gut-garden-content-27.json'
PINS_DIR = os.path.join(ROOT, 'pins')
os.makedirs(PINS_DIR, exist_ok=True)

with open(JSON_PATH, 'r', encoding='utf-8-sig') as f:
    recipes = json.load(f)['recipes']

# Try common fonts
def load_font(size):
    candidates = [
        r'C:\Windows\Fonts\arial.ttf',
        r'C:\Windows\Fonts\segoeui.ttf',
        r'C:\Windows\Fonts\calibri.ttf',
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()

FONT_TITLE = load_font(56)
FONT_SUB = load_font(32)
FONT_TAG = load_font(24)

def draw_gradient(draw, width, height, c1, c2):
    for y in range(height):
        ratio = y / height
        r = int(c1[0] + (c2[0] - c1[0]) * ratio)
        g = int(c1[1] + (c2[1] - c1[1]) * ratio)
        b = int(c1[2] + (c2[2] - c1[2]) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines = []
    cur = ''
    for w in words:
        test = f'{cur} {w}'.strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def generate_pin(r):
    W, H = 1000, 1500
    img = Image.new('RGB', (W, H), color=(247, 245, 240))
    draw = ImageDraw.Draw(img)
    # Cream -> sage gradient
    draw_gradient(draw, W, H, (247, 245, 240), (210, 220, 190))
    # Decorative top band
    draw.rectangle([0, 0, W, 340], fill=(138, 154, 91))
    # Simple jar icon (circle + rectangle)
    cx, cy = W // 2, 520
    jar_w, jar_h = 260, 320
    draw.rounded_rectangle([cx - jar_w//2, cy - jar_h//2, cx + jar_w//2, cy + jar_h//2], radius=20, fill=(230, 230, 220), outline=(180, 170, 150), width=6)
    # lid
    draw.rounded_rectangle([cx - jar_w//2 - 10, cy - jar_h//2 - 30, cx + jar_w//2 + 10, cy - jar_h//2 + 10], radius=8, fill=(198, 142, 63))
    # bubbles
    for bx, by, br in [(cx-60, cy+40, 18), (cx+30, cy-20, 22), (cx-20, cy+90, 14), (cx+70, cy+60, 16)]:
        draw.ellipse([bx-br, by-br, bx+br, by+br], fill=(255, 255, 255, 180))
    # Title
    title = r['pinterest_title'] if 'pinterest_title' in r else r['title']
    lines = wrap_text(draw, title, FONT_TITLE, W - 120)
    y = 820
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=FONT_TITLE)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) // 2, y), line, font=FONT_TITLE, fill=(47, 47, 47))
        y += bbox[3] - bbox[1] + 12
    # Subtitle
    sub = "Gut Garden · Fermentation Recipes"
    bbox = draw.textbbox((0, 0), sub, font=FONT_SUB)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y + 20), sub, font=FONT_SUB, fill=(100, 100, 90))
    # Footer
    tag = "Real food · Probiotic · Easy at home"
    bbox = draw.textbbox((0, 0), tag, font=FONT_TAG)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, H - 80), tag, font=FONT_TAG, fill=(120, 120, 110))
    out = os.path.join(PINS_DIR, f"{r['slug']}.jpg")
    img.save(out, 'JPEG', quality=88)
    return out

for r in recipes:
    path = generate_pin(r)
    print(f"Wrote {path}")

print(f"\nDone — {len(recipes)} pins in {PINS_DIR}")
