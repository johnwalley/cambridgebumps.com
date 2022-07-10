import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";


export default function Results({ events }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>History - Cambridge Bumps</title>
        <meta name="description" content="Historical results." />
      </Head>
      <Header />
      <main>
        <Link href="history/mays">
          <a>May Bumps</a>
        </Link>
        <Link href="history/town">
          <a>Town Bumps</a>
        </Link>
      </main>
    </>
  );
}
