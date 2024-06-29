"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { YearPicker } from "@/components/year-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import { EventsNav } from "@/components/events-nav";
import summary from "./data/results.json";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PropsWithChildren, Suspense, useCallback } from "react";
import { Blades } from "./components/blades";
import { Spoons } from "./components/spoons";
import { results } from "./data/results";

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

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  const searchParams = useSearchParams();

  const years: string[] = (summary as any)["eights"]["men"];

  const focusElement = years.findIndex((year) => year === segments[2]);

  /*   const data = results[segments[0] as any][segments[1] as any]
    .filter((result) => result.year >= +segments[2])
    .filter((result) => result.year <= +segments[2])[0];

  const clubs = Array.from(new Set(data?.crews.map((crew) => crew.club))).sort(
    (a, b) => a.localeCompare(b)
  ); */

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="w-full px-2 mx-auto relative lg:grid items-stretch gap-6 lg:grid-cols-[1fr_400px]">
      <div className="lg:hidden flex flex-col space-y-2 mt-2 mb-4">
        <EventsNav />
        <Tabs
          value={segments[1]}
          className="relative grid w-full scroll-m-20 gap-4"
        >
          <TabsList className="h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
            <TabsTrigger
              value="men"
              className="h-[1.45rem] rounded-sm px-2 text-sm"
              asChild
            >
              <Link
                href={
                  searchParams.size > 0
                    ? `/charts/${segments[0]}/men/${
                        segments[2]
                      }?${searchParams.toString()}`
                    : `/charts/${segments[0]}/men/${segments[2]}`
                }
              >
                Men
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="women"
              className="h-[1.45rem] rounded-sm px-2 text-sm"
              asChild
            >
              <Link
                href={
                  searchParams.size > 0
                    ? `/charts/${segments[0]}/women/${
                        segments[2]
                      }?${searchParams.toString()}`
                    : `/charts/${segments[0]}/women/${segments[2]}`
                }
              >
                Women
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <YearPicker
          skipLength={576}
          focusElement={focusElement}
          position="center"
        >
          {years.map((year, i) => (
            <Link
              key={year}
              href={
                searchParams.size > 0
                  ? `/charts/${segments[0]}/${
                      segments[1]
                    }/${year}?${searchParams.toString()}`
                  : `/charts/${segments[0]}/${segments[1]}/${year}`
              }
            >
              {year}
            </Link>
          ))}
        </YearPicker>
      </div>
      <div className="hidden lg:block order-2 border-l py-4">
        <div className="flex flex-col space-y-3 px-4">
          <Label htmlFor="event">Event</Label>
          <Select
            value={segments[0]}
            onValueChange={(value) => {
              router.push(`/charts/${value}/${segments[1]}/${segments[2]}`);
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cambridge</SelectLabel>
                <SelectItem value="lents">Lent Bumps</SelectItem>
                <SelectItem value="mays">May Bumps</SelectItem>
                <SelectItem value="town">Town Bumps</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Oxford</SelectLabel>
                <SelectItem value="torpids">Torpids</SelectItem>
                <SelectItem value="eights">Summer Eights</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="space-y-3">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              id="gender"
              className="flex flex-col space-y-1"
              value={segments[1]}
              onValueChange={(value) => {
                router.push(`/charts/${segments[0]}/${value}/${segments[2]}`);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="men" id="men" />
                <Label htmlFor="men">Men</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="women" id="women" />
                <Label htmlFor="women">Women</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Year
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-[320px] text-sm" side="left">
                The first recorded bumps race was 1815.
              </HoverCardContent>
            </HoverCard>
            {/*             <Link
              href={`/charts/${segments[0]}/${segments[1]}/${
                (results as any)[segments[0]][segments[1]][
                  (results as any)[segments[0]][segments[1]].length - 1
                ]
              }`}
            >
              Latest
            </Link> */}
            <YearPicker
              skipLength={256}
              focusElement={focusElement}
              position="center"
            >
              {years.map((year, i) => (
                <Link
                  key={year}
                  href={
                    searchParams.size > 0
                      ? `/charts/${segments[0]}/${
                          segments[1]
                        }/${year}?${searchParams.toString()}`
                      : `/charts/${segments[0]}/${segments[1]}/${year}`
                  }
                >
                  {year}
                </Link>
              ))}
            </YearPicker>
          </div>
          <div className="items-top flex space-x-2">
            <Suspense>
              <Blades />
            </Suspense>
          </div>
          {/*           <div>
            <Label htmlFor="event">Highlight clubs</Label>
            <Select
              value={searchParams.get("club") ?? undefined}
              onValueChange={(value) => {
                router.push(
                  searchParams.size > 0
                    ? `/charts/${segments[0]}/${segments[1]}/${
                        segments[2]
                      }?${searchParams.toString()}&${createQueryString(
                        "club",
                        value
                      )}`
                    : `/charts/${segments[0]}/${segments[1]}/${
                        segments[2]
                      }?${createQueryString("club", value)}`
                );
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a club" />
              </SelectTrigger>
              <SelectContent>
                {clubs.map((club) => (
                  <SelectItem key={club} value={club}>
                    {club}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          {/*           <div className="items-top flex space-x-2">
            <Suspense>
              <Spoons />
            </Suspense>
          </div> */}
        </div>
      </div>
      <div>
        <div className="hidden lg:block">
          <h1 className="scroll-m-20 pt-2 pb-4 text-3xl font-semibold tracking-tight text-center">{`${
            set[segments[0] as keyof typeof set]
          } - ${genderMap[segments[1] as keyof typeof genderMap]} - ${
            segments[2]
          }`}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Layout2({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
