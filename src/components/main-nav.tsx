"use client";

import { Icons } from "@/components/icons";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types/nav";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import * as React from "react";

export function MainNav() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  // Extract current event and gender from URL segments
  const currentEvent = segments[1];
  const currentGender = segments[2];

  // Build href with event/gender context and search params
  const buildHref = (item: MainNavItem): string => {
    if (item.requiresEventGender && currentEvent && currentGender) {
      return `${item.href}/${currentEvent}/${currentGender}`;
    }

    return `${item.href}`;
  };

  // Check if current path matches nav item
  const isActive = (item: MainNavItem): boolean => {
    if (item.href) {
      return pathname?.startsWith(item.href) ?? false;
    }

    return false;
  };

  return (
    <div className="mr-4 hidden lg:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav.map((item) => (
          <Link
            key={item.title}
            href={buildHref(item)}
            className={cn(
              "transition-colors hover:text-foreground/80",
              isActive(item) ? "text-foreground" : "text-foreground/60"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
