import Head from "next/head";
import Link from "next/link";

import { useState } from "react";

import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { Testimonials } from "@/components/Testimonials";

import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { i18n } from "../i18n";

export default function Home() {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      <Head>
        <title>{i18n.name} Bumps</title>
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
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="bg-cambridge rounded-lg p-2 shadow-lg sm:p-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="bg-cambridge flex rounded-lg p-2">
                    <SpeakerphoneIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="ml-3 truncate font-medium text-white">
                    <span className="md:hidden">CRA Town Bumps this week!</span>
                    <span className="hidden md:inline">
                      Cambridge Rowing Association Town Bumps 2022 taking place
                      this week
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <Link href="/latest/town">
                    <a className="text-cambridge flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium shadow-sm">
                      Latest results
                    </a>
                  </Link>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className="hover:bg-cambridge -mr-1 flex rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => {
                      setShowBanner(false);
                    }}
                  >
                    <span className="sr-only">Dismiss</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
