import Head from "next/head";
import Image from "next/image";
import image from "@/images/about.jpeg";
import { Footer } from "@/components/Footer";

import { Header } from "@/components/Header";
import { i18n } from "../i18n";

export default function About() {
  return (
    <>
      <Head>
        <title>{`How do bumps work? - ${i18n.name} Bumps`}</title>
      </Head>
      <Header />
      <main>
        <div className="relative bg-white">
          <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
              <Image
                className="h-56 w-full object-cover lg:absolute lg:h-full"
                src={image}
                alt=""
              />
            </div>
          </div>
          <div className="relative px-4 pt-4 pb-16 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:pt-0">
            <div className="lg:col-start-2 lg:pl-8">
              <div className="mx-auto max-w-prose text-base lg:ml-auto lg:mr-0 lg:max-w-lg">
                <h2 className="text-cambridge font-semibold uppercase leading-6 tracking-wide">
                  Information
                </h2>
                <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  How do Bumps work?
                </h3>
                <p className="mt-8 text-lg text-gray-800">
                  The River Cam is an awful place to hold a rowing event. Narrow
                  and winding, it&apos;s simply not possible to stage a
                  conventional side-by-side regatta; so Bumps racing evolved in
                  the 1820s to let large numbers of boats to compete against one
                  another.
                </p>
                <p className="mt-8 text-lg text-gray-800">
                  Men and women race separately. Boats are split into multiple
                  divisions. Each division has 17-18 boats and crews start 90
                  feet apart.
                </p>
                <p className="mt-8 text-lg text-gray-800">
                  The aim of the race is to catch and &lsquo;bump&rsquo; the
                  crew in front of you. A bump is awarded if the crew in front
                  concedes. And yes, this can require you to actually hit the
                  boat in front! Crews that bump one another must pull over to
                  the side to allow the crews behind to continue.
                </p>
                <p className="mt-8 text-lg text-gray-800">
                  Racing takes place over four days with the finishing order at
                  the end of a day determining the starting order for the
                  following day. This means that a crew which bumps the crew in
                  front will gain their starting position for the next day.
                </p>
                <p className="mt-8 text-lg text-gray-800">
                  A crew which ends up at the top of their division gets to race
                  again at the bottom of the next division on the same day. This
                  crew is known as the sandwich boat due to the fact that they
                  are sandwiched between two divisions. The honour is
                  double-edged because while you get the opportunity to go up a
                  division you also must race twice in one day!
                </p>
                <p className="mt-8 text-lg text-gray-800">
                  The crew which ends the week at the top of the first division
                  is awarded the headship, or head of the river. Due to the
                  nature of Bumps this might not necessarily be the fastest
                  crew, but it is always a mighty achievement and well deserved.
                </p>
                <p className="mt-8 text-lg text-gray-800">
                  Crews which achieve a bump are given willow branches to
                  &lsquo;wear&rsquo; as they row back to their boathouses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
