const fs = require('fs');
const path = require('path');

console.log('=== STARTING DEEP INTERNAL LINKING ACROSS ALL REMAINING PAGES ===');

function updateFile(relPath, transformFn) {
    const fullPath = path.resolve(__dirname, '..', relPath);
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return;
    }
    const original = fs.readFileSync(fullPath, 'utf8');
    const updated = transformFn(original);
    if (original !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`[UPDATED] ${relPath}`);
    } else {
        console.log(`[NO CHANGE] ${relPath}`);
    }
}

// =========================================================================
// 1. UPDATE services.html (10 Service Showcase Blocks)
// =========================================================================
updateFile('services.html', (html) => {
    // 1. SEO block
    html = html.replace(
        /<p>Stop losing high-intent customer queries to competitors[\s\S]*?rank your brand at the top of Google\.<\/p>/,
        `<p>Stop losing high-intent customer queries to competitors. Our data-led SEO strategies fix <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">technical bottlenecks</a>, publish intent-focused content, and rank your brand at the top of Google (read our <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">Ajmer Google ranking playbook</a> and <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Local SEO Guide</a>). See verified organic growth in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">client portfolio</a>.</p>`
    );

    // 2. Social Media block
    html = html.replace(
        /<p>We build active digital communities that interact and buy[\s\S]*?social presence on Instagram, LinkedIn, Facebook, and YouTube\.<\/p>/,
        `<p>We build active digital communities that interact and buy - not just passive followers. From viral Reels to aesthetic visual branding, we manage your complete social presence. Check out our <a href="/blog/social-media-marketing-for-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">Ajmer Social Media Guide</a> and <a href="/blog/how-to-grow-your-business-organically-using-social-media" style="color: #654E9F; font-weight: 600;">Organic Growth Framework</a>, or explore our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">creative social media campaigns</a>.</p>`
    );

    // 3. Paid Ads block
    html = html.replace(
        /<p>Grow your business with performance marketing services built to drive traffic[\s\S]*?reach the right audience and maximize ROI\.<\/p>/,
        `<p>Grow your business with performance marketing built to drive traffic, qualify leads, and maximize ROI. Compare channels in our <a href="/blog/google-ads-vs-meta-ads-business" style="color: #654E9F; font-weight: 600;">Google Ads vs Meta Ads Guide</a> and learn <a href="/blog/why-your-cpa-is-rising-and-how-to-fix-it" style="color: #654E9F; font-weight: 600;">How to Fix Rising CPA</a>. You can also evaluate <a href="/blog/google-ads-vs-seo-for-ajmer-businesses" style="color: #654E9F; font-weight: 600;">Google Ads vs SEO for Ajmer businesses</a>.</p>`
    );

    // 4. Web Design block
    html = html.replace(
        /<p>Your website is your 24\/7 digital storefront[\s\S]*?guide leads straight into your sales pipeline\.<\/p>/,
        `<p>Your website is your 24/7 digital storefront. We craft ultra-fast, mobile-responsive, conversion-optimized websites built on strong <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">technical SEO foundations</a> (read our <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">Core Web Vitals guide</a>). Browse live client projects in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Web Design Portfolio</a>.</p>`
    );

    // 5. Content Writing block
    html = html.replace(
        /<p>Persuasive editorial copy, SEO blog posts, and landing page copy that establishes[\s\S]*?closes sales\.<\/p>/,
        `<p>Persuasive editorial copy, SEO blog posts, and landing page copy that establishes industry authority. Discover our proven frameworks in <a href="/blog/high-converting-content-strategy" style="color: #654E9F; font-weight: 600;">High-Converting Content Strategy</a> and <a href="/blog/how-we-plan-a-month-of-high-converting-content" style="color: #654E9F; font-weight: 600;">Monthly Content Planning</a>. Pair with <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Search Engine Optimization</a> to rank for top commercial queries.</p>`
    );

    // 6. Branding block
    html = html.replace(
        /<p>Complete visual branding systems including logos, color palettes[\s\S]*?command premium pricing\.<\/p>/,
        `<p>Complete visual branding systems including logos, color palettes, typography, and brand guides that command premium pricing. Learn more in our guide on <a href="/blog/logo-vs-brand-identity-difference" style="color: #654E9F; font-weight: 600;">Logo vs Brand Identity</a>, or view our brand identity systems in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a>.</p>`
    );

    // 7. Email Marketing block
    html = html.replace(
        /<p>Turn your subscriber list into an automated 24\/7 revenue channel[\s\S]*?generate repeat sales on autopilot\.<\/p>/,
        `<p>Turn your subscriber list into an automated 24/7 revenue channel. We build onboarding flows, abandoned cart recovery, and retention automations. Learn how email drives revenue in our <a href="/blog/how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales" style="color: #654E9F; font-weight: 600;">E-commerce Sales Playbook</a>, or integrate with <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation</a> for 98% open rates.</p>`
    );

    // 8. ORM block
    html = html.replace(
        /<p>Protect and strengthen the hard-earned trust of your brand[\s\S]*?best light\.<\/p>/,
        `<p>Protect and strengthen the hard-earned trust of your brand. We monitor online sentiment, suppress negative results, and accelerate 5-star Google reviews. Learn how reviews power map rankings in our <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Local SEO Guide</a>, or read real feedback on our <a href="/testimonials" style="color: #654E9F; font-weight: 600;">Customer Testimonials</a>.</p>`
    );

    // 9. E-commerce block
    html = html.replace(
        /<p>Accelerate online store sales and scale profitable revenue across Shopify[\s\S]*?lifetime value \(LTV\)\s*optimization\.<\/p>/,
        `<p>Accelerate online store sales and scale profitable revenue across Shopify and WooCommerce. Read our masterclass on <a href="/blog/how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales" style="color: #654E9F; font-weight: 600;">E-Commerce Marketing Strategy That Drives Sales</a>, and see online brand growth in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">client case studies</a>.</p>`
    );

    // 10. WhatsApp block
    html = html.replace(
        /<p>Harness the power of a 98% open rate\. We provision the official Meta WhatsApp Business[\s\S]*?phone number bans\.<\/p>/,
        `<p>Harness the power of a 98% open rate with the official Meta WhatsApp Business API. Pair with <a href="/blog/10-marketing-strategies-for-small-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">10 Marketing Strategies for Small Businesses in Ajmer</a> and our guide on <a href="/blog/how-ajmer-businesses-can-get-more-customers-using-digital-marketing" style="color: #654E9F; font-weight: 600;">How Ajmer Businesses Get More Customers</a>.</p>`
    );

    return html;
});

// =========================================================================
// 2. HELPER: Insert Related Resources Section into Service Landing Pages
// =========================================================================
function addRelatedResourcesToService(serviceFile, cardsHtml) {
    updateFile(`services/${serviceFile}`, (html) => {
        if (html.includes('<!-- Related Resources & Case Studies Section -->')) {
            return html; // already present
        }
        const insertBlock = `
        <!-- Related Resources & Case Studies Section -->
        <section class="tint">
            <div class="container">
                <div class="sec-head">
                    <p class="mini">Knowledge &amp; Results</p>
                    <h2>Related Guides, Case Studies &amp; Synergies</h2>
                    <p>Explore actionable playbooks, verified client results, and complementary services to accelerate your growth.</p>
                </div>
                <div class="benefits-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
                    ${cardsHtml}
                </div>
            </div>
        </section>
`;
        // Insert right before the FAQ section
        if (html.includes('<section class="tint">\n <div class="container">\n <div class="sec-head">\n <p class="mini">FAQ</p>')) {
            html = html.replace(
                '<section class="tint">\n <div class="container">\n <div class="sec-head">\n <p class="mini">FAQ</p>',
                insertBlock + '\n        <section class="tint">\n <div class="container">\n <div class="sec-head">\n <p class="mini">FAQ</p>'
            );
        } else if (html.includes('<section class="tint">\r\n <div class="container">\r\n <div class="sec-head">\r\n <p class="mini">FAQ</p>')) {
            html = html.replace(
                '<section class="tint">\r\n <div class="container">\r\n <div class="sec-head">\r\n <p class="mini">FAQ</p>',
                insertBlock + '\r\n        <section class="tint">\r\n <div class="container">\r\n <div class="sec-head">\r\n <p class="mini">FAQ</p>'
            );
        } else if (html.includes('<p class="mini">FAQ</p>')) {
            html = html.replace(
                /<section class="tint">\s*<div class="container">\s*<div class="sec-head">\s*<p class="mini">FAQ<\/p>/,
                insertBlock + '\n        <section class="tint">\n <div class="container">\n <div class="sec-head">\n <p class="mini">FAQ</p>'
            );
        }
        return html;
    });
}

// 2.1 SEO Services
addRelatedResourcesToService('seo-services-ajmer.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-book-open" style="color: #654E9F; margin-right: 8px;"></i> Ajmer Ranking Playbook</h3>
                        <p>Learn step-by-step how to dominate Google Maps and local 3-pack search in our <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">Google Ranking 2026 Guide</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-wrench" style="color: #654E9F; margin-right: 8px;"></i> Technical SEO Fixes</h3>
                        <p>The highest-leverage site audit fixes that move search rankings fastest. Read <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">7 Technical SEO Fixes</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-laptop-code" style="color: #654E9F; margin-right: 8px;"></i> Web Design Synergy</h3>
                        <p>Pair your SEO strategy with high-converting, lightning-fast pages from our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-folder-open" style="color: #654E9F; margin-right: 8px;"></i> Client Case Studies</h3>
                        <p>Explore real data, ranking gains, and revenue milestones in our verified <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Growth Portfolio</a>.</p>
                    </div>
`);

// 2.2 Social Media Marketing
addRelatedResourcesToService('social-media-marketing-ajmer.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-brands fa-instagram" style="color: #DB2777; margin-right: 8px;"></i> Ajmer SMM Playbook</h3>
                        <p>Discover 10 actionable tactics for local businesses in our <a href="/blog/social-media-marketing-for-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">Ajmer Social Media Guide</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-arrow-trend-up" style="color: #654E9F; margin-right: 8px;"></i> Organic Growth Engine</h3>
                        <p>Master viral reels and community building with <a href="/blog/how-to-grow-your-business-organically-using-social-media" style="color: #654E9F; font-weight: 600;">Organic Social Media Growth</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-palette" style="color: #654E9F; margin-right: 8px;"></i> Visual Brand Identity</h3>
                        <p>Elevate your social presence with cohesive grid aesthetics from our <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding Agency</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-images" style="color: #654E9F; margin-right: 8px;"></i> Creative Portfolio</h3>
                        <p>View verified campaign posters, festive graphics, and reels in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a>.</p>
                    </div>
`);

// 2.3 Web Design & Development
addRelatedResourcesToService('web-design-company-ajmer.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-gauge-high" style="color: #654E9F; margin-right: 8px;"></i> Core Web Vitals & Speed</h3>
                        <p>Discover how site performance unlocks top Google ranks in <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">7 Technical SEO Fixes</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-cart-shopping" style="color: #654E9F; margin-right: 8px;"></i> E-Commerce CRO Strategy</h3>
                        <p>Maximize Shopify & WooCommerce store revenue using our <a href="/blog/how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales" style="color: #654E9F; font-weight: 600;">E-Commerce Strategy Guide</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-magnifying-glass-chart" style="color: #654E9F; margin-right: 8px;"></i> SEO-Ready Architecture</h3>
                        <p>Build an organic search engine ready foundation with our <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-laptop-code" style="color: #654E9F; margin-right: 8px;"></i> Website Portfolio</h3>
                        <p>Explore live UI designs and client development projects in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Design Portfolio</a>.</p>
                    </div>
`);

// 2.4 Branding Agency
addRelatedResourcesToService('branding-agency-ajmer.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-compass-drafting" style="color: #654E9F; margin-right: 8px;"></i> Logo vs Brand Identity</h3>
                        <p>Learn the difference between a standalone logo and a complete brand system in <a href="/blog/logo-vs-brand-identity-difference" style="color: #654E9F; font-weight: 600;">Logo vs Brand Identity</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-laptop-code" style="color: #654E9F; margin-right: 8px;"></i> Digital Experience</h3>
                        <p>Translate brand guidelines into responsive web design with our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-bullhorn" style="color: #654E9F; margin-right: 8px;"></i> Social Media Presence</h3>
                        <p>Command audience attention across channels with our <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-award" style="color: #654E9F; margin-right: 8px;"></i> Branding Showcase</h3>
                        <p>See arena branding, packaging designs, and luxury identities in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a>.</p>
                    </div>
`);

// 2.5 Content Writing
addRelatedResourcesToService('content-writing.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-pen-nib" style="color: #654E9F; margin-right: 8px;"></i> High-Converting Content</h3>
                        <p>Connect search intent with sales conversions in our masterclass: <a href="/blog/high-converting-content-strategy" style="color: #654E9F; font-weight: 600;">High-Converting Content Strategy</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-calendar-days" style="color: #654E9F; margin-right: 8px;"></i> 30-Day Content Planning</h3>
                        <p>See behind the scenes of our monthly editorial calendar in <a href="/blog/how-we-plan-a-month-of-high-converting-content" style="color: #654E9F; font-weight: 600;">How We Plan Content</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-magnifying-glass-chart" style="color: #654E9F; margin-right: 8px;"></i> SEO Ranking Synergy</h3>
                        <p>Combine high-intent writing with technical indexing using our <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-envelope-open-text" style="color: #654E9F; margin-right: 8px;"></i> Lifecycle Email Flows</h3>
                        <p>Turn engaged readers into paying buyers with our <a href="/services/email-marketing" style="color: #654E9F; font-weight: 600;">Email Marketing Services</a>.</p>
                    </div>
`);

// 2.6 Email Marketing
addRelatedResourcesToService('email-marketing.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-cart-shopping" style="color: #654E9F; margin-right: 8px;"></i> E-Commerce Growth Guide</h3>
                        <p>Maximize lifetime customer value with our <a href="/blog/how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales" style="color: #654E9F; font-weight: 600;">E-Commerce Marketing Strategy</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-brands fa-whatsapp" style="color: #25D366; margin-right: 8px;"></i> WhatsApp Marketing</h3>
                        <p>Reach customers instantly with 98% open rates using our <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation Services</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-pen-nib" style="color: #654E9F; margin-right: 8px;"></i> Persuasive Copywriting</h3>
                        <p>Craft high-converting subject lines and promo emails with our <a href="/services/content-writing" style="color: #654E9F; font-weight: 600;">Content Writing Services</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-chart-line" style="color: #654E9F; margin-right: 8px;"></i> Lowering Ad CPA</h3>
                        <p>Offset rising advertising acquisition costs with lifecycle retention. Read <a href="/blog/why-your-cpa-is-rising-and-how-to-fix-it" style="color: #654E9F; font-weight: 600;">Why Your CPA Is Rising</a>.</p>
                    </div>
`);

// 2.7 Online Reputation Management
addRelatedResourcesToService('online-reputation-management.html', `
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-location-dot" style="color: #654E9F; margin-right: 8px;"></i> Local SEO Authority</h3>
                        <p>Learn how customer reviews directly power Google Maps rankings in our <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Local SEO Guide</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-magnifying-glass-chart" style="color: #654E9F; margin-right: 8px;"></i> Search Engine Dominance</h3>
                        <p>Suppress negative results while ranking authoritative assets with <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-star" style="color: #FFD700; margin-right: 8px;"></i> Verified Client Reviews</h3>
                        <p>See how 5-star customer feedback transforms business perception on our <a href="/testimonials" style="color: #654E9F; font-weight: 600;">Customer Testimonials</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-comments" style="color: #654E9F; margin-right: 8px;"></i> WhatsApp Feedback Loop</h3>
                        <p>Automate 5-star Google review collection via automated flows from <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation</a>.</p>
                    </div>
`);

// 2.8 WhatsApp Marketing
updateFile('services/whatsapp-marketing.html', (html) => {
    if (html.includes('<!-- Related Resources & Case Studies Section -->')) return html;
    const insertBlock = `
        <!-- Related Resources & Case Studies Section -->
        <section>
            <div class="container">
                <div class="sec-head">
                    <p class="mini">Knowledge &amp; Results</p>
                    <h2>Related Guides, Case Studies &amp; Synergies</h2>
                    <p>Explore actionable playbooks, verified client results, and complementary services to accelerate your growth.</p>
                </div>
                <div class="benefits-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-store" style="color: #654E9F; margin-right: 8px;"></i> Small Business Strategies</h3>
                        <p>Explore 10 powerful growth channels for Ajmer businesses in our <a href="/blog/10-marketing-strategies-for-small-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">Ajmer Business Playbook</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-users" style="color: #654E9F; margin-right: 8px;"></i> Customer Acquisition</h3>
                        <p>Discover 7 practical ways to acquire local buyers with <a href="/blog/how-ajmer-businesses-can-get-more-customers-using-digital-marketing" style="color: #654E9F; font-weight: 600;">How Ajmer Businesses Get Customers</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-envelope-open-text" style="color: #654E9F; margin-right: 8px;"></i> Omnichannel Automation</h3>
                        <p>Pair instant WhatsApp messaging with structured drip funnels from our <a href="/services/email-marketing" style="color: #654E9F; font-weight: 600;">Email Marketing Team</a>.</p>
                    </div>
                    <div class="benefit-card">
                        <h3><i class="fa-solid fa-share-nodes" style="color: #654E9F; margin-right: 8px;"></i> Click-to-WhatsApp Ads</h3>
                        <p>Fuel your WhatsApp funnel with targeted Meta ad campaigns from our <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Team</a>.</p>
                    </div>
                </div>
            </div>
        </section>
`;
    return html.replace('<!-- Frequently Asked Questions -->', insertBlock + '\n        <!-- Frequently Asked Questions -->');
});

// In-content additions to service pages (Philosophy / What's Included)
updateFile('services/seo-services-ajmer.html', (html) => {
    html = html.replace(
        /<p>Rankings are a means, not the goal\. Our holistic approach combines technical SEO, on-page\s*optimization, and off-page authority building to drive qualified leads, not vanity metrics\.\s*<\/p>/,
        `<p>Rankings are a means, not the goal. Our holistic approach combines <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">technical website optimization</a>, on-page intent optimization, and off-page authority to drive qualified leads. Check our actionable guides on <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">ranking on Google in 2026</a> and our <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Local SEO Playbook</a>.</p>`
    );
    return html;
});

updateFile('services/web-design-company-ajmer.html', (html) => {
    html = html.replace(
        /Built-in Technical SEO Foundations/,
        `Built-in <a href="/services/seo-services-ajmer" style="color: inherit; font-weight: 600;">Technical SEO Foundations</a>`
    );
    return html;
});

updateFile('services/social-media-marketing-ajmer.html', (html) => {
    html = html.replace(
        /Brand Voice &amp; Grid Aesthetics/,
        `Brand Voice &amp; Grid Aesthetics (paired with <a href="/services/branding-agency-ajmer" style="color: inherit; font-weight: 600;">Visual Branding</a>)`
    );
    return html;
});

// =========================================================================
// 3. UPDATE faq.html (Contextual In-Answer Links)
// =========================================================================
updateFile('faq.html', (html) => {
    // 3.1 E-Commerce SEO question
    html = html.replace(
        /<p>Absolutely\. E-commerce SEO captures buyers searching with commercial intent[\s\S]*?blended Customer Acquisition Cost \(CAC\) permanently\.<\/p>/,
        `<p>Absolutely. E-commerce SEO captures buyers searching with commercial intent (e.g., "buy handcrafted leather bags online"). Read our complete guide on <a href="/blog/how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales" style="color: #654E9F; font-weight: 600;">E-commerce Marketing Strategies That Actually Drive Sales</a>, or consult our <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>.</p>`
    );

    // 3.2 How long until results
    html = html.replace(
        /<p>SEO and organic content typically yield measurable momentum in 60 to 90 days[\s\S]*?immediate traffic within 48 to 72 hours\.<\/p>/,
        `<p><a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO</a> and organic content typically yield measurable momentum in 60 to 90 days (learn more in our <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">7 Technical SEO Fixes guide</a>). Performance Ads deliver immediate traffic within 48 to 72 hours &mdash; compare them in our <a href="/blog/google-ads-vs-seo-for-ajmer-businesses" style="color: #654E9F; font-weight: 600;">Google Ads vs SEO guide</a>.</p>`
    );

    // 3.3 Website importance
    html = html.replace(
        /<p>Yes, your website is your digital flagship[\s\S]*?high bounce rates and poor conversions\.<\/p>/,
        `<p>Yes, your website is your digital flagship. Even high-performing ad campaigns fail if a dated landing page repels visitors. Explore our conversion-first <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Design Services</a> and view client websites in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>.</p>`
    );

    // 3.4 WhatsApp marketing
    html = html.replace(
        /<p>WhatsApp boasts an unprecedented 98% open rate[\s\S]*?unauthorized bulk texting tools\.<\/p>/,
        `<p>WhatsApp boasts an unprecedented 98% open rate. We build official Meta API automations with zero ban risk &mdash; learn more about our <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Marketing Solutions</a>, or read how local shops scale in our <a href="/blog/10-marketing-strategies-for-small-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">Ajmer Small Business Playbook</a>.</p>`
    );

    // 3.5 Pricing question
    html = html.replace(
        /<p>We offer transparent tier packages starting at &#8377;25,000\/month[\s\S]*?tailored roadmap\.<\/p>/,
        `<p>We offer transparent tier packages starting at &#8377;25,000/month for startups up to comprehensive enterprise retainers. Check our full breakdown on our <a href="/pricing" style="color: #654E9F; font-weight: 600;">Pricing Page</a> or <a href="/contact-us" style="color: #654E9F; font-weight: 600;">request a free proposal</a>.</p>`
    );

    return html;
});

console.log('=== COMPLETED SERVICES.HTML, 8 SERVICE PAGES & FAQ.HTML ===');
