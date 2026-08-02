import json, os, re
from html import escape

ROOT = r'C:\Users\devpi\.openclaw\workspace\openclaw-gumroad-landing\gut-garden'
JSON_PATH = r'C:\Users\devpi\.openclaw\workspace\gut-garden-content-27.json'
DISCLOSURE = "As an Amazon Associate I earn from qualifying purchases."
BASE_URL = "https://porfirio-piero.github.io/openclaw-setup-service/gut-garden"

os.makedirs(ROOT, exist_ok=True)
os.makedirs(os.path.join(ROOT, 'recipes'), exist_ok=True)

with open(JSON_PATH, 'r', encoding='utf-8-sig') as f:
    data = json.load(f)
recipes = data['recipes']

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def recipe_page(r):
    slug = r['slug']
    title = escape(r['title'])
    source_title = escape(r.get('source_title', ''))
    source_url = escape(r.get('source_url', ''))
    pinterest_url = escape(r.get('pinterest_reference_url', ''))
    ingredients = ''.join(f'<li>{escape(i)}</li>' for i in r.get('ingredients', []))
    steps = ''.join(f'<li>{escape(s)}</li>' for s in r.get('steps', []))
    equip = r.get('equipment', {})
    aff = equip.get('affiliate_url', '')
    aff2 = equip.get('secondary_affiliate_url', '')
    equip_links = ''
    if aff:
        equip_links += f'<p><a class="btn" href="{escape(aff)}" target="_blank" rel="nofollow sponsored">Shop matched fermentation gear on Amazon</a></p>'
    if aff2:
        equip_links += f'<p><a class="btn secondary" href="{escape(aff2)}" target="_blank" rel="nofollow sponsored">Shop pressure-rated bottles on Amazon</a></p>'
    attribution = ''
    if source_url:
        attribution += f'<p><strong>Recipe source:</strong> <a href="{source_url}" target="_blank" rel="nofollow">{source_title or "Original source"}</a></p>'
    if pinterest_url:
        attribution += f'<p><strong>Pinterest inspiration:</strong> <a href="{pinterest_url}" target="_blank" rel="nofollow">Saved pin reference</a></p>'
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | Gut Garden</title>
<meta name="description" content="{escape(r.get('safety_note', title))}">
<meta property="og:image" content="{BASE_URL}/pins/{slug}.jpg">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{escape(r.get('safety_note', title))}">
<meta property="og:url" content="{BASE_URL}/recipes/{slug}.html">
<style>
:root{{--sage:#8a9a5b;--ginger:#c68e3f;--cream:#f7f5f0;--char:#2f2f2f;}}
body{{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--cream);color:var(--char);line-height:1.6;max-width:720px;margin:0 auto;padding:20px;}}
header{{text-align:center;padding:20px 0;border-bottom:2px solid var(--sage);margin-bottom:24px;}}
.logo{{font-size:1.8rem;font-weight:800;color:var(--sage);letter-spacing:-0.5px;}}
.tagline{{color:#666;font-size:0.95rem;margin-top:4px;}}
nav{{margin-top:12px;}}
nav a{{color:var(--ginger);text-decoration:none;font-weight:600;}}
h1{{color:var(--char);margin-bottom:8px;}}
h2{{color:var(--sage);border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:28px;}}
ul,ol{{padding-left:20px;}}
li{{margin-bottom:8px;}}
.meta{{background:#fff;padding:16px;border-radius:8px;margin:16px 0;box-shadow:0 1px 3px rgba(0,0,0,0.05);}}
.btn{{display:inline-block;background:var(--ginger);color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:700;margin:8px 0;}}
.btn.secondary{{background:var(--sage);}}
.disclosure{{font-size:0.8rem;color:#666;margin-top:24px;padding-top:12px;border-top:1px solid #ddd;}}
footer{{text-align:center;color:#777;font-size:0.8rem;margin-top:40px;padding-top:20px;border-top:1px solid #ddd;}}
</style>
</head>
<body>
<header>
<div class="logo">Gut Garden</div>
<div class="tagline">Fermentation recipes for a happier gut</div>
<nav><a href="./index.html">← All recipes</a></nav>
</header>
<h1>{title}</h1>
<div class="meta">
<p><strong>Fermentation time:</strong> {escape(r.get('fermentation_time', 'See source'))}</p>
{attribution}
</div>
<h2>Ingredients</h2>
<ul>{ingredients}</ul>
<h2>Steps</h2>
<ol>{steps}</ol>
<h2>Safety note</h2>
<p>{escape(r.get('safety_note', 'Follow safe fermentation practices.'))}</p>
<h2>Equipment</h2>
<p>{escape(equip.get('category', 'See recipe'))}</p>
{equip_links}
<p class="disclosure">{DISCLOSURE}</p>
<footer>© 2026 Gut Garden · <a href="./index.html">All recipes</a></footer>
</body>
</html>'''

def hub_page():
    cards = []
    for r in recipes:
        slug = r['slug']
        title = escape(r['title'])
        url = f'./recipes/{slug}.html'
        cards.append(f'<div class="card"><h3><a href="{url}">{title}</a></h3><p>{escape(r.get("fermentation_time", ""))}</p></div>')
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gut Garden | 27 Fermentation Recipes</title>
<meta name="description" content="Easy, real-food fermentation recipes with safety notes, source links, and matched Amazon gear. As an Amazon Associate I earn from qualifying purchases.">
<meta property="og:image" content="{BASE_URL}/pins/plain-sauerkraut.jpg">
<meta property="og:title" content="Gut Garden | 27 Fermentation Recipes">
<meta property="og:description" content="Easy, real-food fermentation recipes with safety notes, source links, and matched Amazon gear.">
<meta property="og:url" content="{BASE_URL}/">
<style>
:root{{--sage:#8a9a5b;--ginger:#c68e3f;--cream:#f7f5f0;--char:#2f2f2f;}}
body{{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--cream);color:var(--char);line-height:1.6;max-width:960px;margin:0 auto;padding:20px;}}
header{{text-align:center;padding:40px 20px;background:linear-gradient(135deg,var(--sage),#6b7a42);color:#fff;border-radius:12px;margin-bottom:30px;}}
.logo{{font-size:2.4rem;font-weight:800;margin-bottom:6px;}}
.tagline{{font-size:1.1rem;opacity:0.95;}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}}
.card{{background:#fff;padding:18px;border-radius:10px;box-shadow:0 2px 5px rgba(0,0,0,0.06);}}
.card h3{{margin-top:0;margin-bottom:8px;}}
.card a{{color:var(--ginger);text-decoration:none;font-weight:700;}}
.card a:hover{{text-decoration:underline;}}
.card p{{color:#666;font-size:0.9rem;margin:0;}}
.disclosure{{font-size:0.8rem;color:#666;text-align:center;margin-top:30px;padding-top:16px;border-top:1px solid #ddd;}}
footer{{text-align:center;color:#777;font-size:0.8rem;margin-top:30px;}}
</style>
</head>
<body>
<header>
<div class="logo">Gut Garden</div>
<div class="tagline">27 real-food fermentation recipes — from sauerkraut to tepache — with safety notes and matched gear.</div>
</header>
<div class="grid">{''.join(cards)}</div>
<p class="disclosure">{DISCLOSURE}</p>
<footer>© 2026 Gut Garden · Part of the OpenClaw affiliate ecosystem</footer>
</body>
</html>'''

# Write recipe pages
for r in recipes:
    out_path = os.path.join(ROOT, 'recipes', f"{r['slug']}.html")
    with open(out_path, 'w', encoding='utf-8-sig') as f:
        f.write(recipe_page(r))

# Write hub
with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8-sig') as f:
    f.write(hub_page())

print(f"Wrote {len(recipes)} recipe pages + hub to {ROOT}")
