import { Icons } from "@/components/icons";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Fragment } from "react";

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

export const metadata: Metadata = {
  title: `Vocabulary`,
};

export default function About() {
  return (
    <div className="container relative">
      <section>
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12 text-lg tracking-tight">
          <div className="pt-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              Vocabulary
            </h1>
          </div>
          <div className="pb-12 pt-8">
            <dl className="mt-2 space-y-2">
              {faqs.map((faq) => (
                <Fragment key={faq.question}>
                  <dt>
                    <h3 className="font-semibold">{faq.question}</h3>
                  </dt>
                  <dd>
                    <p className="text-sm">{faq.answer}</p>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
