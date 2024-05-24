import Link from "next/link";
import { cn } from "@/lib/utils";

import { Legend } from "@/components/legend";
import { buttonVariants } from "@/components/ui/button";
import { CredentialsForm } from "../_components/credentials-form";

export default function CredentialsSignInPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="text-xl font-medium md:text-3xl">Login</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account using the options below
        </p>
      </header>
      <CredentialsForm />
      <Legend text="or" />
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        href="/register"
      >
        Sign up
      </Link>
    </div>
  );
}
