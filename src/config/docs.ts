import { eventOrder } from "@/config/site";
import { eventShortNames } from "@/lib/utils";
import type { MainNavItem, SidebarNavItem } from "../types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Charts",
      href: "/charts",
      requiresEventGender: true,
    },
    {
      title: "Multi-year charts",
      href: "/multi-year-charts",
      requiresEventGender: true,
    },
    {
      title: "Bumps explained",
      href: "/about",
    },
    {
      title: "Statistics",
      href: "/statistics",
      requiresEventGender: true,
    },
    {
      title: "Vocabulary",
      href: "/vocabulary",
    },
  ],
  sidebarNav: [
    {
      title: "Events",
      items: eventOrder.map((event) => ({
        title: eventShortNames[event],
        href: `/charts/${event}`,
        items: [],
      })),
    },
  ],
};
