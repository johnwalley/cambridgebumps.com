import { Metadata } from "next";
// @ts-ignore no types
import { Blade, shortShortNames, abbreviations } from "react-rowing-blades";

import { statisticMapping, stats } from "../../../stats";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import summary from "../../../../charts/data/results.json";

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

type Props = {
  params: Promise<{ event: string; gender: string; statistic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender, statistic } = await params;

  return {
    title: `${statistic} - ${set[event as keyof typeof set]} - ${
      genderMap[gender as keyof typeof genderMap]
    }`,
  };
}

export default async function Statistics({ params }: Props) {
  const { event, gender, statistic } = await params;

  const years = (summary as any)[event][gender];

  const data = stats[event][gender][statistic];
  const heroColor = getColor(data[0].club);

  console.log(statisticMapping, statistic);

  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">
        {statisticMapping[statistic].label}
      </h2>
      <h3 className="font-bold mb-0">{`${(set as any)[event]} - ${
        (genderMap as any)[gender]
      }`}</h3>
      <h4 className="mb-4">{`(${years[0]} - ${years[years.length - 1]})`}</h4>
      <div className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">Rank</TableHead>
              <TableHead className="">
                {statisticMapping[statistic].keyLabel}
              </TableHead>
              <TableHead className="text-right">
                {statisticMapping[statistic].valueLabel}
              </TableHead>
              {statisticMapping[statistic].additionalLabel && (
                <TableHead className="text-right">
                  {statisticMapping[statistic].additionalLabel}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow key={row[statisticMapping[statistic].key]}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium flex flex-row gap-2">
                  <Blade
                    club={getCode(row[statisticMapping[statistic].key], event)}
                    size={48}
                  />
                  {row[statisticMapping[statistic].key]}
                </TableCell>
                <TableCell className="text-right">
                  {row[statisticMapping[statistic].value]}
                </TableCell>
                {statisticMapping[statistic].additional && (
                  <TableCell className="text-right">
                    {row[statisticMapping[statistic].additional]}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
