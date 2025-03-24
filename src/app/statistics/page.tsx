// @ts-ignore no types
import { Blade, abbreviations, shortShortNames } from "react-rowing-blades";

import { Chart } from "./chart";
import { Metadata } from "next";
import { PlacesGainedChart } from "./placesGainedChart";
import { stats } from "./stats";
import summary from "../charts/data/results.json";

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

const events =
  process.env.NEXT_PUBLIC_TITLE === "Oxford"
    ? (["eights", "torpids", "mays", "lents", "town"] as const)
    : (["mays", "lents", "eights", "torpids", "town"] as const);

const genders = ["men", "women"] as const;

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
  description: "Headship statistics.",
};

export default function Statistics() {
  return (
    <div className="container relative">
      <section>
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-lg tracking-tight">
          <div className="pt-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
              Statistics
            </h1>
          </div>
          <h2 className="font-bold text-2xl mb-2">Headships</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {events.map((event) =>
              genders.map((gender) => {
                const data = stats[event][gender]["headships"];

                const years = summary[event][gender];

                const heroColor = getColor(data[0].club);

                return (
                  <div key={`${event}.${gender}`} className="mb-4">
                    <h3 className="font-bold mb-0">{`${set[event]} - ${genderMap[gender]}`}</h3>
                    <h4 className="mb-4">{`(${years[0]} - ${
                      years[years.length - 1]
                    })`}</h4>
                    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                      <ul>
                        <li
                          className="h-40"
                          style={{
                            backgroundImage: `linear-gradient(to right, hsl(${
                              heroColor.h
                            } ${heroColor.s}% ${heroColor.l}%), hsl(${
                              heroColor.h
                            } ${heroColor.s}% ${heroColor.l + 20}%))`,
                          }}
                        >
                          <div className="flex justify-between h-full">
                            <div className="flex flex-col justify-between text-white px-4 py-2 h-full">
                              <div>
                                <div className="text-sm font-bold">1</div>
                                <div className="font-bold">{data[0].club}</div>
                                <div className="text-sm">
                                  {data[0].lastYear}
                                </div>
                              </div>
                              <div className="text-5xl font-extrabold">
                                {data[0].headships}
                              </div>
                            </div>
                            <div className="pt-2 pr-2 pb-2 flex flex-col justify-center">
                              <Blade
                                club={getCode(data[0].club, event)}
                                size={140}
                              />
                            </div>
                          </div>
                        </li>
                        {data.slice(1, 10).map((d: any, i: number) => (
                          <li
                            key={i}
                            className="flex items-center justify-between pl-3 pr-2 py-2"
                          >
                            <div className="flex items-center">
                              <div className="mr-2 font-bold text-sm min-w-4">
                                {i + 2}
                              </div>
                              <div className="mr-4">
                                <Blade
                                  club={getCode(d.club, event)}
                                  size={48}
                                />
                              </div>
                              <div className="flex flex-col">
                                <div className="font-bold text-base">
                                  {d.club}
                                </div>
                                <div className="text-sm">{d.lastYear}</div>
                              </div>
                            </div>
                            <div className="font-bold text-lg">
                              {d.headships}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <h2 className="font-bold text-2xl mb-2">Number of crews</h2>
          {events.map((event) =>
            genders.map((gender) => {
              const data = stats[event][gender]["crewsEntered"];

              const chartData = data.map((entry) => ({
                year: entry.year,
                crews: entry.total,
              }));

              const filledChartData = [];
              const minYear = Math.min(...chartData.map((d) => d.year));
              const maxYear = Math.max(...chartData.map((d) => d.year));

              for (let year = minYear; year <= maxYear; year++) {
                const existingData = chartData.find((d) => d.year == year);
                filledChartData.push(
                  existingData
                    ? {
                        year: String(existingData.year),
                        crews: existingData.crews,
                      }
                    : { year: String(year), crews: 0 }
                );
              }

              return (
                <div key={`${event}.${gender}`}>
                  <h3 className="font-bold mb-0">{`${set[event]} - ${genderMap[gender]}`}</h3>
                  <Chart data={filledChartData} />
                </div>
              );
            })
          )}
          <h2 className="font-bold text-2xl mb-2">Change in position</h2>
          {events.map((event) =>
            genders.map((gender) => {
              const data = stats[event][gender]["placesGained"];

              const chartData = data;

              const filledChartData = [];
              const minChange = Math.min(...chartData.map((d) => d.gained));
              const maxChange = Math.max(...chartData.map((d) => d.gained));

              for (let change = minChange; change <= maxChange; change++) {
                const existingData = chartData.find((d) => d.gained == change);
                filledChartData.push(
                  existingData
                    ? {
                        gained: String(existingData.gained),
                        total: existingData.total,
                      }
                    : { gained: String(change), total: 0 }
                );
              }

              // Sort by year to ensure proper ordering
              filledChartData.sort((a, b) => +a.gained - +b.gained);

              console.log(filledChartData);

              return (
                <div key={`${event}.${gender}`}>
                  <h3 className="font-bold mb-0">{`${set[event]} - ${genderMap[gender]}`}</h3>
                  <PlacesGainedChart data={filledChartData} />
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
