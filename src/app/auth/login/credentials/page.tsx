import Link from "next/link";

import { CredentialsForm } from "./form";

import { Legend } from "@/app/auth/legend";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

export default function CredentialsLoginPage() {
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
      <Button variant="secondary" className="w-full" asChild>
        <Link href="/auth/register">
          <LogInIcon className="mr-2 h-4 w-4" />
          Sign up
        </Link>
      </Button>
    </div>
  );
}
