import {
  CatIcon,
  ChromeIcon,
  GithubIcon,
  LinkedinIcon,
  LucideProps,
} from "lucide-react";

type IconProps = LucideProps;

export const Icons = {
  logo: (props: IconProps) => <CatIcon {...props} />,
  gitHub: (props: IconProps) => <GithubIcon {...props} />,
  linkedin: (props: IconProps) => <LinkedinIcon {...props} />,
  google: (props: IconProps) => <ChromeIcon {...props} />,
};
