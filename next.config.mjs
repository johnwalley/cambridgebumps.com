import { buildRedirects } from "./scripts/redirects.mjs";

/** @type {import('next').NextConfig} */

// Redirects are defined once in `scripts/redirects.mjs`. In production they're
// applied at the host via `vercel.json` (run `pnpm gen:redirects` to update it),
// because `output: "export"` ignores `redirects()` and Next.js warns if it's set.
// In `next dev` there's no export, so we attach them here for local development.
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isDev ? { redirects: async () => buildRedirects() } : {}),
};

export default nextConfig;
