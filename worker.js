import { onRequestPost, onRequestOptions } from "./functions/api/capi-lead.js";

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 1. Security: Block direct static access to server-side code and configuration
        if (
            url.pathname.startsWith("/functions/") ||
            url.pathname === "/worker.js" ||
            url.pathname === "/wrangler.jsonc" ||
            url.pathname.endsWith(".jsonc") ||
            url.pathname.endsWith(".env")
        ) {
            return new Response("Not Found", { status: 404 });
        }

        // 2. Meta Conversions API (CAPI) Endpoint
        if (url.pathname === "/api/capi-lead") {
            if (request.method === "OPTIONS") {
                return onRequestOptions(request);
            }
            if (request.method === "POST") {
                return onRequestPost({ request, env, ctx });
            }
            return new Response("Method Not Allowed", { status: 405 });
        }

        // 3. Static Assets Delivery with Enhanced Security Headers
        if (env.ASSETS) {
            const response = await env.ASSETS.fetch(request);
            const newHeaders = new Headers(response.headers);
            newHeaders.set("X-Content-Type-Options", "nosniff");
            newHeaders.set("X-Frame-Options", "SAMEORIGIN");
            newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
            newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders
            });
        }

        return new Response("Not Found", { status: 404 });
    }
};
