import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import maysImage from "@/images/mays.png";
import townImage from "@/images/town.png";

const events = ["lents", "mays", "eights", "town"];
const genders = ["men", "women"];

const people = [
  {
    id: "lents",
    name: "Lent Bumps",
    role: "2022",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "mays",
    name: "May Bumps",
    role: "2022",
    imageUrl: maysImage.src,
  },
  {
    id: "eights",
    name: "Summer Eights",
    role: "2022",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "town",
    name: "Town Bumps",
    role: "2021",
    imageUrl: townImage.src,
  },
];

export default function Latest({ years }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Latest results - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
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
                              <p className="text-cambridge">
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
  const years = {};

  for (const event of events) {
    const res = await fetch(
      `https://api.cambridgebumps.com/api/latest?event=${event}&gender=men`
    );

    const data = await res.json();

    years[event] = data.endYear;
  }

  return {
    props: {
      years,
    },
  };
}
