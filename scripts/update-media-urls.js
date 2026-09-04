/**
 * update-media-urls.js
 * Utility to switch media asset references in HTML files between
 * local relative paths and the Cloudflare R2 CDN domain.
 *
 * Usage:
 *   node scripts/update-media-urls.js --cdn
 *   node scripts/update-media-urls.js --local
 */

const fs = require('fs');
const path = require('path');

const CDN_BASE = 'https://pub-13bf98d4935c47aaa575bd59013f4a38.r2.dev';

// Targeted media folders
const MEDIA_FOLDERS = [
  'portfolio-images',
  'blog-assets',
  'services-assets',
  'clients',
  'hero assets',
  'photos'
];

const mode = process.argv.includes('--local') ? 'local' : 'cdn';

console.log(`\n======================================================`);
console.log(`🔧 Updating Media URLs mode: [${mode.toUpperCase()}]`);
console.log(`🌐 CDN Base: ${CDN_BASE}`);
console.log(`======================================================\n`);

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalReplacements = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  let fileReplacements = 0;

  for (const folder of MEDIA_FOLDERS) {
    if (mode === 'cdn') {
      // Replace local relative path or /folder with CDN_BASE/folder
      // Match folder with or without leading slash, not already prefixed with http/https
      const pattern = new RegExp(`(?<!https?:\\/\\/[^\\/]+(?:%20|\\S)*\\/)(?:\\/)?(${folder.replace(/ /g, '(?:%20| )')}\\/[^'"\\s)]+)`, 'gi');
      content = content.replace(pattern, (match, p1) => {
        fileReplacements++;
        return `${CDN_BASE}/${p1.replace(/ /g, '%20')}`;
      });
    } else {
      // Revert CDN_BASE/folder to local path
      const pattern = new RegExp(`${CDN_BASE}\\/(${folder.replace(/ /g, '(?:%20| )')}\\/[^'"\\s)]+)`, 'gi');
      content = content.replace(pattern, (match, p1) => {
        fileReplacements++;
        return decodeURIComponent(p1);
      });
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ ${file}: ${fileReplacements} media URLs updated`);
    totalReplacements += fileReplacements;
  }
}

console.log(`\n🎉 Finished! Total URLs updated: ${totalReplacements}\n`);
