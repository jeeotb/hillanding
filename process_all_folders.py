import os
import re
import subprocess
import string

src_base = "/Users/admin/Library/CloudStorage/GoogleDrive-hispaceai@gmail.com/My Drive/01_Phòng Marketing - Organized/8. Ho so luu tru (file zip, tool, tài liệu dự án đã hoàn thành)"
dest_base = "assets/images"

def slugify(text):
    text = text.lower()
    valid_chars = "-_.() %s%s" % (string.ascii_letters, string.digits)
    text = ''.join(c for c in text if c in valid_chars)
    return text.replace(' ', '_').replace('.', '_').replace('-', '_').replace('__', '_')

projects = []

for root, dirs, files in os.walk(src_base):
    # Skip Archive
    if "Archive" in root:
        continue
    
    img_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    if not img_files:
        continue
    
    # Sort files to be deterministic
    img_files.sort()
    
    folder_name = os.path.basename(root)
    slug = slugify(folder_name)
    
    dest_dir = os.path.join(dest_base, slug)
    os.makedirs(dest_dir, exist_ok=True)
    
    img_files = img_files[:8]
    count = 1
    
    print(f"Found project: {folder_name} ({len(img_files)} images)")
    
    for f in img_files:
        src_path = os.path.join(root, f)
        out_file = os.path.join(dest_dir, f"img{count}.jpg")
        
        # Optimize by checking if it exists already, but we can just overwrite
        subprocess.run(["sips", "-s", "format", "jpeg", src_path, "-Z", "1920", "--out", out_file], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        count += 1
        
    projects.append({
        'slug': slug,
        'title': folder_name,
        'image_count': count - 1
    })

# Now generate JS Data
js_data = "const galleryData = {\n"
for p in projects:
    pid = p['slug']
    js_data += f"  '{pid}': {{\n"
    js_data += f"    title: '{p['title']}',\n"
    js_data += f"    subtitle: 'Khám phá không gian thiết kế độc bản',\n"
    js_data += f"    images: [\n"
    for i in range(1, p['image_count'] + 1):
        js_data += f"      {{ url: './assets/images/{pid}/img{i}.jpg', title: '{p['title']}', desc: 'Hình ảnh thực tế dự án' }}"
        if i < p['image_count']:
            js_data += ",\n"
        else:
            js_data += "\n"
    js_data += "    ]\n  },\n"
js_data += "};\n"

# Update JS
with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

js_start = js_content.find("// Gallery Carousel Logic")
js_end = js_content.find("let currentSlideIdx = 0;")
if js_start != -1 and js_end != -1:
    js_content = js_content[:js_start + len("// Gallery Carousel Logic\n")] + js_data + js_content[js_end:]

# Add Keyboard Navigation to JS if not present
if "keydown" not in js_content:
    keyboard_logic = """
// Keyboard Navigation for Gallery Modal
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('galleryModal');
  if (modal.classList.contains('show')) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closeGalleryModal();
  }
});
"""
    js_content += keyboard_logic

with open('assets/js/main.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

# Update HTML gallery-grid
html_grid = '  <div class="gallery-grid">\n'
for p in projects:
    pid = p['slug']
    img_url = f"./assets/images/{pid}/img1.jpg"
    html_grid += f"""    <div class="gallery-item" onclick="openGalleryModal('{pid}')" style="cursor: pointer;">
      <img src="{img_url}" alt="{p['title']}"/>
      <div class="gallery-cap">{p['title']}</div>
    </div>\n"""
html_grid += '  </div>'

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_idx = html.find('<div class="gallery-grid">')
end_idx = html.find('</div>\n</div>\n\n\n<!-- TESTIMONIALS -->')

if start_idx != -1 and end_idx != -1:
    html = html[:start_idx] + html_grid + html[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done generating all projects!")
