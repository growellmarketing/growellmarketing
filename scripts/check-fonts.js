const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const fontMatches = [...content.matchAll(/<link\s+[^>]*fonts\.googleapis\.com[^>]*>/gi)];
    console.log(`${item.file}: ${fontMatches.length} font links`);
}
