const fs = require('fs');
const path = require('path');

console.log('=== LINKING FINAL 5 BLOG POSTS ===');

function updateBlogFile(fileName, modifierFn) {
    const filePath = path.resolve(__dirname, '..', 'blog', fileName);
    if (!fs.existsSync(filePath)) {
        console.error(`Not found: ${filePath}`);
        return;
    }
    const original = fs.readFileSync(filePath, 'utf8');
    const updated = modifierFn(original);
    if (original !== updated) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`[SUCCESS] Updated ${fileName}`);
    } else {
        console.log(`[WARNING] No changes made to ${fileName}`);
    }
}

// 1. google-ads-vs-meta-ads-business.html
updateBlogFile('google-ads-vs-meta-ads-business.html', (html) => {
    html = html.replace(
        /<h2>1\. Google Ads Is Ideal for High-Intent Customers<\/h2>\s*<p>/,
        `<h2>1. Google Ads Is Ideal for High-Intent Customers</h2>\n                        <p>With managed <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Paid Advertising Services</a>, Google Ads captures users actively seeking solutions (compare paid search vs organic rankings in our <a href="/blog/google-ads-vs-seo-for-ajmer-businesses" style="color: #654E9F; font-weight: 600;">Google Ads vs SEO Analysis</a> and <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services</a>). `
    );

    html = html.replace(
        /<h2>2\. Meta Ads Are Excellent for Building Awareness<\/h2>\s*<p>/,
        `<h2>2. Meta Ads Are Excellent for Building Awareness</h2>\n                        <p>Pair paid social discovery with organic engagement through our <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing Team</a>. `
    );

    html = html.replace(
        /<h2>7\. The Best Strategy: Use Both Together<\/h2>/,
        `<h2>7. The Best Strategy: Use Both Together</h2>\n                        <p>Avoid ad decay and rising costs by reading <a href="/blog/why-your-cpa-is-rising-and-how-to-fix-it" style="color: #654E9F; font-weight: 600;">Why Your CPA Is Rising &amp; How to Fix It</a>. Ensure your ad traffic converts on speed-optimized landing pages from our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a>.</p>`
    );

    html = html.replace(
        /<h2>Ready to Run Ads That Actually Generate Sales\?<\/h2>/,
        `<h2>Ready to Run Ads That Actually Generate Sales?</h2>\n                        <p>View verified campaign results in our <a href="/portfolio" style="color: #fff; text-decoration: underline;">Client Portfolio</a> or <a href="/contact-us" style="color: #fff; text-decoration: underline;">Request a Free Paid Ads Audit</a>.</p>`
    );

    return html;
});

// 2. complete-guide-to-local-seo.html
updateBlogFile('complete-guide-to-local-seo.html', (html) => {
    html = html.replace(
        /<h2>1\. Claim &amp; Fully Optimize Your Google Business Profile \(GBP\)<\/h2>\s*<p>Your Google Business Profile \(formerly Google My Business\) is the foundation of local visibility\./,
        `<h2>1. Claim &amp; Fully Optimize Your Google Business Profile (GBP)</h2>\n                        <p>Your Google Business Profile is the foundation of local visibility. Our specialized <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a> optimize every ranking signal to secure top 3-pack positions (learn more in our <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">Ajmer Google Ranking Guide</a>).`
    );

    html = html.replace(
        /<h2>3\. The Systematic 5-Star Customer Review Engine<\/h2>/,
        `<h2>3. The Systematic 5-Star Customer Review Engine</h2>\n                        <p>Accelerate 5-star customer reviews and protect your online standing with our <a href="/services/online-reputation-management" style="color: #654E9F; font-weight: 600;">Online Reputation Management Services</a>.</p>`
    );

    html = html.replace(
        /<h2>4\. On-Page Local SEO &amp; Dedicated Location Pages<\/h2>/,
        `<h2>4. On-Page Local SEO &amp; Dedicated Location Pages</h2>\n                        <p>High-converting mobile architecture built by our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a> paired with <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">7 Technical SEO Fixes</a> maximizes organic rank potential.</p>`
    );

    html = html.replace(
        /<h2>Ready to Dominate Local Search in Your Area\?<\/h2>/,
        `<h2>Ready to Dominate Local Search in Your Area?</h2>\n                        <p>Explore real ranking transformations in our <a href="/portfolio" style="color: #fff; text-decoration: underline;">Client Portfolio</a> or <a href="/contact-us" style="color: #fff; text-decoration: underline;">Schedule a Free Local SEO Audit</a>.</p>`
    );

    return html;
});

// 3. 7-technical-seo-fixes-that-move-rankings-fastest.html
updateBlogFile('7-technical-seo-fixes-that-move-rankings-fastest.html', (html) => {
    html = html.replace(
        /<h2>1\. Fix Crawl Errors and Broken Internal Links<\/h2>\s*<p>Every 404 error and broken redirect chain on your site wastes crawl budget/,
        `<h2>1. Fix Crawl Errors and Broken Internal Links</h2>\n                <p>Every 404 error and broken redirect chain on your site wastes crawl budget. As executed during our comprehensive audits at <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Growell SEO Services</a>, start by eliminating dead URLs (also see our <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Complete Guide to Local SEO</a>).`
    );

    html = html.replace(
        /<h2>3\. Improve Core Web Vitals \(LCP and INP Especially\)<\/h2>/,
        `<h2>3. Improve Core Web Vitals (LCP and INP Especially)</h2>\n                <p>Speed optimization engineered by our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a> guarantees optimal loading and indexing.</p>`
    );

    html = html.replace(
        /<h2>Need Help Fixing Your Site's Technical SEO\?<\/h2>/,
        `<h2>Need Help Fixing Your Site's Technical SEO?</h2>\n                <p>Explore ranking case studies in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a> or <a href="/contact-us" style="color: #654E9F; font-weight: 600;">Request a Comprehensive SEO Audit</a>.</p>`
    );

    return html;
});

// 4. how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales.html
updateBlogFile('how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales.html', (html) => {
    html = html.replace(
        /<h2>2\. Build Long-Term Compounding Traffic with E-commerce SEO<\/h2>/,
        `<h2>2. Build Long-Term Compounding Traffic with E-commerce SEO</h2>\n                        <p>Capture high-intent commercial searches organically with our <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>.</p>`
    );

    html = html.replace(
        /<h2>3\. Use Paid Advertising to Accelerate Sales Velocity<\/h2>/,
        `<h2>3. Use Paid Advertising to Accelerate Sales Velocity</h2>\n                        <p>Scale Google Shopping and Meta Ads with our <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Paid Advertising Team</a> (compare platforms in <a href="/blog/google-ads-vs-meta-ads-business" style="color: #654E9F; font-weight: 600;">Google Ads vs Meta Ads</a>).</p>`
    );

    html = html.replace(
        /<h2>4\. Create Product Pages That Eliminate Friction<\/h2>/,
        `<h2>4. Create Product Pages That Eliminate Friction</h2>\n                        <p>Engineer high-converting Shopify &amp; WooCommerce stores with our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a>.</p>`
    );

    html = html.replace(
        /<h2>5\. Plug the Leaky Funnel with Automated Retargeting<\/h2>/,
        `<h2>5. Plug the Leaky Funnel with Automated Retargeting</h2>\n                        <p>Recover up to 35% of lost revenue using automated <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Marketing</a> and lifecycle <a href="/services/email-marketing" style="color: #654E9F; font-weight: 600;">Email Sequences</a>.</p>`
    );

    html = html.replace(
        /<h2>Ready to Scale Your Online Store\?<\/h2>/,
        `<h2>Ready to Scale Your Online Store?</h2>\n                        <p>Explore online store growth metrics in our <a href="/portfolio" style="color: #fff; text-decoration: underline;">Client Portfolio</a> or <a href="/contact-us" style="color: #fff; text-decoration: underline;">Book a Free Store Audit</a>.</p>`
    );

    return html;
});

// 5. logo-vs-brand-identity-difference.html
updateBlogFile('logo-vs-brand-identity-difference.html', (html) => {
    html = html.replace(
        /<h3>2\. Brand Identity<\/h3>/,
        `<h3>2. Brand Identity</h3>\n                    <p>Our specialized <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding Agency</a> creates complete visual systems that command premium pricing.</p>`
    );

    html = html.replace(
        /<h2>Why a Logo Alone Fails to Build Customer Trust<\/h2>/,
        `<h2>Why a Logo Alone Fails to Build Customer Trust</h2>\n                        <p>A complete brand system powers cohesive <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development</a> and high-converting <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Feeds</a>.</p>`
    );

    html = html.replace(
        /<h2>Ready to Build a High-Value Brand System\?<\/h2>/,
        `<h2>Ready to Build a High-Value Brand System?</h2>\n                        <p>View brand systems, logos, and packaging in our <a href="/portfolio" style="color: #fff; text-decoration: underline;">Design Portfolio</a> or <a href="/contact-us" style="color: #fff; text-decoration: underline;">Request a Brand Consultation</a>.</p>`
    );

    return html;
});

console.log('=== COMPLETED FINAL 5 BLOGS ===');
