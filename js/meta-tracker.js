/**
 * Growell Marketing - Meta Conversions API (CAPI) & Parameter Builder SDK
 * Handles:
 * 1. Early capture and persistence of _fbp and _fbc cookies
 * 2. Normalization and SHA-256 hashing conforming to Meta CAPI standard
 * 3. Event Deduplication with synchronized event_id between Browser Pixel and Server CAPI
 */
(function () {
    "use strict";

    var META_PIXEL_ID = "1930075340930872";
    var APPENDIX = "GMW01000"; // 8-char SDK appendix as per Meta Parameter Builder spec

    /* ---------- COOKIE UTILITIES ---------- */
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[2]) : "";
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + d.toUTCString();
        }
        var domain = window.location.hostname;
        var domainParts = domain.split('.');
        var cookieDomain = "";
        if (domainParts.length >= 2 && !domain.match(/^\d+\.\d+\.\d+\.\d+$/)) {
            cookieDomain = "; domain=." + domainParts.slice(-2).join('.');
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cookieDomain + "; SameSite=Lax";
    }

    /* ---------- PARAMETER BUILDER: FBC & FBP MANAGEMENT ---------- */
    function initMetaCookies() {
        var now = Date.now();

        // 1. Manage _fbp (Browser ID)
        var existingFbp = getCookie("_fbp");
        if (!existingFbp) {
            var randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
            var newFbp = "fb.1." + now + "." + randomNum + "." + APPENDIX;
            setCookie("_fbp", newFbp, 90);
        }

        // 2. Manage _fbc (Click ID from fbclid)
        var urlParams = new URLSearchParams(window.location.search);
        var fbclid = urlParams.get("fbclid");
        if (fbclid) {
            // Case sensitive: do NOT lowercase fbclid
            var newFbc = "fb.1." + now + "." + fbclid + "." + APPENDIX;
            setCookie("_fbc", newFbc, 90);
        }
    }

    initMetaCookies();

    /* ---------- SHA-256 HASHING & NORMALIZATION ---------- */
    async function sha256(str) {
        if (!str || typeof str !== "string") return "";
        try {
            var encoder = new TextEncoder();
            var data = encoder.encode(str);
            var hashBuffer = await crypto.subtle.digest("SHA-256", data);
            var hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
        } catch (e) {
            // Fallback lightweight SHA-256 if crypto.subtle is unavailable
            return fallbackSha256(str);
        }
    }

    function fallbackSha256(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length';
        var i, j;
        var result = '';
        var words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;
        var hash = [], k = [];
        var primeCounter = 0;
        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }
        ascii += '\x80';
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8) return "";
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
        words[words[lengthProperty]] = (asciiBitLength);
        for (j = 0; j < words[lengthProperty];) {
            var w = words.slice(j, j += 16);
            var oldHash = hash;
            hash = hash.slice(0, 8);
            for (i = 0; i < 64; i++) {
                var w15 = w[i - 15], w2 = w[i - 2];
                var s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
                var s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
                var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
                var temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
                var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
                var temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;
                hash = [(temp1 + temp2) | 0].concat(hash);
                hash[4] = (hash[4] + temp1) | 0;
            }
            for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
        }
        for (i = 0; i < 8; i++) {
            for (var b = 3; b >= 0; b--) {
                var byteVal = (hash[i] >> (b * 8)) & 255;
                result += (byteVal < 16 ? '0' : '') + byteVal.toString(16);
            }
        }
        return result;
    }

    function normalizeEmail(email) {
        if (!email) return "";
        return email.trim().toLowerCase().replace(/^mailto:/, "");
    }

    function normalizePhone(phone) {
        if (!phone) return "";
        // Remove all non-digits
        var clean = phone.replace(/\D/g, "");
        if (clean.length === 10) {
            // Default Indian numbers without country code
            clean = "91" + clean;
        } else if (clean.length === 11 && clean.startsWith("0")) {
            clean = "91" + clean.substring(1);
        }
        return clean;
    }

    function normalizeName(name) {
        if (!name) return "";
        return name.trim().toLowerCase().replace(/[^\w\s]/gi, "");
    }

    /* ---------- TRACKING API EXPOSURE ---------- */
    window.GrowellTracker = {
        getFbp: function () { return getCookie("_fbp"); },
        getFbc: function () { return getCookie("_fbc"); },

        generateEventId: function (prefix) {
            var p = prefix || "ev";
            return p + "_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
        },

        trackLead: async function (leadData, customData) {
            leadData = leadData || {};
            customData = customData || {};

            var eventId = this.generateEventId("lead");
            var emailNorm = normalizeEmail(leadData.email);
            var phoneNorm = normalizePhone(leadData.phone);
            var nameParts = (leadData.name || "").trim().split(/\s+/);
            var firstName = nameParts[0] || "";
            var lastName = nameParts.slice(1).join(" ") || "";

            // SHA-256 hashes
            var hashedEmail = emailNorm ? await sha256(emailNorm) : "";
            var hashedPhone = phoneNorm ? await sha256(phoneNorm) : "";
            var hashedFn = firstName ? await sha256(normalizeName(firstName)) : "";
            var hashedLn = lastName ? await sha256(normalizeName(lastName)) : "";

            var contentName = leadData.goal || leadData.service || leadData.source || "Website Lead Form";

            // 1. Browser Meta Pixel (Deduplicated with eventID)
            if (typeof window.fbq === "function") {
                try {
                    window.fbq("trackSingle", META_PIXEL_ID, "Lead", {
                        content_name: contentName,
                        content_category: leadData.budget || "Marketing Inquiry",
                        currency: "INR",
                        value: 0
                    }, { eventID: eventId });
                    console.log("[GrowellTracker] Meta Pixel Lead fired:", eventId);
                } catch (pixelErr) {
                    console.warn("[GrowellTracker] Pixel fire warning:", pixelErr);
                }
            }

            // 2. Google Tag Manager dataLayer push
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "generate_lead",
                event_id: eventId,
                lead_source: leadData.source || window.location.pathname,
                lead_goal: contentName
            });

            // 3. Server-Side Conversions API (CAPI) Dispatch
            var serverPayload = {
                event_name: "Lead",
                event_id: eventId,
                event_time: Math.floor(Date.now() / 1000),
                event_source_url: window.location.href,
                fbp: getCookie("_fbp"),
                fbc: getCookie("_fbc"),
                em: hashedEmail ? [hashedEmail] : [],
                ph: hashedPhone ? [hashedPhone] : [],
                fn: hashedFn ? [hashedFn] : [],
                ln: hashedLn ? [hashedLn] : [],
                country: [await sha256("in")],
                custom_data: {
                    content_name: contentName,
                    currency: "INR",
                    value: 0,
                    ...customData
                }
            };

            fetch("/api/capi-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serverPayload)
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                console.log("[GrowellTracker] Meta CAPI Success:", data);
            })
            .catch(function (err) {
                console.warn("[GrowellTracker] Meta CAPI notice:", err);
            });

            return eventId;
        },

        trackContact: function (type, detail) {
            var eventId = this.generateEventId("contact");
            var contentName = (type || "Contact") + (detail ? ": " + detail : "");

            if (typeof window.fbq === "function") {
                window.fbq("trackSingle", META_PIXEL_ID, "Contact", {
                    content_name: contentName
                }, { eventID: eventId });
            }

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "contact_click",
                event_id: eventId,
                contact_type: type
            });

            fetch("/api/capi-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event_name: "Contact",
                    event_id: eventId,
                    event_time: Math.floor(Date.now() / 1000),
                    event_source_url: window.location.href,
                    fbp: getCookie("_fbp"),
                    fbc: getCookie("_fbc"),
                    custom_data: { content_name: contentName }
                })
            }).catch(function () {});

            return eventId;
        }
    };

    // Auto-bind click handlers for WhatsApp and Phone Call buttons
    document.addEventListener("click", function (e) {
        var waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
        if (waLink) {
            window.GrowellTracker.trackContact("WhatsApp", waLink.href);
            return;
        }
        var telLink = e.target.closest('a[href^="tel:"]');
        if (telLink) {
            window.GrowellTracker.trackContact("Phone Call", telLink.href);
        }
    });

})();
