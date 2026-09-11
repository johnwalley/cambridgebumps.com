import { BumpsChartMultiYear as Chart } from "react-bumps-chart";
import type { Event } from "react-bumps-chart/dist/types";
import { useEffect, useMemo, useState } from "react";

import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/index.css";

// A stable identity, so the memo below doesn't hand the chart a fresh array on
// every render while the results are still loading.
const EMPTY: Event[] = [];

type MultiYearBumpsChartProps = {
  // A whole event's results run to megabytes and the chart only renders in the
  // browser, so the data is fetched from a static JSON file (built by
  // `src/pages/data/results/[event]/[gender].json.ts`) rather than inlined into
  // the page.
  src: string;
  club?: string | null;
  blades?: boolean;
  spoons?: boolean;
};

export default function MultiYearBumpsChart({
  src,
  club,
  blades = false,
  spoons = false,
}: MultiYearBumpsChartProps) {
  const [data, setData] = useState<Event[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // The shell is persisted across view transitions, so switching event or
    // gender re-runs this effect on a component still holding the previous
    // event's results. Clear them, or the old chart sits under the new page's
    // heading until the fetch lands.
    setData(null);
    setFailed(false);

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${src}`);
        return response.json();
      })
      .then((results: Event[]) => {
        if (!cancelled) setData(results);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  // A whole event is ~250 races and ~19,000 crews, so cloning every one of them
  // to set a flag is not free. The results carry no highlight of their own, so
  // with no club selected — the default, and every blades/spoons toggle — the
  // fetched data can be handed straight to the chart.
  const highlightedData = useMemo(() => {
    if (!data) return EMPTY;
    if (!club) return data;

    return data.map((event) => ({
      ...event,
      crews: event.crews.map((crew) => ({
        ...crew,
        highlight: crew.club === club,
      })),
    }));
  }, [data, club]);

  if (failed) {
    return (
      <div className="py-8 text-center">
        We couldn&rsquo;t load the results for this chart.
      </div>
    );
  }

  if (!data) {
    return <div className="py-8 text-center">Loading chart&hellip;</div>;
  }

  return (
    <div className={classes.chart}>
      <Chart data={highlightedData} blades={blades} spoons={spoons} />
    </div>
  );
}
