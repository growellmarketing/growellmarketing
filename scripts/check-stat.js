const fs = require('fs');

const path = 'blog-assets/how-much-does-digital-marketing-cost-in-ajmer.webp';
console.log('File size:', fs.statSync(path).size);
