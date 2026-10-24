import type { APIRoute } from "astro";

import { homeCity, siteConfig } from "@/config/site";
import { clubs } from "@/data/clubs";
import { summary } from "@/data/results";
import { statisticMapping } from "@/data/stats";
import { events, genders } from "@/lib/utils";

type Entry = {
  path: string;
  changefreq: "monthly" | "yearly";
  priority: number;
};

const statistics = Object.keys(statisticMapping);

const entries: Entry[] = [
  { path: "", changefreq: "monthly", priority: 1 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/vocabulary", changefreq: "monthly", priority: 0.5 },

  { path: "/clubs", changefreq: "monthly", priority: 0.7 },

  // A page per club of this site's city.
  ...clubs
    .filter((club) => club.city === homeCity)
    .map((club) => ({
      path: `/clubs/${club.slug}`,
      changefreq: "yearly" as const,
      priority: 0.7,
    })),

  // A chart page per event/gender/year.
  ...events.flatMap((event) =>
    genders.flatMap((gender) =>
      summary[event][gender].map((year) => ({
        path: `/charts/${event}/${gender}/${year}`,
        changefreq: "yearly" as const,
        priority: 0.7,
      })),
    ),
  ),

  // Multi-year charts.
  ...events.flatMap((event) =>
    genders.map((gender) => ({
      path: `/multi-year-charts/${event}/${gender}`,
      changefreq: "yearly" as const,
      priority: 0.6,
    })),
  ),

  // Statistics overviews.
  ...events.flatMap((event) =>
    genders.map((gender) => ({
      path: `/statistics/${event}/${gender}`,
      changefreq: "yearly" as const,
      priority: 0.6,
    })),
  ),

  // Individual statistics.
  ...events.flatMap((event) =>
    genders.flatMap((gender) =>
      statistics.map((statistic) => ({
        path: `/statistics/${event}/${gender}/${statistic}`,
        changefreq: "yearly" as const,
        priority: 0.5,
      })),
    ),
  ),
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString();

  const urls = entries
    .map(
      ({ path, changefreq, priority }) =>
        `  <url>\n` +
        `    <loc>${siteConfig.url}${path}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
