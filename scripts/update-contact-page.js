const fs = require('fs');
const path = require('path');

const contactPath = 'e:/Growell Marketing/contact-us.html';
let content = fs.readFileSync(contactPath, 'utf8');

// 1. Add FAQs to navbar in contact-us.html
content = content.replace(
  '<li><a href="/portfolio">Portfolio</a></li>',
  '<li><a href="/portfolio">Portfolio</a></li>\n                    <li><a href="/faq">FAQs</a></li>'
);

// 2. Redesign Main Body of contact-us.html
const oldMainRegex = /<main>[\s\S]*?<\/main>/i;

const newMain = `<main>

        <section class="page-header contact-hero-wrap">
            <div class="hero-badge" style="margin: 0 auto 16px;">
                <i class="fa-solid fa-bolt" style="color: #FFD700; margin-right: 6px;"></i> Guaranteed 24-Hour Response Time
            </div>
            <h1>Let's Build Something <span class="hero-highlight">Great Together</span></h1>
            <p>Ready to scale your business with predictable customer acquisition? Schedule your free growth consultation with our senior strategy team. Need to explore first? Check our <a href="/services" style="color: #654E9F; font-weight: 600;">Full Services</a>, review our <a href="/portfolio" style="color: #654E9F; font-weight: 600;">Portfolio Case Studies</a>, or browse our <a href="/faq" style="color: #654E9F; font-weight: 600;">FAQ knowledge base</a>.</p>
            
            <div class="contact-hero-trust">
                <span class="contact-hero-trust-item"><i class="fa-solid fa-calendar-check" style="color: #22c55e;"></i> 100% Free Strategy Call</span>
                <span class="contact-hero-trust-item"><i class="fa-solid fa-shield-halved" style="color: #654E9F;"></i> Strict NDA &amp; Privacy Guaranteed</span>
                <span class="contact-hero-trust-item"><i class="fa-solid fa-star" style="color: #f59e0b;"></i> 4.9/5 Rating (250+ Brands)</span>
            </div>
        </section>

        <!-- Main Contact Grid (Form + Live Contact Hub) -->
        <section class="contact-section-wrap">
            <div class="container">
                <div class="contact-grid">
                    <!-- High-Converting Glass Contact Form -->
                    <form id="contactForm" class="contact-form">
                        <div class="contact-form-header">
                            <span class="form-header-badge"><i class="fa-solid fa-paper-plane"></i> Quick Proposal Request</span>
                            <h3>Send Us a Message</h3>
                            <p>Fill out the details below and our team will analyze your business before we speak.</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label><i class="fa-regular fa-user" style="color: #654E9F; margin-right: 4px;"></i> Full Name <span class="required">*</span></label>
                                <input type="text" placeholder="e.g. Rahul Sharma" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fa-regular fa-envelope" style="color: #654E9F; margin-right: 4px;"></i> Work Email <span class="required">*</span></label>
                                <input type="email" placeholder="you@company.com" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label><i class="fa-solid fa-phone" style="color: #654E9F; margin-right: 4px;"></i> Phone / WhatsApp <span class="required">*</span></label>
                                <input type="tel" placeholder="+91 78509 32754" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fa-regular fa-building" style="color: #654E9F; margin-right: 4px;"></i> Company / Brand Name</label>
                                <input type="text" placeholder="e.g. Acme Retailers">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label><i class="fa-solid fa-bullseye" style="color: #654E9F; margin-right: 4px;"></i> Primary Service Goal</label>
                                <select>
                                    <option>SEO (Search Engine Optimization)</option>
                                    <option>Paid Advertising (Google &amp; Meta Ads)</option>
                                    <option>Social Media Marketing &amp; Management</option>
                                    <option>WhatsApp Marketing &amp; Automation</option>
                                    <option>Website Design &amp; Development</option>
                                    <option>E-Commerce Revenue Growth</option>
                                    <option>Content Writing &amp; Copywriting</option>
                                    <option>Branding &amp; Creative Design</option>
                                    <option>Online Reputation Management (ORM)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label><i class="fa-solid fa-indian-rupee-sign" style="color: #654E9F; margin-right: 4px;"></i> Monthly Budget Range</label>
                                <select>
                                    <option>Under &#8377;25,000 / month</option>
                                    <option>&#8377;25,000 &ndash; &#8377;60,000 / month</option>
                                    <option>&#8377;60,000 &ndash; &#8377;1,50,000 / month</option>
                                    <option>&#8377;1,50,000+ / month (Enterprise)</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label><i class="fa-regular fa-comment-dots" style="color: #654E9F; margin-right: 4px;"></i> Project Goals &amp; Current Challenges <span class="required">*</span></label>
                            <textarea rows="4" placeholder="Tell us about your target audience, current monthly revenue, marketing roadblocks, and expected timeline..." required></textarea>
                        </div>
                        <button type="submit" class="btn-primary" style="gap: 10px; font-size: 16px; padding: 15px;">
                            <span>Send Message &amp; Get Custom Proposal</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <p class="form-privacy-note">
                            <i class="fa-solid fa-shield-halved" style="color: #22c55e;"></i> Strict confidentiality guaranteed &bull; Zero spam, only actionable insights.
                        </p>
                    </form>

                    <!-- Right Column: Live Contact Hub & Direction Cards -->
                    <div class="contact-cards">
                        <div class="contact-status-bar">
                            <span class="status-pulse-dot"></span>
                            <span><strong>Office Active &amp; Ready:</strong> Growth leads reviewing inquiries today</span>
                        </div>

                        <!-- Email Card -->
                        <div class="contact-info-card">
                            <div class="contact-info-icon" style="background: rgba(101, 78, 159, 0.1); color: #654E9F;">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div class="contact-info-text">
                                <span class="mini">Email Support</span>
                                <a href="mailto:info@growellmarketing.com">info@growellmarketing.com</a>
                                <span class="contact-subtext">Direct inbox &bull; Response within 24h</span>
                            </div>
                            <a href="mailto:info@growellmarketing.com" class="contact-card-btn">Email Us &rarr;</a>
                        </div>

                        <!-- Phone Card -->
                        <div class="contact-info-card">
                            <div class="contact-info-icon" style="background: rgba(124, 58, 237, 0.1); color: #7C3AED;">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="contact-info-text">
                                <span class="mini">Phone Direct</span>
                                <a href="tel:+917850932754">+91 78509 32754</a>
                                <span class="contact-subtext">Mon &ndash; Sat, 10:00 AM &ndash; 7:00 PM IST</span>
                            </div>
                            <a href="tel:+917850932754" class="contact-card-btn">Call Now &rarr;</a>
                        </div>

                        <!-- WhatsApp Quick Connect Card -->
                        <div class="contact-info-card">
                            <div class="contact-info-icon" style="background: rgba(37, 211, 102, 0.12); color: #25D366;">
                                <i class="fa-brands fa-whatsapp"></i>
                            </div>
                            <div class="contact-info-text">
                                <span class="mini">WhatsApp Chat</span>
                                <a href="https://wa.me/917850932754?text=Hi%20Growell%20Marketing%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener">+91 78509 32754</a>
                                <span class="contact-subtext">Fastest replies &bull; Message anytime</span>
                            </div>
                            <a href="https://wa.me/917850932754?text=Hi%20Growell%20Marketing%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener" class="contact-card-btn whatsapp-action-btn">
                                <i class="fa-brands fa-whatsapp"></i> Chat &rarr;
                            </a>
                        </div>

                        <!-- Office Location Card -->
                        <div class="contact-info-card">
                            <div class="contact-info-icon" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div class="contact-info-text">
                                <span class="mini">Ajmer Headquarters</span>
                                <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer">2nd Floor, Janta Colony, Vaishali Nagar, Ajmer, RJ 305001</a>
                                <span class="contact-subtext">Walk-ins welcome by appointment</span>
                            </div>
                            <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer" class="contact-card-btn">Directions &rarr;</a>
                        </div>

                        <!-- Working Hours Card -->
                        <div class="contact-info-card">
                            <div class="contact-info-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                                <i class="fa-solid fa-clock"></i>
                            </div>
                            <div class="contact-info-text">
                                <span class="mini">Working Hours</span>
                                <p style="font-weight: 600; color: #1e293b;">Mon &ndash; Sat: 10:00 AM &ndash; 7:00 PM</p>
                                <span class="contact-subtext">Sunday Closed &bull; Emergency ad support available</span>
                            </div>
                        </div>

                        <!-- Embedded Interactive Map Card -->
                        <div class="map-container contact-map-frame">
                            <iframe src="https://www.google.com/maps?q=Growell+Marketing&amp;z=17&amp;t=m&amp;hl=en&amp;output=embed" width="100%" height="220" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google Map Location"></iframe>
                        </div>
                    </div>
                </div>

                <!-- 3 Pillars of Working With Us -->
                <div class="contact-pillars-grid">
                    <div class="contact-pillar-card">
                        <div class="contact-pillar-icon"><i class="fa-solid fa-chart-pie"></i></div>
                        <h3>Custom Growth Roadmap</h3>
                        <p>No cookie-cutter packages. Every recommendation is tailored to your business model, margin structure, and target audience.</p>
                    </div>
                    <div class="contact-pillar-card">
                        <div class="contact-pillar-icon"><i class="fa-solid fa-user-tie"></i></div>
                        <h3>Direct Strategist Access</h3>
                        <p>Work directly with seasoned media buyers, SEO architects, and copywriters &ndash; zero middleman layers or junior runarounds.</p>
                    </div>
                    <div class="contact-pillar-card">
                        <div class="contact-pillar-icon"><i class="fa-solid fa-handshake-simple"></i></div>
                        <h3>Zero Lock-In Contracts</h3>
                        <p>We work on a transparent, month-to-month performance basis. We compound your revenue every 30 days to earn your trust.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Fast-Track Consultation Callout Section -->
        <section class="tint" style="padding: 70px 20px;">
            <div class="container">
                <div class="sec-head" style="margin-bottom: 24px;">
                    <p class="mini">Need Immediate Answers?</p>
                    <h2>Book Your Free Growth Session Now</h2>
                </div>
                <div style="max-width: 720px; margin: 0 auto; text-align: center;">
                    <p style="font-size: 16.5px; color: #475569; margin-bottom: 28px; line-height: 1.6;">
                        Prefer to talk directly instead of writing? Call our senior growth team now or start an instant WhatsApp conversation for immediate assistance.
                    </p>
                    <div style="display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
                        <a href="tel:+917850932754" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-size: 15.5px; padding: 14px 28px;">
                            <i class="fa-solid fa-phone"></i> Call Direct: +91 78509 32754
                        </a>
                        <a href="https://wa.me/917850932754?text=Hi%20Growell%20Marketing%2C%20I%20want%20to%20discuss%20a%20project" target="_blank" rel="noopener" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-size: 15.5px; padding: 14px 28px; background: #25D366; box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);">
                            <i class="fa-brands fa-whatsapp" style="font-size: 18px;"></i> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQs Section with Prominent FAQ Button -->
        <section style="padding: 80px 20px;">
            <div class="container">
                <div class="sec-head">
                    <p class="mini">Before You Submit</p>
                    <h2>Frequently Asked Questions</h2>
                    <p>Quick answers to common questions about consulting with Growell Marketing Agency.</p>
                </div>
                <div class="faq-list">
                    <details class="faq-item">
                        <summary>What happens after I submit the contact form?</summary>
                        <p>You will hear from our senior marketing strategist within 24 hours to schedule your free consultation call and review an initial audit of your current channels.</p>
                    </details>
                    <details class="faq-item">
                        <summary>Is the initial consultation really free?</summary>
                        <p>Yes, completely free with zero obligation. We will review your current website, SEO rankings, or ad accounts and share clear, actionable recommendations.</p>
                    </details>
                    <details class="faq-item">
                        <summary>Do you work with businesses in my specific industry?</summary>
                        <p>We have worked across e-commerce, local services, healthcare, hospitality, education, real estate, and B2B brands &ndash; reach out and we will share case studies relevant to your niche.</p>
                    </details>
                    <details class="faq-item">
                        <summary>What is your minimum budget requirement to get started?</summary>
                        <p>We work with growing local businesses as well as national e-commerce stores. Our service tiers start around &#8377;15,000 to &#8377;25,000/month for focused campaigns, scaling up for multi-channel performance.</p>
                    </details>
                </div>

                <!-- Prominent FAQs Button -->
                <div class="faq-section-cta">
                    <a href="/faq" class="btn-primary faq-main-cta-btn">
                        <i class="fa-solid fa-circle-question" style="font-size: 18px;"></i>
                        <span>Browse All 50+ Frequently Asked Questions &rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    </main>`;

content = content.replace(oldMainRegex, newMain);

// 3. Update Footer in contact-us.html to the modern structured footer
const oldFooterRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/i;

const modernFooterHtml = `<footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="/" aria-label="Growell Marketing Homepage"><img src="/assets/Growell_Logo_Final.webp" width="160" alt="Growell Marketing Agency Logo" loading="lazy" decoding="async"></a>
                <p>Full-service digital marketing agency helping ambitious businesses turn clicks into high-paying customers through data-backed SEO, paid ads, web design, and social media.</p>
                <div class="footer-contact-list">
                    <a href="tel:+917850932754" class="footer-contact-item"><i class="fa-solid fa-phone"></i> +91 78509 32754</a>
                    <a href="mailto:info@growellmarketing.com" class="footer-contact-item"><i class="fa-solid fa-envelope"></i> info@growellmarketing.com</a>
                    <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer" class="footer-contact-item"><i class="fa-solid fa-location-dot"></i> Vaishali Nagar, Ajmer, Rajasthan</a>
                </div>
                <div class="footer-social-wrapper">
                    <span class="footer-social-heading">Connect With Us</span>
                    <div class="footer-social-icons">
                        <a href="https://www.instagram.com/growell.marketing/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Growell.Marketing" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://x.com/growellAgency" target="_blank" rel="noopener" aria-label="X (Twitter)"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="https://wa.me/917850932754" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
            <div>
                <h4>Company</h4>
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
                <h4>Core Services</h4>
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
                <h4>Visit Our Office</h4>
                <div class="footer-map-card">
                    <iframe class="google-map"
                        src="https://www.google.com/maps?q=Growell+Marketing&amp;z=17&amp;t=m&amp;hl=en&amp;output=embed"
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google Map Location"></iframe>
                    <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer" class="footer-map-link">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Google Maps
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

content = content.replace(oldFooterRegex, modernFooterHtml);

fs.writeFileSync(contactPath, content, 'utf8');
console.log('contact-us.html updated successfully with stunning new design and modern footer!');
