import { Event } from "react-bumps-chart/dist/types";

import stats_eights_men from "../../data/stats/eights/men/stats.json";
import stats_eights_women from "../../data/stats/eights/women/stats.json";
import stats_lents_men from "../../data/stats/lents/men/stats.json";
import stats_lents_women from "../../data/stats/lents/women/stats.json";
import stats_mays_men from "../../data/stats/mays/men/stats.json";
import stats_mays_women from "../../data/stats/mays/women/stats.json";
import stats_torpids_men from "../../data/stats/torpids/men/stats.json";
import stats_torpids_women from "../../data/stats/torpids/women/stats.json";
import stats_town_men from "../../data/stats/town/men/stats.json";
import stats_town_women from "../../data/stats/town/women/stats.json";


export const statisticMapping: Record<
  string,
  {
    label: string;
    key: string;
    keyLabel: string;
    value: string;
    valueLabel: string;
    additional?: string;
    additionalLabel?: string;
  }
> = {
  headships: {
    label: "Headships",
    key: "club",
    keyLabel: "Club",
    value: "headships",
    valueLabel: "Headships",
    additional: "lastYear",
    additionalLabel: "Last year",
  },
  headDays: {
    label: "Total days at headship",
    key: "club",
    keyLabel: "Club",
    value: "days",
    valueLabel: "Days",
  },
  headLong: {
    label: "Continuous days at headship",
    key: "club",
    keyLabel: "Club",
    value: "days",
    valueLabel: "Days",
    additional: "span",
    additionalLabel: "Span",
  },
};

export const stats = {
  eights: {
    men: stats_eights_men,
    women: stats_eights_women,
  },
  lents: {
    men: stats_lents_men,
    women: stats_lents_women,
  },
  mays: {
    men: stats_mays_men,
    women: stats_mays_women,
  },
  torpids: {
    men: stats_torpids_men,
    women: stats_torpids_women,
  },
  town: {
    men: stats_town_men,
    women: stats_town_women,
  },
} as Record<string, Record<string, any>>;
