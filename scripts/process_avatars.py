import os
from PIL import Image

src_dir = r"C:\Users\DHEEPAN RAJ\.gemini\antigravity-ide\brain\8ff3fa01-bc79-49b8-b48c-74aa0badf423\.user_uploaded"
dest_dir = r"C:\Users\DHEEPAN RAJ\.gemini\antigravity-ide\scratch\p-infinity-arena\public\images\avatars"
os.makedirs(dest_dir, exist_ok=True)

# 1. Praka: media_1793210431361.jpg
praka_path = os.path.join(src_dir, "media_1793210431361.jpg")
img_praka = Image.open(praka_path)
print(f"Praka original: {img_praka.size}")

# In the Instagram screenshot, Praka's head is in the upper-mid area
# Let's inspect the proportions: width ~540, height ~1170
# Face is roughly centered horizontally between 0.35 and 0.65 width, and vertically between 0.25 and 0.45 height
w, h = img_praka.size
# Let's crop centered around his head/shoulders
box_size = int(w * 0.55)
center_x = int(w * 0.48)
center_y = int(h * 0.36)
left = max(0, center_x - box_size // 2)
top = max(0, center_y - box_size // 2)
right = min(w, left + box_size)
bottom = min(h, top + box_size)

praka_avatar = img_praka.crop((left, top, right, bottom)).resize((400, 400), Image.Resampling.LANCZOS)
praka_avatar.save(os.path.join(dest_dir, "praka.jpg"), quality=95)
print("Saved praka.jpg")

# 2. Dheepan: media_1793210471533.jpg
dheepan_path = os.path.join(src_dir, "media_1793210471533.jpg")
img_dheepan = Image.open(dheepan_path)
print(f"Dheepan original: {img_dheepan.size}")
w2, h2 = img_dheepan.size
# Dheepan is leaning against the car with sunglasses looking sideways
# His head is around center_x ~ 0.58, center_y ~ 0.40
box_size2 = int(w2 * 0.65)
center_x2 = int(w2 * 0.58)
center_y2 = int(h2 * 0.42)
left2 = max(0, center_x2 - box_size2 // 2)
top2 = max(0, center_y2 - box_size2 // 2)
right2 = min(w2, left2 + box_size2)
bottom2 = min(h2, top2 + box_size2)

dheepan_avatar = img_dheepan.crop((left2, top2, right2, bottom2)).resize((400, 400), Image.Resampling.LANCZOS)
dheepan_avatar.save(os.path.join(dest_dir, "dheepan.jpg"), quality=95)
print("Saved dheepan.jpg")

# 3. Karthi: media_1793210541064.jpg
karthi_path = os.path.join(src_dir, "media_1793210541064.jpg")
img_karthi = Image.open(karthi_path)
print(f"Karthi original: {img_karthi.size}")
w3, h3 = img_karthi.size
# Karthi is looking to the right with curly hair and white shirt
# Head is around center_x ~ 0.60, center_y ~ 0.36
box_size3 = int(min(w3, h3) * 0.75)
center_x3 = int(w3 * 0.60)
center_y3 = int(h3 * 0.38)
left3 = max(0, center_x3 - box_size3 // 2)
top3 = max(0, center_y3 - box_size3 // 2)
right3 = min(w3, left3 + box_size3)
bottom3 = min(h3, top3 + box_size3)

karthi_avatar = img_karthi.crop((left3, top3, right3, bottom3)).resize((400, 400), Image.Resampling.LANCZOS)
karthi_avatar.save(os.path.join(dest_dir, "karthi.jpg"), quality=95)
print("Saved karthi.jpg")
