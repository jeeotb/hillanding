import os
import string

src_base = "/Users/admin/Library/CloudStorage/GoogleDrive-hispaceai@gmail.com/My Drive/01_Phòng Marketing - Organized/8. Ho so luu tru (file zip, tool, tài liệu dự án đã hoàn thành)"
dest_base = "assets/images"

def slugify(text):
    text = text.lower()
    valid_chars = "-_.() %s%s" % (string.ascii_letters, string.digits)
    text = ''.join(c for c in text if c in valid_chars)
    return text.replace(' ', '_').replace('.', '_').replace('-', '_').replace('__', '_')

projects = []
processed_slugs = set()

for root, dirs, files in os.walk(src_base):
    if "Archive" in root:
        continue
    
    img_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    if not img_files:
        continue
        
    rel_path = os.path.relpath(root, src_base)
    parts = rel_path.split(os.sep)
    if parts[0] == "00_Dự án đã triển khai" and len(parts) > 1:
        project_name = parts[1]
    else:
        project_name = parts[0]
        
    project_slug = slugify(project_name)
    deepest_folder = os.path.basename(root)
    deep_slug = slugify(deepest_folder)
    
    print(f"DEBUG: Found images in {root}")
    print(f"DEBUG: project_name={project_name}, project_slug={project_slug}, deep_slug={deep_slug}")
    
    if project_slug in processed_slugs:
        continue
        
    processed_slugs.add(project_slug)
    
    # Locate the images in assets/images/
    # It could be under project_slug OR deep_slug
    dest_dir_project = os.path.join(dest_base, project_slug)
    dest_dir_deep = os.path.join(dest_base, deep_slug)
    
    count = 0
    slug_to_use = project_slug
    if os.path.exists(dest_dir_project):
        count = len([f for f in os.listdir(dest_dir_project) if f.startswith('img')])
        slug_to_use = project_slug
    elif os.path.exists(dest_dir_deep):
        count = len([f for f in os.listdir(dest_dir_deep) if f.startswith('img')])
        slug_to_use = deep_slug
        
    print(f"DEBUG: count={count}, slug_to_use={slug_to_use}")
    
    if count > 0:
        projects.append({
            'slug': slug_to_use,
            'title': project_name,
            'image_count': count
        })

print(f"Projects updated: {[p['title'] for p in projects]}")
