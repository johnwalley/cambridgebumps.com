import { Event } from "react-bumps-chart/dist/types";

import {
  events,
  genders,
  type Gender,
  type ResultsSummary,
} from "@/lib/utils";

import results_eights_men from "./results/eights/men/results.json";
import results_eights_women from "./results/eights/women/results.json";
import results_lents_men from "./results/lents/men/results.json";
import results_lents_women from "./results/lents/women/results.json";
import results_mays_men from "./results/mays/men/results.json";
import results_mays_women from "./results/mays/women/results.json";
import results_torpids_men from "./results/torpids/men/results.json";
import results_torpids_women from "./results/torpids/women/results.json";
import results_town_men from "./results/town/men/results.json";
import results_town_women from "./results/town/women/results.json";

export const results = {
  eights: {
    men: results_eights_men,
    women: results_eights_women,
  },
  lents: {
    men: results_lents_men,
    women: results_lents_women,
  },
  mays: {
    men: results_mays_men,
    women: results_mays_women,
  },
  torpids: {
    men: results_torpids_men,
    women: results_torpids_women,
  },
  town: {
    men: results_town_men,
    women: results_town_women,
  },
} as Record<string, Record<string, Event[]>>;

// Some historical entries store compound year strings such as
// "1827 February March" (two races in one season). The leading 4-digit year is
// the canonical key used by URLs and pickers, so collapse to that. See `yearOf`
// in @/lib/utils.
const leadYear = (year: Event["year"]): string => String(year).split(" ")[0];

// The per-event/gender summary of available years, derived at build time from
// the source results above so it can never drift from the actual data. For each
// event: `men`/`women` are the sorted unique years for that gender, `all` is
// their union, and `split` lists years that held more than one race (the early
// compound-year seasons).
export const summary: ResultsSummary = Object.fromEntries(
  events.map((event) => {
    const all = new Set<string>();
    const split = new Set<string>();
    const byGender = {} as Record<Gender, string[]>;

    for (const gender of genders) {
      const counts = new Map<string, number>();
      for (const result of results[event][gender]) {
        const year = leadYear(result.year);
        counts.set(year, (counts.get(year) ?? 0) + 1);
      }
      byGender[gender] = [...counts.keys()].sort();
      for (const [year, count] of counts) {
        all.add(year);
        if (count > 1) split.add(year);
      }
    }

    return [
      event,
      { ...byGender, all: [...all].sort(), split: [...split].sort() },
    ];
  }),
) as ResultsSummary;

