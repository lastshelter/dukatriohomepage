const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');

if (fs.existsSync(standaloneDir)) {
  console.log('[standalone-asset-sync] Syncing static assets to standalone output...');

  if (fs.existsSync(staticSrc)) {
    fs.mkdirSync(path.dirname(staticDest), { recursive: true });
    fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
    console.log('[standalone-asset-sync] Copied .next/static -> .next/standalone/.next/static');
  }

  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
    console.log('[standalone-asset-sync] Copied public -> .next/standalone/public');
  }

  console.log('[standalone-asset-sync] Asset synchronization complete.');
} else {
  console.log('[standalone-asset-sync] No .next/standalone found. Skipping asset sync.');
}
