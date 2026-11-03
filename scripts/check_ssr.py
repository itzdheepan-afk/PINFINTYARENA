import urllib.request
import re

html = urllib.request.urlopen("http://localhost:3000").read().decode("utf-8")
print("arena-intro matches:", re.findall(r'src="[^"]*arena-intro[^"]*"', html))
print("arena-action matches in Hero:", re.findall(r'src="[^"]*arena-action[^"]*"', html)[:3])

# Check if slide titles are in html
for title in ["PLAY HARD", "PERFECT BREAK", "MASTER CUES"]:
    print(f"Contains {title}:", title.lower() in html.lower())
