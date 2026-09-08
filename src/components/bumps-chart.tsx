import { BumpsChart as Chart } from "react-bumps-chart";
import type { Event } from "react-bumps-chart/dist/types";
import { useMemo, useSyncExternalStore } from "react";

import { ChartPlaceholder } from "@/components/chart-placeholder";
import { estimateChartViewBox } from "@/lib/chart-size";

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

  // Reserve the chart's height for the paints before it can render, so the page
  // doesn't grow by 1600-odd pixels the moment hydration finishes.
  const viewBox = useMemo(() => estimateChartViewBox(data), [data]);

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
      ) : viewBox ? (
        <ChartPlaceholder viewBox={viewBox} rows={data.crews.length} />
      ) : null}
    </div>
  );
}
