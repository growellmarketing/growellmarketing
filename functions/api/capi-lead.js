/** Meta Conversions API relay. Secrets are supplied only by Worker bindings. */
import { bodyIsTooLarge, corsHeaders, isAllowedEventSource, isAllowedWebsiteRequest, isRateLimited, jsonResponse } from "./request-security.js";

const DEFAULT_PIXEL_ID = "1735589957666296";
const ALLOWED_EVENTS = new Set(["Lead", "Contact"]);
const HASH = /^[a-f0-9]{64}$/;

function hashedValues(value) {
    const values = Array.isArray(value) ? value : [];
    return values.filter((entry) => typeof entry === "string" && HASH.test(entry)).slice(0, 2);
}

function cleanCustomData(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    const cleaned = {};
    for (const [key, entry] of Object.entries(value).slice(0, 12)) {
        if (!/^[a-z_]{1,40}$/i.test(key)) continue;
        if (typeof entry === "string") cleaned[key] = entry.slice(0, 200);
        if (typeof entry === "number" && Number.isFinite(entry)) cleaned[key] = entry;
        if (typeof entry === "boolean") cleaned[key] = entry;
    }
    return Object.keys(cleaned).length ? cleaned : undefined;
}

export async function onRequestPost({ request, env }) {
    if (!isAllowedWebsiteRequest(request)) return jsonResponse({ error: "Forbidden" }, 403, request);
    if (bodyIsTooLarge(request) || isRateLimited(request, "capi")) return jsonResponse({ error: "Too many or oversized requests" }, 429, request);
    if (!env?.META_CAPI_ACCESS_TOKEN) {
        console.error("META_CAPI_ACCESS_TOKEN is not configured");
        return jsonResponse({ error: "Tracking is unavailable" }, 503, request);
    }
    try {
        const body = await request.json();
        const eventName = ALLOWED_EVENTS.has(body.event_name) ? body.event_name : "Lead";
        const eventTime = Number.isInteger(body.event_time) ? body.event_time : Math.floor(Date.now() / 1000);
        const eventId = typeof body.event_id === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(body.event_id) ? body.event_id : crypto.randomUUID();
        const eventSourceUrl = isAllowedEventSource(body.event_source_url) ? body.event_source_url : "https://www.growellmarketing.com/";
        const userData = {
            client_ip_address: request.headers.get("cf-connecting-ip") || "",
            client_user_agent: request.headers.get("user-agent") || ""
        };
        for (const key of ["em", "ph", "fn", "ln", "ct", "zp", "country", "external_id"]) {
            const values = hashedValues(body[key]);
            if (values.length) userData[key] = values;
        }
        for (const key of ["fbp", "fbc"]) {
            if (typeof body[key] === "string" && body[key].length <= 200) userData[key] = body[key];
        }
        const event = {
            event_name: eventName, event_time: eventTime, event_id: eventId,
            event_source_url: eventSourceUrl, action_source: "website", user_data: userData
        };
        const customData = cleanCustomData(body.custom_data);
        if (customData) event.custom_data = customData;
        const pixelId = env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
        const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${env.META_CAPI_ACCESS_TOKEN}`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: [event] })
        });
        if (!response.ok) {
            console.error("Meta CAPI request failed", response.status);
            return jsonResponse({ error: "Tracking is unavailable" }, 502, request);
        }
        return jsonResponse({ success: true, event_id: eventId }, 202, request);
    } catch { return jsonResponse({ error: "Invalid request" }, 400, request); }
}

export function onRequestOptions({ request }) {
    if (!isAllowedWebsiteRequest(request)) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: corsHeaders(request) });
}
