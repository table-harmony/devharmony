import Link from "next/link";

import { RegisterForm } from "./form";
import { Button } from "@/components/ui/button";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function RegisterPage() {
  return (
    <div className="container max-w-xl">
      <PageHeader className="items-center text-center">
        <PageHeaderHeading>Register</PageHeaderHeading>
        <PageHeaderDescription>
          Sign up to your account using the options below
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-6">
        <RegisterForm />
        <Button variant="link" className="w-full" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
