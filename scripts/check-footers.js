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
let footerTemplates = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
  if (footerMatch) {
    // Simplify to check variations
    const fStr = footerMatch[0];
    const hasCompany = fStr.includes('Company');
    const hasFaq = fStr.includes('/faq');
    const hasMap = fStr.includes('google-map') || fStr.includes('iframe');
    console.log(`${f.replace('e:/Growell Marketing/', '')}: hasCompany=${hasCompany}, hasFaq=${hasFaq}, hasMap=${hasMap}`);
  }
});
