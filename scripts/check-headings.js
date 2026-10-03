const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const matches = [...content.matchAll(/<(h[1-6])\b[^>]*>(.*?)<\/\1>/gis)];
    const levels = matches.map(m => ({ tag: m[1].toLowerCase(), level: parseInt(m[1][1]), text: m[2].replace(/<[^>]+>/g, '').trim().substring(0, 40) }));
    
    let skipped = [];
    for (let i = 1; i < levels.length; i++) {
        const prev = levels[i - 1].level;
        const curr = levels[i].level;
        if (curr > prev + 1) {
            skipped.push(`${levels[i - 1].tag} ("${levels[i - 1].text}") -> ${levels[i].tag} ("${levels[i].text}")`);
        }
    }
    if (skipped.length > 0) {
        console.log(`PAGE: ${item.file}`);
        skipped.forEach(s => console.log(`  SKIPPED: ${s}`));
    }
}
