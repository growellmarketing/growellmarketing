const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

let missingYoutube = [];
for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    if (!content.includes('youtube.com')) {
        missingYoutube.push(item.file);
    }
}
console.log('Pages missing YouTube link:', missingYoutube.length);
console.log(missingYoutube);
