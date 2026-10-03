const fs = require('fs');

// Check blog.html images
const blogHtml = fs.readFileSync('blog.html', 'utf8');
const imgs = [...blogHtml.matchAll(/<img\b([^>]*)>/gi)];
console.log('Blog HTML images count:', imgs.length);
imgs.forEach(m => {
    const raw = m[0];
    if (raw.includes('blog-assets')) {
        const srcMatch = raw.match(/src=["'](.*?)["']/);
        const wMatch = raw.match(/width=["'](.*?)["']/);
        const hMatch = raw.match(/height=["'](.*?)["']/);
        console.log(`SRC: ${srcMatch ? srcMatch[1] : ''} | W: ${wMatch ? wMatch[1] : ''} | H: ${hMatch ? hMatch[1] : ''}`);
    }
});
