import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import { genders, longGenders, longNames } from "../../../../constants";
import { i18n } from "../../../../i18n";

const crew_stats = [
  {
    field: "count",
    id: "nhead",
    name: "Number of headships",
  },
  {
    field: "rise",
    id: "movup",
    name: "Biggest rise in one year",
  },
  {
    field: "fall",
    id: "movdo",
    name: "Biggest fall in one year",
  },
];

const college_stats = [
  {
    field: "count",
    id: "ncrews",
    name: "Number of boats",
  },
];

export default function Statistics({ data }) {
  const router = useRouter();
  const { event, gender } = router.query;

  console.log(event, gender, data);

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
                  Statistics (beta)
                </h2>
                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {longNames[event]} - {longGenders[gender]}
                </h3>
                <h3 className="text-xl tracking-tight">
                  Statistics are under development and may contain errors.
                </h3>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Crew statistics
                </h2>
                <p className="mt-8">
                  Top crews, of those currently competing in {longNames[event]},
                  in different statistical categories
                </p>
                <p className="mt-8">
                  Where two or more crews share the same statistic only the
                  highest placed crew is shown.
                </p>
                <p className="mt-8">
                  Click on the statistic name for full statistics.
                </p>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Statistic
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Crew
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {crew_stats.map((d, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                          <Link href={`/statistics/${event}/${gender}/${d.id}`}>
                            <a>
                              <div className="flex items-center space-x-4 lg:space-x-6">
                                <div className="space-y-1 text-lg font-medium leading-6">
                                  <h3>{d.name}</h3>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {data?.crew_stats?.[d.id]?.[d.field]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {data?.crew_stats?.[d.id]?.["crew"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  College/club statistics
                </h2>
                <p className="mt-8">
                  Top colleges or clubs in {longNames[event]}, in different
                  statistical categories
                </p>
                <p className="mt-8">
                  Where two or more colleges or clubs share the same statistic
                  only the highest placed is shown.
                </p>
                <p className="mt-8">
                  Click on the statistic name for full statistics.
                </p>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Statistic
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        College/club
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {college_stats.map((d, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                          <Link href={`/statistics/${event}/${gender}/${d.id}`}>
                            <a>
                              <div className="flex items-center space-x-4 lg:space-x-6">
                                <div className="space-y-1 text-lg font-medium leading-6">
                                  <h3>{d.name}</h3>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {data?.college_stats?.[d.id]?.[d.field]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {data?.college_stats?.[d.id]?.["club"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

  const res1 = await fetch(
    `https://api.cambridgebumps.com/api/stats/crew_stats?event=${event}&gender=${gender}`
  );

  const crew_stats = await res1.json();

  const res2 = await fetch(
    `https://api.cambridgebumps.com/api/stats/coll_stats?event=${event}&gender=${gender}`
  );

  const college_stats = await res2.json();

  return {
    props: {
      data: { crew_stats, college_stats },
    },
  };
}
