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

  return {
    title: `Chart - ${set[event as keyof typeof set]} - ${
      genderMap[gender as keyof typeof genderMap]
    } - ${year}`,
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
