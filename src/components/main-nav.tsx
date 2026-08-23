import { Icons } from "@/components/icons";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { useEventPreference } from "@/hooks/use-event-preference";
import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types/nav";

export function MainNav({ pathname }: { pathname: string }) {
  const pref = useEventPreference();

  // Extract the current event and gender from the URL, e.g.
  // "/charts/eights/women/2025" -> event "eights", gender "women".
  const [, currentEvent, currentGender] = pathname.split("/").filter(Boolean);

  // Build href with event/gender context. Prefer the event/gender in the
  // current URL; otherwise fall back to the remembered preference so a visitor
  // on / or /about is taken back to their last-chosen event. The year is
  // omitted — the redirect supplies the latest year.
  const buildHref = (item: MainNavItem): string => {
    if (item.requiresEventGender) {
      if (currentEvent && currentGender) {
        return `${item.href}/${currentEvent}/${currentGender}`;
      }
      if (pref) {
        return `${item.href}/${pref.event}/${pref.gender}`;
      }
    }

    return `${item.href}`;
  };

  // Check if current path matches nav item
  const isActive = (item: MainNavItem): boolean =>
    item.href ? pathname.startsWith(item.href) : false;

  return (
    <div className="mr-4 hidden lg:flex">
      <a href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </a>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav.map((item) => (
          <a
            key={item.title}
            href={buildHref(item)}
            className={cn(
              "transition-colors hover:text-foreground/80",
              isActive(item) ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
