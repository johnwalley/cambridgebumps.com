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
    answer: `If a crew bumps, or are head of the river every day then they are awarded blades.`,
  },
  {
    question: "Bank party",
    answer: `People who cycle alongside a crew during the race. They offer encouragement and advice during the race, and usually help with getting the crew ready for the start.`,
  },
  {
    question: "Bump",
    answer: `A bump is awarded when a chasing boat either overtakes or makes contact with the boat in front.

On the next day, the two will switch places in the starting order.`,
  },
  {
    question: "Division",
    answer: `Racing is split into divisions. For example, in May Bumps there are 17 crews per division.
    
This is done for most large rowing events to accomodate a larger number of crews than would otherwise be possible to have on the river at once.`,
  },
  {
    question: "Head of the River",
    answer: `The crew who finishes top of the first division after the last day of racing is complete.`,
  },
  {
    question: "Over-bump",
    answer: `The two crews in front bump out and you chase down, and bump, the crew that started three places ahead of you.`,
  },
  {
    question: "Rowing over",
    answer: `When you neither bump or get bumped you must complete the course and are said to have 'rowed over'. You retain the same start position for the next day's racing.`,
  },
  {
    question: "Sandwich boat",
    answer: `The sandwich boat is the name given to the crew at top of a division (except the first division). They then race at the bottom of the division above. If they bump the crew moves up a division.`,
  },
  {
    question: "Spoons",
    answer: `If a crew is bumped every day then they are awarded spoons.`,
  },
  {
    question: "Torpids",
    answer: `Torpids is one of two bumps races held annually by Oxford University around the start of March. 
    
    The rules around bumping are unusual in that once a bump has taken place, the crew whose boat was bumped has to continue racing (and is liable to be bumped again) whilst the bumping crew moves to the side. This can lead to a crew moving down several places during a day's racing`,
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
