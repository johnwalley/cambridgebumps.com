// Reads the site's environment files. One codebase serves both
// cambridgebumps.com and oxfordbumps.com, and `SITE` (default `cambridge`)
// picks which of the checked-in `.env.<site>` files supplies the title, base
// URL and analytics tag.
//
// Only the file values are returned; the caller layers the real environment on
// top, so a deployment's own variables always win.
//
// Deliberately hand-rolled: `astro.config.mjs` is loaded before dependencies
// are resolved for the app itself, so this stays dependency-free.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * @param {string} contents
 * @returns {Record<string, string>}
 */
function parse(contents) {
  /** @type {Record<string, string>} */
  const values = {};

  for (const line of contents.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed
      .slice(index + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, "$2");

    values[key] = value;
  }

  return values;
}

/**
 * @param {string} root
 * @param {string} [site]
 * @returns {Record<string, string>}
 */
export function loadSiteEnv(root, site = process.env.SITE ?? "cambridge") {
  const files = [".env", `.env.${site}`, ".env.local", `.env.${site}.local`];

  return files.reduce((/** @type {Record<string, string>} */ values, file) => {
    const path = join(root, file);

    return existsSync(path)
      ? { ...values, ...parse(readFileSync(path, "utf8")) }
      : values;
  }, {});
}
