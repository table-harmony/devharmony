"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/use-media-query";

import { LogoIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@clerk/nextjs";
import { SlashIcon } from "lucide-react";
import { publicRoutes } from "@/config/routes";

export function HeaderLinks({ links }: { links?: React.ReactNode }) {
  const { session, isSignedIn } = useSession();
  const { isMobile } = useMediaQuery();
  const path = usePathname();

  if (isMobile) {
    return (
      <Link href="/" aria-label="logo">
        <LogoIcon />
      </Link>
    );
  }

  const isPublicRoute = publicRoutes.some((route) => path === route);

  if (!isSignedIn || isPublicRoute) {
    return (
      <>
        <Logo />
        <div className="hidden space-x-8 md:flex md:flex-row">
          {/**TODO: add public links such as jobs and browse */}
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/">
        <LogoIcon />
      </Link>

      <SlashIcon className="size-4 -rotate-12" />

      <Link href="/dashboard" className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={session?.user.imageUrl} alt="profile" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <span>{session?.user.fullName}</span>
      </Link>
      {links}
    </div>
  );
}
