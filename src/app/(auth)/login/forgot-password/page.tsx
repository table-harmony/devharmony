import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ForgotPasswordForm } from "./form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function ForgotPasswordPage() {
  return (
    <div className="container max-w-lg">
      <PageHeader variant="center">
        <PageHeaderHeading>Reset password</PageHeaderHeading>
        <PageHeaderDescription>
          To reset your password, please fill the form below
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-6">
        <ForgotPasswordForm />
        <Button variant="link" className="w-full" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
