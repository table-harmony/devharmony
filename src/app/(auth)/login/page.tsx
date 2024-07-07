import Link from "next/link";

import { CredentialsForm } from "./credentials-form";
import { Legend } from "../_components/legend";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="container relative space-y-6 md:max-w-lg">
      <header className="text-center">
        <h1 className="text-3xl font-medium">Login</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account using the options below
        </p>
      </header>
      <Button variant="secondary" className="w-full" asChild>
        <Link href="/api/auth/google">
          <ChromeIcon className="mr-2 h-4 w-4" />
          <span className="hidden md:block">Sign in with&nbsp;</span> Google
        </Link>
      </Button>
      <Legend text="sign in with credentials" />
      <CredentialsForm />
      <Button variant="link" className="w-full" asChild>
        <Link href="/register">Sign up</Link>
      </Button>
    </div>
  );
}
