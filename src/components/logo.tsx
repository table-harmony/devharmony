import Link from "next/link";
import { LogoIcon } from "./icons";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <LogoIcon />
      <span className="flex flex-col text-lg font-bold leading-[16px]">
        <span>Dev</span>
        <span className="text-primary">Harmony</span>
      </span>
    </Link>
  );
}
