const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!['node_modules', '.git', 'photos', 'hero assets', 'BRANDING PORTFOLIO', 'New folder', 'triyal', '.portfolio-images-backup'].includes(file)) {
                results = results.concat(getHtmlFiles(fullPath));
            }
        } else if (file.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

const files = getHtmlFiles('.');
const report = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('http-equiv="refresh"') || content.length < 1000) continue;
    const rel = path.relative('.', file).replace(/\\/g, '/');

    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
    const desc = descMatch ? descMatch[1].trim() : '';

    report.push({
        file: rel,
        titleLen: title.length,
        title,
        descLen: desc.length,
        desc
    });
}

fs.writeFileSync('scripts/meta-report.json', JSON.stringify(report, null, 2), 'utf8');
console.log('Saved meta-report.json with', report.length, 'entries');
