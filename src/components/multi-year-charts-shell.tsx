import { navigate } from "astro:transitions/client";

import { EventSelect } from "@/components/event-select";
import { GenderRadioGroup } from "@/components/gender-radio-group";
import { HighlightControls } from "@/components/highlight-controls";
import MultiYearBumpsChart from "@/components/multi-year-bumps-chart";
import { MultiYearEventsNav } from "@/components/multi-year-events-nav";
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
  /** How many years the chart spans; see `MultiYearBumpsChart`'s `width`. */
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
    // Fills the viewport below the header (3.5rem plus its 1px bottom border),
    // so the chart box is the only thing that scrolls — on phones the controls
    // stack above it in the same column rather than pushing it off the bottom
    // of the page.
    <div className="relative mx-auto flex h-[calc(100dvh-3.5rem-1px)] w-full flex-col items-stretch px-2 lg:grid lg:grid-cols-[1fr_400px] lg:gap-6">
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
        {years > 0 && (
          <HighlightControls
            clubs={clubs}
            club={club}
            blades={blades}
            setParam={setParam}
            compact
          />
        )}
      </div>
      <div className="order-2 hidden border-l py-4 lg:block">
        <div className="flex flex-col space-y-3 px-4">
          <EventSelect
            value={event}
            onValueChange={(value) => {
              navigate(
                withParams(`/multi-year-charts/${value}/${gender}`, params),
              );
            }}
          />
          <GenderRadioGroup
            event={event}
            value={gender}
            onValueChange={(value) => {
              navigate(
                withParams(`/multi-year-charts/${event}/${value}`, params),
              );
            }}
          />
          <HighlightControls
            clubs={clubs}
            club={club}
            blades={blades}
            setParam={setParam}
          />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:h-full">
        <h1 className="scroll-m-20 pt-2 pb-4 text-center text-xl font-semibold tracking-tight lg:text-3xl">
          {`${set[event]} - ${getGenderLabel(event, gender)}`}
        </h1>
        <div className="overflow-auto">
          {years > 0 ? (
            <div className="mb-4 w-full">
              <MultiYearBumpsChart
                src={dataUrl}
                width={years * 96}
                club={club}
                blades={blades}
                spoons={spoons}
              />
            </div>
          ) : (
            <div className="mb-4 text-center">We have no results to show</div>
          )}
        </div>
      </div>
    </div>
  );
}
