import {
  PADDING,
  ROW_HEIGHT,
  stripeBounds,
  type ChartViewBox,
} from "@/lib/chart-size";

type ChartPlaceholderProps = {
  /** The box the chart is expected to fill — see `estimateChartViewBox`. */
  viewBox: ChartViewBox;
  /** How many crews the chart will show, i.e. how many rows to stripe. */
  rows: number;
};

// Holds the chart's space until the chart itself can render, drawn as the same
// alternating row stripes the chart uses so the swap reads as the chart filling
// in rather than the page jumping. Shares the chart's `viewBox`, so the browser
// gives it exactly the height the chart is about to take.
export function ChartPlaceholder({ viewBox, rows }: ChartPlaceholderProps) {
  const { x, width } = stripeBounds(viewBox);

  return (
    <svg
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="none"
      className="w-full opacity-40"
      aria-hidden="true"
    >
      {Array.from({ length: rows }, (_, row) =>
        // The chart stripes alternate rows, starting with the second.
        row % 2 === 1 ? (
          <rect
            key={row}
            x={x}
            y={PADDING + row * ROW_HEIGHT}
            width={width}
            height={ROW_HEIGHT}
            fill="hsl(var(--react-bumps-chart-muted))"
          />
        ) : null,
      )}
    </svg>
  );
}
