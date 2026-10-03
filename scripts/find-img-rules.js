const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
    if (l.trim().startsWith('img') || l.trim().includes('img {')) {
        console.log((i+1) + ': ' + l);
    }
});
