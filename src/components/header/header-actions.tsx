import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/utils/session";
import { MenuButton } from "./menu-button";
import { Notifications } from "./notifications";
import { SendFeedbackSheet } from "./send-feedback-sheet";

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SendFeedbackSheet>
              <Button size="icon" variant="ghost" aria-label="feedback">
                <MessageCircleIcon className="size-4" />
              </Button>
            </SendFeedbackSheet>
          </TooltipTrigger>
          <TooltipContent>Feedback</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Notifications />
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="hidden md:block">
        <ModeToggle variant="button" />
      </div>
      <div className="flex items-center md:ml-2">
        <MenuButton />
      </div>
    </div>
  );
}
