import Link from "next/link";
import { Metadata } from "next";
// @ts-ignore no types
import { Blade, shortShortNames, abbreviations } from "react-rowing-blades";

import { statisticMapping, stats } from "../../stats";

import summary from "../../../charts/data/results.json";

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

function getColor(club: string, event: string) {
  switch (club) {
    case "Oriel":
      return { h: 220, s: 100, l: 19 };
    case "Emmanuel":
      return { h: 0, s: 100, l: 73 };
    case "Jesus":
      if (event === "eights" || event === "torpids") {
        return { h: 142, s: 100, l: 30.6 };
      } else {
        return { h: 0, s: 100, l: 27 };
      }
    case "Rob Roy":
      return { h: 350, s: 95, l: 25 };
    case "City":
      return { h: 216, s: 60, l: 18 };
    case "Osler House":
      return { h: 0, s: 100, l: 41 };
    case "Churchill":
      return { h: 340, s: 100, l: 72 };
    case "LMBC":
      return { h: 0, s: 100, l: 43.1 };
    case "Brasenose":
      return { h: 0, s: 0, l: 12.5 };
    case "Magdalen":
      return { h: 0, s: 0, l: 8.2 };
    case "Pembroke":
      return { h: 0, s: 100, l: 73.3 };
    case "Somerville":
      return { h: 0, s: 100, l: 46.7 };
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
  params: Promise<{ event: string; gender: string }>;
};

const CLUB_STATISTICS = Object.keys(statisticMapping);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender } = await params;

  return {
    title: `Statistics - ${set[event as keyof typeof set]} - ${
      genderMap[gender as keyof typeof genderMap]
    } `,
  };
}

export default async function Statistics({ params }: Props) {
  const { event, gender } = await params;

  const years = (summary as any)[event][gender];

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {CLUB_STATISTICS.map((statistic) => {
          const data = stats[event][gender][statistic];
          const heroColor = getColor(data[0].club, event);

          return (
            <div key={statistic} className="mb-4">
              <h2 className="font-bold text-2xl mb-2">
                {statisticMapping[statistic].label}
              </h2>
              <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <li
                    className="h-40"
                    style={{
                      backgroundImage: `linear-gradient(to right, hsl(${
                        heroColor.h
                      } ${heroColor.s}% ${heroColor.l}%), hsl(${heroColor.h} ${
                        heroColor.s
                      }% ${heroColor.l + 20}%))`,
                    }}
                  >
                    <div className="flex justify-between h-full">
                      <div className="flex flex-col justify-between text-white px-4 py-2 h-full">
                        <div>
                          <div className="text-sm font-bold">1</div>
                          <div className="font-bold">
                            {data[0][statisticMapping[statistic].key]}
                          </div>
                          {statisticMapping[statistic].additional && (
                            <div className="text-sm">
                              {data[0][statisticMapping[statistic].additional]}
                            </div>
                          )}
                        </div>
                        <div className="text-4xl font-extrabold">
                          {data[0][statisticMapping[statistic].value]}
                        </div>
                      </div>
                      <div className="pt-2 pr-2 pb-2 flex flex-col justify-center">
                        <Blade club={getCode(data[0].club, event)} size={140} />
                      </div>
                    </div>
                  </li>
                  {data.slice(1, 10).map((d: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center relative justify-between pl-3 pr-2 py-2"
                    >
                      <div className="flex items-center">
                        <div className="mr-2 font-bold text-sm min-w-4">
                          {i + 2}
                        </div>
                        <div className="mr-4">
                          <Blade club={getCode(d.club, event)} size={48} />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-base">
                            {d[statisticMapping[statistic].key]}
                          </div>
                          <div className="text-sm">
                            {statisticMapping[statistic].additional
                              ? d[statisticMapping[statistic].additional]
                              : "\u00A0"}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        {d[statisticMapping[statistic].value]}
                      </div>
                    </li>
                  ))}
                  <div className="flex items-center justify-center py-2 px-2">
                    <Link href={`/statistics/${event}/${gender}/${statistic}`}>
                      View full list
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const events = ["eights", "lents", "mays", "torpids", "town"];
  const genders = ["men", "women"];

  const paths = events.flatMap((event) =>
    genders.flatMap((gender) => ({
      event,
      gender,
    }))
  );

  return paths;
}
