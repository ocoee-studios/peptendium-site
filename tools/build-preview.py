"""Create a standalone offline preview and portable source package."""
from pathlib import Path
import base64
import json
import zipfile

root = Path(__file__).resolve().parents[1]
site = root / 'site'
destination = root.parent
assets = {
    str(p.relative_to(site)): 'data:image/webp;base64,' + base64.b64encode(p.read_bytes()).decode()
    for p in (site / 'assets').glob('*.webp')
}
css = (site / 'styles.css').read_text()
for name, data in assets.items():
    css = css.replace(name, data)
script = (site / 'app.js').read_text()
screens = {i: assets[f'assets/screen-{i}.webp'] for i in range(1, 9)}
script = 'const embeddedScreens=' + json.dumps(screens) + ';\n' + script
script = script.replace('`assets/screen-${data.screen}.webp`', 'embeddedScreens[data.screen]')
script = script.replace('`assets/screen-${current}.webp`', 'embeddedScreens[current]')
html = (site / 'index.html').read_text()
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>' + css + '</style>')
html = html.replace('<script defer src="app.js"></script>', '<script>' + script + '</script>')
for name, data in assets.items():
    html = html.replace(name, data)
assert 'assets/' not in html
preview = destination / 'Peptendium-Clickable-Preview.html'
preview.write_text(html)
archive = destination / 'Peptendium-Website-Source.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as out:
    for p in sorted(root.rglob('*')):
        if p.is_file() and '.git' not in p.parts and '__pycache__' not in p.parts:
            out.write(p, root.name + '/' + str(p.relative_to(root)))
print(f'{preview.name}: {preview.stat().st_size:,} bytes')
print(f'{archive.name}: {archive.stat().st_size:,} bytes')
