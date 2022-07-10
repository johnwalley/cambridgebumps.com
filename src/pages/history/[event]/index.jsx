import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

export default function Results({ events }) {
  const router = useRouter();
  const { event = "mays" } = router.query;

  return (
    <>
      <Head>
        <title>History - Cambridge Bumps</title>
        <meta name="description" content="Historical results." />
      </Head>
      <Header />
      <main>
        <p>{event}</p>
        <Link href={`${event}/men`}>
          <a>Men</a>
        </Link>
        <Link href={`${event}/women`}>
          <a>Women</a>
        </Link>
      </main>
    </>
  );
}
