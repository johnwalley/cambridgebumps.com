"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  crews: {
    label: "Crews",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function Chart({ data }: { data: any }) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="crews" fill="var(--color-crews)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
