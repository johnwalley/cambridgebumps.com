import Head from "next/head";

import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cambridge Bumps</title>
        <meta
          name="description"
          content="Cambridge and Oxford Bumps results and charts."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
