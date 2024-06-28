"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface EventsNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EventsNav({ className, ...props }: EventsNavProps) {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const searchParams = useSearchParams();

  const events = [
    {
      name: "Eights",
      href:
        searchParams.size > 0
          ? `/charts/eights/${segments[1]}/${
              segments[2]
            }?${searchParams.toString()}`
          : `/charts/eights/${segments[1]}/${segments[2]}`,
    },
    {
      name: "Lents",
      href:
        searchParams.size > 0
          ? `/charts/lents/${segments[1]}/${
              segments[2]
            }?${searchParams.toString()}`
          : `/charts/lents/${segments[1]}/${segments[2]}`,
    },
    {
      name: "Mays",
      href:
        searchParams.size > 0
          ? `/charts/mays/${segments[1]}/${
              segments[2]
            }?${searchParams.toString()}`
          : `/charts/mays/${segments[1]}/${segments[2]}`,
    },
    {
      name: "Torpids",
      href:
        searchParams.size > 0
          ? `/charts/torpids/${segments[1]}/${
              segments[2]
            }?${searchParams.toString()}`
          : `/charts/torpids/${segments[1]}/${segments[2]}`,
    },
    {
      name: "Town",
      href:
        searchParams.size > 0
          ? `/charts/town/${segments[1]}/${
              segments[2]
            }?${searchParams.toString()}`
          : `/charts/town/${segments[1]}/${segments[2]}`,
    },
  ];

  return (
    <div className="relative">
      <ScrollArea className="lg:max-w-none">
        <Tabs
          value={segments[0]}
          className="relative grid w-full scroll-m-20 gap-4"
        >
          <TabsList className="h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
            {events.map((event, index) => (
              <TabsTrigger
                key={event.href}
                value={event.name.toLowerCase()}
                className="h-[1.45rem] rounded-sm px-2 text-sm"
                asChild
              >
                <Link
                  href={event.href}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-full text-center text-sm transition-colors hover:text-primary",
                    pathname?.startsWith(event.href) ||
                      (index === 0 && pathname === "/")
                      ? "bg-muted font-medium text-primary"
                      : "text-muted-foreground"
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
