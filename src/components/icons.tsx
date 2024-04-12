import {
  CatIcon,
  ChromeIcon,
  GithubIcon,
  LayoutDashboardIcon,
  LinkedinIcon,
  LogOutIcon,
  LucideProps,
  SettingsIcon,
} from "lucide-react";

type IconProps = LucideProps;

export const Icons = {
  logo: (props: IconProps) => <CatIcon {...props} />,
  gitHub: (props: IconProps) => <GithubIcon {...props} />,
  linkedin: (props: IconProps) => <LinkedinIcon {...props} />,
  google: (props: IconProps) => <ChromeIcon {...props} />,
  settings: (props: IconProps) => <SettingsIcon {...props} />,
  dashboard: (props: IconProps) => <LayoutDashboardIcon {...props} />,
  logout: (props: IconProps) => <LogOutIcon {...props} />,
};
