import { events, genderMap, genders, set } from "@/lib/utils";

import BumpsChart from "@/components/bumps-chart";
import { Metadata } from "next";
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
    description: `Bumps chart for ${eventName} ${year} (${genderName}). View race results, positions, and bumps for all crews.`,
    alternates: {
      canonical: `/charts/${event}/${gender}/${year}`,
    },
  };
}

export default async function Home({ params }: Props) {
  const { event, gender, year } = await params;

  const data = results[event][gender]
    .filter((result) => +result.year >= +year)
    .filter((result) => +result.year <= +year)[0];

  if (!data || data.crews.length === 0) {
    return (
      <div className="text-center mb-4">
        We have no results to show for this year
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <div className="w-full max-w-[520px]">
        <BumpsChart data={data} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
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
