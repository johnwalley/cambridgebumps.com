// Generates `src/data/chart-font-metrics.json`: the advance width of every
// character the bumps charts can draw, read from the Roboto Flex file the site
// serves (see the `@font-face` in `src/styles/globals.css`).
//
// Why this exists: react-bumps-chart sizes its crew-name columns by measuring
// text. Left to itself it estimates on the server and measures in the browser,
// so a chart rendered at build time changes shape on hydration whenever the two
// disagree. Handing it `measureChartText` (`src/lib/measure-text.ts`), built
// from these widths, gives the same answer in both places, on every platform,
// and in the font the chart actually draws with.
//
// The chart draws unkerned and at the font's default weight; the file's only
// other axis, GRAD, leaves widths alone by design. So a name's width is the sum
// of its characters' advances.
//
// Run via `pnpm gen:chart-font-metrics`; also runs automatically on `prebuild`.

import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { openSync } from "fontkit";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const font = openSync(
  require.resolve("@fontsource-variable/roboto-flex/files/roboto-flex-latin-grad-normal.woff2"),
);

// Printable ASCII, Latin-1 and the curly apostrophe
const codePoints = [
  ...Array.from({ length: 0x7f - 0x20 }, (_, i) => 0x20 + i),
  ...Array.from({ length: 0x100 - 0xa0 }, (_, i) => 0xa0 + i),
  0x2019,
];

const advances = {};

for (const codePoint of codePoints) {
  if (!font.hasGlyphForCodePoint(codePoint)) continue;

  advances[String.fromCodePoint(codePoint)] =
    font.glyphForCodePoint(codePoint).advanceWidth;
}

writeFileSync(
  join(root, "src/data/chart-font-metrics.json"),
  JSON.stringify({ unitsPerEm: font.unitsPerEm, advances }, null, 2) + "\n",
);

console.log(
  `chart-font-metrics: ${Object.keys(advances).length} characters from ${font.familyName}`,
);
