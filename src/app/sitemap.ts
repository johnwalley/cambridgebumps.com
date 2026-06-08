import { MetadataRoute } from "next";
import { events, genders, type ResultsSummary } from "@/lib/utils";
import results from "./charts/data/results.json";

export const dynamic = "force-static";

const BASE_URL = process.env.BASE_URL;

const statistics = [
  "headships",
  "headDays",
  "headLong",
  "crewsEntered",
  "bladesAwarded",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vocabulary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Generate chart page URLs for each event/gender/year
  const chartPages: MetadataRoute.Sitemap = events.flatMap((event) =>
    genders.flatMap((gender) => {
      const years = (results as ResultsSummary)[event][gender];
      return years.map((year) => ({
        url: `${BASE_URL}/charts/${event}/${gender}/${year}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.7,
      }));
    }),
  );

  // Generate multi-year chart page URLs
  const multiYearChartPages: MetadataRoute.Sitemap = events.flatMap((event) =>
    genders.map((gender) => ({
      url: `${BASE_URL}/multi-year-charts/${event}/${gender}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  // Generate statistics overview pages
  const statisticsOverviewPages: MetadataRoute.Sitemap = events.flatMap(
    (event) =>
      genders.map((gender) => ({
        url: `${BASE_URL}/statistics/${event}/${gender}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  );

  // Generate individual statistics pages
  const statisticsPages: MetadataRoute.Sitemap = events.flatMap((event) =>
    genders.flatMap((gender) =>
      statistics.map((statistic) => ({
        url: `${BASE_URL}/statistics/${event}/${gender}/${statistic}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    ),
  );

  return [
    ...staticPages,
    ...chartPages,
    ...multiYearChartPages,
    ...statisticsOverviewPages,
    ...statisticsPages,
  ];
}
