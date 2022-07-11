import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container } from "@/components/Container";
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
        <Container>
          <p>{event}</p>
          <Link href={`${event}/men`}>
            <a>Men</a>
          </Link>
          <Link href={`${event}/women`}>
            <a>Women</a>
          </Link>
        </Container>
      </main>
    </>
  );
}
