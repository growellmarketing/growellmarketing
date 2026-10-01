const fs = require('fs');
const path = require('path');

const rootDir = 'e:/Growell Marketing';

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.git', 'scripts'].includes(f)) res = res.concat(getFiles(full));
    } else if (f.endsWith('.html')) res.push(full);
  });
  return res;
}

const allFiles = getFiles(rootDir);

const modernFooterTemplate = `<footer class="site-footer">
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

let updatedNavCount = 0;
let updatedFooterCount = 0;

allFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Check if navbaar is present and doesn't have /faq
  if (content.includes('class="navbaar"')) {
    const navMatch = content.match(/<nav[\s\S]*?<\/nav>/i);
    if (navMatch && !navMatch[0].includes('href="/faq"')) {
      // Find where Portfolio is in the navbar list
      if (content.includes('<li><a href="/portfolio">Portfolio</a></li>')) {
        content = content.replace(
          '<li><a href="/portfolio">Portfolio</a></li>',
          '<li><a href="/portfolio">Portfolio</a></li>\n                    <li><a href="/faq">FAQs</a></li>'
        );
        modified = true;
        updatedNavCount++;
      } else if (content.includes('<li><a href="/blog">Blog</a></li>')) {
        content = content.replace(
          '<li><a href="/blog">Blog</a></li>',
          '<li><a href="/faq">FAQs</a></li>\n                    <li><a href="/blog">Blog</a></li>'
        );
        modified = true;
        updatedNavCount++;
      }
    }
  }

  // 2. Check if site-footer is present
  if (content.includes('class="site-footer"')) {
    const footerRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, modernFooterTemplate);
      modified = true;
      updatedFooterCount++;
    }
  }

  // 3. If homepage index.html, add prominent FAQ button to faq-section if missing
  if (filePath.endsWith('index.html')) {
    if (content.includes('class="faq-section"') && !content.includes('faq-main-cta-btn')) {
      const faqListCloseRegex = /(<\/div>\s*<\/div>\s*<\/section>\s*<!-- Interactive Single Master Growth)/i;
      const faqBtnHtml = `
                <!-- Prominent FAQs Button -->
                <div class="faq-section-cta">
                    <a href="/faq" class="btn-primary faq-main-cta-btn">
                        <i class="fa-solid fa-circle-question" style="font-size: 18px;"></i>
                        <span>Browse All 50+ Frequently Asked Questions &rarr;</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Interactive Single Master Growth`;

      if (faqListCloseRegex.test(content)) {
        content = content.replace(faqListCloseRegex, faqBtnHtml);
        modified = true;
        console.log('Added prominent FAQ CTA button to index.html FAQ section!');
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log(`Updated navbars with FAQs link in ${updatedNavCount} pages.`);
console.log(`Updated footers with modern design in ${updatedFooterCount} pages.`);
