const fs = require('fs');
const path = require('path');

console.log('=== STARTING STRATEGIC BLOG INTERNAL LINKING (16 POSTS) ===');

function updateBlog(fileName, transforms) {
    const fullPath = path.resolve(__dirname, '..', 'blog', fileName);
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    for (const { target, replacement } of transforms) {
        if (typeof target === 'string') {
            if (content.includes(target)) {
                content = content.replace(target, replacement);
                modified = true;
            } else {
                console.warn(`[WARN] String target not found in ${fileName}: ${target.substring(0, 50)}...`);
            }
        } else if (target instanceof RegExp) {
            if (target.test(content)) {
                content = content.replace(target, replacement);
                modified = true;
            } else {
                console.warn(`[WARN] Regex target not matched in ${fileName}: ${target.source.substring(0, 50)}...`);
            }
        }
    }

    if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[UPDATED BLOG] ${fileName}`);
    } else {
        console.log(`[NO CHANGES] ${fileName}`);
    }
}

// =========================================================================
// 1. google-ads-vs-seo-for-ajmer-businesses.html
// =========================================================================
updateBlog('google-ads-vs-seo-for-ajmer-businesses.html', [
    {
        target: /On the other hand, Search Engine Optimization \(SEO\) focuses on securing top organic rankings in Google Search and the Local 3-Pack on Google Maps\./,
        replacement: `On the other hand, our data-driven <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a> focus on securing top organic rankings in Google Search and the Local 3-Pack on Google Maps (learn more in our <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">Ajmer Google Ranking Guide</a>).`
    },
    {
        target: /Google Ads can provide instant visibility by placing your business at the top of Google search results when buyers search for your services\./,
        replacement: `With managed <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Google Ads &amp; Paid Advertising</a>, campaigns provide instant visibility by placing your business at the top of search results the moment high-intent buyers search for your services.`
    },
    {
        target: /Involves investment in technical website improvements, high-quality content, and local citations &mdash; but individual clicks are 100% free\./,
        replacement: `Involves investment in <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">technical website performance</a>, high-intent content, and local citations &mdash; but all organic clicks are 100% free. Explore our <a href="/pricing" style="color: #654E9F; font-weight: 600;">growth marketing packages</a>.`
    },
    {
        target: /At <strong>Growell Marketing<\/strong>, based right here in <strong>Vaishali Nagar, Ajmer<\/strong>, we specialize in helping local businesses rank #1 on Google Maps and search results\./,
        replacement: `At <strong>Growell Marketing</strong>, based in <strong>Vaishali Nagar, Ajmer</strong>, we specialize in high-ROI search marketing. Check out our verified results in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">client portfolio</a>, or request a <a href="/contact-us" style="color: #654E9F; font-weight: 600;">free growth proposal</a>.`
    }
]);

// =========================================================================
// 2. digital-marketing-for-real-estate-businesses-in-ajmer.html
// =========================================================================
updateBlog('digital-marketing-for-real-estate-businesses-in-ajmer.html', [
    {
        target: /ranking your real estate firm in Google's Local 3-Pack is the most reliable way to capture high-intent property buyers/i,
        replacement: `ranking your real estate firm in Google's Local 3-Pack via dedicated <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Local SEO Services</a> is the most reliable way to capture high-intent property buyers (read our <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">Ajmer Google Ranking Guide</a>)`
    },
    {
        target: /Targeted Meta Ads \(Facebook &amp; Instagram\) for Property Inquiries/i,
        replacement: `Targeted Meta Ads (Facebook &amp; Instagram) for Property Inquiries via <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Paid Advertising Campaigns</a>`
    },
    {
        target: /automated WhatsApp messaging for instant lead follow-up/i,
        replacement: `automated <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Marketing Automation</a> for instant lead follow-up`
    },
    {
        target: /A dedicated property landing page with high-resolution walkthroughs/i,
        replacement: `A custom property landing page built with modern <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development</a> featuring high-resolution walkthroughs`
    },
    {
        target: /Growell Marketing helps real estate builders, promoters, and consultants in Ajmer generate qualified buyer inquiries/i,
        replacement: `Growell Marketing helps real estate builders, promoters, and consultants in Ajmer generate qualified buyer inquiries. View our property campaign work in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">client portfolio</a> or <a href="/contact-us" style="color: #654E9F; font-weight: 600;">request a free property marketing audit</a>.`
    }
]);

// =========================================================================
// 3. social-media-marketing-for-businesses-in-ajmer.html
// =========================================================================
updateBlog('social-media-marketing-for-businesses-in-ajmer.html', [
    {
        target: /Social Media Marketing is one of the most powerful and cost-effective tools to attract local customers/i,
        replacement: `Our full-funnel <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing in Ajmer</a> is one of the most powerful tools to attract local customers`
    },
    {
        target: /A consistent visual theme, color palette, and professional typography/i,
        replacement: `A consistent visual theme, color palette, and professional typography crafted by our <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding &amp; Creative Team</a> (explore <a href="/blog/logo-vs-brand-identity-difference" style="color: #654E9F; font-weight: 600;">Logo vs Brand Identity</a>)`
    },
    {
        target: /Planning content 30 days in advance helps maintain consistency/i,
        replacement: `Planning content 30 days in advance (as outlined in our guide on <a href="/blog/how-we-plan-a-month-of-high-converting-content" style="color: #654E9F; font-weight: 600;">How We Plan a Month of High-Converting Content</a>) helps maintain consistency`
    },
    {
        target: /Organically growing your social media channels takes strategic craft/i,
        replacement: `Organically growing your social presence takes strategic craft &mdash; learn the full framework in <a href="/blog/how-to-grow-your-business-organically-using-social-media" style="color: #654E9F; font-weight: 600;">How to Grow Organically on Social Media</a>. Browse our creative work in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Social Media Portfolio</a>`
    }
]);

// =========================================================================
// 4. how-to-rank-your-ajmer-business-on-google-in-2026.html
// =========================================================================
updateBlog('how-to-rank-your-ajmer-business-on-google-in-2026.html', [
    {
        target: /focusing on structured Local SEO ensures your business dominates local search results when customers are looking to buy\./,
        replacement: `focusing on structured <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a> ensures your business dominates local search results when customers are ready to buy (also see our <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Complete Guide to Local SEO</a>).`
    },
    {
        target: /Under 2\.5s load time, responsive UI<\/td>/,
        replacement: `Under 2.5s load time via <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">speed-optimized web development</a> (see <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">7 Technical SEO Fixes</a>)</td>`
    },
    {
        target: /Consistent 5-star reviews with keywords<\/td>/,
        replacement: `Consistent 5-star reviews managed with <a href="/services/online-reputation-management" style="color: #654E9F; font-weight: 600;">Online Reputation Management</a></td>`
    }
]);

// =========================================================================
// 5. how-ajmer-businesses-can-get-more-customers-using-digital-marketing.html
// =========================================================================
updateBlog('how-ajmer-businesses-can-get-more-customers-using-digital-marketing.html', [
    {
        target: /Claiming and optimizing your Google Business Profile is the #1 highest-ROI marketing action/i,
        replacement: `Optimizing your Google Business Profile through dedicated <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">Local SEO in Ajmer</a> is the #1 highest-ROI marketing action`
    },
    {
        target: /WhatsApp has become the primary customer communication channel in India/i,
        replacement: `WhatsApp has become the primary customer channel in India &mdash; harness official Meta Cloud API with our <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Marketing Automation</a>`
    },
    {
        target: /Instagram Reels have revolutionized local brand discovery/i,
        replacement: `Instagram Reels have revolutionized local brand discovery through targeted <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing</a>`
    },
    {
        target: /partner with Growell Marketing to build a high-performance customer acquisition engine/i,
        replacement: `partner with Growell Marketing to build a customer acquisition engine. Explore our <a href="/blog/10-marketing-strategies-for-small-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">10 Small Business Strategies</a>, view our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio Case Studies</a>, or <a href="/contact-us" style="color: #654E9F; font-weight: 600;">Schedule a Free Consultation</a>`
    }
]);

// =========================================================================
// 6. 10-marketing-strategies-for-small-businesses-in-ajmer.html
// =========================================================================
updateBlog('10-marketing-strategies-for-small-businesses-in-ajmer.html', [
    {
        target: /Local SEO &amp; Google Maps Domination/i,
        replacement: `Local SEO &amp; Google Maps Domination with <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>`
    },
    {
        target: /A fast, mobile-friendly website that converts visitors into leads/i,
        replacement: `A fast, mobile-friendly website built by our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a> that converts visitors into leads`
    },
    {
        target: /WhatsApp Marketing &amp; Direct Messaging/i,
        replacement: `WhatsApp Marketing with Official <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation</a>`
    },
    {
        target: /Building a Memorable Brand Identity/i,
        replacement: `Building a Memorable Brand Identity with our <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding Agency</a> (read <a href="/blog/logo-vs-brand-identity-difference" style="color: #654E9F; font-weight: 600;">Logo vs Brand Identity</a>)`
    }
]);

// =========================================================================
// 7. how-ai-is-changing-digital-marketing-2026.html
// =========================================================================
updateBlog('how-ai-is-changing-digital-marketing-2026.html', [
    {
        target: /AI-Driven Content Creation &amp; Editorial Workflows/i,
        replacement: `AI-Driven Content Creation paired with Human Craft in <a href="/services/content-writing" style="color: #654E9F; font-weight: 600;">Content Writing Services</a> (see our <a href="/blog/high-converting-content-strategy" style="color: #654E9F; font-weight: 600;">Content Strategy Framework</a>)`
    },
    {
        target: /Generative AI in Search &amp; Modern SEO/i,
        replacement: `Generative AI in Search &amp; Modern SEO with <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a>`
    },
    {
        target: /Conversational AI Chatbots &amp; Customer Support/i,
        replacement: `Conversational AI Chatbots integrated into <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation</a>`
    }
]);

// =========================================================================
// 8. google-ads-vs-meta-ads-business.html
// =========================================================================
updateBlog('google-ads-vs-meta-ads-business.html', [
    {
        target: /managing high-performance paid advertising campaigns across Google and Meta/i,
        replacement: `managing high-performance campaigns through our <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Paid Advertising Services</a> (read <a href="/blog/why-your-cpa-is-rising-and-how-to-fix-it" style="color: #654E9F; font-weight: 600;">Why Your CPA Is Rising &amp; How to Fix It</a>)`
    },
    {
        target: /Search engine marketing captures existing high-intent demand/i,
        replacement: `Search marketing captures existing demand &mdash; compare it against organic search in our <a href="/blog/google-ads-vs-seo-for-ajmer-businesses" style="color: #654E9F; font-weight: 600;">Google Ads vs SEO analysis</a> and check <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services</a>`
    },
    {
        target: /A high-converting landing page is essential for both platforms/i,
        replacement: `A high-converting landing page designed by our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a> is essential for ad profitability. See our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a>`
    }
]);

// =========================================================================
// 9. complete-guide-to-local-seo.html
// =========================================================================
updateBlog('complete-guide-to-local-seo.html', [
    {
        target: /Local SEO is the practice of optimizing your online presence to attract more business from relevant local searches/i,
        replacement: `Local SEO is the practice of optimizing your online presence to attract customers &mdash; explore how our <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a> deliver top positions (also see <a href="/blog/how-to-rank-your-ajmer-business-on-google-in-2026" style="color: #654E9F; font-weight: 600;">How to Rank on Google in 2026</a>)`
    },
    {
        target: /Actively collecting and responding to customer reviews/i,
        replacement: `Actively collecting and managing customer reviews via our <a href="/services/online-reputation-management" style="color: #654E9F; font-weight: 600;">Online Reputation Management Services</a>`
    },
    {
        target: /Website speed and mobile usability directly impact your local ranking/i,
        replacement: `Website speed directly impacts local ranking &mdash; resolve bottlenecks using our <a href="/blog/7-technical-seo-fixes-that-move-rankings-fastest" style="color: #654E9F; font-weight: 600;">7 Technical SEO Fixes</a> and custom <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Web Design Services</a>. See results in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>`
    }
]);

// =========================================================================
// 10. 7-technical-seo-fixes-that-move-rankings-fastest.html
// =========================================================================
updateBlog('7-technical-seo-fixes-that-move-rankings-fastest.html', [
    {
        target: /Growell runs on every new client audit &mdash; explained in plain terms\./i,
        replacement: `Growell runs on every client audit through our <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a> &mdash; explained in plain terms (pair with our <a href="/blog/complete-guide-to-local-seo" style="color: #654E9F; font-weight: 600;">Local SEO Playbook</a>).`
    },
    {
        target: /Core Web Vitals and page speed are non-negotiable ranking signals/i,
        replacement: `Core Web Vitals are non-negotiable ranking signals &mdash; our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development Team</a> engineers sub-second load times for maximum conversion. Check our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Results</a>`
    }
]);

// =========================================================================
// 11. how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales.html
// =========================================================================
updateBlog('how-to-create-an-ecommerce-marketing-strategy-that-actually-drives-sales.html', [
    {
        target: /Turn online store visitors into paying customers using SEO, Google Ads, Meta Ads, retargeting, and CRO\./i,
        replacement: `Turn store visitors into buyers using <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO</a>, <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Performance Paid Ads</a>, retargeting, and CRO (compare channels in <a href="/blog/google-ads-vs-meta-ads-business" style="color: #654E9F; font-weight: 600;">Google Ads vs Meta Ads</a>).`
    },
    {
        target: /Abandoned cart recovery sequences sent over email and SMS/i,
        replacement: `Abandoned cart recovery sequences powered by <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation</a> and <a href="/services/email-marketing" style="color: #654E9F; font-weight: 600;">Email Marketing Flows</a>`
    },
    {
        target: /Optimizing product page UX, load speed, and checkout friction/i,
        replacement: `Optimizing product page UX and load speed with conversion-focused <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development</a>. Review live stores in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Client Portfolio</a>`
    }
]);

// =========================================================================
// 12. how-to-grow-your-business-organically-using-social-media.html
// =========================================================================
updateBlog('how-to-grow-your-business-organically-using-social-media.html', [
    {
        target: /Growing organically on social media requires consistent, high-value content and genuine audience engagement/i,
        replacement: `Growing organically on social media requires high-value content &mdash; partner with our <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing Team</a> to scale your brand (also read <a href="/blog/social-media-marketing-for-businesses-in-ajmer" style="color: #654E9F; font-weight: 600;">Social Media for Ajmer Businesses</a>)`
    },
    {
        target: /Building a content calendar eliminates guesswork and ensures consistent posting/i,
        replacement: `Building a content calendar (as explained in <a href="/blog/how-we-plan-a-month-of-high-converting-content" style="color: #654E9F; font-weight: 600;">How We Plan a Month of High-Converting Content</a>) eliminates guesswork and boosts reach`
    },
    {
        target: /Strong visual branding helps your content stand out in crowded feeds/i,
        replacement: `Strong visual branding from our <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding Agency</a> makes your posts unforgettable. See our designs in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>`
    }
]);

// =========================================================================
// 13. high-converting-content-strategy.html
// =========================================================================
updateBlog('high-converting-content-strategy.html', [
    {
        target: /A high-converting content strategy connects customer search intent with your business offerings/i,
        replacement: `A high-converting strategy crafted by our <a href="/services/content-writing" style="color: #654E9F; font-weight: 600;">Content Writing Team</a> connects customer search intent with your business offerings (see our editorial framework in <a href="/blog/how-we-plan-a-month-of-high-converting-content" style="color: #654E9F; font-weight: 600;">Monthly Content Planning</a>)`
    },
    {
        target: /Keyword mapping ensures your content targets terms customers actually search for/i,
        replacement: `Keyword mapping integrated with <a href="/services/seo-services-ajmer" style="color: #654E9F; font-weight: 600;">SEO Services in Ajmer</a> ensures your articles rank on page 1 of Google. View our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Case Studies</a>`
    }
]);

// =========================================================================
// 14. how-we-plan-a-month-of-high-converting-content.html
// =========================================================================
updateBlog('how-we-plan-a-month-of-high-converting-content.html', [
    {
        target: /Planning content 30 days ahead allows for strategic alignment and consistent quality/i,
        replacement: `Planning content 30 days ahead with our <a href="/services/content-writing" style="color: #654E9F; font-weight: 600;">Content Writing Specialists</a> allows strategic alignment (explore our <a href="/blog/high-converting-content-strategy" style="color: #654E9F; font-weight: 600;">High-Converting Content Strategy</a>)`
    },
    {
        target: /Multi-channel repurposing maximizes the value of every single asset/i,
        replacement: `Multi-channel repurposing across <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Marketing</a> and email maximizes ROI. Explore verified campaigns in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>`
    }
]);

// =========================================================================
// 15. logo-vs-brand-identity-difference.html
// =========================================================================
updateBlog('logo-vs-brand-identity-difference.html', [
    {
        target: /A logo is merely the visual symbol of a company, while brand identity encompasses the complete personality/i,
        replacement: `A logo is merely a mark, while full brand identity crafted by our <a href="/services/branding-agency-ajmer" style="color: #654E9F; font-weight: 600;">Branding Agency</a> encompasses the complete visual and psychological personality of your business`
    },
    {
        target: /Brand guidelines ensure consistent implementation across all print and digital touchpoints/i,
        replacement: `Brand guidelines ensure consistency across your <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Website Development</a> and <a href="/services/social-media-marketing-ajmer" style="color: #654E9F; font-weight: 600;">Social Media Feeds</a>. Explore our logo and identity systems in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>`
    }
]);

// =========================================================================
// 16. why-your-cpa-is-rising-and-how-to-fix-it.html
// =========================================================================
updateBlog('why-your-cpa-is-rising-and-how-to-fix-it.html', [
    {
        target: /Rising Customer Acquisition Cost \(CAC\) and Cost Per Acquisition \(CPA\) are squeezing margins/i,
        replacement: `Rising CAC and CPA are squeezing ad margins &mdash; discover how our <a href="/services/performance-marketing-agency" style="color: #654E9F; font-weight: 600;">Performance Marketing Team</a> scales profitable ROAS (compare channels in <a href="/blog/google-ads-vs-meta-ads-business" style="color: #654E9F; font-weight: 600;">Google Ads vs Meta Ads</a>)`
    },
    {
        target: /Landing page friction and slow mobile load times destroy conversion rates/i,
        replacement: `Landing page friction destroys conversions &mdash; optimize speed and UX with our <a href="/services/web-design-company-ajmer" style="color: #654E9F; font-weight: 600;">Web Development Services</a>`
    },
    {
        target: /Customer retention through email and repeat purchases lowers blended acquisition costs/i,
        replacement: `Customer retention through <a href="/services/email-marketing" style="color: #654E9F; font-weight: 600;">Email Marketing</a> and <a href="/services/whatsapp-marketing" style="color: #654E9F; font-weight: 600;">WhatsApp Automation</a> permanently lowers blended acquisition costs. See our performance metrics in our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio</a>`
    }
]);

console.log('=== COMPLETED STRATEGIC BLOG INTERNAL LINKING ===');
