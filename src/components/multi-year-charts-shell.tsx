import { Cross2Icon } from "@radix-ui/react-icons";

import { EventSelect } from "@/components/event-select";
import { GenderRadioGroup } from "@/components/gender-radio-group";
import { HighlightToggle } from "@/components/highlight-toggle";
import MultiYearBumpsChart from "@/components/multi-year-bumps-chart";
import { MultiYearEventsNav } from "@/components/multi-year-events-nav";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChartParams, withParams } from "@/hooks/use-chart-params";
import { getGenderLabel, set, type Gender, type Set } from "@/lib/utils";

type MultiYearChartsShellProps = {
  event: Set;
  gender: Gender;
  /** Club names across every year, for the "Highlight club" dropdown. */
  clubs: string[];
  /** Static JSON holding this event/gender's results. */
  dataUrl: string;
  /** How many years the chart spans; it's 96px wide per year. */
  years: number;
};

export function MultiYearChartsShell({
  event,
  gender,
  clubs,
  dataUrl,
  years,
}: MultiYearChartsShellProps) {
  const { params, setParam } = useChartParams();

  const club = params.get("club");
  const blades = params.get("blades") === "true";
  const spoons = params.get("spoons") === "true";

  return (
    <div className="relative mx-auto h-[calc(100vh-4rem)] w-full items-stretch gap-6 px-2 lg:grid lg:grid-cols-[1fr_400px]">
      <div className="mt-2 mb-4 flex flex-col space-y-2 lg:hidden">
        <MultiYearEventsNav event={event} gender={gender} params={params} />
        <Tabs value={gender} className="relative grid w-full scroll-m-20 gap-4">
          <TabsList className="h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
            <TabsTrigger
              value="men"
              className="h-[1.45rem] rounded-sm px-2 text-sm"
              asChild
            >
              <a href={withParams(`/multi-year-charts/${event}/men`, params)}>
                {getGenderLabel(event, "men")}
              </a>
            </TabsTrigger>
            <TabsTrigger
              value="women"
              className="h-[1.45rem] rounded-sm px-2 text-sm"
              asChild
            >
              <a href={withParams(`/multi-year-charts/${event}/women`, params)}>
                Women
              </a>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="order-2 hidden border-l py-4 lg:block">
        <div className="flex flex-col space-y-3 px-4">
          <EventSelect
            value={event}
            onValueChange={(value) => {
              window.location.href = `/multi-year-charts/${value}/${gender}`;
            }}
          />
          <GenderRadioGroup
            event={event}
            value={gender}
            onValueChange={(value) => {
              window.location.href = `/multi-year-charts/${event}/${value}`;
            }}
          />
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
      <div className="flex h-full flex-col overflow-hidden">
        <h1 className="scroll-m-20 pt-2 pb-4 text-center text-xl font-semibold tracking-tight lg:text-3xl">
          {`${set[event]} - ${getGenderLabel(event, gender)}`}
        </h1>
        <div className="overflow-auto">
          {years > 0 ? (
            <div className="mb-4 w-full">
              <div className="px-10" style={{ width: `${years * 96}px` }}>
                <MultiYearBumpsChart
                  src={dataUrl}
                  club={club}
                  blades={blades}
                  spoons={spoons}
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 text-center">We have no results to show</div>
          )}
        </div>
      </div>
    </div>
  );
}
