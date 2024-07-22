"use client";

import Link from "next/link";

import { Notifications } from "./notifications";
import { SendFeedbackSheet } from "./send-feedback-sheet";

import { useSession } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/config/routes";
import { MenuButton } from "./menu-button";
import useMediaQuery from "@/hooks/use-media-query";

export function HeaderActions() {
  const { isSignedIn } = useSession();
  const { isMobile } = useMediaQuery();
  const path = usePathname();

  if (!isSignedIn) {
    return (
      <Button asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    );
  }

  if (isMobile) return <MenuButton />;

  const isPublicRoute = publicRoutes.some((route) => path === route);

  if (isPublicRoute) {
    return (
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <SendFeedbackSheet>
        <Button size="icon" variant="ghost" aria-label="feedback">
          <MessageCircleIcon className="size-4" />
        </Button>
      </SendFeedbackSheet>
      <Notifications />
      <div className="hidden md:block">
        <ModeToggle variant="button" />
      </div>
      <div className="flex items-center md:ml-2">
        <MenuButton />
      </div>
    </div>
  );
}
