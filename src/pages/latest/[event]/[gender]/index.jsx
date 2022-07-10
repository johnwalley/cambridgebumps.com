import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import BumpsChart from "react-bumps-chart";

export default function Latest({ data }) {
  const router = useRouter();
  const { event = "mays", gender = "women" } = router.query;

  return (
    <>
      <Head>
        <title>Latest - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <p>
          {event} - {gender}
        </p>
        <pre>{JSON.stringify(data)}</pre>

        {/* <BumpsChart data={data} /> */}
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
    `https://api.cambridgebumps.com/api/latest?event=${event}&gender=${gender}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
