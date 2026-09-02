// Writes `vercel.json` from the shared redirect definitions in `redirects.mjs`
// so the default chart year is never hand-edited. Run via `pnpm gen:redirects`
// whenever a new season's data is added.
//
// Vercel parses `vercel.json` BEFORE the build runs, so this cannot be a build
// step — the regenerated file must be committed.
//
// The file also pins the framework preset, so a project created back when this
// was a Next.js app builds the Astro site without anyone touching the
// dashboard, and sets `cleanUrls` — Astro's `build.format: "file"` emits
// `about.html` / `charts/mays/men/2025.html`, and without `cleanUrls` Vercel
// only serves those at their `.html` paths, 404ing every extensionless URL the
// site actually links to.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { buildRedirects, getDefaultYear } from "./redirects.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const redirects = buildRedirects();

writeFileSync(
  join(root, "vercel.json"),
  JSON.stringify(
    { framework: "astro", outputDirectory: "dist", cleanUrls: true, redirects },
    null,
    2,
  ) + "\n",
);
console.log(
  `Wrote vercel.json with ${redirects.length} redirects (default year ${getDefaultYear()}).`,
);
