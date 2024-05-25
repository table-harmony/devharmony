import Link from "next/link";

import { Legend } from "@/components/legend";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./form";
import { LogInIcon } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="text-xl font-medium md:text-3xl">Register</h1>
        <p className="text-sm text-muted-foreground">
          Sign up to your account using the options below
        </p>
      </header>
      <RegisterForm />
      <Legend text="Or" />
      <Button variant="secondary" className="w-full" asChild>
        <Link href="/login">
          <LogInIcon className="mr-2 h-4 w-4" />
          Sign in
        </Link>
      </Button>
    </div>
  );
}
