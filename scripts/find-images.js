const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let count = 0;
for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const imgs = [...content.matchAll(/<img\b([^>]*)>/gi)];
    for (const img of imgs) {
        const raw = img[0];
        const srcMatch = raw.match(/src=["'](.*?)["']/i);
        const altMatch = raw.match(/alt=["'](.*?)["']/i);
        const hasW = raw.includes('width=');
        const hasH = raw.includes('height=');
        const alt = altMatch ? altMatch[1] : null;
        if (!alt || !hasW || !hasH) {
            count++;
            console.log(`${item.file}: src=${srcMatch ? srcMatch[1] : 'no-src'} | alt=${alt} | hasW=${hasW} | hasH=${hasH}`);
        }
    }
}
console.log(`Total images with missing alt or dimensions: ${count}`);
