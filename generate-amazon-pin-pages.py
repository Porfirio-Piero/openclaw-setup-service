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

def amazon_image(asin, width=600):
    return f"https://m.media-amazon.com/images/P/{asin}.01._SCLZZZZZZZ_SL{width}_.jpg"

# Category fallback images (local, used as onerror fallback)
CATEGORY_IMG = {
    'Creator Tech': 'amazon-pin-obsbot.png',
    'Home Office & Productivity': 'amazon-pin-standingdesk.png',
    'Home Server & Automation': 'amazon-pin-minipc.png',
    'Smart Home & Security': 'amazon-pin-smartplug.png',
    'Home & Kitchen': 'amazon-pin-airfryer.png',
    'Health & Personal Care': 'amazon-pin-health.png',
    'Cleaning & Organization': 'amazon-pin-vacuum.png',
    'Electronics & Accessories': 'amazon-pin-electronics.png',
    'Baby & Pet Essentials': 'amazon-pin-babypet.png',
    'Beauty & Personal Grooming': 'amazon-pin-beauty.png',
    'Fitness & Outdoor': 'amazon-pin-fitness.png',
    'Outdoor, Patio & Garden': 'amazon-pin-fitness.png',
    'Travel Gear': 'amazon-pin-fitness.png',
    'Automotive': 'amazon-pin-electronics.png',
    'Tools & Home Improvement': 'amazon-pin-electronics.png',
    'Sleep & Bedding': 'amazon-pin-health.png',
    'Everyday Carry & Safety': 'amazon-pin-electronics.png',
}

def category_fallback(cat_name):
    return CATEGORY_IMG.get(cat_name, 'pinterest-pin-1.png')

def build_pin_page(product, cat_name, all_prods):
    slug = slugify(product['title'])
    pin_url = f"https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/{slug}.html"
    product_img = amazon_image(product['asin'], 800)
    fallback = category_fallback(cat_name)
    escaped_desc = html.escape(product['pinterestDescription'])
    escaped_title = html.escape(product['pinterestTitle'])
    escaped_long = html.escape(product['title'])
    price = html.escape(product.get('priceRange', ''))
    commission = html.escape(product.get('commission', ''))
    use_cases = ''.join(f'<li>{html.escape(uc)}</li>' for uc in product.get('useCases', []))
    disclosure = html.escape(data.get('strategy', {}).get('disclosure', 'Affiliate link — I may earn a commission at no extra cost to you.'))
    # Related products: same category, excluding self
    related = [p for p in all_prods if p.get('_category') == cat_name and p['id'] != product['id']][:3]
    related_html = ''
    if related:
        related_items = []
        for rp in related:
            rslug = slugify(rp['title'])
            rimg = amazon_image(rp['asin'], 400)
            rfallback = category_fallback(cat_name)
            related_items.append(f'''<a class="related" href="{rslug}.html">
        <img src="{rimg}" alt="{html.escape(rp['title'])}" onerror="this.src='../{rfallback}'" loading="lazy">
        <span>{html.escape(rp['pinterestTitle'])}</span>
      </a>''')
        related_html = f'''<section class="related-wrap"><h2>More from {html.escape(cat_name)}</h2><div class="related-grid">{''.join(related_items)}</div></section>'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{escaped_long} — Amazon Affiliate Pick</title>
  <meta name="description" content="{escaped_desc}">
  <meta property="og:title" content="{escaped_title}">
  <meta property="og:description" content="{escaped_desc}">
  <meta property="og:image" content="{product_img}">
  <meta property="og:url" content="{pin_url}">
  <meta property="og:type" content="product">
  <meta name="pinterest" content="nopin">
  <link rel="canonical" href="{pin_url}">
  <style>
    :root {{ --bg:#07070d; --surface:#0f0f1a; --surface-2:#161624; --border:#25253a; --text:#f4f4ff; --muted:#9a9ab7; --accent:#ff9900; --accent-2:#00f0ff; --radius:16px; }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; background:var(--bg); color:var(--text); font-family:Inter,Segoe UI,system-ui,sans-serif; line-height:1.55; }}
    a {{ color:var(--accent-2); text-decoration:none; }}
    header {{ background:linear-gradient(180deg,#11111c,var(--bg)); border-bottom:1px solid var(--border); padding:18px 0; position:sticky; top:0; z-index:10; }}
    .container {{ max-width:1120px; margin:0 auto; padding:0 20px; }}
    .nav {{ display:flex; align-items:center; justify-content:space-between; }}
    .logo {{ font-weight:800; font-size:1.15rem; color:var(--text); }}
    .logo span {{ color:var(--accent); }} .logo small {{ color:var(--muted); font-weight:500; font-size:.75rem; display:block; }}
    .home {{ color:var(--muted); font-size:.9rem; }} .home:hover {{ color:var(--text); }}
    main {{ padding:36px 0 60px; }}
    .breadcrumb {{ color:var(--muted); font-size:.8rem; margin-bottom:14px; }}
    .breadcrumb a {{ color:var(--muted); }} .breadcrumb a:hover {{ color:var(--text); }}
    .product {{ display:grid; grid-template-columns:1fr 1fr; gap:34px; align-items:start; }}
    .image-card {{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:18px; }}
    .image-card img {{ width:100%; border-radius:12px; display:block; }}
    .meta {{ display:flex; flex-direction:column; gap:14px; }}
    .cat-badge {{ display:inline-block; background:var(--surface-2); border:1px solid var(--border); color:var(--accent-2); padding:4px 12px; border-radius:999px; font-size:.75rem; font-weight:600; width:fit-content; }}
    h1 {{ font-size:clamp(1.6rem,3vw,2.2rem); margin:0; line-height:1.2; }}
    .price {{ color:var(--accent); font-weight:700; font-size:1.25rem; }} .price small {{ color:var(--muted); font-weight:500; font-size:.85rem; }}
    .desc {{ color:var(--muted); margin:0; font-size:1.05rem; }}
    .use-cases {{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:18px 22px; }}
    .use-cases h3 {{ margin:0 0 10px; font-size:1rem; }}
    .use-cases ul {{ margin:0; padding-left:18px; color:var(--muted); }}
    .use-cases li {{ margin-bottom:6px; }}
    .cta {{ display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }}
    .btn {{ display:inline-flex; align-items:center; gap:8px; padding:16px 28px; border-radius:12px; font-weight:800; font-size:1rem; }}
    .btn-primary {{ background:var(--accent); color:#000; }}
    .btn-secondary {{ background:var(--surface-2); color:var(--text); border:1px solid var(--border); }}
    .disclosure {{ color:var(--muted); font-size:.78rem; }}
    .related-wrap {{ margin-top:48px; }}
    .related-wrap h2 {{ font-size:1.2rem; margin-bottom:16px; }}
    .related-grid {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:18px; }}
    .related {{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:14px; display:flex; flex-direction:column; gap:10px; }}
    .related img {{ width:100%; border-radius:10px; }}
    .related span {{ color:var(--text); font-weight:600; font-size:.9rem; }}
    footer {{ border-top:1px solid var(--border); padding:30px 0; text-align:center; color:var(--muted); font-size:.85rem; }}
    @media (max-width:760px) {{ .product {{ grid-template-columns:1fr; }} .image-card {{ order:1; }} .meta {{ order:2; }} }}
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="nav">
        <div class="logo">Piero<span>'s</span> Picks <small>Curated Amazon Finds</small></div>
        <a class="home" href="index.html">← Back to all picks</a>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="breadcrumb"><a href="index.html">All picks</a> / <a href="index.html?cat={re.sub(r'[^a-zA-Z0-9]', '-', cat_name)}">{html.escape(cat_name)}</a></div>
      <div class="product">
        <div class="image-card">
          <img src="{product_img}" alt="{escaped_long}" onerror="this.src='../{fallback}'" loading="eager">
        </div>
        <div class="meta">
          <span class="cat-badge">{html.escape(cat_name)}</span>
          <h1>{escaped_title}</h1>
          <p class="desc">{escaped_desc}</p>
          <div class="price">{price} <small>· Est. commission {commission}</small></div>
          <div class="use-cases">
            <h3>Why it’s worth it</h3>
            <ul>{use_cases}</ul>
          </div>
          <div class="cta">
            <a class="btn btn-primary" href="{product['link']}" target="_blank" rel="noopener sponsored" data-amazon-link data-asin="{html.escape(product['asin'])}" data-placement="product-primary">Check Price on Amazon</a>
            <a class="btn btn-secondary" href="index.html">Browse more picks</a>
          </div>
          <p class="disclosure">{disclosure}<br>As an Amazon Associate I earn from qualifying purchases.</p>
        </div>
      </div>
      {related_html}
    </div>
  </main>
  <footer>
    <div class="container">
      <p>Affiliate links — I may earn a commission at no extra cost to you. As an Amazon Associate I earn from qualifying purchases. · <a href="../index.html">OpenClaw Setup Service</a></p>
    </div>
  </footer>
  <script src="funnel-analytics.js" defer></script>
</body>
</html>
'''

all_products = []
for cat in data['categories']:
    for prod in cat['products']:
        prod['_category'] = cat['name']
        all_products.append(prod)
        slug = slugify(prod['title'])
        page = build_pin_page(prod, cat['name'], all_products)
        path = os.path.join(OUT, f"{slug}.html")
        with open(path, 'w', encoding='utf-8') as f:
            f.write(page)

# Index gallery
cat_names = [c['name'] for c in data['categories']]
chips = ''.join(f'<button class="chip" data-cat="{re.sub(r"[^a-zA-Z0-9]", "-", c)}">{html.escape(c)}</button>' for c in cat_names)
items = []
for p in all_products:
    slug = slugify(p['title'])
    img = amazon_image(p['asin'], 600)
    fallback = category_fallback(p['_category'])
    cat_slug = re.sub(r'[^a-zA-Z0-9]', '-', p['_category'])
    items.append(f'''
    <article class="card" data-category="{cat_slug}">
      <div class="thumb"><img src="{img}" alt="{html.escape(p['title'])}" onerror="this.src='../{fallback}'" loading="lazy"></div>
      <div class="card-body">
        <span class="badge">{html.escape(p['_category'])}</span>
        <h3>{html.escape(p['pinterestTitle'])}</h3>
        <p>{html.escape(p['pinterestDescription'])}</p>
        <div class="card-price">{html.escape(p.get('priceRange',''))}</div>
        <div class="card-actions">
          <a class="btn btn-sm btn-primary" href="{p['link']}" target="_blank" rel="noopener sponsored" data-amazon-link data-asin="{html.escape(p['asin'])}" data-placement="storefront-card">Shop Amazon</a>
          <a class="btn btn-sm btn-secondary" href="{slug}.html">View Pin →</a>
        </div>
      </div>
    </article>
    ''')

index = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Piero's Picks — Curated Amazon Affiliate Storefront</title>
  <meta name="description" content="Curated Amazon affiliate picks for creators, home offices, smart homes, kitchen, health, beauty, fitness, pets, and everyday life.">
  <meta property="og:title" content="Piero's Picks — Curated Amazon Affiliate Storefront">
  <meta property="og:description" content="Hand-picked Amazon products I actually recommend, with direct links and honest use cases.">
  <meta property="og:url" content="https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://porfirio-piero.github.io/openclaw-setup-service/amazon-pins/">
  <style>
    :root {{ --bg:#07070d; --surface:#0f0f1a; --surface-2:#161624; --border:#25253a; --text:#f4f4ff; --muted:#9a9ab7; --accent:#ff9900; --accent-2:#00f0ff; --radius:18px; }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; background:var(--bg); color:var(--text); font-family:Inter,Segoe UI,system-ui,sans-serif; line-height:1.55; }}
    a {{ color:var(--accent-2); text-decoration:none; }}
    header {{ background:linear-gradient(135deg,#11111c 0%,#07070d 100%); border-bottom:1px solid var(--border); padding:28px 0 32px; }}
    .container {{ max-width:1160px; margin:0 auto; padding:0 20px; }}
    .nav {{ display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }}
    .logo {{ font-weight:800; font-size:1.3rem; color:var(--text); letter-spacing:-0.3px; }}
    .logo span {{ color:var(--accent); }} .logo small {{ color:var(--muted); font-weight:500; font-size:.78rem; display:block; letter-spacing:0; }}
    .home {{ color:var(--muted); font-size:.88rem; }} .home:hover {{ color:var(--text); }}
    .hero {{ text-align:center; max-width:700px; margin:0 auto; }}
    .hero h1 {{ font-size:clamp(2rem,5vw,3.2rem); margin:0 0 12px; line-height:1.1; }}
    .hero p {{ color:var(--muted); font-size:clamp(1rem,2vw,1.2rem); margin:0 0 22px; }}
    .stats {{ display:flex; justify-content:center; gap:28px; flex-wrap:wrap; }}
    .stat {{ background:var(--surface); border:1px solid var(--border); border-radius:999px; padding:8px 18px; font-size:.85rem; color:var(--muted); }}
    .stat strong {{ color:var(--text); }}
    .controls {{ background:var(--surface); border-bottom:1px solid var(--border); padding:18px 0; position:sticky; top:0; z-index:10; }}
    .control-row {{ display:flex; gap:12px; align-items:center; flex-wrap:wrap; }}
    input.search {{ flex:1; min-width:220px; background:var(--surface-2); border:1px solid var(--border); color:var(--text); padding:10px 16px; border-radius:999px; font-size:.9rem; outline:none; }}
    input.search::placeholder {{ color:var(--muted); }}
    .chips {{ display:flex; gap:8px; flex-wrap:wrap; }}
    .chip {{ background:var(--surface-2); border:1px solid var(--border); color:var(--muted); padding:8px 14px; border-radius:999px; cursor:pointer; font-size:.85rem; font-weight:600; }}
    .chip:hover,.chip.active {{ background:var(--accent); color:#000; border-color:var(--accent); }}
    .grid {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(290px,1fr)); gap:24px; padding:40px 0 60px; }}
    .card {{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; display:flex; flex-direction:column; transition:transform .15s,border-color .15s; }}
    .card:hover {{ transform:translateY(-4px); border-color:#3f3f5f; }}
    .thumb {{ aspect-ratio:1/1; background:var(--surface-2); display:flex; align-items:center; justify-content:center; padding:14px; }}
    .thumb img {{ max-width:100%; max-height:100%; object-fit:contain; mix-blend-mode:normal; }}
    .card-body {{ padding:18px; display:flex; flex-direction:column; gap:10px; flex:1; }}
    .badge {{ display:inline-block; background:var(--surface-2); border:1px solid var(--border); color:var(--accent-2); padding:3px 10px; border-radius:999px; font-size:.7rem; font-weight:700; width:fit-content; }}
    .card h3 {{ font-size:1.1rem; margin:0; line-height:1.25; }}
    .card p {{ color:var(--muted); margin:0; font-size:.9rem; }}
    .card-price {{ color:var(--accent); font-weight:700; font-size:.95rem; }}
    .card-actions {{ display:flex; gap:10px; margin-top:auto; }}
    .btn {{ display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius:10px; font-weight:700; font-size:.85rem; }}
    .btn-primary {{ background:var(--accent); color:#000; }}
    .btn-secondary {{ background:var(--surface-2); color:var(--text); border:1px solid var(--border); }}
    .empty {{ text-align:center; color:var(--muted); padding:60px 0; }}
    footer {{ border-top:1px solid var(--border); padding:30px 0; text-align:center; color:var(--muted); font-size:.85rem; }}
    @media (max-width:640px) {{ .control-row {{ flex-direction:column; align-items:stretch; }} .chips {{ justify-content:center; }} .nav {{ flex-direction:column; gap:10px; text-align:center; }} }}
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="nav">
        <div class="logo">Piero<span>'s</span> Picks <small>Curated Amazon Finds That Actually Work</small></div>
        <a class="home" href="../index.html">← OpenClaw Setup Service</a>
      </div>
      <div class="hero">
        <h1>Amazon Picks Worth Your Money</h1>
        <p>Hand-picked products for creators, home offices, smart homes, kitchen, health, beauty, fitness, pets, and everyday life.</p>
        <div class="stats">
          <span class="stat"><strong>{len(all_products)}</strong> products</span>
          <span class="stat"><strong>{len(data['categories'])}</strong> categories</span>
          <span class="stat">Updated {os.environ.get('BUILD_DATE','regularly')}</span>
        </div>
      </div>
    </div>
  </header>
  <div class="controls">
    <div class="container">
      <div class="control-row">
        <input class="search" id="search" placeholder="Search products, categories, use cases...">
        <div class="chips">
          <button class="chip active" data-cat="all">All</button>
          {chips}
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="grid" id="grid">
      {''.join(items)}
    </div>
    <div class="empty" id="empty" style="display:none">No products match your search. Try another keyword or category.</div>
  </div>
  <footer>
    <div class="container">
      <p>Affiliate links — I may earn a commission at no extra cost to you. As an Amazon Associate I earn from qualifying purchases. · <a href="../index.html">OpenClaw Setup Service</a></p>
    </div>
  </footer>
  <script>
    const search = document.getElementById('search');
    const grid = document.getElementById('grid');
    const empty = document.getElementById('empty');
    const chips = document.querySelectorAll('.chip');
    let activeCat = 'all';
    const cards = Array.from(document.querySelectorAll('.card'));
    function filter() {{
      const q = search.value.toLowerCase();
      let visible = 0;
      cards.forEach(c => {{
        const cat = c.dataset.category;
        const text = c.textContent.toLowerCase();
        const show = (activeCat === 'all' || cat === activeCat) && text.includes(q);
        c.style.display = show ? '' : 'none';
        if (show) visible++;
      }});
      grid.style.display = visible ? 'grid' : 'none';
      empty.style.display = visible ? 'none' : 'block';
    }}
    search.addEventListener('input', filter);
    chips.forEach(btn => btn.addEventListener('click', () => {{
      chips.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat === 'all' ? 'all' : btn.dataset.cat;
      filter();
    }}));
    // Deep-link category from URL
    const params = new URLSearchParams(location.search);
    const catParam = params.get('cat');
    if (catParam) {{
      const target = Array.from(chips).find(b => b.dataset.cat === catParam);
      if (target) target.click();
    }}
  </script>
  <script src="funnel-analytics.js" defer></script>
</body>
</html>
'''

with open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(index)

print(f"Generated {len(all_products)} pin pages in {OUT}")
