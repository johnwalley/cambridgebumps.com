// Generates `src/data/chart-meta.json`: the small, client-safe slice of the
// results data that the (client-rendered) chart layouts need — the per
// event/gender list of years and the club names used to populate the
// "Highlight club" dropdowns.
//
// Why this exists: the chart layouts are client components. Importing the full
// results module into them pulls the entire ~13 MB results dataset into the
// client bundle, even though they only need years + club lists. This script
// derives that tiny metadata at build time so the layouts can import it
// directly without dragging in the raw race data.
//
// Run via `pnpm gen:chart-meta`; also runs automatically on `prebuild`.
// Mirrors the derivation in `src/data/results.ts` (summary) and the `clubs`
// logic in the two chart layouts — keep them in sync.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EVENTS = ["eights", "lents", "mays", "torpids", "town"];
const GENDERS = ["men", "women"];

// Years may be compound strings such as "1827 February March"; the leading
// 4-digit year is canonical (matches `yearOf`/`leadYear` elsewhere).
const leadYear = (year) => String(year).split(" ")[0];

const byLocale = (a, b) => a.localeCompare(b);

const read = (event, gender) =>
  JSON.parse(
    readFileSync(
      join(root, `src/data/results/${event}/${gender}/results.json`),
      "utf8",
    ),
  );

const summary = {};
const clubsByYear = {};
const clubsAll = {};

for (const event of EVENTS) {
  const all = new Set();
  const split = new Set();
  const byGender = {};
  clubsByYear[event] = {};
  clubsAll[event] = {};

  for (const gender of GENDERS) {
    const races = read(event, gender);

    // Years: sorted unique lead years (mirrors `summary` in results.ts).
    const counts = new Map();
    for (const race of races) {
      const year = leadYear(race.year);
      counts.set(year, (counts.get(year) ?? 0) + 1);
    }
    byGender[gender] = [...counts.keys()].sort();
    for (const [year, count] of counts) {
      all.add(year);
      if (count > 1) split.add(year);
    }

    // Clubs for a single year (charts layout). `findResultByYear` returns the
    // first race matching a lead year, so key by lead year and keep the first.
    const yearClubs = {};
    for (const race of races) {
      const year = leadYear(race.year);
      if (year in yearClubs) continue;
      yearClubs[year] = Array.from(
        new Set(race.crews.map((crew) => crew.club)),
      ).sort(byLocale);
    }
    clubsByYear[event][gender] = yearClubs;

    // Clubs across all years (multi-year layout): non-empty, sorted.
    clubsAll[event][gender] = Array.from(
      new Set(races.flatMap((race) => race.crews.map((crew) => crew.club))),
    )
      .filter((club) => club.length > 0)
      .sort(byLocale);
  }

  summary[event] = {
    ...byGender,
    all: [...all].sort(),
    split: [...split].sort(),
  };
}

writeFileSync(
  join(root, "src/data/chart-meta.json"),
  JSON.stringify({ summary, clubsByYear, clubsAll }) + "\n",
);

console.log(
  `Wrote src/data/chart-meta.json (${EVENTS.length} events, ${GENDERS.length} categories).`,
);
