const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let iframes = [];
for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const matches = [...content.matchAll(/<iframe\b[^>]*>/gi)];
    if (matches.length > 0) {
        iframes.push({ file: item.file, count: matches.length, tags: matches.map(m => m[0]) });
    }
}
console.log('IFRAMES FOUND:', iframes);
