const fs = require('fs');

// 1. Update css/style.css
const cssPath = 'e:/Growell Marketing/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const minimalCss = `
/* ===================================================================
   MINIMAL CONTACT PAGE STYLING
   =================================================================== */
.contact-minimal-wrap {
    padding: 60px 20px 80px;
    max-width: 1140px;
    margin: 0 auto;
}

.contact-minimal-hero {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 45px;
}

.contact-minimal-hero .mini {
    font-size: 13px;
    font-weight: 700;
    color: #654E9F;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 8px;
}

.contact-minimal-hero h1 {
    font-size: 40px;
    font-weight: 800;
    color: #1e1b4b;
    margin: 0 0 14px;
    line-height: 1.2;
    letter-spacing: -0.5px;
}

.contact-minimal-hero p {
    font-size: 16px;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}

.contact-minimal-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 40px;
    align-items: start;
}

/* Minimal Form Card */
.contact-minimal-form-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 16px;
    padding: 36px;
    box-shadow: 0 10px 30px -10px rgba(101, 78, 159, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
}

.contact-minimal-form-card h2 {
    font-size: 22px;
    font-weight: 700;
    color: #1e1b4b;
    margin: 0 0 6px;
}

.contact-minimal-form-card .form-subtitle {
    font-size: 14px;
    color: #64748b;
    margin: 0 0 24px;
}

/* Form Groups & Inputs */
.contact-minimal-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.contact-minimal-form .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.contact-minimal-form .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.contact-minimal-form label {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
}

.contact-minimal-form label .required {
    color: #ef4444;
}

.contact-minimal-form input,
.contact-minimal-form select,
.contact-minimal-form textarea {
    width: 100%;
    padding: 12px 14px;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-family: "Lato", sans-serif;
    font-size: 14.5px;
    color: #1e293b;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.contact-minimal-form input:focus,
.contact-minimal-form select:focus,
.contact-minimal-form textarea:focus {
    outline: none;
    background: #ffffff;
    border-color: #654E9F;
    box-shadow: 0 0 0 3px rgba(101, 78, 159, 0.12);
}

.contact-minimal-form textarea {
    min-height: 110px;
    resize: vertical;
}

.contact-minimal-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(135deg, #654E9F 0%, #7C3AED 100%);
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    padding: 13px 26px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(101, 78, 159, 0.25);
    margin-top: 4px;
    width: 100%;
}

.contact-minimal-submit:hover {
    background: linear-gradient(135deg, #533d87 0%, #6d28d9 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(101, 78, 159, 0.35);
}

/* Minimal Right Column */
.contact-minimal-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contact-minimal-info-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px -10px rgba(101, 78, 159, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
}

.contact-minimal-info-card h3 {
    font-size: 19px;
    font-weight: 700;
    color: #1e1b4b;
    margin: 0 0 18px;
}

.contact-minimal-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.contact-minimal-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
}

.contact-minimal-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(101, 78, 159, 0.08);
    color: #654E9F;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
}

.contact-minimal-item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.contact-minimal-item-text span.label {
    font-size: 11.5px;
    font-weight: 700;
    color: #654E9F;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.contact-minimal-item-text a,
.contact-minimal-item-text p {
    font-size: 15px;
    color: #1e293b;
    font-weight: 600;
    text-decoration: none;
    margin: 0;
    line-height: 1.4;
    transition: color 0.2s ease;
}

.contact-minimal-item-text a:hover {
    color: #654E9F;
}

.contact-minimal-item-text span.sub {
    font-size: 12px;
    color: #64748b;
    margin-top: 1px;
}

/* Minimal WhatsApp Button */
.contact-minimal-whatsapp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #25D366;
    color: #ffffff !important;
    font-weight: 700;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.25s ease;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.22);
    margin-top: 4px;
    width: 100%;
    box-sizing: border-box;
}

.contact-minimal-whatsapp-btn:hover {
    background: #20ba59;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
}

/* Minimal Map Container */
.contact-minimal-map {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    height: 175px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.contact-minimal-map iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}

/* Minimal Bottom Note */
.contact-minimal-faq-note {
    text-align: center;
    margin-top: 36px;
    font-size: 14.5px;
    color: #64748b;
}

.contact-minimal-faq-note a {
    color: #654E9F;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: rgba(101, 78, 159, 0.4);
}

.contact-minimal-faq-note a:hover {
    color: #7C3AED;
}

@media (max-width: 900px) {
    .contact-minimal-grid {
        grid-template-columns: 1fr;
        gap: 32px;
    }
    .contact-minimal-hero h1 {
        font-size: 32px;
    }
    .contact-minimal-form-card,
    .contact-minimal-info-card {
        padding: 24px 20px;
    }
}

@media (max-width: 600px) {
    .contact-minimal-form .form-row {
        grid-template-columns: 1fr;
    }
    .contact-minimal-wrap {
        padding: 40px 16px 60px;
    }
}
`;

if (!css.includes('MINIMAL CONTACT PAGE STYLING')) {
  css += '\n' + minimalCss;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Appended minimal contact CSS to style.css!');
} else {
  console.log('Minimal contact CSS already present.');
}

// 2. Update contact-us.html with minimal, elegant content
const contactHtmlPath = 'e:/Growell Marketing/contact-us.html';
let contactHtml = fs.readFileSync(contactHtmlPath, 'utf8');

const minimalMainContent = `<main>
        <div class="contact-minimal-wrap">
            <!-- Minimal Hero -->
            <div class="contact-minimal-hero">
                <p class="mini">Contact Us</p>
                <h1>Let's Start a Conversation</h1>
                <p>Have a question, need a custom marketing strategy, or want to explore working together? Send us a message or reach out directly &ndash; we respond within 24 hours.</p>
            </div>

            <div class="contact-minimal-grid">
                <!-- Clean Minimal Form -->
                <div class="contact-minimal-form-card">
                    <h2>Send a Message</h2>
                    <p class="form-subtitle">Tell us about your project and business goals.</p>

                    <form id="contactForm" class="contact-form contact-minimal-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name <span class="required">*</span></label>
                                <input type="text" placeholder="Your name" required>
                            </div>
                            <div class="form-group">
                                <label>Email Address <span class="required">*</span></label>
                                <input type="email" placeholder="you@company.com" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone / WhatsApp <span class="required">*</span></label>
                                <input type="tel" placeholder="+91 78509 32754" required>
                            </div>
                            <div class="form-group">
                                <label>Service Needed</label>
                                <select>
                                    <option>SEO (Search Engine Optimization)</option>
                                    <option>Paid Advertising (Google &amp; Meta Ads)</option>
                                    <option>Social Media Marketing</option>
                                    <option>Website Design &amp; Development</option>
                                    <option>WhatsApp Marketing &amp; Automation</option>
                                    <option>E-Commerce Marketing</option>
                                    <option>Content Writing &amp; Copywriting</option>
                                    <option>Branding &amp; Creative Design</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>How Can We Help? <span class="required">*</span></label>
                            <textarea rows="4" placeholder="Briefly describe your business, goals, and what you're looking to achieve..." required></textarea>
                        </div>

                        <button type="submit" class="contact-minimal-submit">
                            <span>Send Message</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                </div>

                <!-- Clean Minimal Contact Info & Map -->
                <div class="contact-minimal-info">
                    <div class="contact-minimal-info-card">
                        <h3>Direct Contact</h3>
                        
                        <div class="contact-minimal-list">
                            <div class="contact-minimal-item">
                                <div class="contact-minimal-icon"><i class="fa-solid fa-envelope"></i></div>
                                <div class="contact-minimal-item-text">
                                    <span class="label">Email</span>
                                    <a href="mailto:info@growellmarketing.com">info@growellmarketing.com</a>
                                    <span class="sub">Online support &bull; 24h response</span>
                                </div>
                            </div>

                            <div class="contact-minimal-item">
                                <div class="contact-minimal-icon"><i class="fa-solid fa-phone"></i></div>
                                <div class="contact-minimal-item-text">
                                    <span class="label">Phone</span>
                                    <a href="tel:+917850932754">+91 78509 32754</a>
                                    <span class="sub">Mon &ndash; Sat, 10:00 AM &ndash; 7:00 PM IST</span>
                                </div>
                            </div>

                            <div class="contact-minimal-item">
                                <div class="contact-minimal-icon"><i class="fa-solid fa-location-dot"></i></div>
                                <div class="contact-minimal-item-text">
                                    <span class="label">Office</span>
                                    <a href="https://maps.app.goo.gl/U7BGknhtbDs6S8NAA" target="_blank" rel="noopener noreferrer">2nd Floor, Janta Colony, Vaishali Nagar, Ajmer, Rajasthan 305001</a>
                                </div>
                            </div>
                        </div>

                        <a href="https://wa.me/917850932754?text=Hi%20Growell%20Marketing%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener" class="contact-minimal-whatsapp-btn">
                            <i class="fa-brands fa-whatsapp" style="font-size: 17px;"></i> Chat on WhatsApp
                        </a>
                    </div>

                    <!-- Clean Map -->
                    <div class="contact-minimal-map">
                        <iframe src="https://www.google.com/maps?q=Growell+Marketing&amp;z=17&amp;t=m&amp;hl=en&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Growell Marketing Ajmer Office"></iframe>
                    </div>
                </div>
            </div>

            <!-- Subtle Minimal Bottom Link -->
            <p class="contact-minimal-faq-note">
                Need immediate answers? Check our <a href="/faq">Frequently Asked Questions</a> or explore our <a href="/portfolio">Portfolio Case Studies</a>.
            </p>
        </div>
    </main>`;

const mainRegex = /<main>[\s\S]*?<\/main>/i;
contactHtml = contactHtml.replace(mainRegex, minimalMainContent);

fs.writeFileSync(contactHtmlPath, contactHtml, 'utf8');
console.log('contact-us.html successfully transformed into a clean, minimal page!');
