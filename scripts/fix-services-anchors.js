const fs = require('fs');

let content = fs.readFileSync('services.html', 'utf8');

const map = {
    '#service-seo': 'Explore SEO Details &rarr;',
    '#service-paid-ads': 'Explore Paid Ads Details &rarr;',
    '#service-social-media': 'Explore Social Media Details &rarr;',
    '#service-ecommerce': 'Explore E-Commerce Details &rarr;',
    '#service-web-design': 'Explore Web Design Details &rarr;',
    '#service-content': 'Explore Content Writing Details &rarr;',
    '#service-branding': 'Explore Branding Details &rarr;',
    '#service-email': 'Explore Email Details &rarr;',
    '#service-orm': 'Explore ORM Details &rarr;',
    '#service-whatsapp': 'Explore WhatsApp Details &rarr;'
};

for (const [href, label] of Object.entries(map)) {
    content = content.replace(
        new RegExp(`<a href="${href}" class="btn-card-details">Learn More &rarr;<\\/a>`, 'g'),
        `<a href="${href}" class="btn-card-details">${label}</a>`
    );
}

fs.writeFileSync('services.html', content, 'utf8');
console.log('Updated services.html anchor texts!');
