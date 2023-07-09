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
            <h1>Biggest rise</h1>
            <div>
              Crews in order of biggest rise during {longNames[event]}, and (most
              recent) year
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rise</th>
                  <th>Year</th>
                  <th>Crews</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.rise}</td>
                    <td>{d.year}</td>
                    <td>{d.crew}</td>
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
    `https://api.cambridgebumps.com/api/stats/movup?event=${event}&gender=${gender}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
