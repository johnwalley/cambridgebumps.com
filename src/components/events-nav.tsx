"use client";

import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface EventsNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EventsNav({ className, ...props }: EventsNavProps) {
  const segments = useSelectedLayoutSegments();
  const searchParams = useSearchParams();

  const query = searchParams.size > 0 ? `?${searchParams.toString()}` : "";

  const events = [
    { name: "Eights", key: "eights" },
    { name: "Lents", key: "lents" },
    { name: "Mays", key: "mays" },
    { name: "Torpids", key: "torpids" },
    { name: "Town", key: "town" },
  ].map((event) => ({
    ...event,
    href: `/charts/${event.key}/${segments[1]}/${segments[2]}${query}`,
  }));

  return (
    <div className={cn("relative", className)} {...props}>
      <ScrollArea className="lg:max-w-none">
        <Tabs
          value={segments[0]}
          className="relative grid w-full scroll-m-20 gap-4"
        >
          <TabsList className="h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
            {events.map((event) => (
              <TabsTrigger
                key={event.key}
                value={event.key}
                className="h-[1.45rem] rounded-sm px-2 text-sm"
                asChild
              >
                <Link
                  href={event.href}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-full text-center text-sm transition-colors hover:text-primary",
                    segments[0] === event.key
                      ? "bg-muted font-medium text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {event.name}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
