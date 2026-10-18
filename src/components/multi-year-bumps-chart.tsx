import { BumpsChartMultiYear as Chart } from "react-bumps-chart";
import type { Event } from "react-bumps-chart/dist/types";
import { useEffect, useMemo, useRef, useState } from "react";

import classes from "./bumps-chart.module.css";
import "react-bumps-chart/dist/index.css";

// A stable identity, so the memo below doesn't hand the chart a fresh array on
// every render while the results are still loading.
const EMPTY: Event[] = [];

// The nearest ancestor that scrolls sideways — the shell's chart pane.
function horizontalScroller(element: HTMLElement) {
  for (let e = element.parentElement; e; e = e.parentElement) {
    if (/auto|scroll/.test(getComputedStyle(e).overflowX)) return e;
  }

  return null;
}

type MultiYearBumpsChartProps = {
  // A whole event's results run to megabytes and the chart only renders in the
  // browser, so the data is fetched from a static JSON file (built by
  // `src/pages/data/results/[event]/[gender].json.ts`) rather than inlined into
  // the page.
  src: string;
  /** The chart's width in pixels — 96 per year. */
  width: number;
  club?: string | null;
  blades?: boolean;
  spoons?: boolean;
};

export default function MultiYearBumpsChart({
  src,
  width,
  club,
  blades = false,
  spoons = false,
}: MultiYearBumpsChartProps) {
  const [data, setData] = useState<Event[] | null>(null);
  const [failed, setFailed] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // The chart runs oldest to newest, left to right, and is tens of thousands
  // of pixels wide; most visitors want the latest seasons, so open on the
  // right-hand end once there's a chart to show. Only on load — highlighting a
  // club or toggling blades leaves the scroll position where the visitor put
  // it.
  //
  // This sets the scroll box's `scrollLeft` rather than calling
  // `scrollIntoView`, which would scroll the page as well — and while a view
  // transition is running the page can scroll sideways by a scrollbar's width
  // (see `YearPicker`).
  useEffect(() => {
    const scroller = ref.current && horizontalScroller(ref.current);

    scroller?.scrollTo({ left: scroller.scrollWidth, behavior: "instant" });
  }, [data]);

  useEffect(() => {
    let cancelled = false;

    // The shell is persisted across view transitions, so switching event or
    // gender re-runs this effect on a component still holding the previous
    // event's results. Clear them, or the old chart sits under the new page's
    // heading until the fetch lands.
    setData(null);
    setFailed(false);

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${src}`);
        return response.json();
      })
      .then((results: Event[]) => {
        if (!cancelled) setData(results);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  // A whole event is ~250 races and ~19,000 crews, so cloning every one of them
  // to set a flag is not free. The results carry no highlight of their own, so
  // with no club selected — the default, and every blades/spoons toggle — the
  // fetched data can be handed straight to the chart.
  const highlightedData = useMemo(() => {
    if (!data) return EMPTY;
    if (!club) return data;

    return data.map((event) => ({
      ...event,
      crews: event.crews.map((crew) => ({
        ...crew,
        highlight: crew.club === club,
      })),
    }));
  }, [data, club]);

  if (failed) {
    return (
      <div className="py-8 text-center">
        We couldn&rsquo;t load the results for this chart.
      </div>
    );
  }

  if (!data) {
    return <div className="py-8 text-center">Loading chart&hellip;</div>;
  }

  // The width applies only once the chart is here: the loading and error
  // messages are centred, and centred in a 20,000px box they'd be off screen.
  return (
    <div ref={ref} className={`${classes.chart} px-10`} style={{ width }}>
      <Chart data={highlightedData} blades={blades} spoons={spoons} />
    </div>
  );
}
