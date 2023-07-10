import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import { genders, longNames } from "../../../../constants";
import { i18n } from "../../../../i18n";

const stats = [
  {
    id: "movup",
    name: "Biggest rise",
  },
  {
    id: "movdo",
    name: "Biggest fall",
  },
  {
    id: "nhead",
    name: "Number of headships",
  },
  {
    id: "ncrew",
    name: "Number of boats",
  },
];

export default function Statistics() {
  const router = useRouter();
  const { event, gender } = router.query;

  return (
    <>
      <Head>
        <title>{`Statistics - ${longNames[event]} - ${i18n.name} Bumps`}</title>
      </Head>
      <Header />

      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Statistics
                </h2>
                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {longNames[event]} - {gender}
                </h3>
              </div>
              <div className="lg:col-span-2">
                <ul
                  role="list"
                  className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
                >
                  {stats.map((stat) => (
                    <li key={stat.name}>
                      <Link href={`/stats/${event}/${gender}/${stat.id}`}>
                        <a>
                          <div className="flex items-center space-x-4 lg:space-x-6">
                            <div className="space-y-1 text-lg font-medium leading-6">
                              <h3>{stat.name}</h3>
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
