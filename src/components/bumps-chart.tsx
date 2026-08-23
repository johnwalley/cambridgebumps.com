import { BumpsChart as Chart } from "react-bumps-chart";
import type { Event } from "react-bumps-chart/dist/types";
import { useMemo, useSyncExternalStore } from "react";

import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/index.css";

type BumpsChartProps = {
  data: Event;
  club?: string | null;
  blades?: boolean;
  spoons?: boolean;
};

export default function BumpsChart({
  data,
  club,
  blades = false,
  spoons = false,
}: BumpsChartProps) {
  // The chart measures text, so it only renders in the browser.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const highlightedData = useMemo(
    () => ({
      ...data,
      crews: data.crews.map((crew) => ({
        ...crew,
        highlight: crew.club === club,
      })),
    }),
    [data, club],
  );

  return (
    <div className={classes.chart}>
      {isClient ? (
        <Chart data={highlightedData} blades={blades} spoons={spoons} />
      ) : null}
    </div>
  );
}
