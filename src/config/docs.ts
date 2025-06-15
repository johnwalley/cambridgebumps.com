import { MainNavItem, SidebarNavItem } from "../types/nav";

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
      title: "What's it all about?",
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
      items: [
        {
          title: "Eights",
          href: "/charts/eights",
          items: [],
        },
        {
          title: "Lents",
          href: "/charts/lents",
          items: [],
        },
        {
          title: "Mays",
          href: "/charts/mays",
          items: [],
        },
        {
          title: "Torpids",
          href: "/charts/torpids",
          items: [],
        },
        {
          title: "Town",
          href: "/charts/town",
          items: [],
        },
      ],
    },
  ],
};
