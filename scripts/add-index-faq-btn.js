const fs = require('fs');

let c = fs.readFileSync('e:/Growell Marketing/index.html', 'utf8');

// Find the FAQ section in index.html and insert the prominent CTA button
const faqListEnd = 'Browse our complete <a href="/faq" style="color: #654E9F; font-weight: 600;">FAQ knowledge base &rarr;</a></p>\r\n                    </details>\r\n                </div>\r\n            </div>\r\n        </section>';
const faqListEndLF = 'Browse our complete <a href="/faq" style="color: #654E9F; font-weight: 600;">FAQ knowledge base &rarr;</a></p>\n                    </details>\n                </div>\n            </div>\n        </section>';

const replacement = `Browse our complete <a href="/faq" style="color: #654E9F; font-weight: 600;">FAQ knowledge base &rarr;</a></p>
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
        </section>`;

if (c.includes(faqListEnd)) {
  c = c.replace(faqListEnd, replacement.replace(/\n/g, '\r\n'));
  fs.writeFileSync('e:/Growell Marketing/index.html', c, 'utf8');
  console.log('Successfully added FAQ CTA button to index.html (CRLF)!');
} else if (c.includes(faqListEndLF)) {
  c = c.replace(faqListEndLF, replacement);
  fs.writeFileSync('e:/Growell Marketing/index.html', c, 'utf8');
  console.log('Successfully added FAQ CTA button to index.html (LF)!');
} else {
  console.log('Could not find target, inspecting index.html FAQ section...');
}
