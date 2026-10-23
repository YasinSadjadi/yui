import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const sourceFonts = new URL('../node_modules/boxicons/fonts/', import.meta.url);
const targetFonts = new URL('../projects/yui/src/fonts/', import.meta.url);
await mkdir(targetFonts, { recursive: true });
await cp(sourceFonts, targetFonts, { recursive: true, force: true });

const cssPath = fileURLToPath(new URL('../projects/yui/src/styles.css', import.meta.url));
const css = await readFile(cssPath, 'utf8');
await writeFile(cssPath, css.replaceAll('url(../fonts/', 'url(./fonts/'));
