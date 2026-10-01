const fs = require('fs');
const path = require('path');

console.log('--- Starting Comprehensive SEO Internal Linking ---');

// Helper to safely read and write file with UTF8
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
        console.log(`[NO CHANGE / ALREADY UP TO DATE] ${relPath}`);
    }
}

// =========================================================================
// 1. UPDATE about-us.html
// =========================================================================
updateFile('about-us.html', (html) => {
    // 1.1 Our Story
    html = html.replace(
        /<p>We take the time to understand what our clients have built[\s\S]*?that's exactly how we want it\.\s*<\/p>/,
        `<p>We take the time to understand what our clients have built, where they want to go and what is getting in the way. From there, we bring together tailored <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Search Engine Optimization</a>, high-converting <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing</a>, and modern <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development</a> to build marketing that works for their business. Explore our full suite of <a href="/services" style="color: #654E9F; font-weight: 600;">digital marketing services</a> or review verified client results in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">portfolio</a>.</p>`
    );

    // 1.2 Our Approach Pillars
    html = html.replace(
        /<div class="pillar-card">\s*<h3>Understand<\/h3>\s*<p>[\s\S]*?holding your business\s*back\.\s*<\/p>/,
        `<div class="pillar-card">\n                        <h3>Understand</h3>\n                        <p>We take the time to understand your goals, your customers and what is holding your business back. We start every partnership with a comprehensive <a href="/contact-us" style="color: #654E9F; font-weight: 600;">free growth audit</a>.</p>`
    );

    html = html.replace(
        /<div class="pillar-card">\s*<h3>Create<\/h3>\s*<p>[\s\S]*?business actually\s*needs\.\s*<\/p>/,
        `<div class="pillar-card">\n                        <h3>Create</h3>\n                        <p>We build the right strategy, high-intent <a href="/services/content-writing" style="color: #654E9F; font-weight: 600;">content marketing</a>, and cohesive <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">brand identity</a> around what your business actually needs.</p>`
    );

    html = html.replace(
        /<div class="pillar-card">\s*<h3>Grow<\/h3>\s*<p>[\s\S]*?business growth\s*<\/p>/,
        `<div class="pillar-card">\n                        <h3>Grow</h3>\n                        <p>We accelerate revenue through <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp automation</a> and <a href="/services/email-marketing" style="color: #654E9F; font-weight: 600;">lifecycle email campaigns</a>. Read verified feedback on our <a href="/testimonials" style="color: #654E9F; font-weight: 600;">client testimonials</a>.</p>`
    );

    // 1.3 Team bios
    html = html.replace(
        /4\+ years of experience managing digital campaigns and web development projects/,
        `4+ years of experience managing digital campaigns and <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">web development</a> projects`
    );

    // 1.4 Trusted by
    html = html.replace(
        /<h2>Brands That Grow With Us<\/h2>/,
        `<h2>Brands That Grow With Us</h2>\n                    <p style="text-align:center; color:#555; max-width:650px; margin: 10px auto 0;">See real results across our client partnerships in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">client case studies</a>.</p>`
    );

    return html;
});

// =========================================================================
// 2. UPDATE portfolio.html
// =========================================================================
updateFile('portfolio.html', (html) => {
    // 2.1 Header description
    html = html.replace(
        /<p>Measurable growth and real ROI - a look at how we've helped brands turn strategy into revenue\.<\/p>/,
        `<p>Measurable growth and real ROI - a look at how we've helped brands turn strategy into revenue. Explore client work delivered across <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding & Identity</a>, <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing</a>, <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development</a>, and <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Search Engine Optimization</a>.</p>`
    );

    // 2.2 Form section
    html = html.replace(
        /<h2>Tell Us About Your Business<\/h2>/,
        `<h2>Tell Us About Your Business</h2>\n                    <p style="text-align: center; color: #555; margin-bottom: 25px;">Interested in custom project scopes? Explore our <a href="/services" style="color: #654E9F; font-weight: 600;">Services Overview</a> or check our <a href="/faq" style="color: #654E9F; font-weight: 600;">FAQs</a>.</p>`
    );

    // 2.3 Reviews description
    html = html.replace(
        /<p>Read authentic feedback from founders and brand leaders who scaled their business with Growell Marketing\.<\/p>/,
        `<p>Read authentic feedback from founders and brand leaders who scaled their business with Growell Marketing. See all reviews on our <a href="/testimonials" style="color: #654E9F; font-weight: 600;">Testimonials Page</a>.</p>`
    );

    return html;
});

// =========================================================================
// 3. UPDATE pricing.html
// =========================================================================
updateFile('pricing.html', (html) => {
    // 3.1 Starter card
    html = html.replace(
        /<li>1-2 Core Services \(e\.g\. SEO \+ Social\)<\/li>/,
        `<li>1-2 Core Services (e.g. <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO</a> + <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media</a>)</li>`
    );

    // 3.2 Scale card
    html = html.replace(
        /<li>3-4 Integrated Core Services<\/li>/,
        `<li>3-4 Integrated Services (<a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO</a>, <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Web Design</a>, <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social</a>, <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp</a>)</li>`
    );

    // 3.3 Enterprise card
    html = html.replace(
        /<li>Full-Suite 8-Service Access<\/li>/,
        `<li>Full-Suite <a href="/services" style="color: #654E9F; font-weight: 600;">8-Service Access</a></li>`
    );

    // 3.4 Table footer notice
    if (!html.includes('Want to see proof before picking a plan?')) {
        html = html.replace(
            /<\/table>\s*<\/div>/,
            `</table>\n                </div>\n                <p style="text-align: center; margin-top: 25px; color: #555;">Want to see proof before picking a plan? Browse our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Case Studies</a>, read verified <a href="/testimonials" style="color: #654E9F; font-weight: 600;">Customer Testimonials</a>, or check our <a href="/faq" style="color: #654E9F; font-weight: 600;">Frequently Asked Questions</a>.</p>`
        );
    }

    return html;
});

// =========================================================================
// 4. UPDATE testimonials.html
// =========================================================================
updateFile('testimonials.html', (html) => {
    // 4.1 Header intro
    html = html.replace(
        /<p>Real results from real businesses - a premium, results-driven track record you can verify\.<\/p>/,
        `<p>Real results from real businesses - a premium, results-driven track record you can verify. View our visual creatives in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a> or explore our full suite of <a href="/services" style="color: #654E9F; font-weight: 600;">Digital Marketing Services</a>.</p>`
    );

    // 4.2 Review tags linking
    html = html.replace(
        /Meta Ads &amp; E-commerce<\/div>/,
        `Meta Ads &amp; <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media</a> &bull; <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Paid Ads</a></div>`
    );

    html = html.replace(
        /Meta &amp; Google Ads<\/div>/,
        `<a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Meta &amp; Google Ads</a></div>`
    );

    html = html.replace(
        /Ajmer, Rajasthan<\/div>/,
        `Ajmer &bull; <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Local SEO</a></div>`
    );

    html = html.replace(
        /Digital Marketing Ajmer<\/div>/,
        `<a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Web Design</a> &amp; Digital Marketing</div>`
    );

    // 4.3 CTA Banner
    html = html.replace(
        /<p>Book a free consultation and get a custom growth plan for your brand - no obligation, no fluff\.\s*<\/p>/,
        `<p>Book a free consultation and get a custom growth plan for your brand. Check our <a href="/pricing" style="color: #fff; text-decoration: underline; font-weight: 600;">pricing packages</a> or reach out directly.</p>`
    );

    return html;
});

// =========================================================================
// 5. UPDATE contact-us.html
// =========================================================================
updateFile('contact-us.html', (html) => {
    html = html.replace(
        /<p>We respond to every inquiry within 24 hours &ndash; direct support from our growth team\.<\/p>/,
        `<p>We respond to every inquiry within 24 hours &ndash; direct support from our growth team. Need to explore first? Check our <a href="/services" style="color: #654E9F; font-weight: 600;">Full Services</a>, review our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>, or browse the <a href="/faq" style="color: #654E9F; font-weight: 600;">FAQ knowledge base</a>.</p>`
    );
    return html;
});

// =========================================================================
// 6. UPDATE blog.html
// =========================================================================
updateFile('blog.html', (html) => {
    html = html.replace(
        /<p>Practical marketing insights from a team that runs real campaigns every day\.<\/p>/,
        `<p>Practical marketing insights from a team that runs real campaigns every day. Need strategic execution? Explore our specialized <a href="/services" style="color: #654E9F; font-weight: 600;">Marketing Services</a>, see real-world results in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a>, or <a href="/contact-us" style="color: #654E9F; font-weight: 600;">request a free audit</a>.</p>`
    );
    return html;
});

console.log('--- Completed Core Institutional Pages ---');
