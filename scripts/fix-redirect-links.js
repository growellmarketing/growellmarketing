const fs = require('fs');

const files = [
  'blog/digital-marketing-for-real-estate-businesses-in-ajmer.html',
  'blog/google-ads-vs-seo-for-ajmer-businesses.html',
  'blog/how-much-does-digital-marketing-cost-in-ajmer.html'
];

const replacements = [
  { from: 'href="/services/social-media-marketing-services"', to: 'href="/services/social-media-marketing-ajmer"' },
  { from: 'href="/services/social-media"', to: 'href="/services/social-media-marketing-ajmer"' },
  { from: 'href="/services/seo"', to: 'href="/services/seo-services-ajmer"' },
  { from: 'href="/services/paid-advertising"', to: 'href="/services/performance-marketing-agency"' },
  { from: 'href="/services/performance-marketing"', to: 'href="/services/performance-marketing-agency"' },
  { from: 'href="/services/branding"', to: 'href="/services/branding-agency-ajmer"' },
  { from: 'href="/services/web-design"', to: 'href="/services/web-design-company-ajmer"' },
  { from: 'href="/services/orm"', to: 'href="/services/online-reputation-management"' }
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let count = 0;
  for (const r of replacements) {
    const parts = content.split(r.from);
    if (parts.length > 1) {
      count += parts.length - 1;
      content = parts.join(r.to);
    }
  }
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed ${count} links in ${file}`);
}
