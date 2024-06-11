import { MetadataRoute } from "next";

import summary from "../data/data.json";

const BASE_URL = process.env.BASE_URL;

const events = ["eights", "lents", "mays", "torpids", "town"];
const genders = ["men", "women"];

const paths = events.flatMap((event) =>
  genders.flatMap((gender) =>
    (summary as any)[event][gender].map((year: string) => ({
      url: `${BASE_URL}/${event}/${gender}/${year}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    }))
  )
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
      url: `${BASE_URL}/charts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...paths,
  ];
}
