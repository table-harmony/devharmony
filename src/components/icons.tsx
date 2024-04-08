import { CatIcon, ChromeIcon, GithubIcon, LinkedinIcon } from "lucide-react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => <CatIcon {...props} />,
  gitHub: (props: IconProps) => <GithubIcon {...props} />,
  linkedin: (props: IconProps) => <LinkedinIcon {...props} />,
  google: (props: IconProps) => <ChromeIcon {...props} />,
};
