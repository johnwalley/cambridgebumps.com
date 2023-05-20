import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AuthLayout } from "@/components/AuthLayout";
import { Header } from "@/components/Header";
import ErrorBoundary from "@/components/error-boundary";

import * as utils from "bumps-results-tools";
import BumpsChart from "react-bumps-chart";

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import styles from "./generate.module.css";

export default function Generate() {
  const [input, setInput] = useState(null);

  const [gender, setGender] = useState("women");
  const [year, setYear] = useState("women");

  useEffect(() => {
    async function startFetching() {
      setInput(null);

      const response = await fetch(
        `https://api.cambridgebumps.com/api/raw?event=town&gender=${gender}&year=2012&format=tg`,
        { mode: "cors" }
      );

      const result = await response.text();

      if (!ignore) {
        setInput(result);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, [gender]);

  if (input === null) {
    return <div>Loading</div>;
  }

  let joinedEvents = null;

  try {
    const latestEvent = utils.transformData(utils.read_tg(input));
    joinedEvents = utils.joinEvents([latestEvent], "town", "men");

    joinedEvents.small = "town";
    joinedEvents.gender = "men";
    joinedEvents.set = utils.SET.TOWN;
  } catch (e) {
    console.log("aaargh");
  }

  return (
    <>
      <Head>
        <title>Generate Bumps Charts - Cambridge Bumps</title>
      </Head>
      <Header />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="men">Men</option>
        <option value="women">Women</option>
      </select>
      <div className={"relative h-full bg-white " + styles.container}>
        {input === null ? (
          <span>Loading</span>
        ) : (
          <Allotment>
            <Allotment.Pane>
              <textarea
                className="h-full w-full resize-none border-none font-mono text-xs outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <textarea
                className="h-full w-full resize-none border-none font-mono text-xs outline-none"
                value={utils.write_ad(utils.read_tg(input))}
                readOnly
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <ErrorBoundary>
                <BumpsChart data={joinedEvents} />
              </ErrorBoundary>
            </Allotment.Pane>
          </Allotment>
        )}
      </div>
    </>
  );
}

/* textarea {
  width: 100%;
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 12px;
  font-family: "Monaco", courier, monospace;
  padding: 20px; */
