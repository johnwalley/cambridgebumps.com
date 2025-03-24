import { Metadata } from "next";
import dynamic from "next/dynamic";
import summary from "../../data/results.json";
import { results } from "../../data/results";
import BumpsChart from "@/components/multi-year-bumps-chart";

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
      <div className="" style={{ width: `${data.length * 96}px` }}>
        <BumpsChart data={data} />
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
