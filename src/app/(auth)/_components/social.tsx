"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const Social = () => {
  const onClick = (provider: "google" | "github" | "discord") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
      <Button variant="outline" onClick={() => onClick("google")}>
        <Icons.google className="mr-2 h-4 w-4" /> Google
      </Button>
      <Button variant="outline" onClick={() => onClick("github")}>
        <Icons.gitHub className="mr-2 h-4 w-4" /> Github
      </Button>
      <Button variant="outline" onClick={() => onClick("discord")}>
        <Icons.discord className="mr-2 h-4 w-4" /> Discord
      </Button>
    </div>
  );
};
