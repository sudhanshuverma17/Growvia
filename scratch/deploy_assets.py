import base64
import shutil
from pathlib import Path

img_files = ['honesvia-icon.png', 'honesvia-logo.png', 'honesvia-text.png', 'honesvia-logo-horizontal.png']
dest_dirs = [
    Path('frontend/public/images'),
    Path('public/images')
]

for d in dest_dirs:
    d.mkdir(parents=True, exist_ok=True)
    for f in img_files:
        src = Path('scratch') / f
        dst = d / f
        shutil.copy2(src, dst)
        print(f'Copied {f} to {dst}')

fav_dirs = [
    Path('frontend/public'),
    Path('public')
]

with open('scratch/favicon.png', 'rb') as f:
    b64_fav = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,{b64_fav}" width="128" height="128" />
</svg>
'''

for d in fav_dirs:
    shutil.copy2('scratch/favicon.png', d / 'favicon.png')
    shutil.copy2('scratch/favicon.ico', d / 'favicon.ico')
    with open(d / 'favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Updated favicons in {d}')

print('All assets deployed successfully!')
