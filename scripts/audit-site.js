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

const audit = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const isRedirect = content.includes('http-equiv="refresh"') || content.length < 1000;
    if (isRedirect) continue;

    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
    const desc = descMatch ? descMatch[1].trim() : '';

    const imgs = [...content.matchAll(/<img\b([^>]*)>/gi)];
    let imgsMissingAlt = 0;
    let imgsMissingDims = 0;
    for (const img of imgs) {
        const attrs = img[1];
        if (!attrs.includes('alt=') || /alt=["']\s*["']/.test(attrs)) {
            imgsMissingAlt++;
        }
        if (!attrs.includes('width=') || !attrs.includes('height=')) {
            imgsMissingDims++;
        }
    }

    const hasLocalBusinessSchema = content.includes('LocalBusiness') || content.includes('ProfessionalService');
    const hasIframes = content.includes('<iframe');
    const hasLinkedIn = content.includes('linkedin.com');
    const hasYouTube = content.includes('youtube.com');

    // Generic read more links
    const genericLinks = [...content.matchAll(/<a\b[^>]*>(\s*Read More\s*[-—–]?\s*|\s*Read More\s*)<\/a>/gi)].length;

    audit.push({
        file: path.relative('.', file).replace(/\\/g, '/'),
        titleLen: title.length,
        title,
        descLen: desc.length,
        desc,
        imgsTotal: imgs.length,
        imgsMissingAlt,
        imgsMissingDims,
        hasLocalBusinessSchema,
        hasIframes,
        hasLinkedIn,
        hasYouTube,
        genericLinks
    });
}

console.log(JSON.stringify(audit, null, 2));
