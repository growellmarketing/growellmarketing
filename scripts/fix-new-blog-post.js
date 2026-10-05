const fs = require('fs');

const file = 'blog/how-much-does-digital-marketing-cost-in-ajmer.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Meta Pixel in head if missing
if (!content.includes('1735589957666296')) {
    const pixelCode = `    <!-- Meta Pixel Code -->
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
    <!-- End Meta Pixel Code -->
</head>`;
    content = content.replace('</head>', pixelCode);
}

// 2. Add LocalBusiness to JSON-LD Schema
if (!content.includes('"LocalBusiness"')) {
    const lbSnippet = `        {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": "https://www.growellmarketing.com/#localbusiness",
          "name": "Growell Marketing",
          "image": "https://www.growellmarketing.com/assets/Growell_Logo_Final.webp",
          "telephone": "+917850932754",
          "email": "info@growellmarketing.com",
          "url": "https://www.growellmarketing.com/",
          "priceRange": "$",
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
            "latitude": 26.4797,
            "longitude": 74.6399
          },
          "sameAs": [
            "https://www.instagram.com/growell.marketing/",
            "https://www.facebook.com/Growell.Marketing",
            "https://x.com/growellAgency",
            "https://www.linkedin.com/company/growellmarketing",
            "https://www.youtube.com/@growellmarketing"
          ]
        },
`;
    content = content.replace('"@graph": [', '"@graph": [\n' + lbSnippet);
}

// 3. Top bar replacement
const oldTopBarRegex = /<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newTopBar = `<div class="top-bar">
            <div class="top-bar-container">
                <div class="top-left-info">
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
                </div>
            </div>
        </div>`;
content = content.replace(oldTopBarRegex, newTopBar);

// 4. Nav logo
content = content.replace(
    '<img src="/assets/Growell_Logo_Final.webp" width="140" alt="Growell Logo">',
    '<img src="/assets/Growell_Logo_Final.webp" width="140" height="52" alt="Growell Marketing Agency Logo" decoding="async">'
);

// 5. Dropdown links in nav
content = content.replace('<li><a href="/services/social-media-marketing-services">Social Media Marketing</a></li>', '<li><a href="/services/social-media-marketing-ajmer">Social Media Marketing</a></li>');
content = content.replace('<li><a href="/services/seo">SEO</a></li>', '<li><a href="/services/seo-services-ajmer">SEO</a></li>');
content = content.replace('<li><a href="/services/paid-advertising">Paid Advertising</a></li>', '<li><a href="/services/performance-marketing-agency">Paid Advertising</a></li>');
content = content.replace('<li><a href="/services/web-design">Website Design</a></li>', '<li><a href="/services/web-design-company-ajmer">Website Design</a></li>');

// 6. Hero Banner image
content = content.replace(
    '<img src="/blog-assets/how-much-does-digital-marketing-cost-in-ajmer.webp" alt="How Much Does Digital Marketing Cost in Ajmer Pricing Guide - Growell Marketing" loading="lazy">',
    '<img src="/blog-assets/how-much-does-digital-marketing-cost-in-ajmer.webp" alt="How Much Does Digital Marketing Cost in Ajmer Pricing Guide - Growell Marketing" width="1024" height="576" loading="lazy" decoding="async">'
);

// 7. Headings in Key Takeaway, Author, Sidebar
content = content.replace(
    '<h4><i class="fa-solid fa-lightbulb"></i> Key Takeaway</h4>',
    '<div class="key-takeaway-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;"><i class="fa-solid fa-lightbulb"></i> Key Takeaway</div>'
);
content = content.replace(
    '<h4>Written by Pintu Nath</h4>',
    '<div class="author-name" style="font-weight:700; font-size:16px; margin-bottom:4px;">Written by Pintu Nath</div>'
);
content = content.replace(
    '<h4>Pintu Nath</h4>',
    '<div class="sidebar-author-name" style="font-weight:700; font-size:16px; margin-bottom:2px;">Pintu Nath</div>'
);
content = content.replace(
    /<h4 class="sidebar-widget-title">(.*?)<\/h4>/g,
    '<div class="sidebar-widget-title" style="font-size:16px; font-weight:700; color:#1a1a2e; margin-bottom:14px;">$1</div>'
);
content = content.replace(
    /<h5>(.*?)<\/h5>/g,
    '<div class="sidebar-post-title" style="font-size:14px; font-weight:700; color:#1a1a2e; line-height:1.4;">$1</div>'
);

// 8. Sidebar post images
content = content.replace(
    '<img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" class="sidebar-post-img" alt="Google Ads vs SEO Ajmer" loading="lazy">',
    '<img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" class="sidebar-post-img" alt="Google Ads vs SEO Ajmer" width="1024" height="576" loading="lazy" decoding="async">'
);
content = content.replace(
    '<img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" class="sidebar-post-img" alt="Real Estate Marketing Ajmer" loading="lazy">',
    '<img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" class="sidebar-post-img" alt="Real Estate Marketing Ajmer" width="1024" height="576" loading="lazy" decoding="async">'
);

// 9. Related blog cards at bottom
const oldRelated = `<div class="blog-card">
                        <div class="blog-img" style="background-image: url('/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp'); background-size: cover; background-position: center; height: 180px;"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag" style="background: rgba(101, 78, 159, 0.12); color: #654E9F;">Search Strategy</span>
                            <h3><a href="/blog/google-ads-vs-seo-for-ajmer-businesses" class="link-inherit">Google Ads vs SEO for Ajmer Businesses</a></h3>
                            <p>Compare costs, speed, and ROI between Google Ads and Local SEO.</p>
                            <p class="blog-meta">By Pintu Nath &middot; Sep 29, 2026</p>
                        </div>
                    </div>
                    <div class="blog-card">
                        <div class="blog-img" style="background-image: url('/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp'); background-size: cover; background-position: center; height: 180px;"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag" style="background: rgba(101, 78, 159, 0.12); color: #654E9F;">Real Estate</span>
                            <h3><a href="/blog/digital-marketing-for-real-estate-businesses-in-ajmer" class="link-inherit">Digital Marketing for Real Estate Businesses in Ajmer</a></h3>
                            <p>Discover 10 effective strategies for property dealers and builders.</p>
                            <p class="blog-meta">By Pawan Panwar &middot; Sep 15, 2026</p>
                        </div>
                    </div>
                    <div class="blog-card">
                        <div class="blog-img" style="background-image: url('/blog-assets/social-media-marketing-for-businesses-in-ajmer.webp'); background-size: cover; background-position: center; height: 180px;"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag" style="background: rgba(101, 78, 159, 0.12); color: #654E9F;">Social Media</span>
                            <h3><a href="/blog/social-media-marketing-for-businesses-in-ajmer" class="link-inherit">Social Media Marketing for Businesses in Ajmer</a></h3>
                            <p>Discover 10 effective social media strategies to attract more customers.</p>
                            <p class="blog-meta">By Pintu Nath &middot; Sep 8, 2026</p>
                        </div>
                    </div>`;

const newRelated = `<div class="blog-card">
                        <div class="blog-img"><img src="/blog-assets/google-ads-vs-seo-for-ajmer-businesses.webp" alt="Google Ads vs SEO for Ajmer Businesses" width="1024" height="576" loading="lazy" decoding="async"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag" style="background: rgba(101, 78, 159, 0.12); color: #654E9F;">Search Strategy</span>
                            <h3><a href="/blog/google-ads-vs-seo-for-ajmer-businesses" class="link-inherit">Google Ads vs SEO for Ajmer Businesses</a></h3>
                            <p>Compare costs, speed, and ROI between Google Ads and Local SEO.</p>
                            <p class="blog-meta">By Pintu Nath &middot; Sep 29, 2026</p>
                        </div>
                    </div>
                    <div class="blog-card">
                        <div class="blog-img"><img src="/blog-assets/digital-marketing-for-real-estate-businesses-in-ajmer.webp" alt="Digital Marketing for Real Estate Businesses in Ajmer" width="1024" height="576" loading="lazy" decoding="async"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag" style="background: rgba(101, 78, 159, 0.12); color: #654E9F;">Real Estate</span>
                            <h3><a href="/blog/digital-marketing-for-real-estate-businesses-in-ajmer" class="link-inherit">Digital Marketing for Real Estate Businesses in Ajmer</a></h3>
                            <p>Discover 10 effective strategies for property dealers and builders.</p>
                            <p class="blog-meta">By Pawan Panwar &middot; Sep 15, 2026</p>
                        </div>
                    </div>
                    <div class="blog-card">
                        <div class="blog-img"><img src="/blog-assets/social-media-marketing-for-businesses-in-ajmer.webp" alt="Social Media Marketing for Businesses in Ajmer" width="1024" height="576" loading="lazy" decoding="async"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag" style="background: rgba(101, 78, 159, 0.12); color: #654E9F;">Social Media</span>
                            <h3><a href="/blog/social-media-marketing-for-businesses-in-ajmer" class="link-inherit">Social Media Marketing for Businesses in Ajmer</a></h3>
                            <p>Discover 10 effective social media strategies to attract more customers.</p>
                            <p class="blog-meta">By Pintu Nath &middot; Sep 8, 2026</p>
                        </div>
                    </div>`;

content = content.replace(oldRelated, newRelated);

// 10. Footer replacement
const oldFooterRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/;
const newFooter = `<footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="/"><img src="/assets/Growell_Logo_Final.webp" width="160" height="60" alt="Growell Marketing Agency Logo" loading="lazy" decoding="async"></a>
                <p>Full-service digital marketing agency helping small and growing businesses turn visitors into customers through SEO, social, content, and paid ads.</p>
                <div class="footer-social-wrapper">
                    <span class="footer-social-heading">Connect With Us</span>
                    <div class="footer-social-icons">
                        <a href="https://www.instagram.com/growell.marketing/" target="_blank" rel="noopener" aria-label="Instagram" class="social-insta"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Growell.Marketing" target="_blank" rel="noopener" aria-label="Facebook" class="social-fb"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://x.com/growellAgency" target="_blank" rel="noopener" aria-label="X (Twitter)" class="social-x"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="https://www.linkedin.com/company/growellmarketing" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-linkedin"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://www.youtube.com/@growellmarketing" target="_blank" rel="noopener" aria-label="YouTube" class="social-yt"><i class="fa-brands fa-youtube"></i></a>
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
            <p>&copy; 2026 Growell Marketing. All rights reserved.</p>
            <div class="footer-bottom-links">
                <a href="/privacy-policy">Privacy Policy</a>
            </div>
        </div>
    </footer>`;

content = content.replace(oldFooterRegex, newFooter);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated blog/how-much-does-digital-marketing-cost-in-ajmer.html');
