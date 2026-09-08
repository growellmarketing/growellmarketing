/**
 * Cloudflare Pages Function / Worker API for Meta Conversions API (CAPI)
 * Handles /api/capi-lead
 * Includes Origin Authorization, Anti-Bot Honeypot Filter, and CORS hardening
 */

const META_PIXEL_ID = "1930075340930872";
const META_ACCESS_TOKEN = "EAAWtpErNdrcBSbaZCEl7sY9fPbLnmsokKjSjPTsRrHIf4zVpUlaHgYpYT7BqNcH52oowTx8lTuaGzUbnJcRx0h3WDiVr5uWroJZBs8zaWHCakIemk8MhymZCtJpW7ECjX8po6IxVhNGyrbHsz46iN8ZCfoMDnAZCKQKw9IhaZBtWKZBXdsBCWD0kQ1ivaPcl3K6gQZDZD";

function getCorsHeaders(request) {
    const origin = (request && request.headers && request.headers.get("origin")) || "";
    const isAllowed = !origin ||
        origin.includes("growellmarketing.com") ||
        origin.includes("pages.dev") ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1");

    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": isAllowed ? (origin || "https://www.growellmarketing.com") : "https://www.growellmarketing.com",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400"
    };
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const corsHeaders = getCorsHeaders(request);

    try {
        const origin = request.headers.get("origin") || "";
        const isAllowedOrigin = !origin ||
            origin.includes("growellmarketing.com") ||
            origin.includes("pages.dev") ||
            origin.includes("localhost") ||
            origin.includes("127.0.0.1");

        if (!isAllowedOrigin) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized origin" }), {
                status: 403,
                headers: corsHeaders
            });
        }

        const accessToken = (env && env.META_CAPI_ACCESS_TOKEN) || META_ACCESS_TOKEN;
        const pixelId = (env && env.META_PIXEL_ID) || META_PIXEL_ID;
        const targetUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

        const reqBody = await request.json();

        // 1. Anti-Bot Honeypot Defense: Silently absorb bot submissions
        if (reqBody._hp || reqBody.company_fax || (reqBody.custom_data && reqBody.custom_data._hp)) {
            return new Response(JSON.stringify({
                success: true,
                event_id: "filtered_bot",
                status: "ignored_by_honeypot"
            }), {
                status: 200,
                headers: corsHeaders
            });
        }

        // 2. Extract client information from Cloudflare headers
        const clientIp = request.headers.get("cf-connecting-ip") ||
                         request.headers.get("x-real-ip") ||
                         request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                         reqBody.client_ip || "";

        const clientUserAgent = request.headers.get("user-agent") || reqBody.client_user_agent || "";

        // 3. Validate & build Meta CAPI event payload
        const eventTime = reqBody.event_time || Math.floor(Date.now() / 1000);
        const eventId = reqBody.event_id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        
        const validEvents = ["Lead", "Contact", "PageView", "ViewContent", "InitiateCheckout", "CompleteRegistration"];
        const eventName = validEvents.includes(reqBody.event_name) ? reqBody.event_name : "Lead";
        const eventSourceUrl = reqBody.event_source_url || request.headers.get("referer") || "https://growellmarketing.com/";

        const userData = {
            client_ip_address: clientIp,
            client_user_agent: clientUserAgent,
            ...(reqBody.fbp ? { fbp: reqBody.fbp } : {}),
            ...(reqBody.fbc ? { fbc: reqBody.fbc } : {})
        };

        // Add hashed user data if present
        if (reqBody.em) userData.em = Array.isArray(reqBody.em) ? reqBody.em : [reqBody.em];
        if (reqBody.ph) userData.ph = Array.isArray(reqBody.ph) ? reqBody.ph : [reqBody.ph];
        if (reqBody.fn) userData.fn = Array.isArray(reqBody.fn) ? reqBody.fn : [reqBody.fn];
        if (reqBody.ln) userData.ln = Array.isArray(reqBody.ln) ? reqBody.ln : [reqBody.ln];
        if (reqBody.ct) userData.ct = Array.isArray(reqBody.ct) ? reqBody.ct : [reqBody.ct];
        if (reqBody.zp) userData.zp = Array.isArray(reqBody.zp) ? reqBody.zp : [reqBody.zp];
        if (reqBody.country) userData.country = Array.isArray(reqBody.country) ? reqBody.country : [reqBody.country];
        if (reqBody.external_id) userData.external_id = Array.isArray(reqBody.external_id) ? reqBody.external_id : [reqBody.external_id];

        const eventData = {
            event_name: eventName,
            event_time: eventTime,
            event_id: eventId,
            event_source_url: eventSourceUrl,
            action_source: "website",
            user_data: userData,
            ...(reqBody.custom_data ? { custom_data: reqBody.custom_data } : {})
        };

        const metaPayload = {
            data: [eventData],
            ...(reqBody.test_event_code ? { test_event_code: reqBody.test_event_code } : {})
        };

        const fbResponse = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(metaPayload)
        });

        const fbResult = await fbResponse.json();

        return new Response(JSON.stringify({
            success: fbResponse.ok,
            event_id: eventId,
            meta_result: fbResult
        }), {
            status: fbResponse.status,
            headers: corsHeaders
        });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: err.message
        }), {
            status: 500,
            headers: corsHeaders
        });
    }
}

export async function onRequestOptions(request) {
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request)
    });
}
