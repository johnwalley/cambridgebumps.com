// Single source of truth for redirects, shared by:
//  - `next.config.mjs` (applied in `next dev` for local development)
//  - `scripts/generate-vercel-redirects.mjs` (writes `vercel.json` for production)
//
// The default chart year is derived from the results data, never hand-edited.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// The latest year for which a given event/gender has results. Read straight
// from the source results (the same data the app's summary is derived from) so
// there's no separate summary file to keep in sync.
export function getLatestYear(event, gender) {
  const results = JSON.parse(
    readFileSync(
      join(root, `src/data/results/${event}/${gender}/results.json`),
      "utf8",
    ),
  );
  // Years may be compound strings such as "1827 February March"; the leading
  // 4-digit year is canonical.
  return Math.max(...results.map((r) => Number(String(r.year).split(" ")[0])));
}

// The bare `/charts` redirect lands on town/men, so the default year is the
// latest year for which town/men has results.
export function getDefaultYear() {
  return getLatestYear("town", "men");
}

const EVENTS = ["eights", "lents", "mays", "torpids", "town"];
const GENDERS = ["men", "women"];

export function buildRedirects() {
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
      destination: `/charts/town/men/${getLatestYear("town", "men")}`,
      permanent: false,
    },
    // Each event/gender redirects to its own latest year, since events don't
    // all share the same most-recent season (e.g. Town lags the others). These
    // explicit rules replace `/charts/:event` and `/charts/:event/:gender`
    // wildcards, which could only supply a single year for every event.
    ...EVENTS.map((event) => ({
      source: `/charts/${event}`,
      destination: `/charts/${event}/men/${getLatestYear(event, "men")}`,
      permanent: false,
    })),
    ...EVENTS.flatMap((event) =>
      GENDERS.map((gender) => ({
        source: `/charts/${event}/${gender}`,
        destination: `/charts/${event}/${gender}/${getLatestYear(event, gender)}`,
        permanent: false,
      })),
    ),
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
