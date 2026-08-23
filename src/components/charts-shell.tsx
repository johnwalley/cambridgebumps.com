import { Cross2Icon } from "@radix-ui/react-icons";
import type { Event } from "react-bumps-chart/dist/types";

import BumpsChart from "@/components/bumps-chart";
import { EventSelect } from "@/components/event-select";
import { EventsNav } from "@/components/events-nav";
import { GenderRadioGroup } from "@/components/gender-radio-group";
import { HighlightToggle } from "@/components/highlight-toggle";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YearPicker } from "@/components/year-picker";
import { useChartParams, withParams } from "@/hooks/use-chart-params";
import { getGenderLabel, set, type Gender, type Set } from "@/lib/utils";

type ChartsShellProps = {
  event: Set;
  gender: Gender;
  year: string;
  /** Every year this event/gender has results for, oldest first. */
  years: string[];
  /** Club names racing in this year, for the "Highlight club" dropdown. */
  clubs: string[];
  /** The year's results, or null when there are none yet. */
  data: Event | null;
  /** The current Town Bumps year links to the CRA's official results. */
  showCraNotice: boolean;
};

// The single-year chart page: the event/category/year/highlight controls plus
// the chart itself. It was a Next.js client layout wrapping a server-rendered
// page; in Astro the whole thing is one island, which lets the highlight
// controls update the chart in place instead of navigating.
export function ChartsShell({
  event,
  gender,
  year,
  years,
  clubs,
  data,
  showCraNotice,
}: ChartsShellProps) {
  const { params, setParam } = useChartParams();

  const club = params.get("club");
  const blades = params.get("blades") === "true";
  const spoons = params.get("spoons") === "true";

  const focusElement = years.findIndex((candidate) => candidate === year);

  const yearLinks = years.map((candidate) => (
    <a
      key={candidate}
      href={withParams(`/charts/${event}/${gender}/${candidate}`, params)}
    >
      {candidate}
    </a>
  ));

  return (
    <div className="relative mx-auto w-full items-stretch gap-6 px-2 lg:grid lg:grid-cols-[1fr_400px]">
      <div className="mt-2 mb-4 flex flex-col space-y-2 lg:hidden">
        <EventsNav event={event} gender={gender} year={year} params={params} />
        <Tabs value={gender} className="relative grid w-full scroll-m-20 gap-4">
          <TabsList className="h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
            <TabsTrigger
              value="men"
              className="h-[1.45rem] rounded-sm px-2 text-sm"
              asChild
            >
              <a href={withParams(`/charts/${event}/men/${year}`, params)}>
                {getGenderLabel(event, "men")}
              </a>
            </TabsTrigger>
            <TabsTrigger
              value="women"
              className="h-[1.45rem] rounded-sm px-2 text-sm"
              asChild
            >
              <a href={withParams(`/charts/${event}/women/${year}`, params)}>
                Women
              </a>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <YearPicker
          key={`${event}/${gender}`}
          skipLength={576}
          focusElement={focusElement}
          position="center"
        >
          {yearLinks}
        </YearPicker>
      </div>
      <div className="order-2 hidden border-l py-4 lg:block">
        <div className="flex flex-col space-y-3 px-4">
          <EventSelect
            value={event}
            onValueChange={(value) => {
              window.location.href = `/charts/${value}/${gender}/${year}`;
            }}
          />
          <GenderRadioGroup
            event={event}
            value={gender}
            onValueChange={(value) => {
              window.location.href = `/charts/${event}/${value}/${year}`;
            }}
          />
          <div>
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <span className="mb-4 block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Year
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-[320px] text-sm" side="left">
                The first recorded bumps race was 1815.
              </HoverCardContent>
            </HoverCard>
            <YearPicker
              key={`${event}/${gender}`}
              skipLength={256}
              focusElement={focusElement}
              position="center"
            >
              {yearLinks}
            </YearPicker>
          </div>
          <div className="items-top flex space-x-2">
            <HighlightToggle
              id="blades"
              label="Highlight blades"
              description="Crews who have gone up every day are highlighted."
              checked={blades}
              onCheckedChange={(checked) =>
                setParam("blades", checked ? "true" : "false")
              }
            />
          </div>
          <div>
            <Label htmlFor="highlight-club" className="mb-4 block">
              Highlight club
            </Label>
            <div className="flex">
              <Select
                value={club ?? ""}
                onValueChange={(value) => setParam("club", value)}
              >
                <SelectTrigger id="highlight-club" className="w-[280px]">
                  <SelectValue placeholder="Select a club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="link"
                size="icon"
                disabled={club === null}
                onClick={() => setParam("club", null)}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <h1 className="scroll-m-20 pt-2 pb-4 text-center text-xl font-semibold tracking-tight lg:text-3xl">
          {`${set[event]} - ${getGenderLabel(event, gender)} - ${year}`}
        </h1>
        {showCraNotice && (
          <p className="pb-2 text-center text-sm">
            Not affiliated with the CRA. For official live results please visit
            the CRA{" "}
            <a
              href="https://www.crarowing.co.uk/town-bumps/about-the-cra-town-bumps/results"
              className="dark:text-white"
            >
              results page
            </a>
            .
          </p>
        )}
        {data ? (
          <div className="mb-4 flex w-full flex-col items-center">
            <div className="w-full max-w-[520px]">
              <BumpsChart
                data={data}
                club={club}
                blades={blades}
                spoons={spoons}
              />
            </div>
          </div>
        ) : (
          <div className="mb-4 text-center">
            We have no results to show for this year
          </div>
        )}
      </div>
    </div>
  );
}
