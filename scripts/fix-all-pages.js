const fs = require('fs');
const path = require('path');

const META_DATA = {
  "index.html": {
    title: "Top Digital Marketing Agency in Ajmer | Growell Marketing",
    desc: "Growell Marketing is a top digital marketing agency in Ajmer offering SEO, PPC, web design, and social media marketing to scale high-growth brands."
  },
  "about-us.html": {
    title: "About Us | Top Digital Marketing Agency in Ajmer",
    desc: "Meet Growell Marketing - a premier digital marketing agency in Ajmer helping ambitious brands scale with SEO, paid advertising, and web development."
  },
  "services.html": {
    title: "Digital Marketing Services in Ajmer | Growell Marketing",
    desc: "Explore comprehensive digital marketing services by Growell Marketing in Ajmer, including SEO, PPC ads, web design, social media, and WhatsApp automation."
  },
  "portfolio.html": {
    title: "Portfolio & Client Case Studies | Growell Marketing",
    desc: "Explore client case studies and proven growth results delivered by Growell Marketing Agency across SEO, Meta ads, Google ads, and web design in Ajmer."
  },
  "pricing.html": {
    title: "Plans & Pricing Retainers | Growell Marketing Agency",
    desc: "Explore transparent digital marketing retainer packages for SEO, Performance Ads, and Web Development at Growell Marketing Agency Ajmer."
  },
  "contact-us.html": {
    title: "Contact Growell Marketing | Digital Agency in Ajmer",
    desc: "Contact Growell Marketing Agency in Ajmer, Rajasthan. Schedule a free consultation call or request a custom proposal for SEO, paid ads, and web design."
  },
  "faq.html": {
    title: "Frequently Asked Questions (FAQ) | Growell Marketing",
    desc: "Get answers to frequently asked questions about Growell Marketing's SEO, paid ads, e-commerce scaling, web design, pricing, and agency partnerships."
  },
  "testimonials.html": {
    title: "Testimonials & Client Results | Growell Marketing",
    desc: "Read real client success stories and results achieved by Growell Marketing Agency across SEO, paid ads, social media marketing, and branding."
  },
  "privacy-policy.html": {
    title: "Privacy Policy & Data Rights | Growell Marketing",
    desc: "Growell Marketing Privacy Policy. Learn how we collect, protect, and process data globally under GDPR, UK GDPR, and DPDP Act 2023."
  },
  "terms-conditions.html": {
    title: "Terms & Conditions | Growell Marketing Agency",
    desc: "Read the official terms and conditions for digital marketing services, retainers, and website usage at Growell Marketing Agency."
  },
  "blog.html": {
    title: "Digital Marketing & SEO Blog | Growell Marketing",
    desc: "Actionable insights, SEO strategies, paid media guides, and digital marketing tutorials from the growth team at Growell Marketing Ajmer."
  },
  "thank-you.html": {
    title: "Thank You | Growell Marketing Agency Ajmer",
    desc: "Thank you for contacting Growell Marketing Agency. Our digital growth team will review your requirements and reach out within 24 hours."
  },

  // Services
  "services/branding-agency-ajmer.html": {
    title: "Branding & Identity Design Agency in Ajmer | Growell",
    desc: "Growell Marketing is a top branding agency in Ajmer offering brand identity design, strategic positioning, visual guidelines, and logo design."
  },
  "services/content-writing.html": {
    title: "Content Writing & Copywriting Agency Ajmer | Growell",
    desc: "SEO-driven content writing agency in Ajmer. We create high-converting website copy, blog posts, and authority content designed to drive revenue."
  },
  "services/ecommerce-marketing-agency.html": {
    title: "E-Commerce Marketing Agency Ajmer | Growell Marketing",
    desc: "Scale your online store with our e-commerce marketing agency in Ajmer. Data-driven SEO, Google Shopping, Meta ads, and conversion rate optimization."
  },
  "services/email-marketing.html": {
    title: "Email Marketing & Automation Agency Ajmer | Growell",
    desc: "Results-driven email marketing agency in Ajmer. Automated Klaviyo & Mailchimp email flows, newsletter design, and customer retention campaigns."
  },
  "services/online-reputation-management.html": {
    title: "Online Reputation Management (ORM) Ajmer | Growell",
    desc: "Online reputation management agency in Ajmer. Review generation, Google Business Profile defense, and search result reputation protection."
  },
  "services/performance-marketing-agency.html": {
    title: "Performance Marketing & Paid Ads Agency Ajmer | Growell",
    desc: "Data-driven performance marketing in Ajmer. We combine smart strategy, Google and Meta ads, creative testing, and CRO to turn ad spend into high revenue."
  },
  "services/seo-services-ajmer.html": {
    title: "SEO Services & Search Optimization Agency Ajmer | Growell",
    desc: "Looking for a top SEO agency in Ajmer? Growell provides technical audits, keyword rankings, and authority building to drive sustainable organic revenue."
  },
  "services/social-media-marketing-ajmer.html": {
    title: "Social Media Marketing Agency in Ajmer | Growell",
    desc: "Scale your brand presence with a top social media agency in Ajmer. Strategic content, viral reels, community growth, and revenue-focused social campaigns."
  },
  "services/web-design-company-ajmer.html": {
    title: "Website Design & Web Development Company Ajmer | Growell",
    desc: "Premier web development company in Ajmer building custom, fast, and SEO-optimized websites designed to convert traffic into qualified leads and sales."
  },
  "services/whatsapp-marketing.html": {
    title: "WhatsApp Marketing & Automation Agency Ajmer | Growell",
    desc: "Grow sales with our WhatsApp marketing agency in Ajmer. Official Business API setup, AI chatbots, broadcast funnels, and automated cart recovery."
  },

  // Blogs
  "blog/10-marketing-strategies-for-small-businesses-in-ajmer.html": {
    title: "10 Marketing Strategies for Small Businesses in Ajmer",
    desc: "Discover 10 proven marketing strategies for small businesses in Ajmer. Learn how to leverage Google Maps, local SEO, social media, and WhatsApp to scale."
  },
  "blog/7-technical-seo-fixes-that-move-rankings-fastest.html": {
    title: "7 Technical SEO Fixes That Move Rankings Fast | Growell",
    desc: "Discover 7 high-leverage technical SEO fixes that move Google rankings fastest, from crawl budget and canonicals to Core Web Vitals and Schema markup."
  },
  "blog/blog-post.html": {
    title: "7 Technical SEO Fixes That Move Rankings Fast | Growell",
    desc: "Discover 7 high-leverage technical SEO fixes that move Google rankings fastest, from crawl budget and canonicals to Core Web Vitals and Schema markup."
  },
  "blog/complete-guide-to-local-seo.html": {
    title: "Complete Guide to Local SEO for Businesses | Growell",
    desc: "Learn how to dominate Google Maps and the Local 3-Pack with our actionable step-by-step local SEO guide for small, regional, and service businesses."
  },
  "blog/digital-marketing-for-real-estate-businesses-in-ajmer.html": {
    title: "Real Estate Digital Marketing in Ajmer | Growell Guide",
    desc: "Discover 10 digital marketing strategies for real estate in Ajmer. Learn how builders and property consultants generate high-intent buyer leads online."
  },
  "blog/google-ads-vs-meta-ads-business.html": {
    title: "Google Ads vs Meta Ads: Which Is Best? | Growell Guide",
    desc: "Google Ads vs Meta Ads: compare costs, audience targeting, lead quality, and ROI to determine which advertising platform is best for your business."
  },
  "blog/google-ads-vs-seo-for-ajmer-businesses.html": {
    title: "Google Ads vs SEO for Ajmer Businesses | Growell Guide",
    desc: "Google Ads vs SEO for Ajmer businesses: compare costs, speed, lead quality, and long-term ROI to choose the best digital growth channel for your brand."
  },
  "blog/high-converting-content-strategy.html": {
    title: "High-Converting Content Strategy Guide | Growell",
    desc: "Discover top strategies to build a high-converting content marketing plan that boosts Google SEO rankings, captures qualified leads, and drives sales."
  },
  "blog/how-ai-is-changing-digital-marketing-2026.html": {
    title: "How AI Changes Digital Marketing in 2026 | Growell",
    desc: "Discover 10 essential AI trends transforming digital marketing in 2026. Learn how smart brands combine AI tools with human strategy to scale revenue."
  },
  "blog/how-ajmer-businesses-can-get-more-customers-using-digital-marketing.html": {
    title: "How Ajmer Businesses Get Customers Online | Growell",
    desc: "Discover 7 actionable ways Ajmer businesses get more customers with digital marketing, including Local SEO, Google Ads, social media, and web design."
  },
  "blog/how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales.html": {
    title: "E-Commerce Marketing Strategy That Drives Sales | Growell",
    desc: "Discover how to build a high-converting e-commerce marketing strategy that turns website visitors into buyers using SEO, Google Ads, Meta Ads, and CRO."
  },
  "blog/how-to-grow-your-business-organically-using-social-media.html": {
    title: "Grow Your Business Organically on Social Media | Growell",
    desc: "Learn how to grow your business organically on social media without relying entirely on paid advertising. A complete, actionable guide by Harsh Panwar."
  },
  "blog/how-to-rank-your-ajmer-business-on-google-in-2026.html": {
    title: "Rank Your Ajmer Business on Google in 2026 | Growell",
    desc: "Learn how to rank your Ajmer business on Google Search and Maps in 2026 using Google Business Profile optimization, local SEO, and fast mobile websites."
  },
  "blog/how-we-plan-a-month-of-high-converting-content.html": {
    title: "Plan a Month of High-Converting Content | Growell",
    desc: "Learn our proven 6-step content batching and editorial planning framework to map 30 days of high-converting, SEO-optimized content in a single afternoon."
  },
  "blog/logo-vs-brand-identity-difference.html": {
    title: "Logo vs Brand Identity: What's the Difference? | Growell",
    desc: "Discover why a logo alone will not build customer trust, and how a complete brand identity system creates market positioning and pricing power."
  },
  "blog/social-media-marketing-for-businesses-in-ajmer.html": {
    title: "Social Media Marketing in Ajmer Guide | Growell",
    desc: "Discover 10 actionable social media marketing strategies for Ajmer businesses. Learn how Instagram, reels, and local ads attract paying customers."
  },
  "blog/why-your-cpa-is-rising-and-how-to-fix-it.html": {
    title: "Why Your CPA Is Rising & How to Fix It | Growell Guide",
    desc: "Experiencing high ad costs? Discover 7 reasons why your CPA is rising on Meta and Google Ads, plus proven agency fixes to restore high-ROAS ad returns."
  }
};

const STANDARD_TOP_BAR = `<div class="top-bar">
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

const STANDARD_FOOTER = `<footer class="site-footer">
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

const META_PIXEL = `<!-- Meta Pixel Code -->
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

const LOCAL_BUSINESS_SCHEMA_SNIPPET = `{
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
        },`;

for (const [relPath, meta] of Object.entries(META_DATA)) {
    if (relPath === 'index.html') continue; // already updated!
    if (!fs.existsSync(relPath)) continue;

    let content = fs.readFileSync(relPath, 'utf8');

    // 1. Title
    content = content.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

    // 2. Meta description
    if (/<meta[^>]*name=["']description["'][^>]*content=["'].*?["']/i.test(content)) {
        content = content.replace(/<meta[^>]*name=["']description["'][^>]*content=["'].*?["']/i, `<meta name="description" content="${meta.desc}">`);
    } else {
        content = content.replace('</title>', `</title>\n    <meta name="description" content="${meta.desc}">`);
    }

    // 3. OpenGraph / Twitter descriptions
    content = content.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']>/i, `<meta property="og:title" content="${meta.title}">`);
    content = content.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']>/i, `<meta property="og:description" content="${meta.desc}">`);
    content = content.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']>/i, `<meta name="twitter:title" content="${meta.title}">`);
    content = content.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']>/i, `<meta name="twitter:description" content="${meta.desc}">`);

    // 4. Meta Pixel in head
    if (!content.includes('https://connect.facebook.net/en_US/fbevents.js')) {
        content = content.replace('</head>', `    ${META_PIXEL}\n</head>`);
    }

    // 5. Schema.org update: add LocalBusiness if JSON-LD exists
    if (content.includes('application/ld+json')) {
        if (!content.includes('LocalBusiness')) {
            if (content.includes('"@graph": [')) {
                content = content.replace('"@graph": [', `"@graph": [\n        ${LOCAL_BUSINESS_SCHEMA_SNIPPET}`);
            }
        }
        // Also update sameAs in Organization to include linkedin and youtube
        if (content.includes('"https://x.com/growellAgency"') && !content.includes('"https://www.linkedin.com/company/growellmarketing"')) {
            content = content.replace(
                '"https://x.com/growellAgency"',
                `"https://x.com/growellAgency",\n            "https://www.linkedin.com/company/growellmarketing",\n            "https://www.youtube.com/@growellmarketing"`
            );
        }
    }

    // 6. Top Bar
    if (content.includes('<div class="top-bar">')) {
        content = content.replace(/<div class="top-bar">[\s\S]*?<\/nav>/i, (match) => {
            // keep the nav, replace top-bar
            return match.replace(/<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, STANDARD_TOP_BAR);
        });
    }

    // 7. Nav logo dimensions
    content = content.replace(/<img\s+src="\/assets\/Growell_Logo_Final\.webp"\s+width="140"(?!\s+height)/g, '<img src="/assets/Growell_Logo_Final.webp" width="140" height="52"');
    content = content.replace(/<img\s+src="\/assets\/Growell_Logo_Final\.webp"(?!\s+width)(?!\s+height)/g, '<img src="/assets/Growell_Logo_Final.webp" width="140" height="52"');

    // 8. Footer
    if (content.includes('<footer class="site-footer">')) {
        content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/i, STANDARD_FOOTER);
    }

    // 9. Blog-specific heading and structural fixes
    if (relPath.startsWith('blog/')) {
        // Key Takeaway box h4 -> div.key-takeaway-title
        content = content.replace(/<div class="blog-key-takeaway">\s*<h4>([\s\S]*?)<\/h4>/gi, '<div class="blog-key-takeaway">\n                            <div class="key-takeaway-title">$1</div>');
        // Author box h4 -> div.author-name
        content = content.replace(/<div class="blog-author-info">\s*<h4>([\s\S]*?)<\/h4>/gi, '<div class="blog-author-info">\n                                <div class="author-name">$1</div>');
        // Pro-tip / Callout box h4 -> div.protip-title
        content = content.replace(/<h4>((?:Pro-Tip|Ask Yourself|Topic Cluster|Discovery &amp; Education|Week 1|The CTA Rule)[\s\S]*?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
        // Sidebar widget title h4 -> div.sidebar-widget-title
        content = content.replace(/<h4 class="sidebar-widget-title">/gi, '<div class="sidebar-widget-title" style="font-size:16px; font-weight:700; color:#1a1a2e; margin-bottom:14px;">');
        content = content.replace(/<\/h4>(\s*<div class="sidebar-topics-cloud">)/gi, '</div>$1');
        // Sidebar post title h5 -> div.sidebar-post-title
        content = content.replace(/<h5>(.*?)<\/h5>/gi, '<div class="sidebar-post-title" style="font-size:14px; font-weight:700; color:#1a1a2e; line-height:1.4;">$1</div>');
        // Script reference fix
        content = content.replace('src="../js/script.min.js"', 'src="../js/script.js"');
    }

    // 10. Pricing.html heading fix
    if (relPath === 'pricing.html') {
        if (!content.includes('Choose the Right Growth Retainer')) {
            content = content.replace('<div class="pricing-toggle-wrap">', '<div class="sec-head" style="text-align: center; margin-bottom: 24px;">\n                    <h2>Choose the Right Growth Retainer for Your Business</h2>\n                </div>\n                <div class="pricing-toggle-wrap">');
        }
    }

    // 11. Blog.html heading fix
    if (relPath === 'blog.html') {
        if (!content.includes('Latest Articles & Growth Case Studies')) {
            content = content.replace('<div class="blog-grid">', '<div class="sec-head" style="text-align: center; margin-bottom: 30px;">\n                    <h2>Latest Articles & Growth Case Studies</h2>\n                </div>\n                <div class="blog-grid">');
        }
    }

    // 12. FAQ.html heading fix
    if (relPath === 'faq.html') {
        content = content.replace(/<h3 style="font-size: 20px; color: #1a162b; margin-bottom: 8px;">No matching questions found<\/h3>/g, '<div style="font-size: 20px; font-weight: 700; color: #1a162b; margin-bottom: 8px;">No matching questions found</div>');
    }

    // 13. Portfolio.html fixes
    if (relPath === 'portfolio.html') {
        // Stream cards h4 -> h3
        content = content.replace(/<h4 class="stream-card-title">/g, '<h3 class="stream-card-title">');
        content = content.replace(/<\/h4>(\s*<div class="stream-card-action">)/g, '</h3>$1');
        if (!content.includes('Featured Client Projects &amp; Case Studies')) {
            content = content.replace('<div class="portfolio-stream-wrapper"', '<h2 class="sr-only">Featured Client Projects &amp; Case Studies</h2>\n            <div class="portfolio-stream-wrapper"');
        }
        // Lightbox image empty src fix
        content = content.replace('src="" alt="Portfolio Artwork Full Size"', 'src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E" alt="Portfolio Artwork Full Size" width="800" height="600"');
    }

    // 14. Privacy-policy.html heading fix
    if (relPath === 'privacy-policy.html') {
        content = content.replace(/<div class="legal-badge-card">\s*<h4>([\s\S]*?)<\/h4>/gi, '<div class="legal-badge-card">\n                                <h3>$1</h3>');
    }

    // 15. Performance marketing service heading fix
    if (relPath === 'services/performance-marketing-agency.html') {
        content = content.replace(/<div class="perf-why-card">\s*<div style="font-size: 28px; color: #654E9F; margin-bottom: 12px;"><i class="fa-solid fa-([^"]*)"><\/i><\/div>\s*<h4>([\s\S]*?)<\/h4>/gi,
            '<div class="perf-why-card">\n                        <div style="font-size: 28px; color: #654E9F; margin-bottom: 12px;"><i class="fa-solid fa-$1"></i></div>\n                        <h3>$2</h3>');
    }

    // 16. Services.html generic anchors fix
    if (relPath === 'services.html') {
        content = content.replace(/<a href="#service-seo" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-seo" class="btn-service-link">Explore SEO Scope &rarr;</a>');
        content = content.replace(/<a href="#service-paid-ads" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-paid-ads" class="btn-service-link">Explore Paid Ads Scope &rarr;</a>');
        content = content.replace(/<a href="#service-social-media" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-social-media" class="btn-service-link">Explore Social Media Scope &rarr;</a>');
        content = content.replace(/<a href="#service-ecommerce" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-ecommerce" class="btn-service-link">Explore E-Commerce Scope &rarr;</a>');
        content = content.replace(/<a href="#service-web-design" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-web-design" class="btn-service-link">Explore Web Design Scope &rarr;</a>');
        content = content.replace(/<a href="#service-content" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-content" class="btn-service-link">Explore Content Scope &rarr;</a>');
        content = content.replace(/<a href="#service-branding" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-branding" class="btn-service-link">Explore Branding Scope &rarr;</a>');
        content = content.replace(/<a href="#service-email" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-email" class="btn-service-link">Explore Email Scope &rarr;</a>');
        content = content.replace(/<a href="#service-orm" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-orm" class="btn-service-link">Explore ORM Scope &rarr;</a>');
        content = content.replace(/<a href="#service-whatsapp" class="btn-service-link">Learn More &rarr;<\/a>/g, '<a href="#service-whatsapp" class="btn-service-link">Explore WhatsApp Scope &rarr;</a>');
    }

    // 17. Ensure images have dimensions
    // Service icons/images
    content = content.replace(/<img\s+src="https:\/\/cdn\.growellmarketing\.com\/services-assets\/([^"]*?)"\s+alt="([^"]*?)"(?!\s+width)/g, '<img src="https://cdn.growellmarketing.com/services-assets/$1" alt="$2" width="600" height="400"');
    // Client logos
    content = content.replace(/<div class="client-logo-card"><img\s+([^>]*?)>/gis, (match, attrs) => {
        let newAttrs = attrs;
        if (!newAttrs.includes('width=')) newAttrs += ' width="140"';
        if (!newAttrs.includes('height=')) newAttrs += ' height="50"';
        return `<div class="client-logo-card"><img ${newAttrs}>`;
    });
    // Blog images in blog posts
    content = content.replace(/<img\s+src="https:\/\/cdn\.growellmarketing\.com\/blog-assets\/([^"]*?)"\s+alt="([^"]*?)"(?!\s+width)/g, '<img src="https://cdn.growellmarketing.com/blog-assets/$1" alt="$2" width="1280" height="720"');

    fs.writeFileSync(relPath, content, 'utf8');
    console.log(`Updated ${relPath}`);
}

console.log('All pages processed successfully!');
