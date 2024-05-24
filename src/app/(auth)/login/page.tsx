import Link from "next/link";
import { cn } from "@/lib/utils";

import { Legend } from "@/components/legend";
import { buttonVariants } from "@/components/ui/button";
import { MagicLinkForm } from "./magic-link-form";
import { Socials } from "./socials";
import { MailIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="font-medium text-3xl">Login</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account using the options below
        </p>
      </header>
      <Socials />
      <Legend text="sign in with Email" />
      <MagicLinkForm />
      <Legend text="more options" />
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        href="/login/credentials"
      >
        <MailIcon className="mr-2 h-4 w-4" />
        <span className="hidden md:block">Sign in with&nbsp;</span>
        Credentials
      </Link>
    </div>
  );
}
