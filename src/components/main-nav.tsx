"use client";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import * as React from "react";

export function MainNav() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  // Extract current event and gender from URL segments
  const currentEvent = segments[1];
  const currentGender = segments[2];

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href={
            currentEvent && currentGender
              ? `/charts/${currentEvent}/${currentGender}`
              : "/charts"
          }
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/charts")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Charts
        </Link>
        <Link
          href={
            currentEvent && currentGender
              ? `/multi-year-charts/${currentEvent}/${currentGender}`
              : "/multi-year-charts"
          }
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/multi-year-charts")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Multi-year charts
        </Link>
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/about")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          What&apos;s it all about?
        </Link>
        <Link
          href={
            currentEvent && currentGender
              ? `/statistics/${currentEvent}/${currentGender}`
              : "/statistics"
          }
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/statistics")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Statistics
        </Link>
        <Link
          href="/vocabulary"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/vocabulary")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Vocabulary
        </Link>
      </nav>
    </div>
  );
}
