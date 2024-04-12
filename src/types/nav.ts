import { UserRole } from "@/use-cases";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  authorization?: UserRole;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
