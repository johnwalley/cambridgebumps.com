// Hand-maintained map of YouTube videos for individual bumps races, keyed by the
// lowercase route params used elsewhere (results[event][gender] in the chart page,
// and the layout's URL segments). The map is small/curated, so unlike the full
// results dataset it can be imported on both the server (chart page) and the
// client (year-picker indicator) without bloating the bundle.
//
// Note: the event route-key type is `Set` ("eights"|"lents"|"mays"|"torpids"|"town")
// and `Gender` is "men"|"women" — both from @/lib/utils. `Set` is aliased to
// `EventKey` here to avoid clashing with the built-in JS `Set` constructor.
import type { Set as EventKey, Gender } from "@/lib/utils";

export type RaceVideo = {
  id: string; // YouTube video id, e.g. "dQw4w9WgXcQ"
  title: string; // caption, e.g. "Day 3 — Headship bump"
};

// event -> gender -> year -> videos
//
// Example:
//   export const videos = {
//     mays: {
//       men: {
//         "2025": [{ id: "dQw4w9WgXcQ", title: "Day 4 — M1 headship bump" }],
//       },
//     },
//   };
export const videos: Partial<
  Record<EventKey, Partial<Record<Gender, Record<string, RaceVideo[]>>>>
> = {
  mays: {
    men: {
      "2026": [{ id: "8ShJDzOLCXw", title: "Pembroke M1 — Day 2" }],
    },
  },
};

export function getRaceVideos(
  event: string,
  gender: string,
  year: string,
): RaceVideo[] {
  return videos[event as EventKey]?.[gender as Gender]?.[year] ?? [];
}

// Years (for the given event/gender) that have at least one video — used by the
// year-picker indicator. Returns a JS Set for O(1) `.has()` lookups.
export function yearsWithVideos(event: string, gender: string): Set<string> {
  return new Set(
    Object.keys(videos[event as EventKey]?.[gender as Gender] ?? {}),
  );
}
