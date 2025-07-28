import { events, genderMap, genders, set } from "@/lib/utils";

import BumpsChart from "@/components/multi-year-bumps-chart";
import { Metadata } from "next";
import { results } from "../../data/results";

type Props = {
  params: Promise<{ event: string; gender: string; year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender } = await params;

  const data = results[event as any][gender as any].sort(
    (a, b) => +a.year - +b.year
  );

  return {
    title: `Multi-year chart - ${set[event as keyof typeof set]} - ${
      genderMap[gender as keyof typeof genderMap]
    } - ${data[0].year}-${data[data.length - 1].year}`,
  };
}

/* const BumpsChart = dynamic(() => import("@/components/bumps-chart"), {
  ssr: true,
}); */

export default async function Home({ params }: Props) {
  const { event, gender } = await params;

  const data = results[event as any][gender as any].sort(
    (a, b) => +a.year - +b.year
  );

  if (!data) {
    return <div className="text-center mb-4">We have no results to show</div>;
  }

  return (
    <div className="w-full mb-4">
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
    }))
  );

  return paths;
}
