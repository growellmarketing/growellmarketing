const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, i) => {
        if (l.includes('info@growellmarketing.com')) {
            const isJsonLd = l.includes('"email"') || l.includes('itemprop="email"');
            if (!isJsonLd) {
                console.log(`${item.file}:${i+1} -> ${l.trim()}`);
            }
        }
    });
}
