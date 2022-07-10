import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import { select } from "d3-selection";
import "d3-transition";
import { bumpsChart } from "d3-bumps-chart";
import { useEffect, useRef } from "react";

const widthOfOneYear = 110;

export default function Results({ events }) {
  const ref = useRef();
  const chart = useRef();
  const router = useRouter();
  const { event = "mays", gender = "women" } = router.query;

  useEffect(() => {
    chart.current = bumpsChart().on("selectYear", (start, end) => {
      console.log(start, end);
    });
  }, []);

  useEffect(() => {
    const numYearsToView = Math.max(
      0,
      Math.ceil((window.document.body.clientWidth - 310) / widthOfOneYear)
    );

    const year = events.endYear - numYearsToView + 1;

    chart.current.year(year).on("selectYear", (start, end) => {
      console.log(start, end);
    });

    select(ref.current).datum(events).call(chart.current);
  }, [events]);

  useEffect(() => {
    function handleResize() {
      const numYearsToView = Math.max(
        0,
        Math.ceil((window.document.body.clientWidth - 310) / widthOfOneYear)
      );

      console.log("resize", window.document.body.clientWidth, numYearsToView);

      chart.current
        .numYearsToView(numYearsToView)
        .windowWidth(window.document.body.clientWidth);

      console.log(chart.current.numYearsToView());

      select(ref.current).datum(events).call(chart.current);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>History - Cambridge Bumps</title>
        <meta name="description" content="Historical results." />
      </Head>

      <Header />
      <main>
        <p>
          {event} - {gender}
        </p>
        <div className="bumpsChart" ref={ref}>
          <svg width="100%" preserveAspectRatio="xMidYMin" />
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { event: "mays", gender: "men" } },
      { params: { event: "mays", gender: "women" } },
      { params: { event: "town", gender: "men" } },
      { params: { event: "town", gender: "women" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { event, gender } = context.params;

  const res = await fetch(
    `https://bumps-results-da3sr2u5o-johnwalley.vercel.app/api/history?event=${event}&gender=${gender}`
  );

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
