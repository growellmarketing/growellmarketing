import { onRequestPost as postCapi, onRequestOptions } from "./functions/api/capi-lead.js";
import { onRequestPost as postLead } from "./functions/api/lead.js";

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (url.pathname === "/api/capi-lead") {
            if (request.method === "OPTIONS") {
                return onRequestOptions({ request, env, ctx });
            }
            if (request.method === "POST") {
                return postCapi({ request, env, ctx });
            }
            return new Response("Method Not Allowed", { status: 405 });
        }

        if (url.pathname === "/api/lead") {
            if (request.method === "POST") return postLead({ request, env, ctx });
            return new Response("Method Not Allowed", { status: 405 });
        }

        if (env.ASSETS) {
            return env.ASSETS.fetch(request);
        }

        return new Response("Not Found", { status: 404 });
    }
};
