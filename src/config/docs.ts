import { Icons } from "@/components/icons";

import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Information",
      href: "/information",
    },
    {
      title: "Settings",
      href: "/settings",
      authorization: "USER",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      authorization: "ADMIN",
    },
  ],
  sidebarNav: [],
};
