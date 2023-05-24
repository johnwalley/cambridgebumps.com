import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

import BumpsChart from "react-bumps-chart";

import { longGenders, longNames } from "../../../../constants";
import { i18n } from "../../../../i18n";

export default function Latest({ data }) {
  const router = useRouter();
  const { event, gender } = router.query;

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Head>
        <title>{`Latest results - ${longNames[event]} - ${longGenders[gender]} - ${i18n.name} Bumps`}</title>
      </Head>
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
          <div className="flex flex-col items-center">
            <Navigation page="latest" event={event} gender={gender} />
            <span className="pb-1 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
              {data.startYear}
            </span>
            <div className="sm:w-[520px]">
              <BumpsChart data={data} />
            </div>
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
    `https://api.cambridgebumps.com/api/latest?event=${event}&gender=${gender}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
