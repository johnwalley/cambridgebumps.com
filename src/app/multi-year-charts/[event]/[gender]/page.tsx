import {
  events,
  genderMap,
  genders,
  getEventContext,
  isEvent,
  isGender,
  set,
} from "@/lib/utils";

import BumpsChart from "@/components/multi-year-bumps-chart";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { results } from "../../data/results";

type Props = {
  params: Promise<{ event: string; gender: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender } = await params;

  if (!isEvent(event) || !isGender(gender)) {
    return {};
  }

  const data = [...results[event][gender]].sort((a, b) => +a.year - +b.year);

  if (data.length === 0) {
    return {};
  }

  const eventName = set[event];
  const genderName = genderMap[gender];
  const yearRange = `${data[0].year}-${data[data.length - 1].year}`;

  return {
    title: `${eventName} ${yearRange} - ${genderName} - Multi-year Chart`,
    description: `Historical bumps chart for ${eventName} (${genderName}) from ${data[0].year} to ${data[data.length - 1].year}. Track ${getEventContext(event)} positions across ${data.length} years of racing.`,
    alternates: {
      canonical: `/multi-year-charts/${event}/${gender}`,
    },
  };
}

export default async function MultiYearChartPage({ params }: Props) {
  const { event, gender } = await params;

  if (!isEvent(event) || !isGender(gender)) {
    notFound();
  }

  const data = [...results[event][gender]].sort((a, b) => +a.year - +b.year);

  if (data.length === 0) {
    return <div className="mb-4 text-center">We have no results to show</div>;
  }

  return (
    <div className="mb-4 w-full">
      <div className="px-10" style={{ width: `${data.length * 96}px` }}>
        <BumpsChart data={data} />
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
