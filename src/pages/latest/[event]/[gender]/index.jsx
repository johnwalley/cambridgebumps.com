import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Switch } from "@headlessui/react";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

import BumpsChart from "react-bumps-chart";

import { longGenders, longNames } from "../../../../constants";
import { i18n } from "../../../../i18n";

export default function Latest({ data }) {
  const router = useRouter();
  const [blades, setBlades] = useState(false);
  const [spoons, setSpoons] = useState(false);

  const { event, gender } = router.query;

  if (!data) {
    return <p>Loading</p>;
  }

  console.log(data)

  function addEventJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "SportsEvent",
      "sport": "Rowing",
      "name": "${longNames[event]} - ${longGenders[gender]}",
      "location": "${{lents: "Cambridge", mays: "Cambridge", eights: "Oxford", torpids: "Oxford", town: "Cambridge"}[event]}",
      "startDate": "${data.startYear}"
    }
  `,
    };
  }

  return (
    <>
      <Head>
        <title>{`Latest results - ${longNames[event]} - ${longGenders[gender]} - ${i18n.name} Bumps`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addEventJsonLd()}
          key="event-jsonld"
        />
      </Head>
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
          <div className="flex flex-col items-center align-middle">
            <Navigation page="latest" event={event} gender={gender} />
            <div className="w-full sm:w-[520px] flex flex-row justify-between">
              <Switch.Group>
                <div className="flex items-center">
                  <Switch.Label className="mr-3 text-sm">Blades</Switch.Label>
                  <Switch
                    checked={blades}
                    onChange={setBlades}
                    className={`${
                      blades ? "bg-primary" : "bg-gray-200"
                    } relative inline-flex h-5 w-10 items-center rounded-full`}
                  >
                    <span className="sr-only">Blades</span>
                    <span
                      className={`${
                        blades ? "translate-x-6" : "translate-x-1"
                      } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
              <span className="pb-1 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
                {data.startYear}
              </span>
              <Switch.Group>
                <div className="flex items-center">
                  <Switch.Label className="mr-3 text-sm">Spoons</Switch.Label>
                  <Switch
                    checked={spoons}
                    onChange={setSpoons}
                    className={`${
                      spoons ? "bg-primary" : "bg-gray-200"
                    } relative inline-flex h-5 w-10 items-center rounded-full`}
                  >
                    <span className="sr-only">Spoons</span>
                    <span
                      className={`${
                        spoons ? "translate-x-6" : "translate-x-1"
                      } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
            </div>
            <div className="w-full sm:w-[520px]">
              <BumpsChart data={data} blades={blades} spoons={spoons} />
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
