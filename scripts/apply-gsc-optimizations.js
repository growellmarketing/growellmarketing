const fs = require('fs');
const path = require('path');

// 1. Optimize services/seo-services-ajmer.html
const seoPath = path.join(__dirname, '..', 'services', 'seo-services-ajmer.html');
let seoContent = fs.readFileSync(seoPath, 'utf8');

// Update description
seoContent = seoContent.replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Looking for the best SEO company in Ajmer? Growell provides result-driven SEO services in Ajmer, technical audits, Google 3-pack rankings, and organic growth.">'
);

// Update OG / Twitter Title
seoContent = seoContent.replace(
    /<meta property="og:title" content="[^"]*">/g,
    '<meta property="og:title" content="Best SEO Services & Top SEO Company in Ajmer | Growell Marketing">'
);
seoContent = seoContent.replace(
    /<meta name="twitter:title" content="[^"]*">/g,
    '<meta name="twitter:title" content="Best SEO Services & Top SEO Company in Ajmer | Growell Marketing">'
);

// Update OG / Twitter Description
seoContent = seoContent.replace(
    /<meta property="og:description" content="[^"]*">/g,
    '<meta property="og:description" content="Looking for the best SEO company in Ajmer? Growell provides result-driven SEO services in Ajmer, technical audits, Google 3-pack rankings, and organic growth.">'
);
seoContent = seoContent.replace(
    /<meta name="twitter:description" content="[^"]*">/g,
    '<meta name="twitter:description" content="Looking for the best SEO company in Ajmer? Growell provides result-driven SEO services in Ajmer, technical audits, Google 3-pack rankings, and organic growth.">'
);

// Update Schema Service Name & Description
seoContent = seoContent.replace(
    /"name":\s*"SEO Services Ajmer"/,
    '"name": "Best SEO Services & Top SEO Company in Ajmer"'
);
seoContent = seoContent.replace(
    /"description":\s*"Technical SEO audits, keyword strategy, and authority building services to drive organic revenue for businesses across Ajmer\."/,
    '"description": "Comprehensive SEO services in Ajmer by Growell Marketing. Technical SEO audits, local Google Maps 3-pack rankings, keyword optimization, and revenue-focused organic strategies for local businesses across Ajmer."'
);

// Update Hero H1 and Subhead
seoContent = seoContent.replace(
    /<h1>Data-Driven SEO Agency in Ajmer That Builds Organic Revenue<\/h1>\s*<p>We turn organic traffic into measurable revenue through technical SEO, on-page optimization, and off-page\s*authority building\.<\/p>/,
    '<h1>Data-Driven SEO Agency & Top SEO Company in Ajmer</h1>\n\t<p>Accelerate your search visibility with the best SEO services in Ajmer. From in-depth technical SEO fixes and Google Maps local 3-pack optimization to high-converting keyword rankings, we build sustainable organic revenue.</p>'
);

// Update Philosophy section
seoContent = seoContent.replace(
    /<h2>We Don't Just Rank Keywords - We Grow Your Business<\/h2>\s*<p>Rankings are a means, not the goal\. Our holistic approach combines <a href="\/services\/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">technical website optimization<\/a>, on-page intent optimization, and off-page authority to drive qualified leads\./,
    '<h2>We Don\'t Just Rank Keywords - We Scale Your Business</h2>\n\t<p>Rankings are a means, not the goal. As a top SEO company in Ajmer, our holistic approach combines <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">technical website optimization</a>, on-page intent optimization, and off-page authority to drive qualified local and national leads.'
);

// Update Benefits grid titles
seoContent = seoContent.replace(
    /<h3>Technical SEO Audits<\/h3>\s*<p>Site speed, crawlability, and indexing issues found and fixed\.<\/p>/,
    '<h3>Technical SEO Fixes & Audits</h3>\n\t<p>Site speed, crawlability, Core Web Vitals, and indexing issues found and fixed.</p>'
);

seoContent = seoContent.replace(
    /<h3>Local SEO & GMB Management<\/h3>\s*<p>Dominate local search and Google Maps visibility\.<\/p>/,
    '<h3>Local SEO & Google Maps in Ajmer</h3>\n\t<p>Dominate near-me searches, local citations, and Google Maps 3-pack visibility in Ajmer.</p>'
);

// Add targeted FAQs if not already added
if (!seoContent.includes('Why should I choose Growell as the best SEO company in Ajmer?')) {
    const faqAnchor = '<div class="faq-list">';
    const newFaqs = `<div class="faq-list">
\t<details class="faq-item">
\t<summary>Why should I choose Growell as the best SEO company in Ajmer?</summary>
\t<p>As a leading local SEO agency in Ajmer, we combine localized market knowledge with deep technical SEO expertise. Instead of targeting vanity keywords with zero buyer intent, we optimize for high-converting commercial searches and Google Maps 3-Pack rankings that deliver genuine phone calls, footfall, and inquiries.</p>
\t</details>
\t<details class="faq-item">
\t<summary>Can you fix technical SEO, crawling, and indexing errors on existing websites?</summary>
\t<p>Yes. Our SEO services in Ajmer include exhaustive technical site audits covering Google Search Console crawl errors, slow page load speeds, duplicate content, mobile usability issues, and Schema markup fixes so Google can index and rank your pages effortlessly.</p>
\t</details>`;
    seoContent = seoContent.replace(faqAnchor, newFaqs);
}

fs.writeFileSync(seoPath, seoContent, 'utf8');
console.log('Successfully optimized services/seo-services-ajmer.html');

// 2. Optimize services/social-media-marketing-ajmer.html
const smmPath = path.join(__dirname, '..', 'services', 'social-media-marketing-ajmer.html');
let smmContent = fs.readFileSync(smmPath, 'utf8');

// Title
smmContent = smmContent.replace(
    /<title>[^<]*<\/title>/,
    '<title>Social Media Marketing Services in Ajmer | Top SMM Agency & Company - Growell</title>'
);

// Description
smmContent = smmContent.replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Looking for expert social media marketing services in Ajmer? Growell is a top SMM agency & company delivering viral reels, Meta ads, and organic brand growth.">'
);

// OG / Twitter Title
smmContent = smmContent.replace(
    /<meta property="og:title" content="[^"]*">/g,
    '<meta property="og:title" content="Social Media Marketing Services in Ajmer | Top SMM Agency & Company - Growell">'
);
smmContent = smmContent.replace(
    /<meta name="twitter:title" content="[^"]*">/g,
    '<meta name="twitter:title" content="Social Media Marketing Services in Ajmer | Top SMM Agency & Company - Growell">'
);

// OG / Twitter Description
smmContent = smmContent.replace(
    /<meta property="og:description" content="[^"]*">/g,
    '<meta property="og:description" content="Looking for expert social media marketing services in Ajmer? Growell is a top SMM agency & company delivering viral reels, Meta ads, and organic brand growth.">'
);
smmContent = smmContent.replace(
    /<meta name="twitter:description" content="[^"]*">/g,
    '<meta name="twitter:description" content="Looking for expert social media marketing services in Ajmer? Growell is a top SMM agency & company delivering viral reels, Meta ads, and organic brand growth.">'
);

// Schema Service Name & Description
smmContent = smmContent.replace(
    /"name":\s*"Social Media Marketing Services Ajmer"/,
    '"name": "Social Media Marketing Services & SMM Agency in Ajmer"'
);
smmContent = smmContent.replace(
    /"description":\s*"Strategic social media content creation, community management, and growth strategies for brands across Ajmer\."/,
    '"description": "Comprehensive social media marketing services in Ajmer by Growell Marketing. Full-service SMM company offering viral reels, content creation, community management, and Meta ads for businesses in Ajmer."'
);

// Hero H1 and Subhead
smmContent = smmContent.replace(
    /<h1>Result-Oriented Social Media Marketing Agency in Ajmer<\/h1>\s*<p>Community growth, engagement, and platform-specific strategies that build brand communities driving\s*measurable revenue - not just vanity metrics\.<\/p>/,
    '<h1>Result-Oriented Social Media Marketing (SMM) Services in Ajmer</h1>\n\t<p>As a leading social media marketing agency and SMM company in Ajmer, we build high-converting brand communities, viral reel campaigns, and performance ads that turn followers into paying customers.</p>'
);

// Philosophy Section
smmContent = smmContent.replace(
    /<p>We balance educational, entertaining, inspirational, and promotional content to maintain a\s*healthy, high-performing feed that builds trust before it asks for the sale\.<\/p>/,
    '<p>We balance educational, entertaining, inspirational, and promotional content to maintain a healthy, high-performing feed. As an established SMM agency in Ajmer, our social media marketing services ensure your brand captures attention and trust before asking for the sale.</p>'
);

// Add targeted FAQs if not already added
if (!smmContent.includes('What is included in your social media marketing (SMM) services in Ajmer?')) {
    const faqAnchor = '<div class="faq-list">';
    const newFaqs = `<div class="faq-list">
\t<details class="faq-item">
\t<summary>What is included in your social media marketing (SMM) services in Ajmer?</summary>
\t<p>Our comprehensive SMM services in Ajmer cover end-to-end management: custom monthly content calendars, viral Instagram Reel production, high-engagement graphic posts, captions, hashtag strategies, and active community engagement. We also integrate paid Meta (Facebook & Instagram) ads for direct lead generation.</p>
\t</details>
\t<details class="faq-item">
\t<summary>Why is Growell the top social media marketing company in Ajmer for local businesses?</summary>
\t<p>Rather than simply posting static graphic templates, Growell focuses on engagement, brand recall, and business conversions. We create localized video content and trends tailored specifically to your audience in Ajmer and Rajasthan, ensuring measurable ROI.</p>
\t</details>`;
    smmContent = smmContent.replace(faqAnchor, newFaqs);
}

fs.writeFileSync(smmPath, smmContent, 'utf8');
console.log('Successfully optimized services/social-media-marketing-ajmer.html');
