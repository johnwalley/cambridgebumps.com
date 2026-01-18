import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//@ts-ignore types
import { abbreviations, shortShortNames } from "react-rowing-blades";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const set: Record<Set, string> = {
  eights: "Summer Eights",
  torpids: "Torpids",
  lents: "Lent Bumps",
  mays: "May Bumps",
  town: "Town Bumps",
};

export const genderMap: Record<Gender, string> = {
  men: "Men",
  women: "Women",
};

export const events = ["eights", "lents", "mays", "torpids", "town"] as const;
export type Set = (typeof events)[number];

export const genders = ["men", "women"] as const;
export type Gender = (typeof genders)[number];

export function getCode(club: string, set: Set) {
  let names: Record<string, string>;
  let abbr: Record<string, string>;

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
