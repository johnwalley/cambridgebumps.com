"use client";

import Chart from "react-bumps-chart";
import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/style.css";
import { useSearchParams } from "next/navigation";

export default function BumpsChart({ data }: { data: any }) {
  const searchParams = useSearchParams();

  return (
    <div className={classes.chart}>
      <Chart
        data={data}
        blades={searchParams.get("blades") === "true"}
        spoons={searchParams.get("spoons") === "true"}
      />
    </div>
  );
}
