// Single source of truth for redirects. `astro.config.mjs` passes them to
// Astro via `buildAstroRedirects`; in production `@astrojs/vercel` turns them
// into HTTP redirects at build time, and `astro dev` serves them directly.
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

const EVENTS = ["eights", "lents", "mays", "torpids", "town"];
const GENDERS = ["men", "women"];

// The event the bare `/charts`, `/statistics` and `/multi-year-charts` routes
// open on: one of the site's own. Cambridge keeps Town, its default all along.
/** @param {string} title */
function defaultEvent(title) {
  return title === "Oxford" ? "eights" : "town";
}

/** @param {{ title: string }} site */
export function buildRedirects({ title }) {
  const event = defaultEvent(title);

  return [
    {
      source: "/statistics",
      destination: `/statistics/${event}/men`,
      permanent: false,
    },
    {
      source: "/statistics/:event",
      destination: "/statistics/:event/men",
      permanent: false,
    },
    {
      source: "/charts",
      destination: `/charts/${event}/men/${getLatestYear(event, "men")}`,
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
      destination: `/multi-year-charts/${event}/men`,
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

// Astro's `redirects` config takes a map of concrete paths, so the `:event` /
// `:gender` patterns above are expanded against the known event and gender
// lists.
function expand(source, destination) {
  let pairs = [[source, destination]];

  for (const [param, values] of [
    [":event", EVENTS],
    [":gender", GENDERS],
  ]) {
    if (!source.includes(param)) continue;

    pairs = pairs.flatMap(([s, d]) =>
      values.map((value) => [
        s.replaceAll(param, value),
        d.replaceAll(param, value),
      ]),
    );
  }

  return pairs;
}

/** @param {{ title: string }} site */
export function buildAstroRedirects(site) {
  return Object.fromEntries(
    buildRedirects(site).flatMap(({ source, destination, permanent }) =>
      expand(source, destination).map(([s, d]) => [
        s,
        // 308/307 are what `vercel.json`'s `permanent` flag used to produce.
        { status: permanent ? 308 : 307, destination: d },
      ]),
    ),
  );
}
