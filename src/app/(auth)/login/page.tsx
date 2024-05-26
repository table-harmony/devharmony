import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Legend } from "@/components/legend";
import { Icons } from "@/components/icons";
import { MagicLinkForm } from "./magic-link-form";

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
      <Button variant="secondary" className="w-full" asChild>
        <Link href="/api/auth/google">
          <Icons.google className="mr-2 h-4 w-4" />
          <span className="hidden md:block">Sign in with&nbsp;</span> Google
        </Link>
      </Button>
      <Legend text="sign in with Email" />
      <MagicLinkForm />
      <Legend text="more options" />
      <Button variant="secondary" className="w-full" asChild>
        <Link href="/login/credentials">
          <MailIcon className="mr-2 h-4 w-4" />
          <span className="hidden md:block">Sign in with&nbsp;</span>
          Credentials
        </Link>
      </Button>
    </div>
  );
}
