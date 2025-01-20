"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();

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
          href="/charts"
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
          href="/multi-year-charts"
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
          href="/statistics"
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
