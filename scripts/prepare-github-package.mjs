import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const owner = process.env.GITHUB_REPOSITORY_OWNER;
if (!owner) {
  throw new Error('Set GITHUB_REPOSITORY_OWNER to publish yui to GitHub Packages.');
}

const packagePath = fileURLToPath(new URL('../dist/yui/package.json', import.meta.url));
const manifest = JSON.parse(await readFile(packagePath, 'utf8'));
manifest.name = `@${owner.toLowerCase()}/yui`;
await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${manifest.name} for GitHub Packages.`);
