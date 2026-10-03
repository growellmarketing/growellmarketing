const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Meta Title & Description
html = html.replace(/<title>.*?<\/title>/i, '<title>Top Digital Marketing Agency in Ajmer | Growell Marketing</title>');
html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']>/i, '<meta name="description" content="Growell Marketing is a top digital marketing agency in Ajmer offering SEO, PPC, web design, and social media marketing to scale high-growth brands.">');

// 2. Open Graph & Twitter
html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']>/i, '<meta property="og:title" content="Digital Marketing Agency in Ajmer | Growell Marketing">');
html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']>/i, '<meta property="og:description" content="Growell Marketing is a top digital marketing agency in Ajmer offering SEO, PPC, web design, and social media marketing to scale high-growth brands.">');
html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']>/i, '<meta name="twitter:title" content="Digital Marketing Agency in Ajmer | Growell Marketing">');
html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']>/i, '<meta name="twitter:description" content="Growell Marketing is a top digital marketing agency in Ajmer offering SEO, PPC, web design, and social media marketing to scale high-growth brands.">');

// 3. Schema.org JSON-LD LocalBusiness addition
const schemaRegex = /<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i;
const newSchema = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.growellmarketing.com/#organization",
          "name": "Growell Marketing",
          "url": "https://www.growellmarketing.com/",
          "logo": "https://www.growellmarketing.com/assets/Growell_Logo_Final.webp",
          "sameAs": [
            "https://www.instagram.com/growell.marketing/",
            "https://www.facebook.com/Growell.Marketing",
            "https://x.com/growellAgency",
            "https://www.linkedin.com/company/growellmarketing",
            "https://www.youtube.com/@growellmarketing"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7850932754",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }
        },
        {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": "https://www.growellmarketing.com/#localbusiness",
          "name": "Growell Marketing",
          "image": "https://www.growellmarketing.com/assets/Growell_Logo_Final.webp",
          "telephone": "+917850932754",
          "email": "info@growellmarketing.com",
          "url": "https://www.growellmarketing.com/",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2nd Floor, Janta Colony, Vaishali Nagar",
            "addressLocality": "Ajmer",
            "addressRegion": "Rajasthan",
            "postalCode": "305001",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.4716,
            "longitude": 74.6399
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "19:00"
            }
          ],
          "sameAs": [
            "https://www.instagram.com/growell.marketing/",
            "https://www.facebook.com/Growell.Marketing",
            "https://x.com/growellAgency",
            "https://www.linkedin.com/company/growellmarketing",
            "https://www.youtube.com/@growellmarketing"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.growellmarketing.com/#website",
          "url": "https://www.growellmarketing.com/",
          "name": "Growell Marketing",
          "publisher": {
            "@id": "https://www.growellmarketing.com/#organization"
          }
        }
      ]
    }
    </script>`;

html = html.replace(schemaRegex, newSchema);

// 4. Meta Pixel & Font Loading in Head
const metaPixel = `<!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1735589957666296');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1735589957666296&ev=PageView&noscript=1"
    alt="Meta Pixel"/></noscript>
    <!-- End Meta Pixel Code -->`;

if (!html.includes('https://connect.facebook.net/en_US/fbevents.js')) {
    html = html.replace('<!-- Open Graph / Social Media Meta Tags -->', metaPixel + '\n\n    <!-- Open Graph / Social Media Meta Tags -->');
}

// Fix duplicate fetchpriority on line 72: fetchpriority="high" fetchpriority="high"
html = html.replace('fetchpriority="high" fetchpriority="high"', 'fetchpriority="high"');

// Optimize Google Fonts loading
const oldFont = `<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Lato:wght@300;400;700;900&display=swap"\s+rel="stylesheet">`;
const newFont = `<link rel="preload" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap">
    </noscript>`;
html = html.replace(new RegExp(oldFont, 'i'), newFont);

// 5. Nav logo dimensions
html = html.replace('<img src="/assets/Growell_Logo_Final.webp" width="140" alt="Growell Marketing Agency Logo" decoding="async">', '<img src="/assets/Growell_Logo_Final.webp" width="140" height="52" alt="Growell Marketing Agency Logo" decoding="async">');

// 6. Top Bar Socials and Address
const oldTopLeft = `<div class="top-left-info">[\\s\\S]*?<\\/div>\\s*<div class="top-right-socials">[\\s\\S]*?<\\/div>`;
const newTopBarContent = `<div class="top-left-info">
                    <a href="tel:+917850932754"><i class="fa-solid fa-phone"></i> +91 78509 32754</a>
                    <a href="mailto:info&#64;growellmarketing&#46;com" class="top-email-link"><i class="fa-solid fa-envelope"></i> <span>info<span style="display:none;">_no_spam_</span>&#64;growellmarketing&#46;com</span></a>
                    <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><i class="fa-solid fa-location-dot"></i> <span itemprop="streetAddress">2nd Floor, Janta Colony, Vaishali Nagar</span>, <span itemprop="addressLocality">Ajmer</span>, <span itemprop="addressRegion">Rajasthan</span> <span itemprop="postalCode">305001</span></a>
                </div>
                <div class="top-right-socials">
                    <a href="https://www.instagram.com/growell.marketing/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/Growell.Marketing" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="https://x.com/growellAgency" target="_blank" rel="noopener" aria-label="X (Twitter)"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.linkedin.com/company/growellmarketing" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://www.youtube.com/@growellmarketing" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                </div>`;
html = html.replace(new RegExp(oldTopLeft, 'i'), newTopBarContent);

// 7. Hero section inline styles replaced with utility classes
html = html.replace(/style="color: inherit; text-decoration: underline; text-decoration-color: rgba\(101,78,159,0\.4\);"/g, 'class="hero-link"');
html = html.replace('style="color: #FFD700;"', 'class="star-gold"');
html = html.replace('style="color: #25D366;"', 'class="stat-green"');
html = html.replace('style="color: #6d5ef8;"', 'class="stat-purple"');

// 8. Service grid background-image empty style removed
html = html.replace('style="background-image: url();"', '');

// 9. Service cards descriptive anchor text
html = html.replace('<a href="/services/seo-services-ajmer" class="btn-details">Read More - </a>', '<a href="/services/seo-services-ajmer" class="btn-details" aria-label="Explore SEO Services in Ajmer">Explore SEO Services &rarr;</a>');
html = html.replace('<a href="/services/social-media-marketing-ajmer" class="btn-details">Read More - </a>', '<a href="/services/social-media-marketing-ajmer" class="btn-details" aria-label="Explore Social Media Marketing in Ajmer">Explore Social Media &rarr;</a>');
html = html.replace('<a href="/services/performance-marketing-agency" class="btn-details">Read More - </a>', '<a href="/services/performance-marketing-agency" class="btn-details" aria-label="Explore Paid Advertising Agency in Ajmer">Explore Paid Advertising &rarr;</a>');
html = html.replace('<a href="/services/web-design-company-ajmer" class="btn-details">Read More - </a>', '<a href="/services/web-design-company-ajmer" class="btn-details" aria-label="Explore Website Design Company in Ajmer">Explore Web Design &rarr;</a>');
html = html.replace('<a href="/services/content-writing" class="btn-details">Read More - </a>', '<a href="/services/content-writing" class="btn-details" aria-label="Explore Content Writing Agency in Ajmer">Explore Content Writing &rarr;</a>');
html = html.replace('<a href="/services/branding-agency-ajmer" class="btn-details">Read More - </a>', '<a href="/services/branding-agency-ajmer" class="btn-details" aria-label="Explore Branding Agency in Ajmer">Explore Branding Services &rarr;</a>');
html = html.replace('<a href="/services/email-marketing" class="btn-details">Read More - </a>', '<a href="/services/email-marketing" class="btn-details" aria-label="Explore Email Marketing Agency in Ajmer">Explore Email Marketing &rarr;</a>');
html = html.replace('<a href="/services/online-reputation-management" class="btn-details">Read More - </a>', '<a href="/services/online-reputation-management" class="btn-details" aria-label="Explore Online Reputation Management Agency in Ajmer">Explore ORM Services &rarr;</a>');

// View All 8 Service Pages button
html = html.replace('<div style="text-align: center; margin-top: 40px;">\n                    <a href="/services" class="btn-primary"\n                        style="display: inline-block; padding: 14px 32px; font-size: 16px; text-decoration: none;">View\n                        All 8 Detailed Service Pages - </a>\n                </div>',
`<div class="center-btn-wrap-mt40">
                    <a href="/services" class="btn-primary btn-large-pad">View All 8 Detailed Service Pages &rarr;</a>
                </div>`);

// 10. Client logos in marquee width & height
html = html.replace(/<div class="client-logo-card"><img\s+([^>]*?)>/gis, (match, attrs) => {
    let newAttrs = attrs;
    if (!newAttrs.includes('width=')) newAttrs += ' width="140"';
    if (!newAttrs.includes('height=')) newAttrs += ' height="50"';
    return `<div class="client-logo-card"><img ${newAttrs}>`;
});

// 11. Links with inline styles in Why Choose Us
html = html.replace(/style="color: #654E9F; font-weight: 600;"/g, 'class="text-purple-link"');

// 12. Verified google review label inline style
html = html.replace('style="display: inline-flex; align-items: center; gap: 6px;"', 'class="google-review-label"');
html = html.replace('style="color: #4285F4;"', 'class="google-blue"');

// 13. Blog Card 1 Image Alt & Dimensions (Missing alt and dimensions flagged in report!)
html = html.replace('<div><img src="https://cdn.growellmarketing.com/blog-assets/e-commerce-Marketing-Strategy-That-Actually-Drives-Sales.webp" alt="" decoding="async"></div>',
'<div><img src="https://cdn.growellmarketing.com/blog-assets/e-commerce-Marketing-Strategy-That-Actually-Drives-Sales.webp" alt="How to Create an E-commerce Marketing Strategy That Actually Drives Sales" width="400" height="225" loading="lazy" decoding="async"></div>');

// Blog Card 2 & 3 Dimensions
html = html.replace('<div><img src="https://cdn.growellmarketing.com/blog-assets/7 Technical SEO Fixes.webp" alt="7 Technical SEO Fixes That Move Rankings Fastest" loading="lazy" decoding="async"></div>',
'<div><img src="https://cdn.growellmarketing.com/blog-assets/7 Technical SEO Fixes.webp" alt="7 Technical SEO Fixes That Move Rankings Fastest" width="400" height="225" loading="lazy" decoding="async"></div>');

html = html.replace('<div><img src="https://cdn.growellmarketing.com/blog-assets/High-Converting-Content-Strategy.webp" alt="How to Build a High-Converting Content Strategy That Drives Traffic and Sales" loading="lazy" decoding="async"></div>',
'<div><img src="https://cdn.growellmarketing.com/blog-assets/High-Converting-Content-Strategy.webp" alt="How to Build a High-Converting Content Strategy That Drives Traffic and Sales" width="400" height="225" loading="lazy" decoding="async"></div>');

// Blog card inline styles replaced
html = html.replace(/style="background: rgba\(101, 78, 159, 0\.12\); color: #654E9F; padding: 4px 10px; border-radius: 20px; width: fit-content; font-size: 11\.5px; font-weight: 700; text-transform: uppercase;"/g, 'class="blog-badge-tag"');
html = html.replace(/style="margin-top: auto; padding-top: 12px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba\(0,0,0,0\.06\);"/g, 'class="blog-card-meta-row"');
html = html.replace(/style="color: #654E9F; font-size: 13px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;"/g, 'class="blog-read-more-link"');

// Blog card anchor text made descriptive!
html = html.replace('Read More <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="blog-card">',
'Read E-Commerce Guide <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="blog-card">');

html = html.replace('Read More <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="blog-card">\n                        <div><img src="https://cdn.growellmarketing.com/blog-assets/High-Converting-Content-Strategy.webp"',
'Read Technical SEO Guide <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="blog-card">\n                        <div><img src="https://cdn.growellmarketing.com/blog-assets/High-Converting-Content-Strategy.webp"');

html = html.replace('Read More <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div style="text-align: center; margin-top: 36px;">',
'Read Content Strategy Guide <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div style="text-align: center; margin-top: 36px;">');

html = html.replace('<div style="text-align: center; margin-top: 36px;">', '<div class="center-btn-wrap-mt36">');

// 14. ROI calculator inline styles
html = html.replace('style="grid-template-columns: 1fr;"', 'class="roi-slider-group-single"');
html = html.replace('style="margin-bottom: 12px;"', 'class="roi-slider-mb12"');
html = html.replace('style="font-weight: 700; font-size: 17px; color: #1a1a2e;"', 'class="roi-budget-title"');
html = html.replace('style="font-size: 20px; color: #654E9F; font-weight: 800;"', 'class="roi-budget-val-highlight"');
html = html.replace('style="margin-top: 10px; width: 100%; text-align: center;"', 'class="roi-proposal-btn"');

// 15. New Footer with h3, office card (no iframe), address microdata, and social links
const footerRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/i;
const newFooter = `<footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="/" aria-label="Growell Marketing Homepage"><img src="/assets/Growell_Logo_Final.webp" width="160" height="60" alt="Growell Marketing Agency Logo" loading="lazy" decoding="async"></a>
                <p>Full-service digital marketing agency helping ambitious businesses turn clicks into high-paying customers through data-backed SEO, paid ads, web design, and social media.</p>
                <div class="footer-contact-list">
                    <a href="tel:+917850932754" class="footer-contact-item"><i class="fa-solid fa-phone"></i> +91 78509 32754</a>
                    <a href="mailto:info&#64;growellmarketing&#46;com" class="footer-contact-item"><i class="fa-solid fa-envelope"></i> <span>info<span style="display:none;">_no_spam_</span>&#64;growellmarketing&#46;com</span></a>
                    <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer" class="footer-contact-item"><i class="fa-solid fa-location-dot"></i> Vaishali Nagar, Ajmer, Rajasthan</a>
                </div>
                <div class="footer-social-wrapper">
                    <span class="footer-social-heading">Connect With Us</span>
                    <div class="footer-social-icons">
                        <a href="https://www.instagram.com/growell.marketing/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Growell.Marketing" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://x.com/growellAgency" target="_blank" rel="noopener" aria-label="X (Twitter)"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="https://www.linkedin.com/company/growellmarketing" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://www.youtube.com/@growellmarketing" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                        <a href="https://wa.me/917850932754" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
            <div>
                <h3>Company</h3>
                <ul>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/portfolio">Portfolio</a></li>
                    <li><a href="/testimonials">Testimonials</a></li>
                    <li><a href="/faq">FAQs</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h3>Core Services</h3>
                <ul>
                    <li><a href="/services/seo-services-ajmer">Search Engine Optimization (SEO)</a></li>
                    <li><a href="/services/performance-marketing-agency">Paid Advertising (Google &amp; Meta)</a></li>
                    <li><a href="/services/social-media-marketing-ajmer">Social Media Marketing</a></li>
                    <li><a href="/services/web-design-company-ajmer">Website Design &amp; Development</a></li>
                    <li><a href="/services/whatsapp-marketing">WhatsApp Marketing &amp; Automation</a></li>
                    <li><a href="/services/ecommerce-marketing-agency">E-Commerce Marketing</a></li>
                    <li><a href="/services/content-writing">Content Writing &amp; Copywriting</a></li>
                </ul>
            </div>
            <div>
                <h3>Visit Our Office</h3>
                <div class="footer-office-card">
                    <div class="footer-office-badge"><i class="fa-solid fa-location-dot"></i> Ajmer HQ</div>
                    <address class="footer-office-details" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                        <strong itemprop="name">Growell Marketing</strong><br>
                        <span itemprop="streetAddress">2nd Floor, Janta Colony, Vaishali Nagar</span><br>
                        <span itemprop="addressLocality">Ajmer</span>, <span itemprop="addressRegion">Rajasthan</span> <span itemprop="postalCode">305001</span><br>
                        <span itemprop="addressCountry">India</span>
                    </address>
                    <div class="footer-office-hours">
                        <i class="fa-regular fa-clock"></i> Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM
                    </div>
                    <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer" class="footer-map-link">
                        <i class="fa-solid fa-diamond-turn-right"></i> Get Directions on Google Maps
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <p>&copy; 2026 Growell Marketing Agency. All rights reserved. &bull; Engineered for Brand Growth.</p>
                <div class="footer-bottom-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <span class="footer-sep">&bull;</span>
                    <a href="/terms-conditions">Terms &amp; Conditions</a>
                    <span class="footer-sep">&bull;</span>
                    <a href="/faq">FAQs</a>
                    <span class="footer-sep">&bull;</span>
                    <a href="/contact-us">Support</a>
                </div>
            </div>
        </div>
    </footer>`;

html = html.replace(footerRegex, newFooter);

// 16. Audit modal header heading: replace h2 with styled div so it doesn't break document outline
html = html.replace('<h2>Get Your Free Growth Audit</h2>', '<div class="audit-modal-heading" role="heading" aria-level="2" style="font-size: 24px; font-weight: 800; color: #1a162b; margin-bottom: 8px;">Get Your Free Growth Audit</div>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html!');
