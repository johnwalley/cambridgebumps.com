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
import image_1 from "./images/motorway-bridge.jpg";
import bump from "./images/bump.jpg";
import willow from "./images/willow.jpg";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `What's it all about?`,
};

export default function About() {
  return (
    <div className="container relative">
      <section>
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12 text-lg tracking-tight">
          <div className="pt-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              What&rsquo;s it all about?
            </h1>
          </div>
          <div className="pb-12 pt-8">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The river in {`${process.env.NEXT_PUBLIC_TITLE}`} presents a unique challenge for hosting
              traditional rowing competitions. Its meandering course and limited
              width render standard side-by-side racing impractical. To
              accommodate the constraints of the river and to enable numerous
              crews to participate, the Bumps races emerged. This format,
              different from conventional regattas, was developed to allow a
              large number of boats to compete in a dynamic and exciting manner,
              turning the river&rsquo;s limitations into a unique aspect of the
              race.
            </p>
            <Image
              className="mt-4"
              src={image_1}
              alt="Multiple boats chasing each other"
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Men and women race separately. Boats are split into multiple
              divisions. Each division has 17-18 boats and crews start 90 feet
              apart.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The aim of the race is to catch and ‘bump’ the crew in front of
              you. A bump is awarded if the crew in front concedes. And yes,
              this can require you to actually hit the boat in front! Crews that
              bump one another must pull over to the side to allow the crews
              behind to continue.
            </p>
            <Image
              className="mt-4"
              src={bump}
              alt="Crew about to bump another crew"
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Racing takes place over four days with the finishing order at the
              end of a day determining the starting order for the following day.
              This means that a crew which bumps the crew in front will gain
              their starting position for the next day.
            </p>

            <p className="leading-7 [&:not(:first-child)]:mt-6">
              A crew which ends up at the top of their division gets to race
              again at the bottom of the next division on the same day. This
              crew is known as the sandwich boat due to the fact that they are
              sandwiched between two divisions. The honour is double-edged
              because while you get the opportunity to go up a division you also
              must race twice in one day!
            </p>

            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The crew which ends the week at the top of the first division is
              awarded the headship, or head of the river. Due to the nature of
              Bumps this might not necessarily be the fastest crew, but it is
              always a mighty achievement and well deserved.
            </p>

            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Crews which achieve a bump are given willow branches to ‘wear’ as
              they row back to their boathouses.
            </p>

            <Image className="mt-4" src={willow} alt="Crew who have bumped" />

            <h2
              className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
              id="faq"
            >
              <a
                className="font-medium underline underline-offset-4 subheading-anchor"
                aria-label="Link to section"
                href="#faq"
              >
                <span className="icon icon-link"></span>
              </a>
              FAQ
            </h2>

            <Accordion type="multiple">
              <AccordionItem value="faq-1">
                <AccordionTrigger>
                  Why can&apos;t I see the latest results for an event in
                  progress?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    I rely on official and unofficial sources to update first.
                    It is then up to me to update this website. I&apos;m not
                    always within reach of a computer so sometimes it can take
                    up to a day to update.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  This looks fun. Where can I go to watch?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    In Cambridge, if you&apos;re new to Bumps, I would recommend{" "}
                    <a href="https://www.theploughfenditton.co.uk/">The Plough</a> in Fen Ditton.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>
                  Any other bumps websites you would recommend?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Plenty! For historical results, particularly multi-year, you
                    should check out Tim Granger&apos;s{" "}
                    <a href="http://www.mcshane.org/bumps/">Bumps charts</a>.
                  </p>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    For the authoritative place to go for Oxford bumps, check
                    out Anu Dudhia&apos;s{" "}
                    <a href="http://eodg.atm.ox.ac.uk/user/dudhia/rowing/bumps/">
                      Oxford Bumps Charts
                    </a>
                    .
                  </p>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    For live results as they happen, check out{" "}
                    <a href="https://bumps.camfm.co.uk/">Cam FM</a> and{" "}
                    <a href="https://bumps.live/">Oxford Bumps</a>.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
