import json, os, re, html

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'amazon-pins')
os.makedirs(OUT, exist_ok=True)

with open(os.path.join(HERE, 'AMAZON-AFFILIATES.json'), 'r', encoding='utf-8') as f:
    data = json.load(f)

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

def build_pin_page(product, cat_name):
    slug = slugify(product['title'])
    img = f"amazon-pin-{slugify(product['title'].split()[0] + ' ' + product['title'].split()[1])}.png"
    # Map slug to image names we already generated
    name_map = {
        'obsbot-tiny-2-lite-4k-ptz-webcam': 'amazon-pin-obsbot.png',
        'logitech-brio-4k-webcam': 'amazon-pin-brio.png',
        'wireless-lavalier-microphone-for-iphoneandroid': 'amazon-pin-mic.png',
        'veken-55-inch-large-electric-standing-desk': 'amazon-pin-standingdesk.png',
        'flexispot-en1-electric-standing-desk': 'amazon-pin-standingdesk.png',
        'beelink-mini-s12-mini-pc': 'amazon-pin-minipc.png',
        'origimagic-mini-pc-ryzen-5-dual-lan': 'amazon-pin-minipc.png',
        'smart-plug-4-pack-wi-fi-voice-compatible': 'amazon-pin-smartplug.png',
        'sandisk-extreme-1tb-portable-ssd': 'amazon-pin-ssd.png',
    }
    img = name_map.get(slug, 'pinterest-pin-1.png')
    pin_url = f"https://porfirio-piero.github.io/openclaw-setup-service/pin-amazon-{slug}.html"
    og_image = f"https://porfirio-piero.github.io/openclaw-setup-service/{img}"
    escaped_desc = html.escape(product['pinterestDescription'])
    escaped_title = html.escape(product['pinterestTitle'])
    escaped_long = html.escape(product['title'])

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{escaped_long} — Amazon Affiliate</title>
  <meta name="description" content="{escaped_desc}">
  <meta property="og:title" content="{escaped_title}">
  <meta property="og:description" content="{escaped_desc}">
  <meta property="og:image" content="{og_image}">
  <meta property="og:url" content="{pin_url}">
  <meta property="og:type" content="product">
  <style>
    body {{ margin: 0; background: #05050a; color: #fff; font-family: Inter, system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; text-align: center; }}
    img {{ max-width: 100%; height: auto; display: block; }}
    .wrap {{ max-width: 600px; padding: 24px; }}
    h1 {{ font-size: 1.6rem; margin: 20px 0 10px; }}
    p {{ color: #aaa; line-height: 1.5; }}
    a.btn {{ display: inline-block; margin-top: 18px; padding: 14px 28px; background: #ff9900; color: #000; text-decoration: none; border-radius: 10px; font-weight: 700; }}
    .note {{ font-size: .8rem; color: #777; margin-top: 18px; }}
  </style>
</head>
<body>
  <img src="../{img}" alt="{escaped_long}">
  <div class="wrap">
    <h1>{escaped_title}</h1>
    <p>{escaped_desc}</p>
    <a class="btn" href="{product['link']}" target="_blank" rel="noopener">Check Price on Amazon</a>
    <p class="note">Affiliate link — I may earn a commission at no extra cost to you.</p>
  </div>
</body>
</html>
'''

all_products = []
for cat in data['categories']:
    for prod in cat['products']:
        prod['_category'] = cat['name']
        all_products.append(prod)
        slug = slugify(prod['title'])
        page = build_pin_page(prod, cat['name'])
        path = os.path.join(OUT, f"{slug}.html")
        with open(path, 'w', encoding='utf-8') as f:
            f.write(page)

# Index gallery
items = []
for p in all_products:
    slug = slugify(p['title'])
    img = f"../amazon-pin-{slugify(p['title'].split()[0] + ' ' + p['title'].split()[1])}.png"
    name_map = {
        'obsbot-tiny-2-lite-4k-ptz-webcam': '../amazon-pin-obsbot.png',
        'logitech-brio-4k-webcam': '../amazon-pin-brio.png',
        'wireless-lavalier-microphone-for-iphoneandroid': '../amazon-pin-mic.png',
        'veken-55-inch-large-electric-standing-desk': '../amazon-pin-standingdesk.png',
        'flexispot-en1-electric-standing-desk': '../amazon-pin-standingdesk.png',
        'beelink-mini-s12-mini-pc': '../amazon-pin-minipc.png',
        'origimagic-mini-pc-ryzen-5-dual-lan': '../amazon-pin-minipc.png',
        'smart-plug-4-pack-wi-fi-voice-compatible': '../amazon-pin-smartplug.png',
        'sandisk-extreme-1tb-portable-ssd': '../amazon-pin-ssd.png',
    }
    img = name_map.get(slug, '../pinterest-pin-1.png')
    items.append(f'''
    <div class="card">
      <img src="{img}" alt="{html.escape(p['title'])}">
      <h3>{html.escape(p['pinterestTitle'])}</h3>
      <p>{html.escape(p['pinterestDescription'])}</p>
      <a class="btn" href="{p['link']}" target="_blank" rel="noopener">Shop on Amazon</a>
      <a class="pin" href="{slug}.html">View Pin Page →</a>
    </div>
    ''')

index = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amazon Affiliate Picks — OpenClaw Setup Service</title>
  <meta name="description" content="Curated Amazon affiliate picks for creators, home offices, home labs, and smart homes.">
  <style>
    body {{ margin: 0; background: #05050a; color: #f0f0ff; font-family: Inter, system-ui, sans-serif; }}
    .container {{ max-width: 1100px; margin: 0 auto; padding: 0 24px; }}
    header {{ padding: 40px 0; text-align: center; border-bottom: 1px solid #1c1c2a; }}
    h1 {{ font-size: 2rem; margin: 0; }}
    .lead {{ color: #8b8bb0; margin-top: 10px; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 24px; padding: 40px 0; }}
    .card {{ background: #0e0e18; border: 1px solid #1c1c2a; border-radius: 16px; padding: 20px; text-align: center; }}
    .card img {{ width: 100%; border-radius: 10px; margin-bottom: 14px; }}
    .card h3 {{ font-size: 1.1rem; margin: 0 0 8px; }}
    .card p {{ color: #8b8bb0; font-size: .9rem; margin: 0 0 16px; }}
    .btn {{ display: inline-block; padding: 12px 22px; background: #ff9900; color: #000; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: .9rem; }}
    .pin {{ display: block; margin-top: 10px; color: #00f0ff; text-decoration: none; font-size: .85rem; }}
    footer {{ padding: 30px 0; text-align: center; color: #5a5a7a; border-top: 1px solid #1c1c2a; font-size: .85rem; }}
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Curated Amazon Affiliate Picks</h1>
      <p class="lead">Creator tech, home office, home lab, and smart home gear I recommend.</p>
    </div>
  </header>
  <div class="container">
    <div class="grid">
      {''.join(items)}
    </div>
  </div>
  <footer>
    <div class="container">
      <p>Affiliate links — I may earn a commission at no extra cost to you. · <a href="../index.html" style="color:#00f0ff">OpenClaw Setup Service</a></p>
    </div>
  </footer>
</body>
</html>
'''

with open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(index)

print(f"Generated {len(all_products)} pin pages in {OUT}")
