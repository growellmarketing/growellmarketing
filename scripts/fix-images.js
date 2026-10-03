const fs = require('fs');

// 1. Fix about-us.html
let about = fs.readFileSync('about-us.html', 'utf8');
about = about.replace(
    '<img src="https://cdn.growellmarketing.com/photos/Pintu-Nath.webp" alt="Pintu Nath - Marketing Manager & Web Developer" loading="lazy" decoding="async">',
    '<img src="https://cdn.growellmarketing.com/photos/Pintu-Nath.webp" alt="Pintu Nath - Marketing Manager & Web Developer" width="300" height="260" loading="lazy" decoding="async">'
);
fs.writeFileSync('about-us.html', about);
console.log('Fixed about-us.html');

// 2. Fix services.html
let services = fs.readFileSync('services.html', 'utf8');
services = services.replace(/<img class="services-img" src="([^"]+)" alt="([^"]+)" decoding="async">/g, 
    '<img class="services-img" src="$1" alt="$2" width="600" height="400" loading="lazy" decoding="async">'
);
fs.writeFileSync('services.html', services);
console.log('Fixed services.html');

// 3. Fix blog.html
let blog = fs.readFileSync('blog.html', 'utf8');
blog = blog.replace(
    '<img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" alt="Google Ads vs SEO for Ajmer Businesses" loading="lazy">',
    '<img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" alt="Google Ads vs SEO for Ajmer Businesses" width="1280" height="720" loading="lazy" decoding="async">'
);
blog = blog.replace(
    '<img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" alt="Digital Marketing for Real Estate Businesses in Ajmer" loading="lazy">',
    '<img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" alt="Digital Marketing for Real Estate Businesses in Ajmer" width="1280" height="720" loading="lazy" decoding="async">'
);
blog = blog.replace(
    '<img src="/blog-assets/social-media-marketing-for-businesses-in-ajmer.webp" alt="Social Media Marketing for Businesses in Ajmer" loading="lazy">',
    '<img src="/blog-assets/social-media-marketing-for-businesses-in-ajmer.webp" alt="Social Media Marketing for Businesses in Ajmer" width="1280" height="720" loading="lazy" decoding="async">'
);
fs.writeFileSync('blog.html', blog);
console.log('Fixed blog.html');

// 4. Fix blog/*.html hero & author images
const heroFiles = [
    {
        file: 'blog/digital-marketing-for-real-estate-businesses-in-ajmer.html',
        target: '<img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" alt="Digital Marketing for Real Estate Businesses in Ajmer - Growell Marketing" loading="lazy">',
        repl: '<img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" alt="Digital Marketing for Real Estate Businesses in Ajmer - Growell Marketing" width="1280" height="720" loading="lazy" decoding="async">'
    },
    {
        file: 'blog/google-ads-vs-seo-for-ajmer-businesses.html',
        target: '<img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" alt="Google Ads vs SEO for Ajmer Businesses Comparison - Growell Marketing" loading="lazy">',
        repl: '<img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" alt="Google Ads vs SEO for Ajmer Businesses Comparison - Growell Marketing" width="1280" height="720" loading="lazy" decoding="async">'
    },
    {
        file: 'blog/social-media-marketing-for-businesses-in-ajmer.html',
        target: '<img src="/blog-assets/social-media-marketing-for-businesses-in-ajmer.webp" alt="Social Media Marketing for Businesses in Ajmer - Growell Marketing" loading="lazy">',
        repl: '<img src="/blog-assets/social-media-marketing-for-businesses-in-ajmer.webp" alt="Social Media Marketing for Businesses in Ajmer - Growell Marketing" width="1280" height="720" loading="lazy" decoding="async">'
    },
    {
        file: 'blog/high-converting-content-strategy.html',
        target: '<img src="https://cdn.growellmarketing.com/photos/Pintu-Nath.webp" style="border-radius: 100%;" alt="" decoding="async">',
        repl: '<img src="https://cdn.growellmarketing.com/photos/Pintu-Nath.webp" style="border-radius: 100%;" alt="Pintu Nath - Lead Content Strategist" width="66" height="66" decoding="async">'
    }
];

for (const item of heroFiles) {
    let c = fs.readFileSync(item.file, 'utf8');
    if (c.includes(item.target)) {
        c = c.replace(item.target, item.repl);
        fs.writeFileSync(item.file, c);
        console.log(`Fixed hero/author in ${item.file}`);
    } else {
        console.warn(`Target not found in ${item.file}`);
    }
}

// 5. Fix all sidebar-post-img in blog/*.html
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));
for (const item of report) {
    if (item.file.startsWith('blog/')) {
        let content = fs.readFileSync(item.file, 'utf8');
        let modified = false;

        // Regex replace for <img ... class="sidebar-post-img" ...> or similar without width/height
        // Look for img tags with sidebar-post-img
        content = content.replace(/<img\b([^>]*class=["'][^"']*sidebar-post-img[^"']*["'][^>]*)>/gi, (match) => {
            if (match.includes('width=') && match.includes('height=')) {
                return match;
            }
            modified = true;
            // Add width="60" height="60" before >
            let updated = match;
            if (!updated.includes('width=')) {
                updated = updated.replace(/(\/?>)$/, ' width="60"$1');
            }
            if (!updated.includes('height=')) {
                updated = updated.replace(/(\/?>)$/, ' height="60"$1');
            }
            return updated;
        });

        // Also check if class comes after or on separate line
        content = content.replace(/<img\b([^>]*\n?[^>]*sidebar-post-img[^>]*)>/gi, (match) => {
            if (match.includes('width=') && match.includes('height=')) {
                return match;
            }
            modified = true;
            let updated = match;
            if (!updated.includes('width=')) {
                updated = updated.replace(/(\/?>)$/, ' width="60"$1');
            }
            if (!updated.includes('height=')) {
                updated = updated.replace(/(\/?>)$/, ' height="60"$1');
            }
            return updated;
        });

        if (modified) {
            fs.writeFileSync(item.file, content);
            console.log(`Updated sidebar images in ${item.file}`);
        }
    }
}

console.log('All image updates finished!');
