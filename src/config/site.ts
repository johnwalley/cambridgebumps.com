// `PUBLIC_TITLE` / `PUBLIC_BASE_URL` are injected at build time by
// `astro.config.mjs` from `.env.<site>` (or the deployment environment), which
// is how one codebase serves both cambridgebumps.com and oxfordbumps.com.
const title = import.meta.env.PUBLIC_TITLE || "Cambridge";
const baseUrl =
  import.meta.env.PUBLIC_BASE_URL || "https://www.cambridgebumps.com";

export const siteConfig = {
  title,
  name: `${title} Bumps`,
  url: baseUrl,
  ogImage: `${baseUrl}/og.jpg`,
  description: "Bumps charts, statistics, and more.",
  links: {
    website: "https://www.walley.org.uk",
    twitter: "https://twitter.com/johnmwalley",
    github: "https://github.com/johnwalley/bumps-results",
  },
};

export type SiteConfig = typeof siteConfig;

export const googleAnalyticsTag =
  import.meta.env.PUBLIC_GOOGLE_ANALYTICS_TAG || "";
