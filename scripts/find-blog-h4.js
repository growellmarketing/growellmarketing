const fs = require('fs');
const path = require('path');

const blogFiles = fs.readdirSync('blog').filter(f => f.endsWith('.html'));

for (const f of blogFiles) {
    const content = fs.readFileSync('blog/' + f, 'utf8');
    const matches = [...content.matchAll(/<h4\b[^>]*>(.*?)<\/h4>/gis)];
    if (matches.length > 0) {
        console.log(`BLOG: ${f} (${matches.length} h4 tags)`);
        matches.forEach(m => console.log(`   - ${m[1].replace(/<[^>]+>/g, '').trim().substring(0, 50)}`));
    }
}
