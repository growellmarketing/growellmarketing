const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let results = {
    totalPages: report.length,
    skippedHeadings: 0,
    missingImageAlt: 0,
    missingImageDims: 0,
    genericAnchors: 0,
    titleLengthIssues: 0,
    descLengthIssues: 0,
    plainTextEmails: 0,
    doubleClosingTags: 0,
    brokenSchemas: 0
};

const genericPatterns = [
    /^read\s+more\s*[-–—:]?$/i,
    /^learn\s+more\s*[-–—:]?$/i,
    /^click\s+here\s*[-–—:]?$/i,
    /^view\s+more\s*[-–—:]?$/i,
    /^more\s*[-–—:]?$/i
];

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');

    // 1. Heading structure
    const headings = [...content.matchAll(/<(h[1-6])\b[^>]*>(.*?)<\/\1>/gis)]
        .map(m => ({ tag: m[1].toLowerCase(), level: parseInt(m[1][1]) }));
    for (let i = 1; i < headings.length; i++) {
        if (headings[i].level > headings[i - 1].level + 1) {
            results.skippedHeadings++;
        }
    }

    // 2. Images
    const imgs = [...content.matchAll(/<img\b([^>]*)>/gi)];
    for (const img of imgs) {
        const raw = img[0];
        const altMatch = raw.match(/alt=["'](.*?)["']/i);
        const alt = altMatch ? altMatch[1].trim() : null;
        const hasW = raw.includes('width=');
        const hasH = raw.includes('height=');
        if (!alt) results.missingImageAlt++;
        if (!hasW || !hasH) results.missingImageDims++;
    }

    // 3. Anchors
    const anchors = [...content.matchAll(/<a\b[^>]*>(.*?)<\/a>/gis)];
    for (const a of anchors) {
        const text = a[1].replace(/<[^>]+>/g, '').trim();
        for (const gp of genericPatterns) {
            if (gp.test(text)) results.genericAnchors++;
        }
    }

    // 4. Titles & Meta Descriptions
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) ||
                      content.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i) ||
                      content.match(/<meta\s+content="([^"]*)"\s+name=["']description["']/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const desc = descMatch ? descMatch[1].trim() : '';
    if (title.length < 40 || title.length > 60) results.titleLengthIssues++;
    if (desc.length < 120 || desc.length > 160) results.descLengthIssues++;

    // 5. Plain text email
    const lines = content.split('\n');
    lines.forEach(l => {
        if (l.includes('info@growellmarketing.com')) {
            const isJson = l.includes('"email"') || l.includes('itemprop="email"');
            if (!isJson) results.plainTextEmails++;
        }
    });

    // 6. Double closing tags
    if (content.includes('">>') || content.includes("'>>")) results.doubleClosingTags++;

    // 7. Schema JSON validation
    const schemaMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
    for (const sm of schemaMatches) {
        try {
            JSON.parse(sm[1]);
        } catch (e) {
            results.brokenSchemas++;
        }
    }
}

console.log('================ MASTER SEO & AUDIT QUALITY REPORT ================');
console.log(`Total Pages Scanned:        ${results.totalPages}`);
console.log(`Skipped Heading Levels:     ${results.skippedHeadings}  (Expected: 0)`);
console.log(`Missing Image Alt Tags:     ${results.missingImageAlt}  (Expected: 0)`);
console.log(`Missing Image Width/Height: ${results.missingImageDims}  (Expected: 0)`);
console.log(`Generic Anchor Texts:       ${results.genericAnchors}  (Expected: 0)`);
console.log(`Title Length Issues:        ${results.titleLengthIssues}  (Expected: 0)`);
console.log(`Description Length Issues:  ${results.descLengthIssues}  (Expected: 0)`);
console.log(`Plain Text Email Harvest:   ${results.plainTextEmails}  (Expected: 0)`);
console.log(`Double Closing Tag Errors:  ${results.doubleClosingTags}  (Expected: 0)`);
console.log(`Broken JSON-LD Schemas:     ${results.brokenSchemas}  (Expected: 0)`);
console.log('====================================================================');
