export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
