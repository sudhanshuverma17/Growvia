import os
import base64
from pathlib import Path
from PIL import Image, ImageDraw

def generate_all_icons():
    # Source mark from navbar
    source_path = Path('frontend/public/images/honesvia-icon.png')
    if not source_path.exists():
        raise FileNotFoundError(f"Source mark not found at {source_path}")
    
    mark = Image.open(source_path).convert('RGBA')
    bbox = mark.getbbox()
    mark_trimmed = mark.crop(bbox)

    def create_branded_tile(size, radius_ratio=0.22, mark_ratio=0.70, border=True):
        tile = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(tile)
        radius = int(size * radius_ratio)
        
        # Sleek dark luxury background matching brand #0A0A0F
        bg_color = (10, 10, 15, 255)
        outline_color = (255, 255, 255, 32) if border else None
        border_width = max(1, int(size * 0.018))
        
        draw.rounded_rectangle(
            [0, 0, size - 1, size - 1],
            radius=radius,
            fill=bg_color,
            outline=outline_color,
            width=border_width
        )
        
        # Scale mark smoothly
        target_h = int(size * mark_ratio)
        target_w = int(mark_trimmed.width * (target_h / mark_trimmed.height))
        mark_scaled = mark_trimmed.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        paste_x = (size - target_w) // 2
        paste_y = (size - target_h) // 2
        tile.paste(mark_scaled, (paste_x, paste_y), mark_scaled)
        return tile

    # Generate distinct sizes
    tile_512 = create_branded_tile(512, radius_ratio=0.22, mark_ratio=0.70)
    tile_192 = create_branded_tile(192, radius_ratio=0.22, mark_ratio=0.70)
    tile_180 = create_branded_tile(180, radius_ratio=0.22, mark_ratio=0.70)
    tile_150 = create_branded_tile(150, radius_ratio=0.22, mark_ratio=0.70)
    tile_128 = create_branded_tile(128, radius_ratio=0.22, mark_ratio=0.70)
    tile_64 = create_branded_tile(64, radius_ratio=0.22, mark_ratio=0.72)
    tile_48 = create_branded_tile(48, radius_ratio=0.22, mark_ratio=0.72)
    tile_32 = create_branded_tile(32, radius_ratio=0.22, mark_ratio=0.74)
    tile_16 = create_branded_tile(16, radius_ratio=0.20, mark_ratio=0.76)

    # Base64 for SVG embedding
    tile_256 = create_branded_tile(256, radius_ratio=0.22, mark_ratio=0.70)
    temp_png_path = Path('scratch/temp_svg_tile.png')
    tile_256.save(temp_png_path)
    with open(temp_png_path, 'rb') as f:
        b64_tile = base64.b64encode(f.read()).decode('utf-8')
    if temp_png_path.exists():
        temp_png_path.unlink()

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <clipPath id="squircle">
      <rect width="256" height="256" rx="56" ry="56" />
    </clipPath>
  </defs>
  <rect width="256" height="256" rx="56" ry="56" fill="#0A0A0F" stroke="rgba(255, 255, 255, 0.12)" stroke-width="4" />
  <image href="data:image/png;base64,{b64_tile}" width="256" height="256" clip-path="url(#squircle)" />
</svg>
'''

    manifest_content = '''{
  "name": "Honesvia",
  "short_name": "Honesvia",
  "description": "India's Premier Career Roadmap & Guidance Platform",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0a0a0f",
  "background_color": "#0a0a0f",
  "display": "standalone",
  "start_url": "/"
}
'''

    # Destination directories
    targets = [
        Path('frontend/public'),
        Path('backend/public'),
        Path('public')
    ]

    for target in targets:
        target.mkdir(parents=True, exist_ok=True)
        
        # 1. Multi-resolution favicon.ico
        tile_128.save(
            target / 'favicon.ico',
            format='ICO',
            sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
        )
        
        # 2. Favicon PNGs
        tile_128.save(target / 'favicon.png')
        tile_32.save(target / 'favicon-32x32.png')
        tile_16.save(target / 'favicon-16x16.png')
        
        # 3. Touch icons & OS tiles
        tile_180.save(target / 'apple-touch-icon.png')
        tile_150.save(target / 'mstile-150x150.png')
        tile_192.save(target / 'android-chrome-192x192.png')
        tile_512.save(target / 'android-chrome-512x512.png')
        
        # 4. Vector SVG favicon
        with open(target / 'favicon.svg', 'w', encoding='utf-8') as f:
            f.write(svg_content)
            
        # 5. Web manifest
        with open(target / 'site.webmanifest', 'w', encoding='utf-8') as f:
            f.write(manifest_content)

    print("All favicon and tile assets generated and synced across frontend/public, backend/public, and public!")

if __name__ == '__main__':
    generate_all_icons()
