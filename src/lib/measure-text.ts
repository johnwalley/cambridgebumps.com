import type { MeasureText } from "react-bumps-chart";

import metrics from "@/data/chart-font-metrics.json";

// react-bumps-chart's font size, in the chart's units
const FONT_SIZE = 12.8;

const advances: Record<string, number> = metrics.advances;

// For anything outside the table, which covers Latin-1: a typical lowercase
// letter
const FALLBACK = advances.n;

/**
 * Measures text as the bumps charts draw it: Roboto Flex, unkerned, at the
 * chart's font size. Passed to the charts so they lay out the same on the
 * server and in the browser — see `scripts/generate-chart-font-metrics.mjs`.
 */
export const measureChartText: MeasureText = (text) => {
  let width = 0;

  for (const character of text) {
    width += advances[character] ?? FALLBACK;
  }

  return (width * FONT_SIZE) / metrics.unitsPerEm;
};
