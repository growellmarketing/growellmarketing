const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let titleIssues = 0;
let descIssues = 0;

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    // Properly match content within matching double quotes or single quotes
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) ||
                      content.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i) ||
                      content.match(/<meta\s+content="([^"]*)"\s+name=["']description["']/i);
    
    const title = titleMatch ? titleMatch[1].trim() : '';
    const desc = descMatch ? descMatch[1].trim() : '';
    
    const tLen = title.length;
    const dLen = desc.length;
    
    let issue = false;
    let tStatus = 'OK';
    let dStatus = 'OK';
    
    // SEOptimer recommends Title: 50-60 chars (warning if < 40 or > 60), Desc: 120-160 chars
    if (tLen < 40 || tLen > 60) {
        tStatus = tLen < 40 ? `TOO SHORT (${tLen})` : `TOO LONG (${tLen})`;
        titleIssues++;
        issue = true;
    }
    if (dLen < 120 || dLen > 160) {
        dStatus = dLen < 120 ? `TOO SHORT (${dLen})` : `TOO LONG (${dLen})`;
        descIssues++;
        issue = true;
    }
    
    if (issue) {
        console.log(`[${item.file}]`);
        if (tStatus !== 'OK') console.log(`  TITLE: [${tLen} chars] ${tStatus} -> "${title}"`);
        if (dStatus !== 'OK') console.log(`  DESC:  [${dLen} chars] ${dStatus} -> "${desc}"`);
    }
}

console.log(`\nAudit Complete: ${titleIssues} title issues, ${descIssues} description issues.`);
