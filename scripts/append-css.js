const fs = require('fs');

const cssToAppend = `
/* ===================================================================
   SEO & ACCESSIBILITY OPTIMIZATIONS
   =================================================================== */

/* Support h3 in footer columns */
.footer-grid h3 {
    font-size: 17px;
    font-weight: 700;
    color: #1e1b4b;
    margin: 0 0 18px;
    letter-spacing: 0.3px;
    position: relative;
    padding-bottom: 8px;
}
.footer-grid h3::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 28px;
    height: 2.5px;
    background: linear-gradient(90deg, #654E9F, #7C3AED);
    border-radius: 2px;
}

/* Footer Office Card (Lightweight, No-iFrame Local SEO Card) */
.footer-office-card {
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(101, 78, 159, 0.16);
    box-shadow: 0 8px 24px rgba(101, 78, 159, 0.08);
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 13.5px;
    line-height: 1.5;
}
.footer-office-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    color: #654E9F;
    background: rgba(101, 78, 159, 0.1);
    padding: 3px 10px;
    border-radius: 20px;
    width: fit-content;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.footer-office-details {
    font-style: normal;
    color: #334155;
    font-size: 13px;
    line-height: 1.55;
}
.footer-office-hours {
    font-size: 12px;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Takeaway & Author Box Semantic Heading Classes */
.blog-key-takeaway .key-takeaway-title {
    margin: 0 0 8px 0;
    color: #654E9F;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}
.blog-author-info .author-name {
    margin: 0 0 4px 0;
    font-size: 18px;
    color: #1a1a2e;
    font-weight: 700;
}
.perf-why-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a162b;
    margin-bottom: 8px;
}
.legal-badge-card h3 {
    font-size: 16px;
    font-weight: 700;
    color: #1a162b;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Utility classes to replace repetitive inline styles */
.hero-link {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: rgba(101, 78, 159, 0.4);
}
.star-gold { color: #FFD700; }
.stat-green { color: #25D366; }
.stat-purple { color: #6d5ef8; }
.text-purple-link {
    color: #654E9F;
    font-weight: 600;
    text-decoration: none;
}
.google-review-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.google-blue { color: #4285F4; }
.blog-badge-tag {
    background: rgba(101, 78, 159, 0.12);
    color: #654E9F;
    padding: 4px 10px;
    border-radius: 20px;
    width: fit-content;
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
}
.blog-card-meta-row {
    margin-top: auto;
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.blog-read-more-link {
    color: #654E9F;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
.roi-slider-group-single { grid-template-columns: 1fr; }
.roi-slider-mb12 { margin-bottom: 12px; }
.roi-budget-title {
    font-weight: 700;
    font-size: 17px;
    color: #1a1a2e;
}
.roi-budget-val-highlight {
    font-size: 20px;
    color: #654E9F;
    font-weight: 800;
}
.roi-proposal-btn {
    margin-top: 10px;
    width: 100%;
    text-align: center;
}
.center-btn-wrap-mt40 {
    text-align: center;
    margin-top: 40px;
}
.center-btn-wrap-mt36 {
    text-align: center;
    margin-top: 36px;
}
.btn-large-pad {
    display: inline-block;
    padding: 14px 32px;
    font-size: 16px;
    text-decoration: none;
}
`;

fs.appendFileSync('css/style.css', cssToAppend, 'utf8');
console.log('Appended CSS to css/style.css successfully');
