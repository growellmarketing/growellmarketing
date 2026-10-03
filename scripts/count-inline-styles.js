const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const matches = [...content.matchAll(/style=["']([^"']*)["']/gi)];
    console.log(`${item.file}: ${matches.length} inline styles`);
}
