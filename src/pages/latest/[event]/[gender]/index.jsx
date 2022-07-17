import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

import BumpsChart from "react-bumps-chart";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { Fragment, forwardRef } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const longNames = {
  lents: "Lent Bumps",
  mays: "May Bumps",
  eights: "Summer Eights",
  town: "Town Bumps",
};

const longGenders = {
  men: "Men",
  women: "Women",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Latest({ data }) {
  const router = useRouter();
  const { event, gender } = router.query;

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Head>
        <title>Latest results - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
          <div className="flex flex-col items-center">
            <Navigation page="latest" event={event} gender={gender} />
            <span className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
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
