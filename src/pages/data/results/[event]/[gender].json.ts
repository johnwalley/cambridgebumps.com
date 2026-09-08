import type { APIRoute, GetStaticPaths } from "astro";

import { results } from "@/data/results";
import { slimRace } from "@/lib/slim-results";
import { events, genders, yearOf, type Gender, type Set } from "@/lib/utils";

// The multi-year charts need a whole event's results, which run to several
// megabytes. Rather than inline that into the page, it's emitted as a static
// JSON file the chart fetches once it's on screen.
export const getStaticPaths = (() =>
  events.flatMap((event) =>
    genders.map((gender) => ({ params: { event, gender } })),
  )) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const event = params.event as Set;
  const gender = params.gender as Gender;

  // `yearOf` rather than `+year`: the early mays/men seasons store compound
  // strings such as "1827 February March", which `+` turns into NaN and which
  // would therefore sort arbitrarily.
  const data = [...results[event][gender]]
    .sort((a, b) => yearOf(a.year) - yearOf(b.year))
    .map(slimRace);

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
