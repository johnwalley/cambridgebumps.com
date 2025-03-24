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
// @ts-ignore no types
import { Blade, shortShortNames, abbreviations } from "react-rowing-blades";

import { stats } from "./stats";

import summary from "../charts/data/results.json";
import { PropsWithChildren } from "react";

/**
 * Ideas for the statistics page:
 *
 * All-time(club):
 * - headships
 *
 * All-time(crew):
 * - blades
 *
 * Per year(club):
 * - number of crews
 * - places gained/lost
 *
 * Per year(crew):
 * - places gained/lost
 */

const SET = {
  EIGHTS: "Summer Eights",
  TORPIDS: "Torpids",
  LENTS: "Lent Bumps",
  MAYS: "May Bumps",
  TOWN: "Town Bumps",
};

const set = {
  eights: SET.EIGHTS,
  torpids: SET.TORPIDS,
  lents: SET.LENTS,
  mays: SET.MAYS,
  town: SET.TOWN,
};

const genderMap = {
  men: "Men",
  women: "Women",
};

const events = ["eights", "lents", "mays", "torpids", "town"];
const genders = ["men", "women"];

function getColor(club: string) {
  switch (club) {
    case "Oriel":
      return { h: 220, s: 100, l: 19 };
    case "Emmanuel":
      return { h: 0, s: 100, l: 73 };
    case "Jesus":
      return { h: 0, s: 100, l: 27 };
    case "Rob Roy":
      return { h: 350, s: 95, l: 25 };
    case "City":
      return { h: 216, s: 60, l: 18 };
    case "Osler House":
      return { h: 0, s: 100, l: 41 };
    default:
      return { h: 220, s: 100, l: 19 };
  }
}

function getCode(club: string, set: string) {
  let names;
  let abbr;

  switch (set) {
    case "mays":
    case "lents":
      names = shortShortNames.cambridge;
      abbr = abbreviations.cambridge;
      break;
    case "eights":
    case "torpids":
      names = shortShortNames.oxford;
      abbr = abbreviations.oxford;
      break;
    case "town":
      names = shortShortNames.uk;
      abbr = Object.assign(
        {},
        ...Object.values(abbreviations.uk).map((x: any) => ({ [x]: x }))
      );
      break;
    default:
      throw new Error(`${set} not recognised as a set`);
  }

  const name = club;

  let code = Object.keys(names).find((key) => names[key] === abbr[name]);

  // Couldn't find club code based on abbreviation
  // Search using full name instead
  if (!code) {
    code = Object.keys(names).find((key) => names[key] === name);
  }

  if (!code) {
    if (name === "LMBC") {
      code = "lmb";
    } else if (name === "1st and 3rd") {
      code = "ftt";
    } else if (name === "St Catharine's") {
      code = "scc";
    } else if (name === "St Edmund's") {
      code = "sec";
    } else if (name === "Town") {
      code = "cam";
    } else if (name === "Old Cantabs") {
      code = "cab";
    } else if (name === "Free Press") {
      code = "xpr";
    }
  }

  return code;
}



export const metadata: Metadata = {
  title: `Statistics`,
  description: "Headship statistics."
};

export default function Statistics({ children }: PropsWithChildren) {

  return (
    <div className="container relative">
      <section>
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-lg tracking-tight">
          <div className="pt-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
              Statistics
            </h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </div>
  );
}
