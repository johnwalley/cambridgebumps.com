export const siteConfig = {
  name: `${process.env.NEXT_PUBLIC_TITLE} Bumps` || "Cambridge Bumps",
  url: process.env.BASE_URL || "https://www.cambridgebumps.com",
  ogImage: `${process.env.BASE_URL}/og.jpg` || "https://www.cambridgebumps.com/og.jpg",
  description:
    "Bumps charts, statistics, and more.",
  links: {
    website: "https://www.walley.org.uk",
    twitter: "https://twitter.com/johnmwalley",
    github: "https://github.com/johnwalley/bumps-results",
  },
};

export type SiteConfig = typeof siteConfig;
