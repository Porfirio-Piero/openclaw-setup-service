import re, json, sys

html = open(sys.argv[1], 'r', encoding='utf-8').read()
# data-asin attributes
asins = re.findall(r'data-asin="([A-Z0-9]{10})"', html)
# also /dp/ASIN patterns
dp_asins = re.findall(r'/dp/([A-Z0-9]{10})', html)
all_asins = list(dict.fromkeys(asins + dp_asins))
print(f"data-asin: {len(asins)}, /dp/: {len(dp_asins)}, unique: {len(all_asins)}")
print(all_asins[:30])
