const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let withPixel = [];
for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    if (content.includes('1735589957666296')) {
        withPixel.push(item.file);
    }
}
console.log('Pages with Meta Pixel:', withPixel.length);
console.log(withPixel);
