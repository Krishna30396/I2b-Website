"""Build the artifact copy of the case study: strips the document wrapper (the Artifact
publish adds its own) into _publish/index.html. Run, then publish _publish/index.html with
case-data.js and shots/*.jpg as supporting files. Edit index.html / case-data.js, never _publish."""
import re, pathlib
here = pathlib.Path(__file__).parent
src = (here / 'index.html').read_text(encoding='utf-8')
src = re.sub(r'<!doctype html>\s*', '', src, flags=re.I)
src = re.sub(r'</?(html|body)[^>]*>\s*', '', src)
src = re.sub(r'</?head>\s*', '', src)
src = re.sub(r'<meta (charset|name="viewport")[^>]*>\s*', '', src)
out = here / '_publish'; out.mkdir(exist_ok=True)
(out / 'index.html').write_text(src, encoding='utf-8')
print('wrote', out / 'index.html', len(src), 'chars')
