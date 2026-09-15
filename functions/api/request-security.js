const ALLOWED_ORIGINS = new Set([
    "https://www.growellmarketing.com",
    "https://growellmarketing.com"
]);

const requestLog = new Map();
const RATE_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

export function isAllowedWebsiteRequest(request) {
    const origin = request.headers.get("Origin");
    if (origin) return ALLOWED_ORIGINS.has(origin);
    const referer = request.headers.get("Referer");
    if (!referer) return false;
    try { return ALLOWED_ORIGINS.has(new URL(referer).origin); } catch { return false; }
}

export function corsHeaders(request) {
    const origin = request.headers.get("Origin");
    return ALLOWED_ORIGINS.has(origin) ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    } : { "Vary": "Origin" };
}

export function jsonResponse(body, status, request) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...corsHeaders(request) }
    });
}

export function isRateLimited(request, bucket) {
    const key = `${bucket}:${request.headers.get("cf-connecting-ip") || "unknown"}`;
    const now = Date.now();
    const record = requestLog.get(key);
    if (!record || now - record.startedAt > RATE_WINDOW_MS) {
        requestLog.set(key, { startedAt: now, count: 1 });
        return false;
    }
    record.count += 1;
    if (record.count > MAX_REQUESTS_PER_WINDOW) return true;
    if (requestLog.size > 1000) for (const [entryKey, entry] of requestLog) {
        if (now - entry.startedAt > RATE_WINDOW_MS) requestLog.delete(entryKey);
    }
    return false;
}

export function bodyIsTooLarge(request, maxBytes = 16_384) {
    const contentLength = Number(request.headers.get("Content-Length"));
    return Number.isFinite(contentLength) && contentLength > maxBytes;
}

export function cleanText(value, maxLength = 200) {
    return typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").trim().slice(0, maxLength) : "";
}

export function isAllowedEventSource(value) {
    try { return typeof value === "string" && ALLOWED_ORIGINS.has(new URL(value).origin); } catch { return false; }
}
