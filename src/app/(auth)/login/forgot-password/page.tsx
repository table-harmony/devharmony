import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ForgotPasswordForm } from "./form";

export default function ForgotPasswordPage() {
  return (
    <div className="container relative space-y-6 md:max-w-lg">
      <header className="text-center">
        <h1 className="text-3xl font-medium">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          To reset your password, please fill the form below
        </p>
      </header>
      <ForgotPasswordForm />
      <Button variant="link" className="w-full" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
    </div>
  );
}
