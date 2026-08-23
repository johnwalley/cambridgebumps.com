// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import { buildAstroRedirects } from "./scripts/redirects.mjs";
import { loadSiteEnv } from "./scripts/site-env.mjs";

// Which site are we building? `cambridge` (default) or `oxford`. The choice
// selects the matching `.env.<site>` file.
const fileEnv = loadSiteEnv(process.cwd());

// A value set in the real environment (e.g. a Vercel project variable) always
// beats the checked-in file. Within each source the Astro-style `PUBLIC_` name
// wins, but the Next.js-era names are still read so an existing deployment
// keeps working untouched.
/** @param {...string} names */
const pick = (...names) =>
  names.map((name) => process.env[name]).find(Boolean) ??
  names.map((name) => fileEnv[name]).find(Boolean);

const TITLE = pick("PUBLIC_TITLE", "NEXT_PUBLIC_TITLE") ?? "Cambridge";
const BASE_URL =
  pick("PUBLIC_BASE_URL", "BASE_URL") ?? "https://www.cambridgebumps.com";
const GOOGLE_ANALYTICS_TAG =
  pick("PUBLIC_GOOGLE_ANALYTICS_TAG", "NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG") ?? "";

// https://astro.build/config
export default defineConfig({
  site: BASE_URL,
  output: "static",
  // Emit `charts/mays/men/2025.html` rather than `.../2025/index.html`, so the
  // deployed URLs match the ones the site has always served.
  build: { format: "file" },
  // Redirects are defined once in `scripts/redirects.mjs`. In production the
  // host applies them from `vercel.json` (`pnpm gen:redirects`); these generate
  // matching redirect pages so `astro dev`, `astro preview` and any plain
  // static host behave the same way.
  redirects: buildAstroRedirects(),
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_TITLE": JSON.stringify(TITLE),
      "import.meta.env.PUBLIC_BASE_URL": JSON.stringify(BASE_URL),
      "import.meta.env.PUBLIC_GOOGLE_ANALYTICS_TAG":
        JSON.stringify(GOOGLE_ANALYTICS_TAG),
    },
  },
});
