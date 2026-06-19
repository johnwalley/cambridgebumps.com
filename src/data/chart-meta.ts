// Client-safe metadata derived from the results data at build time by
// `scripts/generate-chart-meta.mjs` (runs on `prebuild`; regenerate manually
// with `pnpm gen:chart-meta`).
//
// The chart layouts are client components and only need the list of years and
// the club names for the dropdowns. Importing the full `@/data/results` module
// into them would bundle the entire ~13 MB results dataset into the client.
// This module exposes just that small slice instead.

import meta from "./chart-meta.json";
import type { Gender, ResultsSummary, Set } from "@/lib/utils";

// Years per event/gender (plus `all`/`split`), mirroring `summary` in results.ts.
export const summary = meta.summary as ResultsSummary;

// Sorted club names for a given event/gender/year (charts layout dropdown).
export const clubsByYear = meta.clubsByYear as Record<
  Set,
  Record<Gender, Record<string, string[]>>
>;

// Sorted club names across all years for an event/gender (multi-year dropdown).
export const clubsAll = meta.clubsAll as Record<Set, Record<Gender, string[]>>;
