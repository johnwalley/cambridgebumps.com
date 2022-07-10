import Head from "next/head";

export default function Results({ events }) {
  return (
    <>
      <Head>
        <title>History - Cambridge Bumps</title>
        <meta name="description" content="Historical results." />
      </Head>
      <main>
        <pre>{JSON.stringify(events)}</pre>
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
    `https://bumps-results-da3sr2u5o-johnwalley.vercel.app/api/history?event=${event}&gender=${gender}`
  );

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
