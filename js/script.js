/* ===================================================================
   GROWELL — SITE ANIMATIONS
   Scroll-reveal, smooth FAQ accordion, header shadow on scroll,
   animated stat counters, and a back-to-top button.
   No HTML edits required — targets existing class names site-wide.
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

    /* ---------- 2.5 Mobile Hamburger Navigation Toggle ---------- */
    var navbaar = document.querySelector(".navbaar");
    var navLeft = document.querySelector(".nav-left");
    if (navbaar && navLeft) {
        var existingBtn = navbaar.querySelector(".mobile-nav-toggle");
        if (!existingBtn) {
            var mobileBtn = document.createElement("button");
            mobileBtn.className = "mobile-nav-toggle";
            mobileBtn.setAttribute("aria-label", "Toggle Mobile Menu");
            mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            navbaar.appendChild(mobileBtn);

            mobileBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                var isOpen = navLeft.classList.toggle("open");
                mobileBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            });

            document.addEventListener("click", function (e) {
                if (!navbaar.contains(e.target) && navLeft.classList.contains("open")) {
                    navLeft.classList.remove("open");
                    mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        }
    }

    /* ---------- 3. Smooth FAQ accordion ---------- */
    document.querySelectorAll(".faq-item").forEach(function (item) {
        var summary = item.querySelector("summary");
        var content = item.querySelector("p");
        if (!summary || !content) return;

        content.style.overflow = "hidden";
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        content.style.paddingBottom = "0px";

        summary.addEventListener("click", function (e) {
            e.preventDefault();
            var isOpen = item.hasAttribute("open");

            if (isOpen) {
                content.style.maxHeight = "0px";
                content.style.opacity = "0";
                content.style.paddingBottom = "0px";
                window.setTimeout(function () {
                    item.removeAttribute("open");
                }, 380);
            } else {
                item.setAttribute("open", "");
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
    var backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.innerHTML = "&#8593;";
    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) backToTop.classList.add("show");
        else backToTop.classList.remove("show");
    }, { passive: true });

    /* ---------- 6. Pricing Toggle (Monthly vs Annual) ---------- */
    var pricingToggle = document.getElementById("pricingToggle");
    var starterEl = document.getElementById("price-starter");
    var scaleEl = document.getElementById("price-scale");

    if (pricingToggle && starterEl && scaleEl) {
        pricingToggle.addEventListener("change", function () {
            if (this.checked) {
                starterEl.innerHTML = "₹20,000<span> /month (billed annually)</span>";
                scaleEl.innerHTML = "₹48,000<span> /month (billed annually)</span>";
            } else {
                starterEl.innerHTML = "₹25,000<span> /month</span>";
                scaleEl.innerHTML = "₹60,000<span> /month</span>";
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
        if (btn.tagName === "BUTTON" || (btn.tagName === "A" && btn.getAttribute("href") === "/contact.html")) {
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

            alert("Thank you! Your free growth audit request has been submitted. Our strategy team will reach out within 24 hours.");
            closeAuditModal();
            auditForm.reset();
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

                alert("Thank you! Your message has been received. Growell Marketing team will get back to you within 24 hours.");
                cForm.reset();
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

        if (budgetValEl) budgetValEl.textContent = "₹" + budget.toLocaleString("en-IN") + " /mo";
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
            title: "Paid Advertising (Google & Meta Ads)",
            badge: "Instant Traffic & High-ROAS Conversions",
            timeline: "Est. Turnaround: Campaigns Live in 5 Days",
            deliverables: [
                "Full Account Audit & Structure Setup",
                "Ad Copywriting & Custom Visual Creatives",
                "Conversion Tracking & Pixel / CAPI",
                "Laser-Targeted Audience Segmentation",
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
                <button class="btn-primary" id="scopeClaimProposalBtn" style="width: 100%; margin-top: 15px; text-align: center;">Get Proposal For This Scope →</button>
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
                        <button class="btn-primary" id="quizNext1">Next: Select Goal →</button>
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
                        <button class="btn-secondary" id="quizBack2">← Back</button>
                        <button class="btn-primary" id="quizNext2">Next: Contact Info →</button>
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
                            <button type="button" class="btn-secondary" id="quizBack3">← Back</button>
                            <button type="submit" class="btn-primary">Claim My Growth Roadmap →</button>
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
        quizStep3.style.display = "none";
        quizSuccessMsg.style.display = "block";
        setTimeout(function () {
            quizModal.classList.remove("active");
            setQuizStep(1);
        }, 3500);
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
                    appendMsg("Great choice! 📈 Growell marketing strategies are proven to scale " + leadData.goal + ".", "bot");
                    showTyping(function () {
                        appendMsg("What is your approximate monthly marketing budget?", "bot");

                        var budgetGroup = document.createElement("div");
                        budgetGroup.className = "chat-options-group";
                        budgetGroup.id = "chatStep2Options";
                        budgetGroup.innerHTML = '<button class="chat-opt-btn" data-budget="₹25,000 - ₹50,000/mo">💰 ₹25,000 - ₹50,000 / month ($300 - $600)</button>' +
                            '<button class="chat-opt-btn" data-budget="₹50,000 - ₹1,00,000/mo">🚀 ₹50,000 - ₹1,00,000 / month ($600 - $1.2k)</button>' +
                            '<button class="chat-opt-btn" data-budget="₹1,00,000+/mo">🔥 ₹1,00,000+ / month ($1.2k+)</button>';
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
                            '<button class="chat-submit-btn" id="chatFormSubmit">Get Free Audit Plan →</button>';
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
                    alert("Please enter your name!");
                    return;
                }
                if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
                    alert("Please enter a valid phone/WhatsApp number!");
                    return;
                }

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

                appendMsg("👤 Name: " + leadData.name + "<br>📞 Phone: " + leadData.phone, "user");

                showTyping(function () {
                    var successText = "🎉 Superb, " + leadData.name + "! Your request has been registered.<br><br>Our Growth Team will contact you within 15 minutes!";
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
                reply: "📍 <b>Growell Marketing Office Address</b>:<br>2nd Floor, Janta Colony, Vaishali Nagar, Ajmer, Rajasthan 305001, India.<br><br>👉 <a href='https://maps.app.goo.gl/U7BGknhtbDs6S8NAA' target='_blank' style='color:#654E9F;font-weight:700;'>Get Directions on Google Maps 🗺️</a>"
            },
            {
                keywords: ["seo", "rank", "google ranking", "search engine", "organic traffic", "keywords"],
                reply: "🔍 <b>Search Engine Optimization (SEO)</b>:<br>We rank your website #1 on Google. Inclusions:<br>• Technical SEO & PageSpeed Optimization<br>• On-Page & Keyword Strategy<br>• High-Authority Backlink Building<br>• Monthly Performance Reports<br><br>👉 <a href='/services/seo.html' style='color:#654E9F;font-weight:700;'>View SEO Services →</a>"
            },
            {
                keywords: ["ads", "paid ads", "google ads", "meta ads", "facebook ads", "instagram ads", "ppc", "roas"],
                reply: "📈 <b>Paid Advertising (Google & Meta Ads)</b>:<br>We run high-converting ad campaigns with 3.5x - 4.5x average ROAS. Inclusions:<br>• Meta (FB/IG) & Google Search/Shopping Ads<br>• High-Converting Copy & Ad Creatives<br>• Audience Targeting & Retargeting Funnels<br><br>👉 <a href='/services/paid-advertising.html' style='color:#654E9F;font-weight:700;'>Explore Paid Ads →</a>"
            },
            {
                keywords: ["web", "website", "design", "development", "developer", "web design", "site"],
                reply: "🌐 <b>Website Design & Full-Stack Development</b>:<br>Sub-second loading speed, mobile responsive, high-converting custom code websites:<br>• Modern Responsive UI/UX<br>• Lead Generation Funnels<br>• SEO Ready Architecture & Security<br><br>👉 <a href='/services/web-design.html' style='color:#654E9F;font-weight:700;'>Explore Web Development →</a>"
            },
            {
                keywords: ["social", "social media", "instagram", "facebook", "reels", "posts", "content strategy"],
                reply: "📲 <b>Social Media Marketing</b>:<br>We build your brand visual identity and engage your target audience:<br>• Custom Graphic & Video Creatives<br>• Content Calendar & Copywriting<br>• Organic Growth & Community Management<br><br>👉 <a href='/services/social-media-marketing-services.html' style='color:#654E9F;font-weight:700;'>Explore Social Media →</a>"
            },
            {
                keywords: ["services", "service", "what do you do", "offer"],
                reply: "🚀 <b>Growell Marketing Services</b>:<br>1. Search Engine Optimization (SEO)<br>2. Meta & Google Paid Ads<br>3. Website Design & Development<br>4. Social Media Marketing<br>5. Content Writing & Copywriting<br>6. Brand Identity & Strategy<br>7. Email Marketing & Automation<br>8. Online Reputation Management (ORM)<br><br>👉 <a href='/services.html' style='color:#654E9F;font-weight:700;'>View All Services →</a>"
            },
            {
                keywords: ["team", "founder", "owner", "harsh", "aniket", "pintu", "simran", "who is", "people"],
                reply: "👥 <b>Growell Leadership Team</b>:<br>• <b>Harsh Panwar</b> — Founder & Marketing Head (8+ Yrs Exp)<br>• <b>Aniket Singh Sisodia</b> — Managing Partner & Creative Head (8+ Yrs Exp)<br>• <b>Pintu Nath</b> — Marketing Manager & Tech Lead (4+ Yrs Exp)<br>• <b>Pintu Nath</b> — Lead Brand & Content Director (5+ Yrs Exp)<br><br>👉 <a href='/about.html' style='color:#654E9F;font-weight:700;'>Read Leadership Bios →</a>"
            },
            {
                keywords: ["price", "pricing", "cost", "charge", "budget", "fees", "retainer"],
                reply: "💰 <b>Growell Pricing & Retainers</b>:<br>We offer customized growth retainers starting from <b>₹25,000 / month ($300/mo)</b> depending on business goals and scope. Zero hidden fees & transparent monthly reporting.<br><br>👉 <a href='/pricing.html' style='color:#654E9F;font-weight:700;'>Open Growth Estimator →</a>"
            },
            {
                keywords: ["contact", "phone", "mobile", "whatsapp", "call", "email", "number", "reach"],
                reply: "📞 <b>Contact Growell Marketing</b>:<br>• <b>Phone / WhatsApp</b>: +91 8114456687<br>• <b>Email</b>: hello@growellmarketing.com<br>• <b>Office</b>: Ajmer, Rajasthan, India<br><br>👉 <a href='https://wa.me/918114456687' target='_blank' style='color:#25D366;font-weight:700;'>Start Live Chat on WhatsApp 💬</a>"
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
                    answer = "💡 Growell Marketing is a 360° Performance Marketing Agency. We scale businesses through Paid Ads, SEO, Web Development, and Brand Strategy.<br><br>Contact our team directly: 📞 <b>+91 8114456687</b> or <a href='https://wa.me/918114456687' target='_blank' style='color:#25D366;font-weight:700;'>Chat on WhatsApp 💬</a>";
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
                        <span style="background: rgba(101, 78, 159, 0.15); color: #654E9F; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">⚡ Special Free Growth Offer</span>
                    </div>
                    <div class="audit-modal-header" style="text-align: center; margin-bottom: 16px;">
                        <h2 style="font-size: 22px; margin-bottom: 6px;">Wait! Before You Leave... 🚀</h2>
                        <p style="font-size: 14px; color: #555;">Get Our Free <b>7-Point Digital Audit & Growth Strategy Report</b> ($200 Value — 100% Free)</p>
                    </div>
                    <form id="exitIntentForm" style="display: flex; flex-direction: column; gap: 12px;">
                        <input type="text" id="exitName" placeholder="Your Full Name *" required style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                        <input type="tel" id="exitPhone" placeholder="WhatsApp / Phone Number *" required style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                        <input type="text" id="exitGoal" placeholder="Website URL or Primary Business Goal" style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                        <button type="submit" class="btn-primary" style="width: 100%; padding: 14px; font-weight: 700; margin-top: 6px;">Claim Free Audit Report →</button>
                    </form>
                    <div style="margin-top: 14px; text-align: center; font-size: 11.5px; color: #777; line-height: 1.5;">
                        ⚡ <b>150+ Brands Scaled</b> • ⭐ <b>4.9★ Google Rating</b> • 🔒 <b>100% Free & No Spam</b>
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

})();


