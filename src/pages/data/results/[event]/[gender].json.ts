import type { APIRoute, GetStaticPaths } from "astro";

import { results } from "@/data/results";
import { events, genders, type Gender, type Set } from "@/lib/utils";

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

  const data = [...results[event][gender]].sort((a, b) => +a.year - +b.year);

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
