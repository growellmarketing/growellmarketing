const fs = require('fs');
const path = require('path');

const cssPath = 'e:/Growell Marketing/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// The replacement for lines 4328-4458 (the old footer block)
const oldFooterTarget = `/* ---- Expanded Footer ---- */
.site-footer {
    /* background-color: #1a1a1a; */
    /* color: #f4f4f4; */
    padding: 30px 20px;
    text-align: left;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 2fr;
    gap: 20px;
    max-width: 1300px;
    margin: 0 auto;
    padding-bottom: 10px;
}

.footer-grid h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
}

.footer-grid ul {
    flex-direction: column;
    gap: 10px;
}

.footer-grid a {
    color: #141414;
    font-size: 16px;
    font-family: "Lato", sans-serif;
}

.footer-grid a:hover {
    color: #a58fe0;
}

.footer-brand img {
    width: 200px;
    margin-bottom: 14px;
}

.footer-brand p {
    font-size: 16.5px;
    width: 100%;
    padding-left: 8px;
}

/* ---- Footer Social Links ---- */
.footer-social-wrapper {
    margin-top: 22px;
}

.footer-social-heading {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #a58fe0;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 12px;
}

.footer-social-icons {
    display: flex;
    align-items: center;
    gap: 16px;
}

.footer-social-icons a {
    background: linear-gradient(135deg, #654E9F, #7B52AB) !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    width: auto !important;
    height: auto !important;
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.footer-social-icons a:hover {
    transform: translateY(-3px) scale(1.15);
    opacity: 0.85;
}

.footer-bottom {
    max-width: 1300px;
    margin: 0 auto;
    border-top: 1px solid rgba(255, 255, 255, .15);
    padding-top: 18px;
    text-align: center;
    font-size: 14px;
    color: #999;
}


.google-map {
    border-radius: 5px;
    width: 400px;
    border: none;
    height: 300px;
}

@media (max-width: 1024px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 600px) {
    .footer-grid {
        grid-template-columns: 1fr;
    }

    .contact-grid,
    .pricing-grid {
        grid-template-columns: 1fr;
    }

    section {
        padding: 50px 15px;
    }
}`;

const newFooterBlock = `/* ---- Premium Glassmorphic Footer ---- */
.site-footer {
    width: 100%;
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(246, 244, 254, 0.98) 100%);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-top: 1px solid rgba(101, 78, 159, 0.18);
    box-shadow: 0 -12px 40px rgba(101, 78, 159, 0.05);
    color: #1e1b4b;
    padding: 60px 24px 28px;
    font-family: "Lato", sans-serif;
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
}

.site-footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(101, 78, 159, 0.5), rgba(124, 58, 237, 0.5), transparent);
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.35fr 0.95fr 1.05fr 1.35fr;
    gap: 36px;
    max-width: 1300px;
    margin: 0 auto;
    padding-bottom: 36px;
    align-items: start;
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.footer-brand a {
    display: inline-block;
}

.footer-brand img {
    width: 160px;
    height: auto;
    display: block;
    margin-bottom: 4px;
    transition: transform 0.25s ease;
}

.footer-brand img:hover {
    transform: scale(1.03);
}

.footer-brand p {
    font-size: 14.5px;
    line-height: 1.6;
    color: #475569;
    margin: 0;
    max-width: 320px;
    padding-left: 0;
}

.footer-contact-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-top: 4px;
}

.footer-contact-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: #334155;
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;
}

.footer-contact-item i {
    width: 16px;
    color: #654E9F;
    text-align: center;
    font-size: 14px;
}

.footer-contact-item:hover {
    color: #654E9F;
    transform: translateX(3px);
}

.footer-grid h4 {
    font-size: 17px;
    font-weight: 700;
    color: #1e1b4b;
    margin: 0 0 18px;
    letter-spacing: 0.3px;
    position: relative;
    padding-bottom: 8px;
}

.footer-grid h4::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 28px;
    height: 2.5px;
    background: linear-gradient(90deg, #654E9F, #7C3AED);
    border-radius: 2px;
}

.footer-grid ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer-grid ul li {
    margin: 0;
    padding: 0;
}

.footer-grid ul li a {
    color: #475569;
    font-size: 14.5px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.footer-grid ul li a::before {
    content: "\u203A";
    color: #94a3b8;
    font-size: 15px;
    font-weight: 700;
    transition: transform 0.2s ease, color 0.2s ease;
}

.footer-grid ul li a:hover {
    color: #654E9F;
    transform: translateX(4px);
}

.footer-grid ul li a:hover::before {
    color: #654E9F;
    transform: translateX(2px);
}

/* Footer Map Container */
.footer-map-card {
    border-radius: 14px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(101, 78, 159, 0.16);
    box-shadow: 0 8px 24px rgba(101, 78, 159, 0.08);
    display: flex;
    flex-direction: column;
}

.footer-map-card iframe,
.footer-grid iframe.google-map {
    width: 100% !important;
    height: 190px !important;
    border: none !important;
    display: block !important;
    border-radius: 14px 14px 0 0;
}

.footer-map-link {
    padding: 10px 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #654E9F;
    text-decoration: none;
    background: rgba(101, 78, 159, 0.06);
    transition: all 0.25s ease;
    border-radius: 0 0 14px 14px;
}

.footer-map-link:hover {
    background: #654E9F;
    color: #ffffff;
}

/* Footer Social Wrapper */
.footer-social-wrapper {
    margin-top: 14px;
}

.footer-social-heading {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #654E9F;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 10px;
}

.footer-social-icons {
    display: flex;
    align-items: center;
    gap: 10px;
}

.footer-social-icons a {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(101, 78, 159, 0.08) !important;
    color: #654E9F !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 16px !important;
    border: 1px solid rgba(101, 78, 159, 0.15) !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    text-decoration: none !important;
    -webkit-text-fill-color: initial !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;
}

.footer-social-icons a:hover {
    background: linear-gradient(135deg, #654E9F, #7C3AED) !important;
    color: #ffffff !important;
    transform: translateY(-3px) scale(1.08);
    box-shadow: 0 8px 20px rgba(101, 78, 159, 0.32) !important;
}

/* Footer Bottom Bar */
.footer-bottom {
    max-width: 1300px;
    margin: 0 auto;
    border-top: 1px solid rgba(101, 78, 159, 0.14);
    padding-top: 22px;
    font-size: 13.5px;
    color: #64748b;
}

.footer-bottom-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
}

.footer-bottom-container p {
    margin: 0;
    color: #64748b;
    font-size: 13.5px;
}

.footer-bottom-links {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.footer-bottom-links a {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    font-size: 13.5px;
}

.footer-bottom-links a:hover {
    color: #654E9F;
}

.footer-sep {
    color: #cbd5e1;
    user-select: none;
}

@media (max-width: 1024px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
}

@media (max-width: 640px) {
    .site-footer {
        padding: 44px 16px 24px;
    }

    .footer-grid {
        grid-template-columns: 1fr;
        gap: 28px;
    }

    .footer-bottom-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .contact-grid,
    .pricing-grid {
        grid-template-columns: 1fr;
    }

    section {
        padding: 50px 15px;
    }
}`;

// Normalize line endings for replacement
const normalizedCss = css.replace(/\r\n/g, '\n');
const normalizedTarget = oldFooterTarget.replace(/\r\n/g, '\n');

if (normalizedCss.includes(normalizedTarget)) {
  css = normalizedCss.replace(normalizedTarget, newFooterBlock);
  console.log('Successfully replaced old footer CSS with premium glassmorphic footer CSS!');
} else {
  console.log('Old footer target not found exactly, will append modern footer styles.');
}

// Now let's append the high-end Contact Page and FAQ button CSS at the end
const additionalStyles = `
/* ===================================================================
   PREMIUM CONTACT-US PAGE & FAQ CTA ENHANCEMENTS
   =================================================================== */

/* Hero Trust & Response Badges */
.contact-hero-wrap {
    text-align: center;
}

.contact-hero-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 22px;
}

.contact-hero-trust-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13.5px;
    color: #334155;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 7px 16px;
    border-radius: 999px;
    border: 1px solid rgba(101, 78, 159, 0.14);
    box-shadow: 0 2px 8px rgba(101, 78, 159, 0.04);
}

.contact-hero-trust-item i {
    color: #654E9F;
    font-size: 14px;
}

/* Form Top Badge */
.form-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #654E9F;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: rgba(101, 78, 159, 0.08);
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 8px;
}

/* Status Pulse Bar */
.contact-status-bar {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.25);
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    color: #15803d;
    font-weight: 600;
    margin-bottom: 8px;
    box-shadow: 0 2px 6px rgba(34, 197, 94, 0.08);
}

.status-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    animation: statusPulseAnim 2s infinite;
}

@keyframes statusPulseAnim {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

/* Contact Card Action Buttons */
.contact-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 700;
    color: #654E9F;
    text-decoration: none;
    padding: 7px 14px;
    border-radius: 8px;
    background: rgba(101, 78, 159, 0.08);
    margin-left: auto;
    transition: all 0.25s ease;
    white-space: nowrap;
    flex-shrink: 0;
}

.contact-card-btn:hover {
    background: #654E9F;
    color: #ffffff !important;
    transform: translateX(3px);
    box-shadow: 0 4px 12px rgba(101, 78, 159, 0.25);
}

.contact-card-btn.whatsapp-action-btn {
    background: rgba(37, 211, 102, 0.12);
    color: #16a34a;
}

.contact-card-btn.whatsapp-action-btn:hover {
    background: #25d366;
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

/* Privacy note under submit button */
.form-privacy-note {
    font-size: 12.5px;
    color: #64748b;
    text-align: center;
    margin: 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

/* Why Connect With Us 3-Card Grid */
.contact-pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 36px;
}

.contact-pillar-card {
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 26px 22px;
    text-align: center;
    box-shadow: 0 4px 18px rgba(101, 78, 159, 0.05);
    transition: all 0.3s ease;
}

.contact-pillar-card:hover {
    transform: translateY(-4px);
    border-color: rgba(101, 78, 159, 0.25);
    box-shadow: 0 12px 30px rgba(101, 78, 159, 0.12);
}

.contact-pillar-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(101, 78, 159, 0.1), rgba(124, 58, 237, 0.15));
    color: #654E9F;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin: 0 auto 16px;
}

.contact-pillar-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 8px;
}

.contact-pillar-card p {
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
}

/* FAQ Button Everywhere (Header, Section, Footer) */
.faq-section-cta {
    text-align: center;
    margin-top: 36px;
}

.faq-main-cta-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px !important;
    padding: 14px 34px !important;
    background: linear-gradient(135deg, #654E9F 0%, #7C3AED 100%) !important;
    color: #ffffff !important;
    border-radius: 12px !important;
    font-weight: 700 !important;
    font-size: 15.5px !important;
    text-decoration: none !important;
    box-shadow: 0 8px 24px rgba(101, 78, 159, 0.28) !important;
    transition: all 0.25s ease !important;
}

.faq-main-cta-btn:hover {
    background: linear-gradient(135deg, #533d87 0%, #6d28d9 100%) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 12px 32px rgba(101, 78, 159, 0.4) !important;
    color: #ffffff !important;
}

/* Responsive Pillars */
@media (max-width: 868px) {
    .contact-pillars-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .contact-hero-trust {
        gap: 10px;
    }

    .contact-hero-trust-item {
        font-size: 12.5px;
        padding: 6px 12px;
    }
}
`;

css += '\n' + additionalStyles;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('style.css updated successfully with all modern styles!');
