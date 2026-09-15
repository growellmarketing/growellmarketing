/** Server-side relay for lead capture. GOOGLE_SHEETS_WEBHOOK_URL stays in Worker secrets. */
import { bodyIsTooLarge, cleanText, isAllowedWebsiteRequest, isRateLimited, jsonResponse } from "./request-security.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
    if (!isAllowedWebsiteRequest(request)) return jsonResponse({ error: "Forbidden" }, 403, request);
    if (bodyIsTooLarge(request) || isRateLimited(request, "lead")) return jsonResponse({ error: "Too many or oversized requests" }, 429, request);
    if (!env?.GOOGLE_SHEETS_WEBHOOK_URL) {
        console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured");
        return jsonResponse({ error: "Lead delivery is unavailable" }, 503, request);
    }
    try {
        const body = await request.json();
        if (body._hp || body._hp_website) return jsonResponse({ success: true }, 202, request);
        const lead = {
            date: new Date().toISOString(), name: cleanText(body.name, 100) || "N/A",
            phone: cleanText(body.phone, 25).replace(/[^0-9+\s-]/g, "") || "N/A",
            email: cleanText(body.email, 100).toLowerCase() || "N/A",
            goal: cleanText(body.goal || body.service, 150) || "N/A", budget: cleanText(body.budget, 100) || "N/A",
            company: cleanText(body.company, 100) || "N/A", message: cleanText(body.message, 1000) || "N/A",
            industry: cleanText(body.industry, 100) || "N/A", source: cleanText(body.source, 150) || "/"
        };
        const phoneDigits = lead.phone.replace(/\D/g, "");
        if (lead.email !== "N/A" && !EMAIL.test(lead.email)) return jsonResponse({ error: "Invalid email" }, 400, request);
        if (lead.email === "N/A" && phoneDigits.length < 7) return jsonResponse({ error: "Contact details required" }, 400, request);
        const response = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), redirect: "follow"
        });
        if (!response.ok) {
            console.error("Lead webhook failed", response.status);
            return jsonResponse({ error: "Lead delivery is unavailable" }, 502, request);
        }
        return jsonResponse({ success: true }, 202, request);
    } catch { return jsonResponse({ error: "Invalid request" }, 400, request); }
}
