"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ChromeIcon, GithubIcon } from "lucide-react";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <ChromeIcon className="mr-2 h-4 w-4" /> Google
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <GithubIcon className="mr-2 h-4 w-4" /> Github
      </Button>
    </div>
  );
};
