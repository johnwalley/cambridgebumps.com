"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { useEventPreference } from "@/hooks/use-event-preference";
import { cn } from "@/lib/utils";

// Home page "Bumps charts" call to action. Sends returning visitors to their
// last-chosen event/gender; first-time visitors get the bare /charts/ route,
// which redirects to the default. The year is omitted on purpose so the
// redirect always supplies the latest year's results.
export function BumpsChartsCta() {
  const pref = useEventPreference();

  const href = pref ? `/charts/${pref.event}/${pref.gender}` : "/charts/";

  return (
    <Link href={href} className={cn(buttonVariants())}>
      Bumps charts
    </Link>
  );
}
