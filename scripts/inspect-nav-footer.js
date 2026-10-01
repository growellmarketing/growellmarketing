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
let navCount = 0;
let footerCount = 0;
let hasFaqInNav = 0;
let hasFaqInFooter = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('class="navbaar"')) navCount++;
  if (content.includes('class="site-footer"')) footerCount++;
  
  // check if /faq link is inside navbaar
  const navMatch = content.match(/<nav[\s\S]*?<\/nav>/i);
  if (navMatch && navMatch[0].includes('/faq')) {
    hasFaqInNav++;
  }

  // check if /faq link is inside site-footer
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
  if (footerMatch && footerMatch[0].includes('/faq')) {
    hasFaqInFooter++;
  }
});

console.log('Total HTML files:', files.length);
console.log('Files with navbaar:', navCount);
console.log('Files with site-footer:', footerCount);
console.log('Files with /faq in nav:', hasFaqInNav);
console.log('Files with /faq in footer:', hasFaqInFooter);
