import type { Gender, Set } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  events,
  genderMap,
  genders,
  getCode,
  getEventContext,
  isEvent,
  isGender,
  set,
} from "@/lib/utils";
import { statisticMapping, stats } from "../../../stats";

import { Blade } from "react-rowing-blades";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ event: Set; gender: Gender; statistic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, gender, statistic } = await params;

  if (!isEvent(event) || !isGender(gender) || !(statistic in statisticMapping)) {
    return {};
  }

  const eventName = set[event];
  const genderName = genderMap[gender];
  const statisticLabel = statisticMapping[statistic].label;

  return {
    title: `${statisticLabel} - ${eventName} - ${genderName}`,
    description: `${statisticLabel} rankings for ${eventName} (${genderName}). See which ${getEventContext(event)} crews top the historical records.`,
    alternates: {
      canonical: `/statistics/${event}/${gender}/${statistic}`,
    },
  };
}

export default async function Statistics({ params }: Props) {
  const { event, gender, statistic } = await params;

  if (!isEvent(event) || !isGender(gender) || !(statistic in statisticMapping)) {
    notFound();
  }

  const data = stats[event][gender][statistic];

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">
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
            {data.map((row: any, index: number) => {
              const clubCode = getCode(
                row[statisticMapping[statistic].key],
                event,
              );
              return (
                <TableRow key={row[statisticMapping[statistic].key]}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="flex flex-row items-center gap-2 font-medium">
                    {clubCode && <Blade club={clubCode} size={32} />}
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const paths = events.flatMap((event) =>
    genders.flatMap((gender) =>
      Object.keys(statisticMapping).map((statistic) => ({
        event,
        gender,
        statistic,
      })),
    ),
  );

  return paths;
}
