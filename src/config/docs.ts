import { UserRole } from "@/use-cases";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  authorization?: UserRole[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

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
