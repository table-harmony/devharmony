import Link from "next/link";

import { Legend } from "../_components/legend";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { MagicLinkForm } from "./magic-link-form";

export default function LoginPage() {
  return (
    <div className="container max-w-lg">
      <PageHeader variant="center">
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
        <Legend text="sign in with email" />
        <MagicLinkForm />
        <Button variant="link" className="w-full" asChild>
          <Link href="/login/credentials">Sign in with credentials</Link>
        </Button>
      </div>
    </div>
  );
}
