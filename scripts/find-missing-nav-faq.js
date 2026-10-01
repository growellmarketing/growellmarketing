const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.git', 'scripts'].includes(f)) res = res.concat(getFiles(full));
    } else if (f.endsWith('.html')) res.push(full);
  });
  return res;
}

const files = getFiles('e:/Growell Marketing');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('class="navbaar"')) {
    const navMatch = content.match(/<nav[\s\S]*?<\/nav>/i);
    if (navMatch && !navMatch[0].includes('/faq')) {
      console.log('Missing /faq in nav:', f);
    }
  }
});
