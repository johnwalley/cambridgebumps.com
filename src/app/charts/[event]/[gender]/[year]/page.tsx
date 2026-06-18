import {
  events,
  findResultByYear,
  genderMap,
  genders,
  getEventContext,
  isEvent,
  isGender,
  set,
} from "@/lib/utils";

import BumpsChart from "@/components/bumps-chart";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { results, summary } from "@/data/results";

type Props = {
  params: Promise<{ event: string; gender: string; year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender, year } = await params;

  const eventName = set[event as keyof typeof set];
  const genderName = genderMap[gender as keyof typeof genderMap];

  // Pages pre-generated for a year with no results yet (see
  // generateStaticParams) shouldn't be indexed as thin content.
  const hasData =
    isEvent(event) &&
    isGender(gender) &&
    (findResultByYear(results[event][gender], year)?.crews.length ?? 0) > 0;

  return {
    title: `${eventName} ${year} - ${genderName}`,
    description: `${eventName} ${year} bumps chart (${genderName}). View race results, daily positions, and bumps for all ${getEventContext(event)} crews.`,
    alternates: {
      canonical: `/charts/${event}/${gender}/${year}`,
    },
    ...(hasData ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function ChartPage({ params }: Props) {
  const { event, gender, year } = await params;

  if (!isEvent(event) || !isGender(gender)) {
    notFound();
  }

  const data = findResultByYear(results[event][gender], year);

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
  // Also pre-generate the current year for every event/gender so that
  // upcoming events whose results aren't posted yet render the friendly
  // "We have no results to show for this year" message rather than a 404.
  // (Static export only serves paths returned here.)
  const currentYear = String(new Date().getFullYear());

  const paths = events.flatMap((event) =>
    genders.flatMap((gender) => {
      const years = summary[event][gender];
      const allYears = years.includes(currentYear)
        ? years
        : [...years, currentYear];

      return allYears.map((year) => ({ event, gender, year }));
    }),
  );

  return paths;
}
