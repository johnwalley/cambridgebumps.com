import { BumpsChartMultiYear as Chart } from "react-bumps-chart";
import type { Event } from "react-bumps-chart/dist/types";
import { useEffect, useMemo, useState } from "react";

import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/index.css";

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

  const highlightedData = useMemo(
    () =>
      (data ?? []).map((event) => ({
        ...event,
        crews: event.crews.map((crew) => ({
          ...crew,
          highlight: crew.club === club,
        })),
      })),
    [data, club],
  );

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
