"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// @ts-ignore no types
import { abbreviations, shortShortNames } from "react-rowing-blades";
import { statisticMapping, stats } from "./stats";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

import { Label } from "@/components/ui/label";
import { PropsWithChildren } from "react";

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

export default function Statistics({ children }: PropsWithChildren) {
  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  return (
    <div className="container relative">
      <section>
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-lg tracking-tight">
          <div className="pt-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
              Statistics
            </h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 md:flex-row md:gap-4">
            <div>
              <Label htmlFor="event">Event</Label>
              <Select
                value={segments[0]}
                onValueChange={(value) => {
                  router.push(
                    segments[2]
                      ? `/statistics/${value}/${segments[1]}/${segments[2]}`
                      : `/statistics/${value}/${segments[1]}`
                  );
                }}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cambridge</SelectLabel>
                    <SelectItem value="lents">Lent Bumps</SelectItem>
                    <SelectItem value="mays">May Bumps</SelectItem>
                    <SelectItem value="town">Town Bumps</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Oxford</SelectLabel>
                    <SelectItem value="torpids">Torpids</SelectItem>
                    <SelectItem value="eights">Summer Eights</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="gender">Gender</Label>
              <RadioGroup
                id="gender"
                className="flex flex-row space-x-1 items-center"
                value={segments[1]}
                onValueChange={(value) => {
                  router.push(
                    segments[2]
                      ? `/statistics/${segments[0]}/${value}/${segments[2]}`
                      : `/statistics/${segments[0]}/${value}`
                  );
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="men" id="men" />
                  <Label htmlFor="men">Men</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="women" id="women" />
                  <Label htmlFor="women">Women</Label>
                </div>
              </RadioGroup>
            </div>
            {segments[2] && (
              <div>
                <Label htmlFor="event">Statistic</Label>
                <Select
                  value={segments[2]}
                  onValueChange={(value) => {
                    router.push(
                      `/statistics/${segments[0]}/${segments[1]}/${value}`
                    );
                  }}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a statistic" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statisticMapping).map((statistic) => (
                      <SelectItem key={statistic} value={statistic}>
                        {statisticMapping[statistic].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div>{children}</div>
        </div>
      </section>
    </div>
  );
}
