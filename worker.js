import { onRequestPost, onRequestOptions } from "./functions/api/capi-lead.js";

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (url.pathname === "/api/capi-lead") {
            if (request.method === "OPTIONS") {
                return onRequestOptions();
            }
            if (request.method === "POST") {
                return onRequestPost({ request, env, ctx });
            }
            return new Response("Method Not Allowed", { status: 405 });
        }

        if (env.ASSETS) {
            return env.ASSETS.fetch(request);
        }

        return new Response("Not Found", { status: 404 });
    }
};
