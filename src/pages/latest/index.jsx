import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";

export default function Latest({ data }) {
  const router = useRouter();
  const { event = "mays" } = router.query;

  return (
    <>
      <Head>
        <title>Latest - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <Link href="latest/mays">
          <a>May Bumps</a>
        </Link>
        <Link href="latest/town">
          <a>Town Bumps</a>
        </Link>
      </main>
    </>
  );
}
