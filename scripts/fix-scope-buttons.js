const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace <a href="#" data-scope-target="KEY" class="btn-scope">View Scope & Deliverables </a>
// with <button type="button" class="btn-scope" data-scope-target="KEY">View Scope &amp; Deliverables</button>
html = html.replace(/<a\s+href="#"\s+data-scope-target="([^"]+)"\s+class="btn-scope">\s*View Scope & Deliverables\s*<\/a>/gi, (match, key) => {
    return `<button type="button" class="btn-scope" data-scope-target="${key}">View Scope &amp; Deliverables</button>`;
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed scope buttons in index.html');
