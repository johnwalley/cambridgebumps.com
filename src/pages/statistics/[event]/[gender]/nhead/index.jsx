import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

import { longGenders, longNames } from "../../../../../constants";
import { i18n } from "../../../../../i18n";

export default function Statistics({ data }) {
  const router = useRouter();

  const { event, gender } = router.query;

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Head>
        <title>{`Statistics - ${longNames[event]} - ${longGenders[gender]} - ${i18n.name} Bumps`}</title>
      </Head>
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
          <div className="flex flex-col items-center align-middle">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Number of headships</h1>
            <div>
              Number of times finished Head of the River (NHd) in{" "}
              {longNames[event]}, and year of last Headship
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    NHd
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Crews
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((d, i) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {d.count}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {d.year}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {d.crew}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    `https://api.cambridgebumps.com/api/stats/nhead?event=${event}&gender=${gender}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
