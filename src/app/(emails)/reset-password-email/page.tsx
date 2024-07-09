import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Image from "next/image";

export default function ResetPasswordEmail() {
  return (
    <div className="container max-w-xl">
      <PageHeader variant="center">
        <PageHeaderHeading>Reset link sent!</PageHeaderHeading>
        <PageHeaderDescription>
          A reset email has been sent to your registered email address. Please
          check your inbox to verify your account.
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex justify-center">
        <Image src="/assets/email.svg" alt="email" width="300" height="300" />
      </div>
    </div>
  );
}
