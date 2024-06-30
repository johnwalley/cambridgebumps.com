import { Event } from "react-bumps-chart/dist/types";

import results_eights_men from "../../../data/results/eights/men/results.json";
import results_eights_women from "../../../data/results/eights/women/results.json";
import results_lents_men from "../../../data/results/lents/men/results.json";
import results_lents_women from "../../../data/results/lents/women/results.json";
import results_mays_men from "../../../data/results/mays/men/results.json";
import results_mays_women from "../../../data/results/mays/women/results.json";
import results_torpids_men from "../../../data/results/torpids/men/results.json";
import results_torpids_women from "../../../data/results/torpids/women/results.json";
import results_town_men from "../../../data/results/town/men/results.json";
import results_town_women from "../../../data/results/town/women/results.json";

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
