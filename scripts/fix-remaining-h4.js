const fs = require('fs');
const path = require('path');

const targetFiles = [
  "blog/10-marketing-strategies-for-small-businesses-in-ajmer.html",
  "blog/complete-guide-to-local-seo.html",
  "blog/google-ads-vs-meta-ads-business.html",
  "blog/high-converting-content-strategy.html",
  "blog/how-to-grow-your-business-organically-using-social-media.html",
  "blog/how-we-plan-a-month-of-high-converting-content.html"
];

for (const rel of targetFiles) {
    let content = fs.readFileSync(rel, 'utf8');
    
    // Replace any remaining h4 inside article / section content with div or h3
    content = content.replace(/<h4\b([^>]*)>([\s\S]*?)<\/h4>/gi, (match, attrs, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').trim();
        // If it's a major subsection (Week 1, Discovery, 9 High-Converting, etc.), make it h3
        if (/^(week [1-4]|discovery|comparison|conversion|9 high|the 5-step|the 6 high)/i.test(text)) {
            return `<h3${attrs}>${inner}</h3>`;
        }
        // Otherwise it's a pro-tip or callout title, make it a styled div
        return `<div class="protip-heading"${attrs} role="heading" aria-level="3">${inner}</div>`;
    });

    fs.writeFileSync(rel, content, 'utf8');
    console.log(`Cleaned remaining h4 in ${rel}`);
}
