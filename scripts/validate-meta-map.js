const fs = require('fs');
const path = require('path');

// Optimized Metadata Map
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

console.log('Total metadata entries mapped:', Object.keys(META_DATA).length);
for (const [k, v] of Object.entries(META_DATA)) {
  if (v.title.length < 40 || v.title.length > 60) {
    console.warn(`WARNING: ${k} title length is ${v.title.length}: "${v.title}"`);
  }
  if (v.desc.length < 120 || v.desc.length > 160) {
    console.warn(`WARNING: ${k} desc length is ${v.desc.length}: "${v.desc}"`);
  }
}
console.log('All metadata lengths checked!');
