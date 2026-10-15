// Copies the shared object library + fonts into every project's assets/ so each
// HyperFrames project stays self-contained (renders only read project-local files).
// Usage: node system/sync.mjs   (run from motion/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const projects = fs.readdirSync(root).filter(d => fs.existsSync(path.join(root, d, 'hyperframes.json')));
for (const p of projects) {
  const dest = path.join(root, p, 'assets');
  fs.mkdirSync(path.join(dest, 'fonts'), { recursive: true });
  fs.copyFileSync(path.join(here, 'i2b-objects.css'), path.join(dest, 'i2b-objects.css'));
  for (const f of fs.readdirSync(path.join(here, 'fonts'))) fs.copyFileSync(path.join(here, 'fonts', f), path.join(dest, 'fonts', f));
  console.log('synced', p);
}
