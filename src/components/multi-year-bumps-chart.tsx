"use client";

import { BumpsChartMultiYear as Chart } from "react-bumps-chart";
import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/index.css";
import { useSearchParams } from "next/navigation";
import { Event } from "react-bumps-chart/dist/types";

import { Roboto_Flex } from "next/font/google";
import { useMemo, useSyncExternalStore } from "react";

const robotoFlex = Roboto_Flex({
  display: "swap",
  subsets: ["latin"],
  weight: "variable",
  variable: "--react-bumps-chart-font-family",
  axes: ["GRAD"],
});

export default function BumpsChart({ data }: { data: Event[] }) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const searchParams = useSearchParams();

  const highlightedData = useMemo(() => {
    const club = searchParams.get("club");
    return data.map((event) => ({
      ...event,
      crews: event.crews.map((crew) => ({
        ...crew,
        highlight: crew.club === club,
      })),
    }));
  }, [data, searchParams]);

  return (
    <div className={`${classes.chart} ${robotoFlex.variable}`}>
      {isClient ? (
        <Chart
          data={highlightedData}
          blades={searchParams.get("blades") === "true"}
          spoons={searchParams.get("spoons") === "true"}
        />
      ) : null}
    </div>
  );
}
