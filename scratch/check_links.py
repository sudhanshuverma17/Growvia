import os, re
matches = []
for root, dirs, files in os.walk('frontend/src'):
    for fl in files:
        if fl.endswith(('.jsx', '.js')):
            p = os.path.join(root, fl)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
                m = re.findall(r'href=["\']([^"\']+)["\']', c)
                for h in m:
                    if 'roadmap' in h or 'pricing' in h:
                        matches.append((fl, h))
print('Unique links:')
for item in set(matches):
    print(item)
