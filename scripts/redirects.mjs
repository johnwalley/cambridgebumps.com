// Single source of truth for redirects, shared by:
//  - `next.config.mjs` (applied in `next dev` for local development)
//  - `scripts/generate-vercel-redirects.mjs` (writes `vercel.json` for production)
//
// The default chart year is derived from the results data, never hand-edited.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// The bare `/charts` redirect lands on town/men, so the default year is the
// latest year for which town/men has results.
export function getDefaultYear() {
  const summary = JSON.parse(
    readFileSync(join(root, "src/app/charts/data/results.json"), "utf8"),
  );
  return Math.max(...summary.town.men.map(Number));
}

const EVENTS = ["eights", "lents", "mays", "torpids", "town"];

export function buildRedirects(year = getDefaultYear()) {
  return [
    {
      source: "/statistics",
      destination: "/statistics/town/men",
      permanent: false,
    },
    {
      source: "/statistics/:event",
      destination: "/statistics/:event/men",
      permanent: false,
    },
    {
      source: "/charts",
      destination: `/charts/town/men/${year}`,
      permanent: false,
    },
    {
      source: "/charts/:event",
      destination: `/charts/:event/men/${year}`,
      permanent: false,
    },
    {
      source: "/charts/:event/:gender",
      destination: `/charts/:event/:gender/${year}`,
      permanent: false,
    },
    {
      source: "/multi-year-charts",
      destination: "/multi-year-charts/town/men",
      permanent: false,
    },
    {
      source: "/multi-year-charts/:event",
      destination: "/multi-year-charts/:event/men",
      permanent: false,
    },
    { source: "/latest", destination: "/charts", permanent: false },
    {
      source: "/latest/:event",
      destination: "/charts/:event",
      permanent: false,
    },
    {
      source: "/latest/:event/:gender",
      destination: "/charts/:event/:gender",
      permanent: false,
    },
    { source: "/history", destination: "/charts", permanent: false },
    {
      source: "/history/:event",
      destination: "/charts/:event",
      permanent: false,
    },
    {
      source: "/history/:event/:gender",
      destination: "/charts/:event/:gender",
      permanent: false,
    },
    ...EVENTS.flatMap((event) => [
      {
        source: `/${event}/men`,
        destination: `/charts/${event}/men`,
        permanent: true,
      },
      {
        source: `/${event}/women`,
        destination: `/charts/${event}/women`,
        permanent: true,
      },
    ]),
  ];
}
