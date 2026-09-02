/* ===================================================================
   GROWELL -- SITE ANIMATIONS
   Scroll-reveal, smooth FAQ accordion, header shadow on scroll,
   animated stat counters, and a back-to-top button.
   No HTML edits required -- targets existing class names site-wide.
=================================================================== */
(function () {
    "use strict";

    /* ---------- GROWELL GOOGLE SHEETS LIVE DATABASE INTEGRATION ---------- */
    window.GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx6a-lBNVhIYLDnF2MSh33b5V82pvbmSdQdxHUPWmoPEa9Hk0hzQfcnF8S8I55NUbzMgA/exec";

    window.sendLeadToGoogleSheets = function (leadData) {
        if (!leadData) return;
        var webhookUrl = window.GOOGLE_SHEETS_WEBHOOK_URL;
        if (!webhookUrl || webhookUrl.indexOf("http") !== 0) {
            console.log("[Growell DB] Lead captured locally:", leadData);
            return;
        }

        var payload = {
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            name: leadData.name || "N/A",
            phone: leadData.phone || "N/A",
            email: leadData.email || "N/A",
            goal: leadData.goal || leadData.service || "N/A",
            budget: leadData.budget || "N/A",
            company: leadData.company || "N/A",
            message: leadData.message || "N/A",
            source: leadData.source || window.location.pathname
        };

        fetch(webhookUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(function () {
            console.log("[Growell DB] Lead successfully synced to Google Sheet!");
        }).catch(function (err) {
            console.log("[Growell DB] Sync notice:", err);
        });
    };

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Native Butter-Smooth Anchor Link Scroll ---------- */
    document.addEventListener('click', function (e) {
        var anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        var href = anchor.getAttribute('href');
        if (href === '#' || href === '#!') return;
        var targetEl = document.querySelector(href);
        if (targetEl) {
            e.preventDefault();
            var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 75;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });

    /* ---------- 1. Auto-tag elements for scroll reveal ---------- */
    var revealSelectors = [
        ".benefit-card", ".pillar-card", ".team-card", ".stat-card",
        ".step-card", ".testimonial-card", ".case-study-card", ".blog-card",
        ".pricing-card", ".faq-item", ".contact-info-card",
        ".feature-flex", ".cta-banner", ".sec-head", ".timeline-point",
        ".newsletter-box", ".logo-strip", ".comparison-table"
    ];

    var revealEls = document.querySelectorAll(revealSelectors.join(","));
    revealEls.forEach(function (el, i) {
        el.setAttribute("data-reveal", "");
        el.setAttribute("data-reveal-delay", (i % 6) + 1);
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        document.querySelectorAll("[data-reveal]").forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll("[data-reveal]").forEach(function (el) {
            el.classList.add("in-view");
        });
    }

    /* ---------- 2. Sticky Glassmorphism Navbaar on scroll ---------- */
    var navbaarEl = document.querySelector(".navbaar");
    if (navbaarEl) {
        var onScrollNavbar = function () {
            if (window.scrollY > 35) navbaarEl.classList.add("scrolled");
            else navbaarEl.classList.remove("scrolled");
        };
        window.addEventListener("scroll", onScrollNavbar, { passive: true });
        onScrollNavbar();
    }

    /* ---------- 2.5 Mobile Hamburger Navigation & Dropdown Accordion Toggle ---------- */
    var navbaar = document.querySelector(".navbaar");
    var navLeft = document.querySelector(".nav-left");
    if (navbaar && navLeft) {
        var mobileBtn = navbaar.querySelector(".mobile-nav-toggle");
        if (!mobileBtn) {
            mobileBtn = document.createElement("button");
            mobileBtn.className = "mobile-nav-toggle";
            mobileBtn.setAttribute("aria-label", "Toggle Mobile Menu");
            mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            navbaar.appendChild(mobileBtn);
        }

        function closeMobileNav() {
            if (navLeft.classList.contains("open")) {
                navLeft.classList.remove("open");
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        }

        function toggleMobileNav(e) {
            e.stopPropagation();
            var isOpen = navLeft.classList.toggle("open");
            mobileBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        }

        mobileBtn.addEventListener("click", toggleMobileNav);

        // Outside tap to close menu
        document.addEventListener("click", function (e) {
            if (navLeft.classList.contains("open") && !navLeft.contains(e.target) && !mobileBtn.contains(e.target)) {
                closeMobileNav();
            }
        });

        // Setup mobile dropdown accordion toggling
        var dropdownLis = navLeft.querySelectorAll("ul li");
        dropdownLis.forEach(function (li) {
            var subMenu = li.querySelector(".dropdown-menu");
            if (subMenu) {
                li.classList.add("has-dropdown");
                var parentLink = li.querySelector(":scope > a");
                if (parentLink) {
                    var existingArrow = li.querySelector(".dropdown-toggle-arrow");
                    if (!existingArrow) {
                        var arrowBtn = document.createElement("button");
                        arrowBtn.type = "button";
                        arrowBtn.className = "dropdown-toggle-arrow";
                        arrowBtn.setAttribute("aria-label", "Toggle Submenu");
                        arrowBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';

                        // Insert arrow button right after the Services link
                        parentLink.insertAdjacentElement("afterend", arrowBtn);

                        // Clicking the arrow button toggles the dropdown submenu
                        arrowBtn.addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            li.classList.toggle("dropdown-open");
                        });
                    }
                }
            }
        });

        // Close mobile nav when clicking any navigation link (including Services page link or submenu links)
        navLeft.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function (e) {
                if (window.innerWidth <= 768) {
                    closeMobileNav();
                }
            });
        });
    }

    /* ---------- 3. Smooth FAQ accordion (Instant '+' icon rotation & snappy collapse) ---------- */
    document.querySelectorAll(".faq-item").forEach(function (item) {
        var summary = item.querySelector("summary");
        var content = item.querySelector("p");
        if (!summary || !content) return;

        content.style.overflow = "hidden";

        if (item.hasAttribute("open")) {
            item.classList.add("faq-active");
            content.style.maxHeight = content.scrollHeight + 20 + "px";
            content.style.opacity = "1";
            content.style.paddingBottom = "18px";
        } else {
            content.style.maxHeight = "0px";
            content.style.opacity = "0";
            content.style.paddingBottom = "0px";
        }

        summary.addEventListener("click", function (e) {
            e.preventDefault();
            var isOpen = item.classList.contains("faq-active") || (item.hasAttribute("open") && !item.classList.contains("faq-closing"));

            if (isOpen) {
                // Instantly rotate '+' icon back to 0deg (0ms delay) and collapse content smoothly
                item.classList.remove("faq-active");
                item.classList.add("faq-closing");
                item.setAttribute("data-closing", "true");

                content.style.maxHeight = "0px";
                content.style.opacity = "0";
                content.style.paddingBottom = "0px";

                window.setTimeout(function () {
                    item.removeAttribute("open");
                    item.removeAttribute("data-closing");
                    item.classList.remove("faq-closing");
                }, 280);
            } else {
                // Instantly rotate '+' icon to 45deg (0ms delay) and expand content smoothly
                item.classList.remove("faq-closing");
                item.removeAttribute("data-closing");
                item.setAttribute("open", "");
                item.classList.add("faq-active");

                requestAnimationFrame(function () {
                    content.style.maxHeight = content.scrollHeight + 20 + "px";
                    content.style.opacity = "1";
                    content.style.paddingBottom = "18px";
                });
            }
        });
    });

    /* ---------- 4. Animated stat / metric counters ---------- */
    function animateCountUp(el) {
        var raw = el.textContent.trim();
        var match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;

        var prefix = match[1];
        var numStr = match[2];
        var suffix = match[3];
        var target = parseFloat(numStr);
        var isDecimal = numStr.indexOf(".") !== -1;
        var duration = 1300;
        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = target * eased;
            el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefix + numStr + suffix;
            }
        }
        requestAnimationFrame(step);
    }

    var statEls = document.querySelectorAll(".stat-number, .case-study-metric");
    if (!reduceMotion && "IntersectionObserver" in window && statEls.length) {
        var statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        statEls.forEach(function (el) { statObserver.observe(el); });
    }

    /* ---------- 5. Back-to-top button ---------- */
    var backToTop = document.getElementById("backToTop");
    if (!backToTop) {
        backToTop = document.createElement("button");
        backToTop.id = "backToTop";
        backToTop.className = "back-to-top";
        backToTop.setAttribute("aria-label", "Back to top");
        backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
    }

    backToTop.addEventListener("click", function () {
        if (window.lenis) window.lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 450) {
            backToTop.classList.add("show");
            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";
        } else {
            backToTop.classList.remove("show");
            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";
        }
    }, { passive: true });

    /* ---------- 6. Pricing Toggle (Monthly vs Annual) ---------- */
    var pricingToggle = document.getElementById("pricingToggle");
    var starterEl = document.getElementById("price-starter");
    var scaleEl = document.getElementById("price-scale");

    if (pricingToggle && starterEl && scaleEl) {
        pricingToggle.addEventListener("change", function () {
            if (this.checked) {
                starterEl.innerHTML = "?20,000<span> /month (billed annually)</span>";
                scaleEl.innerHTML = "?48,000<span> /month (billed annually)</span>";
            } else {
                starterEl.innerHTML = "?25,000<span> /month</span>";
                scaleEl.innerHTML = "?60,000<span> /month</span>";
            }
        });
    }

    /* ---------- 7. WhatsApp Floating Widget Handler ---------- */
    var waBtn = document.getElementById("waToggleBtn");
    var waPopup = document.getElementById("waPopup");
    if (waBtn && waPopup) {
        waBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            waPopup.classList.toggle("active");
        });

        document.addEventListener("click", function (e) {
            if (!waPopup.contains(e.target) && e.target !== waBtn) {
                waPopup.classList.remove("active");
            }
        });
    }

    /* ---------- 8. Free Instant Audit Modal Handler ---------- */
    var auditModal = document.getElementById("auditModal");
    var closeAuditModalBtn = document.getElementById("closeAuditModal");

    function openAuditModal() {
        if (auditModal) auditModal.classList.add("active");
    }

    function closeAuditModal() {
        if (auditModal) auditModal.classList.remove("active");
    }

    if (closeAuditModalBtn) {
        closeAuditModalBtn.addEventListener("click", closeAuditModal);
    }

    if (auditModal) {
        auditModal.addEventListener("click", function (e) {
            if (e.target === auditModal) closeAuditModal();
        });
    }

    // Attach openAuditModal to all "Get free growth plan" / "Get my free audit" buttons
    document.querySelectorAll(".see-button, .btn-primary, [data-open-audit]").forEach(function (btn) {
        if (btn.tagName === "BUTTON" || (btn.tagName === "A" && btn.getAttribute("href") === "/contact-us.html")) {
            btn.addEventListener("click", function (e) {
                // If it's explicitly a modal trigger or primary action, open modal
                if (btn.getAttribute("data-modal-trigger") === "true") {
                    e.preventDefault();
                    openAuditModal();
                }
            });
        }
    });

    var auditForm = document.getElementById("auditForm");
    if (auditForm) {
        auditForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var nameEl = auditForm.querySelector('input[type="text"], input[placeholder*="Name"]');
            var emailEl = auditForm.querySelector('input[type="email"]');
            var phoneEl = auditForm.querySelector('input[type="tel"]');
            var goalEl = auditForm.querySelector('select, input[placeholder*="Goal"], input[placeholder*="Service"]');

            if (window.sendLeadToGoogleSheets) {
                window.sendLeadToGoogleSheets({
                    name: nameEl ? nameEl.value.trim() : "",
                    email: emailEl ? emailEl.value.trim() : "",
                    phone: phoneEl ? phoneEl.value.trim() : "",
                    goal: goalEl ? goalEl.value.trim() : "Free Audit Request",
                    source: "Free Audit Modal (" + window.location.pathname + ")"
                });
            }

            closeAuditModal();
            auditForm.reset();
            setTimeout(function () {
                window.location.href = "/thank-you.html";
            }, 300);
        });
    }

    /* Contact Page Main Form Submissions */
    var contactForms = document.querySelectorAll(".contact-form");
    if (contactForms.length) {
        contactForms.forEach(function (cForm) {
            cForm.addEventListener("submit", function (e) {
                e.preventDefault();
                var fields = cForm.querySelectorAll("input, select, textarea");
                var leadObj = { source: "Contact Form (" + window.location.pathname + ")" };

                fields.forEach(function (f) {
                    var val = f.value ? f.value.trim() : "";
                    if (!val) return;
                    var ph = (f.placeholder || "").toLowerCase();
                    var lbl = f.previousElementSibling ? f.previousElementSibling.innerText.toLowerCase() : "";

                    if (f.type === "email" || ph.includes("email") || lbl.includes("email")) leadObj.email = val;
                    else if (f.type === "tel" || ph.includes("phone") || ph.includes("mobile") || lbl.includes("phone")) leadObj.phone = val;
                    else if (ph.includes("company") || lbl.includes("company")) leadObj.company = val;
                    else if (f.tagName === "TEXTAREA" || ph.includes("message") || lbl.includes("message")) leadObj.message = val;
                    else if (f.tagName === "SELECT" && lbl.includes("service")) leadObj.goal = val;
                    else if (f.tagName === "SELECT" && lbl.includes("budget")) leadObj.budget = val;
                    else if (!leadObj.name) leadObj.name = val;
                });

                if (window.sendLeadToGoogleSheets) {
                    window.sendLeadToGoogleSheets(leadObj);
                }

                cForm.reset();
                setTimeout(function () {
                    window.location.href = "/thank-you.html";
                }, 300);
            });
        });
    }

    /* Newsletter Form Submissions */
    var newsletterForms = document.querySelectorAll("#newsletterForm, .newsletter-form");
    if (newsletterForms.length) {
        newsletterForms.forEach(function (nForm) {
            nForm.addEventListener("submit", function (e) {
                e.preventDefault();
                var emailInput = nForm.querySelector('input[type="email"]');
                var emailVal = emailInput ? emailInput.value.trim() : "";
                if (!emailVal) return;

                if (window.sendLeadToGoogleSheets) {
                    window.sendLeadToGoogleSheets({
                        email: emailVal,
                        goal: "Newsletter Subscription",
                        source: "Blog Newsletter Form (" + window.location.pathname + ")"
                    });
                }

                var btn = nForm.querySelector('button[type="submit"], .btn-primary');
                if (btn) {
                    var oldText = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
                    btn.style.background = "#25D366";
                    setTimeout(function () {
                        btn.innerHTML = oldText;
                        btn.style.background = "";
                    }, 4000);
                }
                nForm.reset();
            });
        });
    }

    /* ---------- 9. Before vs After Comparison Slider ---------- */
    var baInput = document.getElementById("baSliderInput");
    var baFg = document.getElementById("baFgImage");
    var baHandle = document.getElementById("baHandle");

    if (baInput && baFg && baHandle) {
        baInput.addEventListener("input", function () {
            var val = this.value;
            baFg.style.width = val + "%";
            baHandle.style.left = val + "%";
        });
    }

    /* ---------- 10. Filterable Portfolio Category Grid ---------- */
    var filterBtns = document.querySelectorAll(".filter-btn");
    var portfolioItems = document.querySelectorAll(".portfolio-card-item");

    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                filterBtns.forEach(function (b) { b.classList.remove("active"); });
                this.classList.add("active");

                var filter = this.getAttribute("data-filter");
                portfolioItems.forEach(function (item) {
                    var cat = item.getAttribute("data-category");
                    if (filter === "all" || cat === filter) {
                        item.classList.remove("hide");
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    } else {
                        item.classList.add("hide");
                    }
                });
            });
        });
    }

    /* ---------- 11. Interactive Single Master Growth / ROI Calculator ---------- */
    var budgetSlider = document.getElementById("calcBudget");
    var budgetValEl = document.getElementById("calcBudgetValue");
    var trafficValEl = document.getElementById("calcTrafficValue");
    var leadsValEl = document.getElementById("calcLeadsResult");
    var reachValEl = document.getElementById("calcReachResult");
    var roasValEl = document.getElementById("calcROASResult");

    function updateROICalculator() {
        if (!budgetSlider) return;

        var budget = parseInt(budgetSlider.value, 10);
        // Single master scale: Target Traffic scales proportionally (10:1 ratio)
        var traffic = Math.round(budget / 10);

        if (budgetValEl) budgetValEl.textContent = "?" + budget.toLocaleString("en-IN") + " /mo";
        if (trafficValEl) trafficValEl.textContent = traffic.toLocaleString("en-IN") + " visitors/mo";

        // 1. Estimated Qualified Leads (Target Conversion Rate ~3.8% + Ad Lead Scaling)
        var estLeads = Math.round((traffic * 0.038) + (budget / 400));

        // 2. Estimated Brand Reach & Impressions (Organic Search + Paid Ad Impressions)
        var estReach = Math.round((traffic * 6) + (budget * 15));

        // 3. ROAS Multiplier (Scales between 3.2x and 4.8x)
        var roas = (3.2 + Math.min(1.6, (budget / 180000))).toFixed(1);

        if (leadsValEl) leadsValEl.textContent = estLeads.toLocaleString("en-IN") + " leads/mo";
        if (reachValEl) reachValEl.textContent = estReach.toLocaleString("en-IN") + " impressions";
        if (roasValEl) roasValEl.textContent = roas + "x ROAS";
    }

    if (budgetSlider) {
        budgetSlider.addEventListener("input", updateROICalculator);
        updateROICalculator();
    }

    /* ===================================================================
       12. INTERACTIVE SERVICE SCOPE & DELIVERABLES MODAL
       =================================================================== */
    var serviceScopeData = {
        "seo": {
            title: "Search Engine Optimization (SEO)",
            badge: "Organic Growth & Ranking Dominance",
            timeline: "Est. Turnaround: Ongoing Monthly Growth",
            deliverables: [
                "Comprehensive Technical & Schema Audit",
                "High-Intent Buyer Keyword Mapping",
                "On-Page Optimization (Meta, H1-H3, Alt)",
                "High-DA Authority Backlink Acquisition",
                "Google Search Console & GA4 Setup",
                "Weekly Keyword Rank Tracking Reports"
            ]
        },
        "social": {
            title: "Social Media Marketing & Management",
            badge: "Brand Awareness & Viral Engagement",
            timeline: "Est. Turnaround: Weekly Content Releases",
            deliverables: [
                "Custom Monthly Content Strategy Calendar",
                "12 High-Converting Posts / Reels Graphics",
                "Engaging Ad Copy & Hashtag Research",
                "Community Moderation & DM Responses",
                "Paid Social Retargeting Setup",
                "Monthly Impression & Growth Analytics"
            ]
        },
        "paid-ads": {
            title: "Performance Marketing (Google & Meta Ads)",
            badge: "Instant Traffic & High-ROAS Conversions",
            timeline: "Est. Turnaround: Campaigns Live in 5 Days",
            deliverables: [
                "Full Account Audit & Structure Setup",
                "Google Search, Shopping & Meta Ads",
                "Ad Copywriting & Custom Visual Creatives",
                "Conversion Tracking & Pixel / CAPI",
                "Laser-Targeted Audience & Lead Segmentation",
                "A/B Creative & Headline Split Testing",
                "Daily Bid Management & ROAS Scaling"
            ]
        },
        "web-design": {
            title: "Website Design & Custom Development",
            badge: "High-Converting Digital Flagship",
            timeline: "Est. Turnaround: 2 to 3 Weeks Delivery",
            deliverables: [
                "Custom Mobile-First Responsive Design",
                "Core Web Vitals Speed & LCP Optimized",
                "Conversion-Focused UX Landing Pages",
                "WhatsApp Chat & Contact Forms Integration",
                "SEO-Friendly Clean Code Architecture",
                "SSL Security & CMS Training Included"
            ]
        },
        "content": {
            title: "Content Writing & Copywriting",
            badge: "Authority Building & Search Traffic",
            timeline: "Est. Turnaround: 3-5 Days Per Batch",
            deliverables: [
                "SEO Keyword-Targeted Blog Articles",
                "Persuasive Landing Page Sales Copy",
                "Brand Storytelling & Tagline Creation",
                "Search Intent & Competitor Content Gap Analysis",
                "Plagiarism & Grammar Proofread Guarantee",
                "Internal Link & Call-to-Action Strategy"
            ]
        },
        "branding": {
            title: "Branding & Visual Identity System",
            badge: "Memorable Brand Persona",
            timeline: "Est. Turnaround: 10 to 14 Business Days",
            deliverables: [
                "Primary Logo & Icon Mark Variations",
                "Brand Guidelines Book (Color & Fonts)",
                "Typography System & Voice Guidelines",
                "Business Cards & Social Media Kit",
                "Stationery & Email Signature Assets",
                "Vector Source Files (AI, SVG, PNG, PDF)"
            ]
        },
        "email": {
            title: "Email Marketing & Automation Flows",
            badge: "Customer Retention & Revenue Automation",
            timeline: "Est. Turnaround: 7 Days Sequence Build",
            deliverables: [
                "Automated Welcome & Lead Magnet Flow",
                "Abandoned Cart & Browse Recovery Series",
                "Custom Responsive HTML Email Templates",
                "Audience List Segmentation & Hygiene",
                "A/B Subject Line & CTA Testing",
                "Spam Check & Deliverability Optimization"
            ]
        },
        "orm": {
            title: "Online Reputation Management (ORM)",
            badge: "Brand Protection & 5-Star Trust",
            timeline: "Est. Turnaround: Immediate Monitoring",
            deliverables: [
                "Google Business Profile Optimization",
                "Automated Customer Review Generation",
                "Negative Search Result Suppression Strategy",
                "24/7 Brand Mention & Review Monitoring",
                "Professional Review Response Handling",
                "Monthly Reputation Health Scorecard"
            ]
        },
        "ecommerce": {
            title: "E-Commerce Marketing & Store Scale",
            badge: "D2C Scaling & High-ROAS Growth",
            timeline: "Est. Turnaround: Continuous Monthly Scaling",
            deliverables: [
                "Shopify / WooCommerce Conversion Rate Optimization (CRO)",
                "Meta & Google Dynamic Product Catalog Ads",
                "Amazon & Marketplace Listing SEO & Scale",
                "Abandoned Cart & Post-Purchase Upsell Flows",
                "Product Page UI/UX & Sub-Second Speed Overhaul",
                "Weekly ROAS, CAC & Unit Economics Growth Reports"
            ]
        },
        "whatsapp": {
            title: "WhatsApp Marketing & Automation",
            badge: "Conversational Commerce & Automation",
            timeline: "Est. Turnaround: 5 to 7 Days System Setup",
            deliverables: [
                "Official Meta WhatsApp Cloud API Setup & Verification",
                "Automated Abandoned Cart & Order Notification Flows",
                "24/7 Conversational AI Chatbot & Lead Routing",
                "Segmented Bulk Broadcast Campaigns with Rich Media",
                "Click-to-WhatsApp Ads (CTWA) Funnel Architecture",
                "Shopify, WooCommerce, Zoho & HubSpot CRM Integration"
            ]
        }
    };

    // Inject Service Scope Modal HTML
    var scopeModalHtml = `
        <div class="audit-modal-overlay" id="serviceScopeModal">
            <div class="audit-modal-content scope-modal-content">
                <button class="modal-close-btn" id="closeScopeModalBtn">&times;</button>
                <span class="scope-modal-badge" id="scopeModalBadge">Service Scope</span>
                <div class="audit-modal-header" style="text-align: left; margin-bottom: 15px;">
                    <h2 id="scopeModalTitle" style="font-size: 24px;">Service Title</h2>
                    <p id="scopeModalTimeline" style="color: #654E9F; font-weight: 600; font-size: 14px; margin-top: 4px;">Est. Turnaround</p>
                </div>
                <p style="font-size: 14.5px; color: #555; margin-bottom: 15px;">Key deliverables included in this service package:</p>
                <div class="scope-checklist" id="scopeChecklist"></div>
                <button class="btn-primary" id="scopeClaimProposalBtn" style="width: 100%; margin-top: 15px; text-align: center;">Get Proposal For This Scope &rarr;</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", scopeModalHtml);

    var scopeModal = document.getElementById("serviceScopeModal");
    var closeScopeModalBtn = document.getElementById("closeScopeModalBtn");
    var scopeClaimProposalBtn = document.getElementById("scopeClaimProposalBtn");

    if (closeScopeModalBtn && scopeModal) {
        closeScopeModalBtn.addEventListener("click", function () {
            scopeModal.classList.remove("active");
        });
        scopeModal.addEventListener("click", function (e) {
            if (e.target === scopeModal) scopeModal.classList.remove("active");
        });
    }

    function openServiceScope(key) {
        var data = serviceScopeData[key] || serviceScopeData["seo"];
        document.getElementById("scopeModalBadge").textContent = data.badge;
        document.getElementById("scopeModalTitle").textContent = data.title;
        document.getElementById("scopeModalTimeline").textContent = data.timeline;

        var checklistContainer = document.getElementById("scopeChecklist");
        checklistContainer.innerHTML = "";
        data.deliverables.forEach(function (item) {
            var el = document.createElement("div");
            el.className = "scope-check-item";
            el.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>' + item + '</span>';
            checklistContainer.appendChild(el);
        });

        scopeModal.classList.add("active");
    }

    // Attach click listeners to all buttons with data-scope-target
    document.addEventListener("click", function (e) {
        var trigger = e.target.closest("[data-scope-target]");
        if (trigger) {
            e.preventDefault();
            var targetKey = trigger.getAttribute("data-scope-target");
            openServiceScope(targetKey);
        }
    });

    /* ===================================================================
       13. MULTI-STEP PROPOSAL QUIZ WIZARD MODAL
       =================================================================== */
    var quizModalHtml = `
        <div class="audit-modal-overlay" id="proposalQuizModal">
            <div class="audit-modal-content quiz-modal-content">
                <button class="modal-close-btn" id="closeQuizModalBtn">&times;</button>
                <div class="audit-modal-header" style="text-align: center; margin-bottom: 10px;">
                    <h2>Interactive Growth Proposal</h2>
                    <p style="font-size: 14px; color: #666;">Get a tailored digital marketing roadmap in 3 clicks.</p>
                </div>
                
                <div class="quiz-progress-bar-bg">
                    <div class="quiz-progress-bar-fill" id="quizProgressFill"></div>
                </div>

                <!-- STEP 1 -->
                <div class="quiz-step" id="quizStep1">
                    <h3 style="font-size: 17px; text-align: center; color: #222; margin-bottom: 15px;">Step 1: What type of business do you run?</h3>
                    <div class="quiz-options-grid">
                        <div class="quiz-option-card selected" data-quiz-val="E-Commerce Store">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span>E-Commerce Store</span>
                        </div>
                        <div class="quiz-option-card" data-quiz-val="Local Business">
                            <i class="fa-solid fa-store"></i>
                            <span>Local Business</span>
                        </div>
                        <div class="quiz-option-card" data-quiz-val="B2B Enterprise">
                            <i class="fa-solid fa-building"></i>
                            <span>B2B Enterprise</span>
                        </div>
                        <div class="quiz-option-card" data-quiz-val="Service Provider">
                            <i class="fa-solid fa-user-gear"></i>
                            <span>Service Provider</span>
                        </div>
                    </div>
                    <div class="quiz-nav-btns">
                        <div></div>
                        <button class="btn-primary" id="quizNext1">Next: Select Goal &rarr;</button>
                    </div>
                </div>

                <!-- STEP 2 -->
                <div class="quiz-step" id="quizStep2" style="display: none;">
                    <h3 style="font-size: 17px; text-align: center; color: #222; margin-bottom: 15px;">Step 2: What is your primary growth goal?</h3>
                    <div class="quiz-options-grid">
                        <div class="quiz-option-card selected" data-quiz-val="Get Qualified Leads">
                            <i class="fa-solid fa-bullseye"></i>
                            <span>Get Qualified Leads</span>
                        </div>
                        <div class="quiz-option-card" data-quiz-val="Rank #1 on Google">
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Rank #1 on Google</span>
                        </div>
                        <div class="quiz-option-card" data-quiz-val="Scale Paid Ads ROAS">
                            <i class="fa-solid fa-rectangle-ad"></i>
                            <span>Scale Paid Ads ROAS</span>
                        </div>
                        <div class="quiz-option-card" data-quiz-val="Custom Web Redesign">
                            <i class="fa-solid fa-laptop-code"></i>
                            <span>Custom Web Redesign</span>
                        </div>
                    </div>
                    <div class="quiz-nav-btns">
                        <button class="btn-secondary" id="quizBack2">&larr; Back</button>
                        <button class="btn-primary" id="quizNext2">Next: Contact Info &rarr;</button>
                    </div>
                </div>

                <!-- STEP 3 -->
                <div class="quiz-step" id="quizStep3" style="display: none;">
                    <h3 style="font-size: 17px; text-align: center; color: #222; margin-bottom: 15px;">Step 3: Where should we send your custom strategy?</h3>
                    <form id="quizForm">
                        <div class="audit-form-group" style="margin-bottom: 12px;">
                            <input type="text" id="quizName" placeholder="Your Full Name" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
                        </div>
                        <div class="audit-form-group" style="margin-bottom: 12px;">
                            <input type="tel" id="quizPhone" placeholder="Phone Number (WhatsApp)" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
                        </div>
                        <div class="audit-form-group" style="margin-bottom: 12px;">
                            <input type="email" id="quizEmail" placeholder="Email Address" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
                        </div>
                        <div class="quiz-nav-btns">
                            <button type="button" class="btn-secondary" id="quizBack3">&larr; Back</button>
                            <button type="submit" class="btn-primary">Claim My Growth Roadmap &rarr;</button>
                        </div>
                    </form>
                </div>

                <!-- SUCCESS MESSAGE -->
                <div id="quizSuccessMsg" style="display: none; text-align: center; padding: 25px 10px;">
                    <i class="fa-solid fa-circle-check" style="font-size: 50px; color: #25D366; margin-bottom: 15px;"></i>
                    <h3 style="font-size: 22px; color: #222; margin-bottom: 8px;">Proposal Request Received!</h3>
                    <p style="color: #666; font-size: 15px;">Our strategy team will review your business details and send your customized roadmap within 24 hours.</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", quizModalHtml);

    var quizModal = document.getElementById("proposalQuizModal");
    var closeQuizModalBtn = document.getElementById("closeQuizModalBtn");
    var quizProgressFill = document.getElementById("quizProgressFill");

    var quizStep1 = document.getElementById("quizStep1");
    var quizStep2 = document.getElementById("quizStep2");
    var quizStep3 = document.getElementById("quizStep3");
    var quizSuccessMsg = document.getElementById("quizSuccessMsg");

    var currentQuizStep = 1;
    var quizData = { businessType: "E-Commerce Store", goal: "Get Qualified Leads" };

    if (closeQuizModalBtn && quizModal) {
        closeQuizModalBtn.addEventListener("click", function () {
            quizModal.classList.remove("active");
        });
        quizModal.addEventListener("click", function (e) {
            if (e.target === quizModal) quizModal.classList.remove("active");
        });
    }

    // Option selections
    document.querySelectorAll(".quiz-option-card").forEach(function (card) {
        card.addEventListener("click", function () {
            var parent = this.parentElement;
            parent.querySelectorAll(".quiz-option-card").forEach(function (c) { c.classList.remove("selected"); });
            this.classList.add("selected");
            var val = this.getAttribute("data-quiz-val");
            if (this.closest("#quizStep1")) quizData.businessType = val;
            if (this.closest("#quizStep2")) quizData.goal = val;
        });
    });

    function setQuizStep(step) {
        currentQuizStep = step;
        quizStep1.style.display = step === 1 ? "block" : "none";
        quizStep2.style.display = step === 2 ? "block" : "none";
        quizStep3.style.display = step === 3 ? "block" : "none";
        quizSuccessMsg.style.display = "none";

        if (step === 1) quizProgressFill.style.width = "33%";
        if (step === 2) quizProgressFill.style.width = "66%";
        if (step === 3) quizProgressFill.style.width = "100%";
    }

    document.getElementById("quizNext1").addEventListener("click", function () { setQuizStep(2); });
    document.getElementById("quizBack2").addEventListener("click", function () { setQuizStep(1); });
    document.getElementById("quizNext2").addEventListener("click", function () { setQuizStep(3); });
    document.getElementById("quizBack3").addEventListener("click", function () { setQuizStep(2); });

    document.getElementById("quizForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var qName = document.getElementById("quizName");
        var qPhone = document.getElementById("quizPhone");
        var qEmail = document.getElementById("quizEmail");
        if (window.sendLeadToGoogleSheets) {
            window.sendLeadToGoogleSheets({
                name: qName ? qName.value.trim() : "",
                phone: qPhone ? qPhone.value.trim() : "",
                email: qEmail ? qEmail.value.trim() : "",
                goal: "Proposal Quiz: " + (quizData.goal || "") + " (" + (quizData.businessType || "") + ")",
                source: "Proposal Quiz Modal (" + window.location.pathname + ")"
            });
        }
        quizStep3.style.display = "none";
        quizSuccessMsg.style.display = "block";
        setTimeout(function () {
            quizModal.classList.remove("active");
            setQuizStep(1);
            window.location.href = "/thank-you.html";
        }, 1200);
    });

    if (scopeClaimProposalBtn) {
        scopeClaimProposalBtn.addEventListener("click", function () {
            scopeModal.classList.remove("active");
            quizModal.classList.add("active");
            setQuizStep(1);
        });
    }

    // Connect any button with data-modal-trigger="true" or data-quiz-trigger="true" to open quiz modal
    document.addEventListener("click", function (e) {
        var quizTrigger = e.target.closest("[data-quiz-trigger], [data-modal-trigger]");
        if (quizTrigger) {
            e.preventDefault();
            quizModal.classList.add("active");
            setQuizStep(1);
        }
    });

    // Close any active modal overlay when ESC key is pressed
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            if (auditModal) auditModal.classList.remove("active");
            if (scopeModal) scopeModal.classList.remove("active");
            if (quizModal) quizModal.classList.remove("active");
            var chatWin = document.getElementById("chatWindow");
            if (chatWin) chatWin.classList.remove("active");
            var waPop = document.getElementById("waPopup");
            if (waPop) waPop.classList.remove("active");
        }
    });

        /* ---------- 9. GROWELL INTERACTIVE LEAD CHATBOT ENGINE ---------- */
    (function () {
        var chatToggleBtn = document.getElementById("chatToggleBtn");
        var chatWindow = document.getElementById("chatWindow");
        var chatCloseBtn = document.getElementById("chatCloseBtn");
        var chatTeaser = document.getElementById("chatTeaser");
        var chatMessages = document.getElementById("chatMessages");

        if (!chatToggleBtn || !chatWindow) return;

        var leadData = {
            goal: "",
            budget: "",
            name: "",
            phone: ""
        };

        function toggleChat() {
            var isActive = chatWindow.classList.toggle("active");
            if (chatTeaser) chatTeaser.style.display = "none";
            var badge = chatToggleBtn.querySelector(".chat-badge");
            if (badge && isActive) badge.style.display = "none";
        }

        chatToggleBtn.addEventListener("click", toggleChat);
        if (chatCloseBtn) chatCloseBtn.addEventListener("click", toggleChat);

        setTimeout(function () {
            if (chatTeaser && !chatWindow.classList.contains("active")) {
                chatTeaser.style.opacity = "0";
                chatTeaser.style.transition = "opacity 0.5s ease";
                setTimeout(function () { chatTeaser.style.display = "none"; }, 500);
            }
        }, 6000);

        function appendMsg(text, sender) {
            var msgDiv = document.createElement("div");
            msgDiv.className = "chat-msg " + sender;
            msgDiv.innerHTML = '<div class="msg-bubble">' + text + '</div>';
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping(callback) {
            var typingDiv = document.createElement("div");
            typingDiv.className = "chat-msg bot typing-msg";
            typingDiv.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(function () {
                if (typingDiv.parentNode) typingDiv.parentNode.removeChild(typingDiv);
                if (callback) callback();
            }, 650);
        }

        chatMessages.addEventListener("click", function (e) {
            var optBtn = e.target.closest("#chatStep1Options .chat-opt-btn");
            if (optBtn) {
                leadData.goal = optBtn.getAttribute("data-goal") || optBtn.innerText;
                appendMsg(optBtn.innerText, "user");

                var group = document.getElementById("chatStep1Options");
                if (group) group.remove();

                showTyping(function () {
                    appendMsg("Great choice! Growell marketing strategies are proven to scale " + leadData.goal + ".", "bot");
                    showTyping(function () {
                        appendMsg("What is your approximate monthly marketing budget?", "bot");

                        var budgetGroup = document.createElement("div");
                        budgetGroup.className = "chat-options-group";
                        budgetGroup.id = "chatStep2Options";
                        budgetGroup.innerHTML = '<button class="chat-opt-btn" data-budget="&#8377;25,000 - &#8377;50,000/mo">&#8377;25,000 - &#8377;50,000 / month ($300 - $600)</button>' +
                            '<button class="chat-opt-btn" data-budget="&#8377;50,000 - &#8377;1,00,000/mo">&#8377;50,000 - &#8377;1,00,000 / month ($600 - $1.2k)</button>' +
                            '<button class="chat-opt-btn" data-budget="&#8377;1,00,000+/mo">&#8377;1,00,000+ / month ($1.2k+)</button>';
                        chatMessages.appendChild(budgetGroup);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                });
            }

            var budgetBtn = e.target.closest("#chatStep2Options .chat-opt-btn");
            if (budgetBtn) {
                leadData.budget = budgetBtn.getAttribute("data-budget") || budgetBtn.innerText;
                appendMsg(budgetBtn.innerText, "user");

                var bGroup = document.getElementById("chatStep2Options");
                if (bGroup) bGroup.remove();

                showTyping(function () {
                    appendMsg("Perfect! Your customized <b>Growth Audit & Proposal Plan</b> is ready.", "bot");
                    showTyping(function () {
                        appendMsg("Please enter your details below to receive it directly on WhatsApp:", "bot");

                        var formDiv = document.createElement("div");
                        formDiv.className = "chat-lead-form";
                        formDiv.id = "chatLeadFormWrap";
                        formDiv.innerHTML = '<input type="text" id="chatName" placeholder="Your Full Name *" required>' +
                            '<input type="tel" id="chatPhone" placeholder="WhatsApp / Phone Number *" required>' +
                            '<button class="chat-submit-btn" id="chatFormSubmit">Get Free Audit Plan &rarr;</button>';
                        chatMessages.appendChild(formDiv);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                });
            }
        });

        chatMessages.addEventListener("click", function (e) {
            if (e.target && e.target.id === "chatFormSubmit") {
                e.preventDefault();
                var nameInput = document.getElementById("chatName");
                var phoneInput = document.getElementById("chatPhone");

                if (!nameInput || !nameInput.value.trim()) {
                    nameInput.style.borderColor = "#ff4444";
                    nameInput.focus();
                    return;
                }
                nameInput.style.borderColor = "";

                if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
                    phoneInput.style.borderColor = "#ff4444";
                    phoneInput.focus();
                    return;
                }
                phoneInput.style.borderColor = "";

                leadData.name = nameInput.value.trim();
                leadData.phone = phoneInput.value.trim();

                // Auto-save lead to Google Sheets DB
                if (window.sendLeadToGoogleSheets) {
                    window.sendLeadToGoogleSheets({
                        name: leadData.name,
                        phone: leadData.phone,
                        goal: leadData.goal + " (" + (leadData.budget || "Not Specified") + ")",
                        source: "Botpress Flow Chatbot"
                    });
                }

                var formWrap = document.getElementById("chatLeadFormWrap");
                if (formWrap) formWrap.remove();

                appendMsg("<b>Name:</b> " + leadData.name + "<br><b>Phone:</b> " + leadData.phone, "user");

                showTyping(function () {
                    var successText = "Superb, " + leadData.name + "! Your request has been registered.<br><br>Our Growth Team will contact you within 15 minutes!";
                    appendMsg(successText, "bot");

                    showTyping(function () {
                        var waMsg = encodeURIComponent("Hi Growell Marketing! My name is " + leadData.name + ". I want to scale my business (" + leadData.goal + ") with a budget of " + leadData.budget + ". Please send me my growth audit!");
                        var waUrl = "https://wa.me/918114456687?text=" + waMsg;

                        var waDiv = document.createElement("div");
                        waDiv.innerHTML = '<a href="' + waUrl + '" target="_blank" class="chat-whatsapp-action"><i class="fa-brands fa-whatsapp"></i> Chat Live on WhatsApp Now</a>';
                        chatMessages.appendChild(waDiv);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                });
            }
        });

        /* Website Knowledge Base Data in English */
        var websiteKnowledge = [
            {
                keywords: ["address", "location", "office", "where", "city", "ajmer", "rajasthan", "map", "direction"],
                reply: "<i class=\"fa-solid fa-location-dot\"></i> <b>Growell Marketing Office Address</b>:<br>2nd Floor, Janta Colony, Vaishali Nagar, Ajmer, Rajasthan 305001, ajmer.<br><br><a href='https://maps.app.goo.gl/U7BGknhtbDs6S8NAA' target='_blank' style='color:#654E9F;font-weight:700;'>Get Directions on Google Maps &rarr;</a>"
            },
            {
                keywords: ["seo", "rank", "google ranking", "search engine", "organic traffic", "keywords"],
                reply: "<i class=\"fa-solid fa-chart-line\"></i> <b>Search Engine Optimization (SEO)</b>:<br>We rank your website #1 on Google. Inclusions:<br>&bull; Technical SEO & PageSpeed Optimization<br>&bull; On-Page & Keyword Strategy<br>&bull; High-Authority Backlink Building<br>&bull; Monthly Performance Reports<br><br><a href='/services/seo' style='color:#654E9F;font-weight:700;'>View SEO Services &rarr;</a>"
            },
            {
                keywords: ["ads", "paid ads", "google ads", "meta ads", "facebook ads", "instagram ads", "ppc", "roas"],
                reply: "<i class=\"fa-solid fa-bullhorn\"></i> <b>Paid Advertising (Google & Meta Ads)</b>:<br>We run high-converting ad campaigns with 3.5x - 4.5x average ROAS. Inclusions:<br>&bull; Meta (FB/IG) & Google Search/Shopping Ads<br>&bull; High-Converting Copy & Ad Creatives<br>&bull; Audience Targeting & Retargeting Funnels<br><br><a href='/services/paid-advertising' style='color:#654E9F;font-weight:700;'>Explore Paid Ads &rarr;</a>"
            },
            {
                keywords: ["web", "website", "design", "development", "developer", "web design", "site"],
                reply: "<i class=\"fa-solid fa-laptop-code\"></i> <b>Website Design & Full-Stack Development</b>:<br>Sub-second loading speed, mobile responsive, high-converting custom code websites:<br>&bull; Modern Responsive UI/UX<br>&bull; Lead Generation Funnels<br>&bull; SEO Ready Architecture & Security<br><br><a href='/services/web-design' style='color:#654E9F;font-weight:700;'>Explore Web Development &rarr;</a>"
            },
            {
                keywords: ["social", "social media", "instagram", "facebook", "reels", "posts", "content strategy"],
                reply: "<i class=\"fa-solid fa-hashtag\"></i> <b>Social Media Marketing</b>:<br>We build your brand visual identity and engage your target audience:<br>&bull; Custom Graphic & Video Creatives<br>&bull; Content Calendar & Copywriting<br>&bull; Organic Growth & Community Management<br><br><a href='/services/social-media-marketing-services' style='color:#654E9F;font-weight:700;'>Explore Social Media &rarr;</a>"
            },
            {
                keywords: ["services", "service", "what do you do", "offer"],
                reply: "<i class=\"fa-solid fa-briefcase\"></i> <b>Growell Marketing Services</b>:<br>1. Search Engine Optimization (SEO)<br>2. Meta & Google Paid Ads<br>3. Website Design & Development<br>4. Social Media Marketing<br>5. Content Writing & Copywriting<br>6. Brand Identity & Strategy<br>7. Email Marketing & Automation<br>8. Online Reputation Management (ORM)<br><br><a href='/services' style='color:#654E9F;font-weight:700;'>View All Services &rarr;</a>"
            },
            {
                keywords: ["team", "founder", "owner", "harsh", "aniket", "pintu", "simran", "who is", "people"],
                reply: "<i class=\"fa-solid fa-users\"></i> <b>Growell Leadership Team</b>:<br>&bull; <b>Harsh Panwar</b> &mdash; Founder & Marketing Head (8+ Yrs Exp)<br>&bull; <b>Aniket Singh Sisodia</b> &mdash; Managing Partner & Creative Head (8+ Yrs Exp)<br>&bull; <b>Pintu Nath</b> &mdash; Marketing Manager & Tech Lead (4+ Yrs Exp)<br><br><a href='/about-us' style='color:#654E9F;font-weight:700;'>Read Leadership Bios &rarr;</a>"
            },
            {
                keywords: ["price", "pricing", "cost", "charge", "budget", "fees", "retainer"],
                reply: "<i class=\"fa-solid fa-tags\"></i> <b>Growell Pricing & Retainers</b>:<br>We offer customized growth retainers starting from <b>&#8377;25,000 / month ($300/mo)</b> depending on business goals and scope. Zero hidden fees & transparent monthly reporting.<br><br><a href='/pricing' style='color:#654E9F;font-weight:700;'>Open Growth Estimator &rarr;</a>"
            },
            {
                keywords: ["contact", "phone", "mobile", "whatsapp", "call", "email", "number", "reach"],
                reply: "<i class=\"fa-solid fa-headset\"></i> <b>Contact Growell Marketing</b>:<br>&bull; <b>Phone / WhatsApp</b>: +91 8114456687<br>&bull; <b>Email</b>: info@growellmarketing.com<br>&bull; <b>Office</b>: Ajmer, Rajasthan, ajmer<br><br><a href='https://wa.me/918114456687' target='_blank' style='color:#25D366;font-weight:700;'>Start Live Chat on WhatsApp &rarr;</a>"
            }
        ];

        function handleKnowledgeSearch() {
            var searchInput = document.getElementById("chatSearchInput");
            if (!searchInput || !searchInput.value.trim()) return;
            var q = searchInput.value.trim();
            searchInput.value = "";
            appendMsg(q, "user");

            showTyping(function () {
                var queryLower = q.toLowerCase();
                var answer = "";
                for (var i = 0; i < websiteKnowledge.length; i++) {
                    var item = websiteKnowledge[i];
                    for (var j = 0; j < item.keywords.length; j++) {
                        if (queryLower.includes(item.keywords[j])) {
                            answer = item.reply;
                            break;
                        }
                    }
                    if (answer) break;
                }
                if (!answer) {
                    answer = "Growell Marketing is a 360&deg; Performance Marketing Agency. We scale businesses through Paid Ads, SEO, Web Development, and Brand Strategy.<br><br>Contact our team directly: <b>+91 8114456687</b> or <a href='https://wa.me/918114456687' target='_blank' style='color:#25D366;font-weight:700;'>Chat on WhatsApp &rarr;</a>";
                }
                appendMsg(answer, "bot");
            });
        }

        var searchSendBtn = document.getElementById("chatSearchSend");
        var searchInput = document.getElementById("chatSearchInput");
        if (searchSendBtn) searchSendBtn.addEventListener("click", handleKnowledgeSearch);
        if (searchInput) {
            searchInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handleKnowledgeSearch();
                }
            });
        }

    })();


    /* ---------- 10. EXIT-INTENT LEAD MODAL ENGINE ---------- */
    (function () {
        var exitModalHtml = `
            <div class="audit-modal-overlay" id="exitIntentModal">
                <div class="audit-modal-content exit-intent-content" style="max-width: 480px;">
                    <button class="modal-close-btn" id="closeExitIntentBtn">&times;</button>
                    <div style="text-align: center; margin-bottom: 12px;">
                        <span style="background: rgba(101, 78, 159, 0.15); color: #654E9F; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;"><i class=\"fa-solid fa-bolt\"></i> Special Free Growth Offer</span>
                    </div>
                    <div class="audit-modal-header" style="text-align: center; margin-bottom: 16px;">
                        <h2 style="font-size: 22px; margin-bottom: 6px;">Wait! Before You Leave...</h2>
                        <p style="font-size: 14px; color: #555;">Get Our Free <b>7-Point Digital Audit & Growth Strategy Report</b> (&#8377;15,000 Value &mdash; 100% Free)</p>
                    </div>
                    <form id="exitIntentForm" style="display: flex; flex-direction: column; gap: 12px;">
                        <input type="text" id="exitName" placeholder="Your Full Name *" required style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                        <input type="tel" id="exitPhone" placeholder="WhatsApp / Phone Number *" required style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                        <input type="text" id="exitGoal" placeholder="Website URL or Primary Business Goal" style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                        <button type="submit" class="btn-primary" style="width: 100%; padding: 14px; font-weight: 700; margin-top: 6px;">Claim Free Audit Report &rarr;</button>
                    </form>
                    <div style="margin-top: 14px; text-align: center; font-size: 11.5px; color: #777; line-height: 1.5;">
                        <i class=\"fa-solid fa-circle-check\" style=\"color:#25D366;\"></i> <b>150+ Brands Scaled</b> &bull; <i class=\"fa-solid fa-star\" style=\"color:#ffb703;\"></i> <b>4.9 Google Rating</b> &bull; <i class=\"fa-solid fa-lock\" style=\"color:#654E9F;\"></i> <b>100% Free &amp; No Spam</b>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", exitModalHtml);

        var exitModal = document.getElementById("exitIntentModal");
        var closeExitBtn = document.getElementById("closeExitIntentBtn");

        if (closeExitBtn && exitModal) {
            closeExitBtn.addEventListener("click", function () {
                exitModal.classList.remove("active");
            });
            exitModal.addEventListener("click", function (e) {
                if (e.target === exitModal) exitModal.classList.remove("active");
            });
        }

        document.addEventListener("mouseleave", function (e) {
            if (e.clientY <= 10 && !sessionStorage.getItem("exitIntentShown")) {
                sessionStorage.setItem("exitIntentShown", "true");
                if (exitModal) exitModal.classList.add("active");
            }
        });

        var exitForm = document.getElementById("exitIntentForm");
        if (exitForm) {
            exitForm.addEventListener("submit", function (e) {
                e.preventDefault();
                var nameVal = document.getElementById("exitName").value.trim();
                var phoneVal = document.getElementById("exitPhone").value.trim();
                var goalVal = document.getElementById("exitGoal").value.trim() || "Exit Intent Special Audit Request";

                if (window.sendLeadToGoogleSheets) {
                    window.sendLeadToGoogleSheets({
                        name: nameVal,
                        phone: phoneVal,
                        goal: goalVal,
                        source: "Exit Intent Modal (" + window.location.pathname + ")"
                    });
                }

                alert("Thank you, " + nameVal + "! Your Free Audit Report request has been submitted. Our strategy team will reach out on WhatsApp within 15 mins.");
                if (exitModal) exitModal.classList.remove("active");
                exitForm.reset();
            });
        }
    })();

    /* ---------- 11. MOBILE FLOATING STICKY LEAD BAR INJECTION ---------- */
    (function () {
        var mobileBarHtml = `
            <div class="mobile-sticky-lead-bar">
                <a href="tel:+918114456687" class="sticky-btn call-btn">
                    <i class="fa-solid fa-phone"></i> <span>Call Us</span>
                </a>
                <a href="https://wa.me/918114456687?text=Hi%20Growell%20Marketing!%20I%20want%20to%20know%20more%20about%20your%20services." target="_blank" class="sticky-btn wa-btn">
                    <i class="fa-brands fa-whatsapp"></i> <span>WhatsApp</span>
                </a>
                <button class="sticky-btn audit-btn" data-modal-trigger="true">
                    <i class="fa-solid fa-rocket"></i> <span>Free Audit</span>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", mobileBarHtml);
    })();


    /* ---------- 12. LOCAL & LOCALHOST NAVIGATION RESOLVER ---------- */
    (function () {
        var isLocalEnv = window.location.protocol === 'file:' || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' || 
                         window.location.hostname.indexOf('192.168.') === 0 ||
                         window.location.hostname.endsWith('.local');

        if (isLocalEnv) {
            document.addEventListener('click', function (e) {
                var a = e.target.closest('a');
                if (!a) return;
                var href = a.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

                if (href.startsWith('/')) {
                    e.preventDefault();
                    
                    var hashPart = '';
                    var cleanHref = href;
                    if (cleanHref.includes('#')) {
                        var parts = cleanHref.split('#');
                        cleanHref = parts[0];
                        hashPart = '#' + parts[1];
                    }

                    if (window.location.protocol === 'file:') {
                        var pathname = window.location.pathname;
                        var rootMatch = pathname.match(/^.*?[\\\/]Growell(?:%20|\s)Marketing[\\\/]/i);
                        var rootDir = rootMatch ? rootMatch[0] : pathname.substring(0, pathname.lastIndexOf('/') + 1);

                        var target = cleanHref.replace(/^\/+/, '');
                        if (target === '' || target === '/') {
                            window.location.href = rootDir + 'index.html' + hashPart;
                        } else {
                            window.location.href = rootDir + target + '.html' + hashPart;
                        }
                    } else {
                        // Localhost / 127.0.0.1 (Live Server, http-server, etc.)
                        if (cleanHref === '' || cleanHref === '/') {
                            window.location.href = '/index.html' + hashPart;
                        } else {
                            window.location.href = cleanHref + '.html' + hashPart;
                        }
                    }
                }
            });
        }
    })();

    /* ==========================================================================
       Interactive 3D Mouse Cursor & Comet Tail Engine
       ========================================================================== */
    (function init3DCursor() {
        // Guard: Run strictly on desktop screens with fine pointer (no touch screens, no mobile)
        if (window.innerWidth < 992) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Create Root Container
        var root = document.createElement('div');
        root.id = 'cursor-3d-root';
        root.className = 'cursor-hidden';
        root.setAttribute('aria-hidden', 'true');

        // Magnetic Aura Ring
        var ring = document.createElement('div');
        ring.className = 'cursor-3d-ring';
        root.appendChild(ring);

        // 3D Comet Tail Nodes
        var tailWrap = document.createElement('div');
        tailWrap.className = 'cursor-3d-tail';
        var tailCount = 14;
        var tailDots = [];
        var tailPositions = [];

        for (var i = 0; i < tailCount; i++) {
            var dot = document.createElement('div');
            dot.className = 'cursor-tail-dot dot-' + i;
            tailWrap.appendChild(dot);
            tailDots.push(dot);
            tailPositions.push({ x: -100, y: -100 });
        }
        root.appendChild(tailWrap);

        // 3D Lead Orb
        var orb = document.createElement('div');
        orb.className = 'cursor-3d-orb';
        var glint = document.createElement('div');
        glint.className = 'cursor-orb-specular';
        orb.appendChild(glint);
        root.appendChild(orb);

        document.body.appendChild(root);

        // State Variables
        var mouseX = -100, mouseY = -100;
        var orbX = -100, orbY = -100;
        var ringX = -100, ringY = -100;
        var ringScale = 1;
        var targetRingScale = 1;
        var orbScale = 1;
        var targetOrbScale = 1;

        var prevMouseX = -100, prevMouseY = -100;
        var velocityX = 0, velocityY = 0;
        var speed = 0;
        var angle = 0;
        var isHovering = false;
        var isClicking = false;
        var isVisible = false;
        var animId = null;

        // Tail physics lag factors — higher = snappier (from closest to farthest)
        var tailLagFactors = [0.55, 0.50, 0.44, 0.38, 0.33, 0.28, 0.24, 0.20, 0.17, 0.14, 0.11, 0.09, 0.07, 0.05];

        // Mouse Movement Listener
        window.addEventListener('mousemove', function(e) {
            if (!isVisible) {
                isVisible = true;
                root.classList.remove('cursor-hidden');
                document.body.classList.add('has-custom-cursor');
                orbX = mouseX = e.clientX;
                orbY = mouseY = e.clientY;
                ringX = e.clientX;
                ringY = e.clientY;
                for (var j = 0; j < tailCount; j++) {
                    tailPositions[j].x = e.clientX;
                    tailPositions[j].y = e.clientY;
                }
            }

            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!animId) {
                animId = requestAnimationFrame(render);
            }
        }, { passive: true });

        // Window boundary handling
        document.addEventListener('mouseleave', function() {
            isVisible = false;
            root.classList.add('cursor-hidden');
            document.body.classList.remove('has-custom-cursor');
        });

        document.addEventListener('mouseenter', function() {
            isVisible = true;
            root.classList.remove('cursor-hidden');
            document.body.classList.add('has-custom-cursor');
        });

        // Hover Detection on Interactive Elements
        var hoverSelector = 'a, button, [role="button"], input, textarea, select, .service-main-card, .btn-primary, .btn-secondary, .btn-details, .btn-scope, .blog-card, .faq-question, .pricing-card, .explore-card';

        document.addEventListener('mouseover', function(e) {
            var hovered = e.target && e.target.closest && e.target.closest(hoverSelector);
            if (hovered) {
                // Only trigger if we weren't already inside this same element
                var from = e.relatedTarget;
                if (!from || !hovered.contains(from)) {
                    isHovering = true;
                    root.classList.add('cursor-hover');
                    targetRingScale = 1.45;
                    targetOrbScale = 1.25;
                    if (!animId) animId = requestAnimationFrame(render);
                }
            }
        }, { passive: true });

        document.addEventListener('mouseout', function(e) {
            var hovered = e.target && e.target.closest && e.target.closest(hoverSelector);
            if (hovered) {
                // Only trigger if we're actually leaving this element (not just moving to a child)
                var to = e.relatedTarget;
                if (!to || !hovered.contains(to)) {
                    isHovering = false;
                    root.classList.remove('cursor-hover');
                    targetRingScale = 1;
                    targetOrbScale = 1;
                    if (!animId) animId = requestAnimationFrame(render);
                }
            }
        }, { passive: true });

        // Mousedown & Mouseup Elastic Click State
        document.addEventListener('mousedown', function() {
            isClicking = true;
            root.classList.add('cursor-click');
            targetRingScale = 0.85;
            targetOrbScale = 0.75;
        }, { passive: true });

        document.addEventListener('mouseup', function() {
            isClicking = false;
            root.classList.remove('cursor-click');
            targetRingScale = isHovering ? 1.45 : 1;
            targetOrbScale = isHovering ? 1.25 : 1;
        }, { passive: true });

        // High-Performance RAF Render Loop
        function render() {
            // Calculate velocity & 3D tilt
            velocityX = mouseX - prevMouseX;
            velocityY = mouseY - prevMouseY;
            prevMouseX = mouseX;
            prevMouseY = mouseY;

            speed = Math.hypot(velocityX, velocityY);
            if (speed > 1) {
                angle = Math.atan2(velocityY, velocityX);
            }

            // Dynamic squash & stretch
            var stretch = 1 + Math.min(speed * 0.002, 0.35);
            var squeeze = 1 / stretch;

            // Snappy Lead Orb — higher lerp = faster
            orbX += (mouseX - orbX) * 0.72;
            orbY += (mouseY - orbY) * 0.72;
            orbScale += (targetOrbScale - orbScale) * 0.25;

            orb.style.transform = 'translate3d(' + orbX + 'px, ' + orbY + 'px, 0) rotate(' + angle + 'rad) scale(' + (stretch * orbScale) + ', ' + (squeeze * orbScale) + ')';

            // Snappy Aura Ring — higher lerp = faster
            ringX += (mouseX - ringX) * 0.30;
            ringY += (mouseY - ringY) * 0.30;
            ringScale += (targetRingScale - ringScale) * 0.25;

            ring.style.transform = 'translate3d(' + ringX + 'px, ' + ringY + 'px, 0) scale(' + ringScale + ')';

            // Smooth 3D Comet Tail
            var prevNodeX = orbX;
            var prevNodeY = orbY;

            for (var k = 0; k < tailCount; k++) {
                var lag = tailLagFactors[k];
                tailPositions[k].x += (prevNodeX - tailPositions[k].x) * lag;
                tailPositions[k].y += (prevNodeY - tailPositions[k].y) * lag;

                tailDots[k].style.transform = 'translate3d(' + tailPositions[k].x + 'px, ' + tailPositions[k].y + 'px, 0)';

                prevNodeX = tailPositions[k].x;
                prevNodeY = tailPositions[k].y;
            }

            // Energy-efficient loop termination when stationary
            var totalMovement = Math.abs(mouseX - orbX) + Math.abs(mouseY - orbY) + Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY) + speed;

            if (totalMovement > 0.1 || isHovering || isClicking) {
                animId = requestAnimationFrame(render);
            } else {
                animId = null;
            }
        }
    })();
})();