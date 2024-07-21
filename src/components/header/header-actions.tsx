import { currentUser } from "@clerk/nextjs/server";

import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SendFeedbackSheet } from "./send-feedback-sheet";
import { Notifications } from "./notifications";
import { MessageCircleIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export async function HeaderActions() {
  const user = await currentUser();
  const isLoggedIn = !!user;

  if (!isLoggedIn)
    return (
      <Button asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    );

  return (
    <div className="flex items-center">
      <SendFeedbackSheet>
        <Button size="icon" variant="ghost" aria-label="feedback">
          <MessageCircleIcon className="size-4" />
        </Button>
      </SendFeedbackSheet>
      <NotificationsWrapper />
      <div className="hidden md:block">
        <ModeToggle variant="button" />
      </div>
      <div className="flex items-center md:ml-2">
        <UserButton />
      </div>
    </div>
  );
}

export async function NotificationsWrapper() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return <Notifications notifications={[]} />;
}
