import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import eightsImage from "@/images/eights.png";
import lentsImage from "@/images/lents.png";
import maysImage from "@/images/mays.png";
import townImage from "@/images/town.png";

import { events } from "../../constants";
import { i18n } from "../../i18n";

const people = [
  {
    id: "lents",
    name: "Lent Bumps",
    imageUrl: lentsImage.src,
  },
  {
    id: "mays",
    name: "May Bumps",
    imageUrl: maysImage.src,
  },
  {
    id: "eights",
    name: "Summer Eights",
    imageUrl: eightsImage.src,
  },
  {
    id: "torpids",
    name: "Torpids",
    imageUrl: lentsImage.src,
  },
  {
    id: "town",
    name: "Town Bumps",
    imageUrl: townImage.src,
  },
];

export default function Latest({ years }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`Latest results - ${i18n.name} Bumps`}</title>
        <meta
          name="description"
          content={`Latest results.`}
        />
      </Head>
      <Header />

      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Latest results
                </h2>
                <p className="text-xl text-gray-500">
                  In Cambridge there are Lent Bumps, May Bumps and Town Bumps.
                  In Oxford there are Torpids and Summer Eights.
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul
                  role="list"
                  className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
                >
                  {people.map((person) => (
                    <li key={person.name}>
                      <Link href={`latest/${person.id}`}>
                        <a>
                          <div className="flex items-center space-x-4 lg:space-x-6">
                            <img
                              className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
                              src={person.imageUrl}
                              alt=""
                            />
                            <div className="space-y-1 text-lg font-medium leading-6">
                              <h3>{person.name}</h3>
                              <p className="text-primary">
                                {years[person.id]}
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

export async function getStaticProps(context) {
  return Promise.all(
    events.map(async (event) => {
      const res = await fetch(
        `https://api.cambridgebumps.com/api/latest?event=${event}&gender=men`,
      );

      return await res.json();
    }),
  ).then((values) => {
    return {
      props: {
        years: Object.fromEntries(
          events.map((event, i) => [event, values[i].endYear]),
        ),
      },
    };
  });
}
