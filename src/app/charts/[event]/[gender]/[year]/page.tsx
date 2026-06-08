import {
  events,
  genderMap,
  genders,
  getEventContext,
  isEvent,
  isGender,
  type ResultsSummary,
  set,
} from "@/lib/utils";

import BumpsChart from "@/components/bumps-chart";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { results } from "../../../data/results";
import summary from "../../../data/results.json";

type Props = {
  params: Promise<{ event: string; gender: string; year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender, year } = await params;

  const eventName = set[event as keyof typeof set];
  const genderName = genderMap[gender as keyof typeof genderMap];

  return {
    title: `${eventName} ${year} - ${genderName}`,
    description: `${eventName} ${year} bumps chart (${genderName}). View race results, daily positions, and bumps for all ${getEventContext(event)} crews.`,
    alternates: {
      canonical: `/charts/${event}/${gender}/${year}`,
    },
  };
}

export default async function ChartPage({ params }: Props) {
  const { event, gender, year } = await params;

  if (!isEvent(event) || !isGender(gender)) {
    notFound();
  }

  const data = results[event][gender].find((result) => +result.year === +year);

  if (!data || data.crews.length === 0) {
    return (
      <div className="mb-4 text-center">
        We have no results to show for this year
      </div>
    );
  }

  return (
    <div className="mb-4 flex w-full flex-col items-center">
      <div className="w-full max-w-[520px]">
        <BumpsChart data={data} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const paths = events.flatMap((event) =>
    genders.flatMap((gender) =>
      (summary as ResultsSummary)[event][gender].map((year) => ({
        event,
        gender,
        year,
      })),
    ),
  );

  return paths;
}
