"use client";

import { BumpsChart as Chart } from "react-bumps-chart";
import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/index.css";
import { useSearchParams } from "next/navigation";
import { Event } from "react-bumps-chart/dist/types";

import { Roboto_Flex } from "next/font/google";
import { useEffect, useState } from "react";

const robotoFlex = Roboto_Flex({
  display: "swap",
  subsets: ["latin"],
  weight: "variable",
  variable: "--react-bumps-chart-font-family",
  axes: ["GRAD"],
});

export default function BumpsChart({ data }: { data: Event }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchParams = useSearchParams();

  for (const crew of data.crews) {
    if (crew.club === searchParams.get("club")) {
      crew.highlight = true;
    } else {
      crew.highlight = false;
    }
  }

  return (
    <div className={`${classes.chart} ${robotoFlex.variable}`}>
      {isClient ? (
        <Chart
          data={data}
          blades={searchParams.get("blades") === "true"}
          spoons={searchParams.get("spoons") === "true"}
        />
      ) : null}
    </div>
  );
}
