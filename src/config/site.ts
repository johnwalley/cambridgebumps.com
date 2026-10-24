import { cityEvents, type City } from "@/lib/utils";

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
  /** Where readers send corrections to the results. */
  correctionsEmail: "john@walley.org.uk",
  links: {
    website: "https://www.walley.org.uk",
    twitter: "https://twitter.com/johnmwalley",
    github: "https://github.com/johnwalley/bumps-results",
  },
};

export type SiteConfig = typeof siteConfig;

// Both sites carry every event, but each leads with its own city's: first in
// the event tabs, pickers and menus, and the only ones its copy mentions.
export const homeCity: City = title === "Oxford" ? "Oxford" : "Cambridge";
const awayCity: City = homeCity === "Oxford" ? "Cambridge" : "Oxford";

/** The site's own events, in the order they're raced through the year. */
export const homeEvents = cityEvents[homeCity];

/** Each city's events, the site's own city first. */
export const eventGroups = [homeCity, awayCity].map((city) => ({
  city,
  events: cityEvents[city],
}));

/** Every event, in the order the site lists them. */
export const eventOrder = eventGroups.flatMap((group) => group.events);

export const googleAnalyticsTag =
  import.meta.env.PUBLIC_GOOGLE_ANALYTICS_TAG || "";
