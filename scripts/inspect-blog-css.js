const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
    if (l.includes('.blog') || l.includes('blog-img') || l.includes('blog-hero')) {
        console.log(`${i+1}: ${l}`);
    }
});
