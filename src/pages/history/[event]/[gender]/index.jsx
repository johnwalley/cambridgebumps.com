import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

import { select } from "d3-selection";
import "d3-transition";
import { bumpsChart } from "d3-bumps-chart";
import { useEffect, useRef } from "react";

const widthOfOneYear = 110;

export default function Results({ events }) {
  const ref = useRef();
  const chart = useRef();
  const router = useRouter();
  const { event, gender } = router.query;

  useEffect(() => {
    if (!chart.current) {
      chart.current = bumpsChart().on("selectYear", (start, end) => {
        console.log(start, end);
      });
    }
  }, []);

  useEffect(() => {
    const numYearsToView = Math.max(
      0,
      Math.ceil((window.document.body.clientWidth - 310) / widthOfOneYear)
    );

    const year = events.endYear - numYearsToView + 1;

    chart.current.year(year);

    select(ref.current).datum(events).call(chart.current);
  }, [events]);

  useEffect(() => {
    function handleResize() {
      const numYearsToView = Math.max(
        0,
        Math.ceil((window.document.body.clientWidth - 310) / widthOfOneYear)
      );

      chart.current
        .numYearsToView(numYearsToView)
        .windowWidth(window.document.body.clientWidth);

      select(ref.current).call(chart.current);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Historical charts - Cambridge Bumps</title>
        <meta name="description" content="Historical results." />
      </Head>

      <Header />
      <main>
        <div className="flex flex-col items-center">
          <Navigation page="history" event={event} gender={gender} />
          <div className="bumpsChart" ref={ref}>
            <svg width="100%" preserveAspectRatio="xMidYMin" />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { event: "eights", gender: "men" } },
      { params: { event: "eights", gender: "women" } },
      { params: { event: "lents", gender: "men" } },
      { params: { event: "lents", gender: "women" } },
      { params: { event: "mays", gender: "men" } },
      { params: { event: "mays", gender: "women" } },
      { params: { event: "torpids", gender: "men" } },
      { params: { event: "torpids", gender: "women" } },
      { params: { event: "town", gender: "men" } },
      { params: { event: "town", gender: "women" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { event, gender } = context.params;

  const res = await fetch(
    `https://api.cambridgebumps.com/api/history?event=${event}&gender=${gender}`
  );

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
