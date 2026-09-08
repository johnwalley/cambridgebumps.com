import type { Event } from "react-bumps-chart/dist/types";

// Geometry mirrored from react-bumps-chart so a page can reserve the space a
// chart is about to take up.
//
// The chart can only render in the browser — it sizes its columns by measuring
// text with `getComputedTextLength` — so the chart area is empty from first
// paint until hydration finishes. Without a reservation the page then grows by
// the chart's full height in one go: over 1600px for a modern May Bumps chart.
//
// The library lays each crew out as a 16-unit row inside a `viewBox` whose
// width is the day columns plus a crew-name column on either side, and renders
// it at `width: 100%` with `preserveAspectRatio: "none"`. The rendered height is
// therefore the container's width times the viewBox's ratio, so reserving that
// ratio reserves the right height at every breakpoint.
const ROW_HEIGHT = 16; // `Ye`
const PADDING = 3; // `Xe`
const POSITION_COLUMN = ROW_HEIGHT * 2; // `u`
const GUTTER = 32; // `z`

const FONT_SIZE = 12.8;

// The library measures crew labels on a node it appends to `document.body` —
// outside our `.chart` wrapper, so it resolves the stylesheet default rather
// than the Roboto Flex the chart draws with, and in practice measures Arial.
// These are Arial's advance widths in 1/1000 em, which Helvetica and Liberation
// Sans share, so the same numbers hold for the usual fallbacks on every
// platform. Grouped by width; anything unlisted falls back to the commonest.
const ADVANCE_FALLBACK = 556;
const ADVANCE: Record<string, number> = Object.fromEntries(
  (
    [
      [191, "'"],
      [222, "ilj"],
      [278, "ft./I "],
      [333, "-()r"],
      [500, "cksvxyzJ"],
      [556, "abdeghnopquL0123456789"],
      [611, "FTZ"],
      [667, "ABEKPSVXY&"],
      [722, "CDHNRUw"],
      [778, "GOQ"],
      [833, "Mm"],
      [944, "W"],
    ] as const
  ).flatMap(([width, characters]) =>
    [...characters].map((character) => [character, width]),
  ),
);

const textWidth = (text: string) =>
  [...text].reduce(
    (total, character) =>
      total + ((ADVANCE[character] ?? ADVANCE_FALLBACK) * FONT_SIZE) / 1000,
    0,
  );

const widest = (labels: string[]) =>
  labels.length === 0 ? 0 : Math.max(...labels.map(textWidth));

export type ChartViewBox = { width: number; height: number };

/**
 * The `viewBox` react-bumps-chart will draw this event into, close enough to
 * reserve the chart's height with. Returns null for an event with no crews,
 * which has no chart to reserve.
 */
export function estimateChartViewBox(data: Event): ChartViewBox | null {
  if (!data.crews || data.crews.length === 0) return null;

  // `G` — the crew names, drawn down both sides of the chart.
  const names =
    widest(data.crews.map((crew) => String(crew.start))) + 2 * PADDING;
  // `J` — the position within a division, so the widest is the largest division.
  const divisions = data.div_size?.[0] ?? [];
  const positions =
    textWidth(String(divisions.length === 0 ? 0 : Math.max(...divisions))) +
    PADDING;
  // `ne` — the overall position, so the widest is the last crew's.
  const numbers = textWidth(String(data.crews.length)) + PADDING;

  return {
    width:
      POSITION_COLUMN +
      positions +
      GUTTER +
      names +
      data.days * ROW_HEIGHT +
      names +
      GUTTER +
      numbers +
      PADDING,
    height: 2 * PADDING + data.crews.length * ROW_HEIGHT,
  };
}

/** Where the chart's row stripes start and end within the viewBox. */
export function stripeBounds(viewBox: ChartViewBox) {
  return {
    x: POSITION_COLUMN,
    width: viewBox.width - POSITION_COLUMN - PADDING,
  };
}

export { ROW_HEIGHT, PADDING };
