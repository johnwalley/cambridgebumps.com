import type { Event } from "react-bumps-chart/dist/types";

// Trim a race down to what the chart actually reads, before it is shipped to
// the browser — inlined into a chart page's island props, or written to the
// JSON the multi-year charts fetch.
//
// `highlight` is `false` on every crew in every results file and is recomputed
// client-side from the selected club, so it is dropped outright. `blades` and
// `withdrawn` are omitted when false: the chart only ever tests them for
// truthiness, and a missing key reads the same as `false`.
//
// Across a whole event that takes ~3.5 MB down to ~2.8 MB — mostly a saving in
// parse time and memory rather than transfer, since the repetition compresses
// well either way.
export function slimRace(race: Event): Event {
  return {
    ...race,
    crews: race.crews.map((crew) => {
      const {
        highlight: _highlight,
        blades,
        withdrawn,
        ...rest
      } = crew as typeof crew & { highlight?: boolean };

      return {
        ...rest,
        ...(blades ? { blades: true } : {}),
        ...(withdrawn ? { withdrawn: true } : {}),
      };
    }),
  } as Event;
}
