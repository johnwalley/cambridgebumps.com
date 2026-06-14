import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { abbreviations, clubs, shortShortNames } from "react-rowing-blades";

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

export const isEvent = (x: string): x is Set =>
  (events as readonly string[]).includes(x);

export const isGender = (x: string): x is Gender =>
  (genders as readonly string[]).includes(x);

// Shape of the per-event results summary JSON (lists of years by category).
// Each event has `all`, `split`, `men` and `women` keys, all arrays of year strings.
export type ResultsSummary = Record<
  Set,
  Record<Gender | "all" | "split", string[]>
>;

// Some historical mays/men entries store compound year strings such as
// "1827 February March" (two distinct races held in the same year). The leading
// 4-digit year is the canonical key used by URLs and the year summary, so match
// on that: `+"1827 February March"` is NaN, whereas parseInt yields 1827.
export function yearOf(year: string | number): number {
  return parseInt(String(year), 10);
}

// Find the result for a given year, tolerating compound year strings. When a
// year holds more than one race (the early mays/men years), the first is used.
export function findResultByYear<T extends { year: string | number }>(
  results: T[],
  year: string | number,
): T | undefined {
  return results.find((result) => yearOf(result.year) === yearOf(year));
}

export function getEventContext(event: Set | string): string {
  switch (event) {
    case "lents":
    case "mays":
      return "Cambridge college";
    case "eights":
    case "torpids":
      return "Oxford college";
    case "town":
      return "town rowing club";
    default:
      return "college";
  }
}

// Union of all valid club codes accepted by react-rowing-blades' <Blade>.
export type ClubCode = (typeof clubs)[keyof typeof clubs][number];

export function getCode(club: string, set: Set): ClubCode | undefined {
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
        ...Object.values(abbreviations.uk).map((x) => ({ [x]: x })),
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

  return code as ClubCode | undefined;
}
