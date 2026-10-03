const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let emailPages = [];
for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const matches = [...content.matchAll(/info@growellmarketing\.com/g)];
    if (matches.length > 0) {
        emailPages.push({ file: item.file, count: matches.length });
    }
}
console.log('Pages with info@growellmarketing.com:', emailPages.length);
console.log(emailPages);
