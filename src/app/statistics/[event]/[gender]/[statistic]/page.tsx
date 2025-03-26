// @ts-ignore no types
import { Blade, abbreviations, shortShortNames } from "react-rowing-blades";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statisticMapping, stats } from "../../../stats";

import { Metadata } from "next";
import summary from "../../../../charts/data/results.json";
import { getCode } from "@/lib/utils";

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

const events = ["eights", "lents", "mays", "torpids", "town"];
const genders = ["men", "women"];





type Props = {
  params: Promise<{ event: string; gender: string; statistic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender, statistic } = await params;

  return {
    title: `${statistic} - ${set[event as keyof typeof set]} - ${
      genderMap[gender as keyof typeof genderMap]
    }`,
  };
}

export default async function Statistics({ params }: Props) {
  const { event, gender, statistic } = await params;
  const years = (summary as any)[event][gender];
  const data = stats[event][gender][statistic];

  return (
    <div>
      <h2 className="font-bold text-xl mb-2">
        {statisticMapping[statistic].label}
      </h2>

      <div className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">Rank</TableHead>
              <TableHead className="">
                {statisticMapping[statistic].keyLabel}
              </TableHead>
              <TableHead className="text-right">
                {statisticMapping[statistic].valueLabel}
              </TableHead>
              {statisticMapping[statistic].additionalLabel && (
                <TableHead className="text-right">
                  {statisticMapping[statistic].additionalLabel}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow key={row[statisticMapping[statistic].key]}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium flex flex-row gap-2 items-center">
                  <Blade
                    club={getCode(row[statisticMapping[statistic].key], event)}
                    size={32}
                  />
                  {row[statisticMapping[statistic].key]}
                </TableCell>
                <TableCell className="text-right">
                  {row[statisticMapping[statistic].value]}
                </TableCell>
                {statisticMapping[statistic].additional && (
                  <TableCell className="text-right">
                    {row[statisticMapping[statistic].additional]}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const events = ["eights", "lents", "mays", "torpids", "town"];
  const genders = ["men", "women"];

  const paths = events.flatMap((event) =>
    genders.flatMap((gender) =>
      Object.keys(statisticMapping).map((statistic) => ({
        event,
        gender,
        statistic,
      }))
    )
  );

  return paths;
}
