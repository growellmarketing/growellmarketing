const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let fixedCount = 0;
for (const item of report) {
    let content = fs.readFileSync(item.file, 'utf8');
    if (content.includes('">>') || content.includes("'>>")) {
        content = content.replace(/">>+/g, '">');
        content = content.replace(/'>>+/g, "'>");
        fs.writeFileSync(item.file, content);
        fixedCount++;
        console.log(`Fixed double close in: ${item.file}`);
    }
}
console.log(`Finished fixing ${fixedCount} files.`);
