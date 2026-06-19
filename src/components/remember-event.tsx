"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { writeEventPreference } from "@/lib/event-preference";

// Sections whose URLs follow /{section}/{event}/{gender}/…
const TRACKED_SECTIONS = new Set([
  "charts",
  "statistics",
  "multi-year-charts",
]);

// Renders nothing. Watches the current path and persists the user's chosen
// event/gender whenever they land on an event page. Centralising the write here
// means every navigation is captured — selectors, tabs, the events nav, year
// picker, and direct links alike — so individual controls need no changes.
export function RememberEvent() {
  const pathname = usePathname();

  React.useEffect(() => {
    if (!pathname) return;

    // "/charts/eights/women/2025" -> ["charts", "eights", "women", "2025"]
    const parts = pathname.split("/").filter(Boolean);
    const [section, event, gender] = parts;

    if (TRACKED_SECTIONS.has(section) && event && gender) {
      // writeEventPreference ignores anything that isn't a valid slug.
      writeEventPreference(event, gender);
    }
  }, [pathname]);

  return null;
}
