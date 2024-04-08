"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";
import { ChromeIcon, GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
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
