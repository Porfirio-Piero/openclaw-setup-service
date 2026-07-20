import json, os

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.json')
MD_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.md')

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

lines = [
    "# Amazon Affiliate Link Database\n",
    f"**Store ID:** `{data['storeId']}`  ",
    f"**Tag:** `{data['storeId']}`  ",
    f"**Strategy:** {data['strategy']['postingCadence']} on Pinterest boards: {', '.join(data['strategy']['boards'])}.  ",
    f"**Disclosure:** {data['strategy']['disclosure']}\n",
    "---\n",
]
for cat in data['categories']:
    lines.append(f"## {cat['name']}\n")
    lines.append(f"{cat['description']}\n")
    for p in cat['products']:
        lines.append(f"### {p['title']}")
        lines.append(f"- **ASIN:** {p['asin']}")
        lines.append(f"- **Affiliate link:** {p['link']}")
        lines.append(f"- **Price range:** {p['priceRange']} · **Commission:** {p['commission']}")
        lines.append(f"- **Use cases:** {', '.join(p['useCases'])}")
        lines.append(f"- **Pinterest title:** {p['pinterestTitle']}")
        lines.append(f"- **Pinterest description:** {p['pinterestDescription']}\n")

with open(MD_PATH, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Regenerated {MD_PATH} with {sum(len(c['products']) for c in data['categories'])} products across {len(data['categories'])} categories.")
