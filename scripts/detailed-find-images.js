const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let count = 0;
const results = [];
for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const imgs = [...content.matchAll(/<img\b([^>]*)>/gi)];
    for (const img of imgs) {
        const raw = img[0];
        const srcMatch = raw.match(/src=["'](.*?)["']/i);
        const altMatch = raw.match(/alt=["'](.*?)["']/i);
        const classMatch = raw.match(/class=["'](.*?)["']/i);
        const hasW = raw.includes('width=');
        const hasH = raw.includes('height=');
        const alt = altMatch ? altMatch[1] : null;
        if (!alt || !hasW || !hasH) {
            count++;
            results.push({
                file: item.file,
                raw: raw,
                src: srcMatch ? srcMatch[1] : '',
                alt: alt,
                class: classMatch ? classMatch[1] : '',
                hasW,
                hasH
            });
        }
    }
}
fs.writeFileSync('scripts/detailed-images.json', JSON.stringify(results, null, 2));
console.log(`Found ${count} images needing fixes. Saved to scripts/detailed-images.json`);
