import json, os, re, html

HERE = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.json')
MD_PATH = os.path.join(HERE, 'AMAZON-AFFILIATES.md')

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

def make_link(asin):
    return f"https://www.amazon.com/dp/{asin}?tag=porfirioinc-20&linkCode=ll2&language=en_US&ref_=as_li_ss_tl"

def slugify(title):
    s = re.sub(r'[^\w\s-]', '', title).strip().lower()
    s = re.sub(r'[-\s]+', '-', s)
    return s[:60]

NEW_CATEGORIES = [
    {
        "name": "Home & Kitchen",
        "description": "High-volume everyday appliances and tools people replace or upgrade constantly.",
        "products": [
            {"id": "cosori-air-fryer", "title": "Cosori 9-in-1 TurboBlaze Air Fryer 6 Qt", "asin": "B0DY1C8J81", "priceRange": "$90–$120", "commission": "~3%", "useCases": ["Healthier weeknight dinners", "Meal prep in minutes", "Replace deep frying"], "pinterestTitle": "Air Fryer That Cooks Almost Everything", "pinterestDescription": "Cosori 9-in-1 TurboBlaze: air fry, roast, bake, broil, dehydrate. The weeknight dinner game-changer. #airfryer #kitchen"},
            {"id": "instant-pot-duo", "title": "Instant Pot Duo 7-in-1 Electric Pressure Cooker", "asin": "B00FLYWNYQ", "priceRange": "$80–$110", "commission": "~3%", "useCases": ["One-pot family meals", "Slow cook, sauté, steam, yogurt", "Meal prep Sundays"], "pinterestTitle": "The 7-in-1 Pressure Cooker Busy Families Swear By", "pinterestDescription": "Instant Pot Duo replaces 7 appliances. Fast, easy, family-sized meals. #instantpot #mealprep"},
            {"id": "ninja-blender", "title": "Ninja Nutri-Plus Personal Blender", "asin": "B08QZWDLP4", "priceRange": "$70–$90", "commission": "~3%", "useCases": ["Morning smoothies", "Protein shakes", "Quick sauces"], "pinterestTitle": "Personal Blender for Smoothies on the Go", "pinterestDescription": "Ninja Nutri-Plus: compact, powerful, perfect for smoothies and shakes every morning. #smoothie #blender"},
            {"id": "brita-pitcher", "title": "Brita Large 10 Cup Water Filter Pitcher", "asin": "B01GILSGTQ", "priceRange": "$25–$35", "commission": "~3%", "useCases": ["Cleaner tap water", "Reduce bottled water", "Replace filters monthly"], "pinterestTitle": "Water Filter Pitcher Every Fridge Needs", "pinterestDescription": "Brita 10-cup pitcher: better taste, less plastic, easy refills. #hydration #kitchen"},
            {"id": "keurig-coffee", "title": "Keurig K-Classic Coffee Maker", "asin": "B071S96C3J", "priceRange": "$80–$110", "commission": "~3%", "useCases": ["Single-serve morning coffee", "K-Cup convenience", "Guest-friendly"], "pinterestTitle": "Single-Serve Coffee Maker for Busy Mornings", "pinterestDescription": "Keurig K-Classic: fast, simple, perfect cup every morning. #coffee #morning"},
        ]
    },
    {
        "name": "Health & Personal Care",
        "description": "Daily-use health and hygiene essentials with strong repeat purchase behavior.",
        "products": [
            {"id": "oral-b-toothbrush", "title": "Oral-B Pro 1000 Rechargeable Electric Toothbrush", "asin": "B003UKM9CO", "priceRange": "$35–$50", "commission": "~3%", "useCases": ["Better dental checkups", "Built-in timer", "Replace brush heads monthly"], "pinterestTitle": "Electric Toothbrush Dentists Recommend", "pinterestDescription": "Oral-B Pro 1000: pressure sensor, timer, superior clean. #health #smile"},
            {"id": "philips-sonicare", "title": "Philips Sonicare ProtectiveClean 4100", "asin": "B078GVMVRH", "priceRange": "$45–$65", "commission": "~3%", "useCases": ["Gentle yet powerful clean", "Pressure sensor", "Long battery life"], "pinterestTitle": "Sonic Toothbrush for a Healthier Smile", "pinterestDescription": "Philips Sonicare 4100: sonic cleaning, pressure sensor, and easy brush-head swaps. #oralcare"},
            {"id": "waterpik-flosser", "title": "Waterpik Aquarius Water Flosser", "asin": "B00HFQQ0VU", "priceRange": "$55–$75", "commission": "~3%", "useCases": ["Floss without string", "Gum health", "Braces-friendly"], "pinterestTitle": "Water Flosser for Easier Dental Care", "pinterestDescription": "Waterpik Aquarius: deep clean between teeth with water, no string needed. #dental #health"},
            {"id": "thermometer", "title": "iHealth No-Touch Forehead Thermometer", "asin": "B0777L1ZXC", "priceRange": "$20–$30", "commission": "~3%", "useCases": ["Quick family health checks", "Non-invasive for kids", "Travel-ready"], "pinterestTitle": "No-Touch Thermometer for the Whole Family", "pinterestDescription": "iHealth forehead thermometer: fast, hygienic, easy readings for kids and adults. #family #health"},
        ]
    },
    {
        "name": "Cleaning & Organization",
        "description": "Practical cleaning gear and storage that households buy repeatedly.",
        "products": [
            {"id": "dyson-vacuum", "title": "Dyson V8 Cordless Vacuum Cleaner", "asin": "B09YS9N7N2", "priceRange": "$350–$450", "commission": "~3%", "useCases": ["Cordless whole-home cleaning", "Pet hair pickup", "Quick daily sweeps"], "pinterestTitle": "Cordless Vacuum That Actually Picks Up Pet Hair", "pinterestDescription": "Dyson V8: powerful suction, cordless freedom, pet-hair-ready. #cleaning #pets"},
            {"id": "shark-vacuum", "title": "Shark Navigator Lift-Away Upright Vacuum", "asin": "B075TGM5W9", "priceRange": "$180–$230", "commission": "~3%", "useCases": ["Lift-away portable cleaning", "Allergen sealed", "Carpets and hard floors"], "pinterestTitle": "Upright Vacuum That Converts to a Canister", "pinterestDescription": "Shark Navigator Lift-Away: deep clean carpets, hard floors, stairs, and furniture. #vacuum"},
            {"id": "robot-vacuum", "title": "iRobot Roomba 694 Robot Vacuum", "asin": "B08R9LPTJZ", "priceRange": "$200–$280", "commission": "~3%", "useCases": ["Scheduled daily cleaning", "Pet hair", "Wi-Fi voice control"], "pinterestTitle": "Robot Vacuum That Cleans While You Live", "pinterestDescription": "Roomba 694: schedule cleanings, control with voice, pick up daily dust and pet hair. #smarthome"},
            {"id": "oxo-containers", "title": "OXO Good Grips POP Container Set", "asin": "B06Y23Z1JB", "priceRange": "$40–$60", "commission": "~3%", "useCases": ["Airtight pantry storage", "Keep dry goods fresh", "Modular stackable"], "pinterestTitle": "Airtight Pantry Containers That Keep Food Fresh", "pinterestDescription": "OXO POP containers: stackable, airtight, and perfect for an organized pantry. #organization"},
            {"id": "mr-clean-magic-eraser", "title": "Mr. Clean Magic Eraser Original Cleaning Pads", "asin": "B00L51AKVK", "priceRange": "$10–$15", "commission": "~3%", "useCases": ["Scuff marks on walls", "Sink and tub scum", "Everyday spot cleaning"], "pinterestTitle": "Magic Erasers That Clean What Sprays Can't", "pinterestDescription": "Mr. Clean Magic Eraser: scuffs, grime, and mystery marks disappear fast. #cleaning"},
        ]
    },
    {
        "name": "Electronics & Accessories",
        "description": "High-volume tech accessories people replace, upgrade, and gift year-round.",
        "products": [
            {"id": "anker-charger", "title": "Anker USB-C Charger 20W", "asin": "B0916GKG1W", "priceRange": "$12–$18", "commission": "~3%", "useCases": ["Fast phone charging", "Compact travel charger", "Replace lost adapters"], "pinterestTitle": "Tiny Fast Charger Every Bag Needs", "pinterestDescription": "Anker 20W USB-C charger: fast, compact, reliable for iPhone and Android. #tech #travel"},
            {"id": "airpods-pro", "title": "Apple AirPods Pro (2nd Gen)", "asin": "B0CHWNM1Z7", "priceRange": "$180–$230", "commission": "~3%", "useCases": ["Noise cancellation", "Commute and workouts", "Apple ecosystem"], "pinterestTitle": "Noise-Canceling Earbuds for Daily Life", "pinterestDescription": "AirPods Pro 2: active noise cancellation, transparency mode, all-day comfort. #airpods"},
            {"id": "anker-cable", "title": "Anker USB-C to Lightning Cable 6ft", "asin": "B08KWR7FSR", "priceRange": "$12–$18", "commission": "~3%", "useCases": ["Durable charging cable", "Long reach bedside/desk", "MFi certified"], "pinterestTitle": "Long Durable Charging Cable That Lasts", "pinterestDescription": "Anker 6ft USB-C to Lightning: MFi certified, nylon braided, fast charging. #cable #iphone"},
            {"id": "portable-charger", "title": "Anker Portable Charger PowerCore 10000", "asin": "B0194WDVHI", "priceRange": "$20–$30", "commission": "~3%", "useCases": ["Backup power on the go", "Travel essential", "Emergency battery"], "pinterestTitle": "Pocket-Sized Power Bank for Daily Carry", "pinterestDescription": "Anker PowerCore 10000: slim, reliable, charges your phone multiple times. #powerbank #travel"},
            {"id": "fire-tv-stick", "title": "Amazon Fire TV Stick 4K", "asin": "B08XVYZ1YJ", "priceRange": "$30–$50", "commission": "~3%", "useCases": ["Stream Netflix/Prime/YouTube", "Turn any TV smart", "Voice remote"], "pinterestTitle": "Turn Any TV Into a Smart Streaming Hub", "pinterestDescription": "Fire TV Stick 4K: stream everything in 4K with Alexa voice remote. #streaming #tv"},
        ]
    },
    {
        "name": "Baby & Pet Essentials",
        "description": "Recurring-buy categories: diapers, pet food, wipes, training pads, and cleanup.",
        "products": [
            {"id": "huggies-diapers", "title": "Huggies Little Snugglers Diapers (Size 1, 198ct)", "asin": "B00M8UD9VS", "priceRange": "$45–$55", "commission": "~1–3%", "useCases": ["Newborn daily essential", "Gentle on skin", "Bulk savings"], "pinterestTitle": "Diaper Stock-Up for New Parents", "pinterestDescription": "Huggies Little Snugglers: soft, reliable, and a must-have for any diaper bag. #baby #newparent"},
            {"id": "dog-food-storage", "title": "IRIS USA Airtight Dog Food Storage Container", "asin": "B00186RTWW", "priceRange": "$20–$30", "commission": "~3%", "useCases": ["Keep kibble fresh", "Pest-proof pantry bin", "Easy pour spout"], "pinterestTitle": "Airtight Pet Food Container Every Owner Needs", "pinterestDescription": "IRIS USA pet food bin: airtight, wheels, keeps dog/cat food fresh. #pets #organization"},
            {"id": "puppy-pads", "title": "Amazon Basics Dog and Puppy Pee Pads", "asin": "B00MW8G62E", "priceRange": "$20–$30", "commission": "~3%", "useCases": ["House training", "Senior dog accidents", "Travel and crates"], "pinterestTitle": "Pee Pads That Make House Training Easier", "pinterestDescription": "Amazon Basics puppy pads: absorbent, leak-proof, essential for training. #puppy #dogtraining"},
            {"id": "pet-hair-remover", "title": "ChomChom Roller Pet Hair Remover", "asin": "B00BAGTNAQ", "priceRange": "$25–$35", "commission": "~3%", "useCases": ["Remove fur from furniture", "Reusable lint roller", "No sticky sheets"], "pinterestTitle": "Reusable Pet Hair Remover for Furniture", "pinterestDescription": "ChomChom Roller: picks up pet hair from couches, beds, clothes—no refills needed. #pets #cleaning"},
        ]
    },
    {
        "name": "Beauty & Personal Grooming",
        "description": "High-margin beauty tools and daily-care items with strong Pinterest appeal.",
        "products": [
            {"id": "hair-dryer", "title": "Revlon One-Step Hair Dryer and Volumizer", "asin": "B01LSUQSB0", "priceRange": "$30–$45", "commission": "~3%", "useCases": ["Blow-dry and style in one", "Reduce frizz", "Save morning time"], "pinterestTitle": "Hair Dryer Brush That Cuts Styling Time in Half", "pinterestDescription": "Revlon One-Step: dry, smooth, and volumize in one pass. #hair #beauty"},
            {"id": "makeup-remover", "title": "Neutrogena Makeup Remover Cleansing Face Wipes", "asin": "B00UYY2GS8", "priceRange": "$8–$12", "commission": "~3%", "useCases": ["Nightly makeup removal", "Gentle on skin", "Travel packs"], "pinterestTitle": "Face Wipes That Remove Makeup in Seconds", "pinterestDescription": "Neutrogena makeup remover wipes: gentle, effective, perfect for nightly routine. #skincare"},
            {"id": "nail-dryer", "title": "SUNUV UV LED Nail Lamp", "asin": "B00W8IEJ94", "priceRange": "$25–$40", "commission": "~3%", "useCases": ["At-home gel manicures", "Fast curing", "Salon savings"], "pinterestTitle": "Nail Lamp for Salon-Quality Gel Manicures at Home", "pinterestDescription": "SUNUV nail lamp: cures gel polish fast, saves salon trips. #nails #beauty"},
            {"id": "tweezerman", "title": "Tweezerman Slant Tweezer", "asin": "B000H88LHW", "priceRange": "$15–$20", "commission": "~3%", "useCases": ["Precise brow shaping", "Daily grooming", "Long-lasting tips"], "pinterestTitle": "The Tweezer That Lasts for Years", "pinterestDescription": "Tweezerman slant tweezer: precision, durability, brow staple. #brows #beauty"},
        ]
    },
    {
        "name": "Fitness & Outdoor",
        "description": "Everyday fitness gear and outdoor tools with repeat purchase and seasonal demand.",
        "products": [
            {"id": "yoga-mat", "title": "Amazon Basics Extra Thick Exercise Yoga Mat", "asin": "B01LP0V4JY", "priceRange": "$20–$30", "commission": "~3%", "useCases": ["Home workouts", "Yoga and stretching", "Joint cushioning"], "pinterestTitle": "Thick Yoga Mat for Home Workouts", "pinterestDescription": "Amazon Basics yoga mat: extra thick, non-slip, perfect for daily stretching. #fitness #yoga"},
            {"id": "resistance-bands", "title": "Fit Simplify Resistance Loop Exercise Bands", "asin": "B01AVDVHTI", "priceRange": "$10–$15", "commission": "~3%", "useCases": ["Strength training at home", "Physical therapy", "Travel workouts"], "pinterestTitle": "Resistance Bands for Workouts Anywhere", "pinterestDescription": "Fit Simplify bands: lightweight, versatile, full-body workouts at home or on the road. #fitness"},
            {"id": "foam-roller", "title": "TriggerPoint GRID Foam Roller", "asin": "B0040EGNSS", "priceRange": "$30–$45", "commission": "~3%", "useCases": ["Muscle recovery", "Back and leg relief", "Pre/post workout"], "pinterestTitle": "Foam Roller for Muscle Recovery", "pinterestDescription": "TriggerPoint GRID: textured, durable, relieves sore muscles. #recovery #fitness"},
            {"id": "grill-tools", "title": "Cuisinart Deluxe Grill Set 20-Piece", "asin": "B00004RDFP", "priceRange": "$25–$35", "commission": "~3%", "useCases": ["Grilling season essential", "BBQ parties", "Complete tool set"], "pinterestTitle": "Grill Tool Set for BBQ Season", "pinterestDescription": "Cuisinart 20-piece grill set: spatulas, tongs, brushes—everything for summer BBQ. #grilling #summer"},
        ]
    },
]

existing_ids = {p['id'] for cat in data['categories'] for p in cat['products']}
added = 0
for cat in NEW_CATEGORIES:
    existing = next((c for c in data['categories'] if c['name'] == cat['name']), None)
    if existing is None:
        existing = {"name": cat['name'], "description": cat['description'], "products": []}
        data['categories'].append(existing)
    for prod in cat['products']:
        if prod['id'] not in existing_ids:
            prod['link'] = make_link(prod['asin'])
            existing['products'].append(prod)
            existing_ids.add(prod['id'])
            added += 1

with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Regenerate Markdown
def build_md(data):
    lines = ["# Amazon Affiliate Link Database\n", f"**Store ID:** `{data['storeId']}`  ",
             f"**Tag:** `{data['storeId']}`  ", f"**Strategy:** {data['strategy']['postingCadence']} on Pinterest boards: {', '.join(data['strategy']['boards'])}.  ",
             f"**Disclosure:** {data['strategy']['disclosure']}\n", "---\n"]
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
    return "\n".join(lines)

with open(MD_PATH, 'w', encoding='utf-8') as f:
    f.write(build_md(data))

print(f"Added {added} new products. Total categories: {len(data['categories'])}. Total products: {sum(len(c['products']) for c in data['categories'])}")
