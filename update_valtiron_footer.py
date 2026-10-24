from pathlib import Path
import re

path = Path('index.html')
if not path.exists():
    raise SystemExit('ERROR: Place this script beside index.html in your valtiron-website folder.')
html = path.read_text(encoding='utf-8')
pattern = r'<div class="footer-bottom">.*?</div>(?=</footer>)'
replacement = ('<div class="footer-bottom">'
               '<span>Valtiron Doors Distribution LLC</span>'
               '<span>Wyoming, United States</span>'
               '<span>© <span id="year"></span> VALTIRON. All rights reserved.</span>'
               '</div>')
updated, count = re.subn(pattern, replacement, html, count=1, flags=re.DOTALL)
if count != 1:
    raise SystemExit('ERROR: Could not find the existing footer-bottom. No files changed.')
backup = path.with_name('index.before-footer-update.html')
backup.write_text(html, encoding='utf-8')
path.write_text(updated, encoding='utf-8')
print('Updated footer only. Backup:', backup)
