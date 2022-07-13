import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";

import eightsImage from "@/images/eights.png";
import lentsImage from "@/images/lents.png";
import maysImage from "@/images/mays.png";
import townImage from "@/images/town.png";

const events = ["lents", "mays", "eights", "town"];
const genders = ["men", "women"];

const people = [
  {
    id: "men",
    name: "Men",
    imageUrl: eightsImage.src,
  },
  {
    id: "women",
    name: "Women",
    imageUrl: townImage.src,
  },
];

export default function Latest({ years = { men: 2022, women: 2022 } }) {
  const router = useRouter();
  const { event } = router.query;

  return (
    <>
      <Head>
        <title>Historical charts - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Historical charts
                </h2>
                <p className="text-xl text-gray-500">
                  Racing is split into men&apos;s and women&apos;s divisions.
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul
                  role="list"
                  className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
                >
                  {people.map((person) => (
                    <li key={person.name}>
                      <Link href={`${event}/${person.id}`}>
                        <a>
                          <div className="flex items-center space-x-4 lg:space-x-6">
                            <img
                              className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
                              src={person.imageUrl}
                              alt=""
                            />
                            <div className="space-y-1 text-lg font-medium leading-6">
                              <h3>{person.name}</h3>
                              <p className="text-cambridge">
                                {years[person.id].startYear} -{" "}
                                {years[person.id].endYear}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
      { params: { event: "lents" } },
      { params: { event: "mays" } },
      { params: { event: "eights" } },
      { params: { event: "town" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { event } = context.params;

  return Promise.all(
    genders.map(async (gender) => {
      const res = await fetch(
        `https://api.cambridgebumps.com/api/history?event=${event}&gender=${gender}`
      );

      return await res.json();
    })
  ).then((values) => {
    return {
      props: {
        years: Object.fromEntries(
          genders.map((gender, i) => [
            gender,
            { startYear: values[i].startYear, endYear: values[i].endYear },
          ])
        ),
      },
    };
  });
}
