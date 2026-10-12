const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'services');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let total = 0;
for (const f of files) {
    const full = path.join(dir, f);
    let content = fs.readFileSync(full, 'utf8');
    const regex = /<a\s+href="#"\s+data-scope-target="([^"]+)"\s+class="([^"]+)"\s+style="([^"]+)">([\s\S]*?)<\/a>/gi;
    if (regex.test(content)) {
        content = content.replace(regex, (m, target, cls, stl, txt) => {
            total++;
            return `<button type="button" data-scope-target="${target}" class="${cls}" style="${stl} border:none; cursor:pointer;">${txt}</button>`;
        });
        fs.writeFileSync(full, content, 'utf8');
    }
}
console.log(`Fixed ${total} scope links in services files`);
