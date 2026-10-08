import base64
import shutil
from pathlib import Path
from PIL import Image

# 1. Save white mark as honesvia-icon.png
mark = Image.open('scratch/white_mark.png')
mark.save('scratch/honesvia-icon.png')

# 2. Save white full as honesvia-logo.png
full = Image.open('scratch/white_full.png')
full.save('scratch/honesvia-logo.png')

# 3. Create white text: crop text from white full
# Y in white_full: [405..460], X: [0..595]
text_crop = full.crop((0, 400, full.width, full.height))
text_crop.save('scratch/honesvia-text.png')

# 4. Horizontal lockup
mh = 140
mw = int(mark.width * (mh / mark.height))
mark_scaled = mark.resize((mw, mh), Image.Resampling.LANCZOS)

th = 36
tw = int(text_crop.width * (th / text_crop.height))
text_scaled = text_crop.resize((tw, th), Image.Resampling.LANCZOS)

gap = 32
hl_w = mw + gap + tw
hl_h = max(mh, th) + 20
h_logo = Image.new('RGBA', (hl_w, hl_h), (0, 0, 0, 0))
h_logo.paste(mark_scaled, (0, (hl_h - mh) // 2), mark_scaled)
h_logo.paste(text_scaled, (mw + gap, (hl_h - th) // 2), text_scaled)
h_logo.save('scratch/honesvia-logo-horizontal.png')

# 5. Favicon
fav = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
fm_h = 112
fm_w = int(mark.width * (fm_h / mark.height))
fav_mark = mark.resize((fm_w, fm_h), Image.Resampling.LANCZOS)
fav.paste(fav_mark, ((128 - fm_w) // 2, (128 - fm_h) // 2), fav_mark)
fav.save('scratch/favicon.png')
fav.save('scratch/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128)])

with open('scratch/favicon.png', 'rb') as f:
    b64_fav = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,{b64_fav}" width="128" height="128" />
</svg>
'''
with open('scratch/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

# Copy to destinations:
dest_dirs = [
    Path('frontend/public'),
    Path('backend/public'),
    Path('public')
]

img_files = ['honesvia-icon.png', 'honesvia-logo.png', 'honesvia-text.png', 'honesvia-logo-horizontal.png']

for d in dest_dirs:
    img_dir = d / 'images'
    img_dir.mkdir(parents=True, exist_ok=True)
    for f in img_files:
        shutil.copy2(Path('scratch') / f, img_dir / f)
    shutil.copy2('scratch/favicon.png', d / 'favicon.png')
    shutil.copy2('scratch/favicon.ico', d / 'favicon.ico')
    shutil.copy2('scratch/favicon.svg', d / 'favicon.svg')

print('All white & silver assets deployed to all public directories!')
