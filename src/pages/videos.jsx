import Head from "next/head";
import Image from "next/image";
import image from "@/images/about.jpeg";

import { Header } from "@/components/Header";
import { i18n } from "../i18n";
import { Disclosure } from "@headlessui/react";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/outline";
import { Footer } from "@/components/Footer";

const recordings = [
  {
    id: 1,
    name: "Wolfson M2 Summer 8s 2018: Day 1",
    year: "2018",
    description:
      "Wolfson M2 bumps Magdalen M2 and Merton M2 continues racing into Wolfson.",
    cox: "Summer Eights",
    imageSrc: "https://www.youtube.com/embed/LhP1GvJNcWs",
  },
  {
    id: 2,
    name: "Lent Bumps 2012 Thursday M3 carnage - courtesy of LMBC supporter",
    year: "2012",
    cox: "Lents",
    imageSrc: "https://www.youtube.com/embed/E3Yr6liLrgs",
  },
  {
    id: 3,
    name: "Rowing Bumps crash in Cambridge",
    year: "2018",
    description: "The following Champs boat got a bit close for comfort.",
    cox: "Town Bumps",
    imageSrc: "https://www.youtube.com/embed/FkophFUECaM",
  },
  {
    id: 4,
    name: "Summer Eights 2009 Carnage",
    year: "2009",
    description: "Massive pile up in Mens 1st division on Thursday of Summer Eights.",
    cox: "Summer Eights",
    imageSrc: "https://www.youtube.com/embed/VBQeD4OIQQM",
  },
];

export default function Videos() {
  return (
    <>
      <Head>
        <title>{`Rowing Mayhem: Crashes and Bumps Caught on Camera! - ${i18n.name} Bumps`}</title>
      </Head>
      <Header />
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-2 sm:py-2 lg:px-8 lg:py-4">
            <div className="mx-auto">
              <h2 className="pb-4 text-2xl font-bold leading-10 tracking-tight text-gray-900">
                Rowing Mayhem: Crashes and bumps caught on camera!
              </h2>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {recordings.map((recording) => (
                  <div
                    key={recording.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <div className="aspect-video bg-gray-200 group-hover:opacity-75">
                      <iframe
                        width="100%"
                        height="100%"
                        src={recording.imageSrc}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 p-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {recording.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {recording.description}
                      </p>
                      <div className="flex flex-1 flex-col justify-end">
                        <p className="text-sm italic text-gray-500">
                          {recording.cox}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {recording.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
