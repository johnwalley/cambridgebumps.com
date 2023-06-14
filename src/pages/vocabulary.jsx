import Head from "next/head";
import Image from "next/image";
import image from "@/images/about.jpeg";

import { Header } from "@/components/Header";
import { i18n } from "../i18n";
import { Disclosure } from "@headlessui/react";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/outline";
import { Footer } from "@/components/Footer";

const faqs = [
  {
    question: "Blades",
    answer: `If a crew bumps every day then they are awarded blades.`,
  },
  {
    question: "Bump",
    answer: `A bump is awarded when a chasing boat either overtakes or makes contact with the boat in front.

On the next day, the two will switch places in the starting order.`,
  },
  {
    question: "Sandwich boat",
    answer: `The sandwich boat is the name given to the crew at top of a division (except the first division). They then race at the bottom of the division above. If they bump the crew moves up a division.`,
  },
  {
    question: "Spoons",
    answer: `If a crew is bumped every day then they are awarded spoons.`,
  },
];

export default function Vocabulary() {
  return (
    <>
      <Head>
        <title>{`Vocabulary - ${i18n.name} Bumps`}</title>
      </Head>
      <Header />
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-2 sm:py-2 lg:px-8 lg:py-4">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                Vocabulary
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                {faqs.map((faq) => (
                  <Disclosure
                    as="div"
                    key={faq.question}
                    defaultOpen
                    className="pt-6"
                  >
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              {faq.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600">
                            {faq.answer}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
