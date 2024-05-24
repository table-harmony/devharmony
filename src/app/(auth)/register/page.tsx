import Link from "next/link";

import { Legend } from "@/components/legend";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { RegisterForm } from "./form";

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
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        href="/login"
      >
        Sign in
      </Link>
    </div>
  );
}
