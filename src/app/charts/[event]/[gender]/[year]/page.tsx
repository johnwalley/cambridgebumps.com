import { joinEvents, transformData } from "bumps-results-tools";

import { Metadata } from "next";
import dynamic from "next/dynamic";
import summary from "../../../data/results.json";
import { Event } from "react-bumps-chart/dist/types";

import results_eights_men from "../../../../../data/results/eights/men/results.json";
import results_eights_women from "../../../../../data/results/eights/women/results.json";
import results_lents_men from "../../../../../data/results/lents/men/results.json";
import results_lents_women from "../../../../../data/results/lents/women/results.json";
import results_mays_men from "../../../../../data/results/mays/men/results.json";
import results_mays_women from "../../../../../data/results/mays/women/results.json";
import results_torpids_men from "../../../../../data/results/torpids/men/results.json";
import results_torpids_women from "../../../../../data/results/torpids/women/results.json";
import results_town_men from "../../../../../data/results/town/men/results.json";
import results_town_women from "../../../../../data/results/town/women/results.json";

const results = {
  eights: {
    men: results_eights_men,
    women: results_eights_women,
  },
  lents: {
    men: results_lents_men,
    women: results_lents_women,
  },
  mays: {
    men: results_mays_men,
    women: results_mays_women,
  },
  torpids: {
    men: results_torpids_men,
    women: results_torpids_women,
  },
  town: {
    men: results_town_men,
    women: results_town_women,
  },
} as Record<string, Record<string, Event[]>>;

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

type Props = {
  params: { event: string; gender: string; year: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = params.event;
  const gender = params.gender;
  const year = params.year;

  return {
    title: `${set[event as keyof typeof set]} - ${
      genderMap[gender as keyof typeof genderMap]
    } - ${year}`,
  };
}

const BumpsChart = dynamic(() => import("@/components/bumps-chart"), {
  ssr: false,
});

export default async function Home({ params }: Props) {
  console.log(results.town.men);
  const data = results[params.event as any][params.gender as any]
    .filter((result) => result.year >= +params.year)
    .filter((result) => result.year <= +params.year)
    .map(transformData);

  const joinedEvents = joinEvents(data, params.event, params.gender);

  joinedEvents.small = params.event;
  joinedEvents.gender = params.gender;
  joinedEvents.set = set[params.event as keyof typeof set];

  if (!joinedEvents || joinedEvents.crews.length === 0) {
    return (
      <div className="text-center mb-4">
        We have no results to show for this year
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <div className="w-full min-w-[320px] max-w-[520px]">
        <BumpsChart data={joinedEvents} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const events = ["eights", "lents", "mays", "torpids", "town"];
  const genders = ["men", "women"];

  const paths = events.flatMap((event) =>
    genders.flatMap((gender) =>
      (summary as any)[event][gender].map((year: string) => ({
        event,
        gender,
        year,
      }))
    )
  );

  return paths;
}
