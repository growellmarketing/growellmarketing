const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const matches = [...content.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
    for (const m of matches) {
        const text = m[1].replace(/<[^>]+>/g, '').trim();
        if (/^(read more|click here|learn more|more|view|explore)[-—–\s>&rarr;]*$/i.test(text)) {
            const href = (m[0].match(/href=["'](.*?)["']/i) || [])[1];
            console.log(`${item.file} -> "${text}" -> ${href}`);
        }
    }
}
