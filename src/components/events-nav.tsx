import { eventOrder } from "@/config/site";
import { cn, eventShortNames, set, type Gender, type Set } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withParams } from "@/hooks/use-chart-params";

// The year each event/category's chart link should land on, chosen by the page
// so a link never points at a year that event/category didn't race.
export type YearFor = Record<Set, Record<Gender, string>>;

type EventsNavProps = {
  event: Set;
  gender: Gender;
  yearFor: YearFor;
  params: URLSearchParams;
  className?: string;
};

export function EventsNav({
  event,
  gender,
  yearFor,
  params,
  className,
}: EventsNavProps) {
  return (
    <div className={cn("relative", className)}>
      <ScrollArea className="lg:max-w-none">
        <Tabs value={event} className="relative grid w-full scroll-m-20 gap-4">
          <TabsList className="h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
            {eventOrder.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-[1.45rem] rounded-sm px-2 text-sm"
                asChild
              >
                <a
                  href={withParams(
                    `/charts/${key}/${gender}/${yearFor[key][gender]}`,
                    params,
                  )}
                  title={set[key]}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-full text-center text-sm transition-colors hover:text-primary",
                    event === key
                      ? "bg-muted font-medium text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {eventShortNames[key]}
                </a>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
