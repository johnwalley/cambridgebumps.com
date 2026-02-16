"use client";

import { PropsWithChildren, Suspense, useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";

import { Blades } from "./components/blades";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MultiYearEventsNav } from "@/components/multi-year-events-nav";
import { results } from "./data/results";
import { genderMap, set } from "@/lib/utils";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  const searchParams = useSearchParams();

  const data = results[segments[0] as any][segments[1] as any];

  const clubs = Array.from(
    new Set(data?.flatMap((event) => event.crews.map((crew) => crew.club)))
  )
    .filter((crew) => crew.length > 0)
    .sort((a, b) => a.localeCompare(b));

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="w-full px-2 mx-auto relative lg:grid items-stretch gap-6 lg:grid-cols-[1fr_400px] h-[calc(100vh-4rem)]">
      <div className="lg:hidden flex flex-col space-y-2 mt-2 mb-4">
        <MultiYearEventsNav />
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
                    ? `/multi-year-charts/${
                        segments[0]
                      }/men?${searchParams.toString()}`
                    : `/multi-year-charts/${segments[0]}/men`
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
                    ? `/multi-year-charts/${
                        segments[0]
                      }/women?${searchParams.toString()}`
                    : `/multi-year-charts/${segments[0]}/women`
                }
              >
                Women
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="hidden lg:block order-2 border-l py-4">
        <div className="flex flex-col space-y-3 px-4">
          <div>
            <Label htmlFor="event" className="mb-4 block">Event</Label>
            <Select
              value={segments[0]}
              onValueChange={(value) => {
                router.push(`/multi-year-charts/${value}/${segments[1]}`);
              }}
            >
              <SelectTrigger id="event" className="w-[280px]">
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
          </div>
          <div>
            <Label htmlFor="gender" className="mb-4 block">Gender</Label>
            <RadioGroup
              id="gender"
              className="flex flex-col space-y-1"
              value={segments[1]}
              onValueChange={(value) => {
                router.push(`/multi-year-charts/${segments[0]}/${value}`);
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
          <div className="items-top flex space-x-2">
            <Suspense>
              <Blades />
            </Suspense>
          </div>
          <div>
            <Label htmlFor="highlight-club" className="mb-4 block">Highlight club</Label>
            <div className="flex">
              <Select
                value={searchParams.get("club") ?? ""}
                onValueChange={(value) => {
                  router.push(
                    `/multi-year-charts/${segments[0]}/${
                      segments[1]
                    }?${createQueryString("club", value)}`
                  );
                }}
              >
                <SelectTrigger id="highlight-club" className="w-[280px]">
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
              <Button
                variant="link"
                size="icon"
                disabled={!searchParams.has("club")}
                onClick={() => {
                  router.push(
                    `/multi-year-charts/${segments[0]}/${
                      segments[1]
                    }?${createQueryString("club", null)}`
                  );
                }}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <h1 className="scroll-m-20 pt-2 pb-4 text-xl lg:text-3xl font-semibold tracking-tight text-center">{`${
          set[segments[0] as keyof typeof set]
        } - ${genderMap[segments[1] as keyof typeof genderMap]}`}</h1>
        <div className="overflow-auto">{children}</div>
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
