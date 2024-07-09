import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ResetPasswordForm } from "./form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    <div className="container max-w-lg">
      <PageHeader variant="center">
        <PageHeaderHeading>Reset password</PageHeaderHeading>
        <PageHeaderDescription>
          To reset your password, please fill the form below
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-6">
        <ResetPasswordForm token={searchParams.token} />
        <Button variant="link" className="w-full" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
