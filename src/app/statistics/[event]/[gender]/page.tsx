import {
  events,
  type Gender,
  genders,
  getCode,
  getEventContext,
  getGenderLabel,
  isEvent,
  isGender,
  Set,
  set,
} from "@/lib/utils";
import { statisticMapping, stats } from "../../stats";

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blade } from "react-rowing-blades";

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

type Props = {
  params: Promise<{ event: Set; gender: Gender }>;
};

const CLUB_STATISTICS = Object.keys(statisticMapping);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender } = await params;

  if (!isEvent(event) || !isGender(gender)) {
    return {};
  }

  const eventName = set[event];
  const genderName = getGenderLabel(event, gender);

  return {
    title: `${eventName} Statistics - ${genderName}`,
    description: `${eventName} statistics (${genderName}): headships, total days at head, blades awarded, and crews entered. Historical ${getEventContext(event)} rowing records.`,
    alternates: {
      canonical: `/statistics/${event}/${gender}`,
    },
  };
}

export default async function Statistics({ params }: Props) {
  const { event, gender } = await params;

  if (!isEvent(event) || !isGender(gender)) {
    notFound();
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CLUB_STATISTICS.map((statistic) => {
          const data = stats[event][gender][statistic];
          const heroColor = getColor(data[0].club, event);
          const heroClub = getCode(data[0].club, event);

          return (
            <div key={statistic} className="mb-4">
              <h2 className="mb-2 text-2xl font-bold">
                {statisticMapping[statistic].label}
              </h2>
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
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
                    <div className="flex h-full justify-between">
                      <div className="flex h-full flex-col justify-between px-4 py-2 text-white">
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
                      <div className="flex flex-col justify-center pt-2 pr-2 pb-2">
                        {heroClub && <Blade club={heroClub} size={140} />}
                      </div>
                    </div>
                  </li>
                  {data.slice(1, 10).map((d: any, i: number) => {
                    const dClub = getCode(d.club, event);
                    return (
                      <li
                        key={i}
                        className="relative flex items-center justify-between py-2 pr-2 pl-3"
                      >
                        <div className="flex items-center">
                          <div className="mr-2 min-w-4 text-sm font-bold">
                            {i + 2}
                          </div>
                          <div className="mr-4">
                            {dClub && <Blade club={dClub} size={48} />}
                          </div>
                          <div className="flex flex-col">
                            <div className="text-base font-bold">
                              {d[statisticMapping[statistic].key]}
                            </div>
                            <div className="text-sm">
                              {statisticMapping[statistic].additional
                                ? d[statisticMapping[statistic].additional]
                                : "\u00A0"}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold">
                          {d[statisticMapping[statistic].value]}
                        </div>
                      </li>
                    );
                  })}
                  <div className="flex items-center justify-center px-2 py-2">
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
  const paths = events.flatMap((event) =>
    genders.flatMap((gender) => ({
      event,
      gender,
    })),
  );

  return paths;
}
