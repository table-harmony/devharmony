import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/utils/session";
import { MenuButton } from "./menu-button";
import { SendFeedbackSheet } from "./send-feedback-sheet";
import { Notifications } from "./notifications";
import { getUnreadNotificationsUseCase } from "@/use-cases/notifications";

export async function HeaderActions() {
  const { user } = await getSession();
  const isLoggedIn = !!user;

  if (!isLoggedIn)
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
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
        <MenuButton />
      </div>
    </div>
  );
}

export async function NotificationsWrapper() {
  const { user } = await getSession();

  if (!user) {
    return null;
  }

  const notifications = await getUnreadNotificationsUseCase(user.id, 3);

  return <Notifications notifications={notifications} />;
}
