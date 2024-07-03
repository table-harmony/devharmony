import Link from "next/link";

import { RegisterForm } from "./form";
import { Legend } from "../_components/legend";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="container relative space-y-6 md:max-w-lg">
      <header className="text-center">
        <h1 className="text-3xl font-medium">Register</h1>
        <p className="text-sm text-muted-foreground">
          Sign up to your account using the options below
        </p>
      </header>
      <RegisterForm />
      <Legend text="or" />
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
    </div>
  );
}
