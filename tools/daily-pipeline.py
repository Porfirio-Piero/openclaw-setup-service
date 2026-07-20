"""Daily Amazon affiliate pipeline.

Picks up to 25 unadded candidate products, validates their Amazon product images,
adds them to the catalog, regenerates pin pages, commits and pushes.

Usage:
    uv run python tools/daily-pipeline.py [--max 25] [--commit] [--push]
"""
import argparse, json, os, re, subprocess, sys, time, urllib.request, urllib.error

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.json')
CANDIDATES_PATH = os.path.join(HERE, 'AMAZON-CANDIDATES.json')
LOG_PATH = os.path.join(HERE, 'DAILY-PIPELINE-LOG.json')
GEN_SCRIPT = os.path.join(HERE, 'generate-amazon-pin-pages.py')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
}

def make_link(asin):
    return f"https://www.amazon.com/dp/{asin}?tag=porfirioinc-20&linkCode=ll2&language=en_US&ref_=as_li_ss_tl"

def validate_image(asin):
    url = f"https://m.media-amazon.com/images/P/{asin}.01._SCLZZZZZZZ_SL400_.jpg"
    req = urllib.request.Request(url, method='HEAD', headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception:
        return False

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

def run(cmd, cwd=HERE):
    return subprocess.run(cmd, cwd=cwd, shell=True, capture_output=True, text=True)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--max', type=int, default=25)
    parser.add_argument('--commit', action='store_true', help='git commit changes')
    parser.add_argument('--push', action='store_true', help='git push after commit')
    args = parser.parse_args()

    data = load_json(JSON_PATH)
    candidates = load_json(CANDIDATES_PATH)
    log = load_json(LOG_PATH) if os.path.exists(LOG_PATH) else []

    existing_asins = {p['asin'] for cat in data['categories'] for p in cat['products']}
    existing_ids = {p['id'] for cat in data['categories'] for p in cat['products']}

    added = []
    skipped = []
    for c in candidates:
        if len(added) >= args.max:
            break
        if c['asin'] in existing_asins or c['id'] in existing_ids:
            skipped.append({'reason': 'already_in_catalog', 'candidate': c})
            continue
        if not validate_image(c['asin']):
            skipped.append({'reason': 'image_unavailable', 'candidate': c})
            continue
        # Add to catalog under right category
        cat_name = c['category']
        cat = next((x for x in data['categories'] if x['name'] == cat_name), None)
        if cat is None:
            cat = {"name": cat_name, "description": f"Curated {cat_name} picks.", "products": []}
            data['categories'].append(cat)
        prod = dict(c)
        prod['link'] = make_link(c['asin'])
        prod.pop('source', None)
        cat['products'].append(prod)
        existing_asins.add(c['asin'])
        existing_ids.add(c['id'])
        added.append(prod)

    if not added:
        print("No new products to add today.")
        return

    save_json(JSON_PATH, data)
    print(f"Added {len(added)} products to {JSON_PATH}")

    # Regenerate pages
    print("Regenerating pin pages...")
    res = run(f'uv run python "{GEN_SCRIPT}"')
    print(res.stdout)
    if res.returncode != 0:
        print(res.stderr)
        sys.exit(1)

    # Update strategy boards if new categories appeared
    current_boards = set(data.get('strategy', {}).get('boards', []))
    for cat in data['categories']:
        if cat['name'] not in current_boards:
            data['strategy']['boards'].append(cat['name'])
    save_json(JSON_PATH, data)

    # Write log
    log.append({
        "date": time.strftime('%Y-%m-%dT%H:%M:%S'),
        "added": [{"title": a['title'], "asin": a['asin'], "category": a['category']} for a in added],
        "skipped_count": len(skipped),
        "added_count": len(added),
    })
    save_json(LOG_PATH, log)

    # Commit and push
    if args.commit:
        run('git add AMAZON-AFFILIATES.json AMAZON-AFFILIATES.md amazon-pins/ DAILY-PIPELINE-LOG.json')
        run(f'git commit -m "Daily pipeline: add {len(added)} affiliate products ({time.strftime("%Y-%m-%d")})"')
        if args.push:
            push_res = run('git push origin main')
            print(push_res.stdout)
            if push_res.returncode != 0:
                print(push_res.stderr)

    print(f"\nDone. Added {len(added)} products.")
    for a in added[:5]:
        print(f"  - {a['title']} ({a['asin']})")

if __name__ == '__main__':
    main()
