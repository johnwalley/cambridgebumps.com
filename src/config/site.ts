const title = process.env.NEXT_PUBLIC_TITLE || "Cambridge";
const baseUrl = process.env.BASE_URL || "https://www.cambridgebumps.com";

export const siteConfig = {
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
