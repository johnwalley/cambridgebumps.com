import type { APIRoute } from "astro";

import { siteConfig } from "@/config/site";

export const GET: APIRoute = () =>
  new Response(
    `User-Agent: *\nAllow: /\n\nSitemap: ${siteConfig.url}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
