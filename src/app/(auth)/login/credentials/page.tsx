import Link from "next/link";

import { CredentialsForm } from "./form";
import { Button } from "@/components/ui/button";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function CredentialsLoginPage() {
  return (
    <div className="container max-w-lg">
      <PageHeader variant="center">
        <PageHeaderHeading>Login</PageHeaderHeading>
        <PageHeaderDescription>
          Sign in to your account using the options below
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-6">
        <CredentialsForm />
        <Button variant="link" className="w-full" asChild>
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
