import Link from "next/link";

import { CredentialsForm } from "./credentials-form";
import { Legend } from "../_components/legend";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function LoginPage() {
  return (
    <div className="container max-w-xl">
      <PageHeader className="items-center text-center">
        <PageHeaderHeading>Login</PageHeaderHeading>
        <PageHeaderDescription>
          Sign in to your account using the options below
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-6">
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
    </div>
  );
}
