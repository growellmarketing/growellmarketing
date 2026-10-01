const fs = require('fs');

let c = fs.readFileSync('e:/Growell Marketing/portfolio.html', 'utf8');

c = c.replace(
  '<li ><a href="/portfolio">Portfolio</a></li>',
  '<li class="active"><a href="/portfolio">Portfolio</a></li>\n                    <li><a href="/faq">FAQs</a></li>'
);

fs.writeFileSync('e:/Growell Marketing/portfolio.html', c, 'utf8');
console.log('portfolio.html navbar updated with FAQs link!');
