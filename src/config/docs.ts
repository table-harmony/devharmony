import { DocsConfig } from "@/types/nav";

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
      authorization: ["USER", "ADMIN"],
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      authorization: ["ADMIN"],
    },
  ],
  sidebarNav: [],
};
