import { env } from "@/env";
import { Body, Html, Link } from "@react-email/components";

const domain = env.NEXT_PUBLIC_APP_URL;

export function NewVerificationEmail({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Body />
      <Link href={`${domain}/api/auth/new-verification?token=${token}`}>
        Verify your email
      </Link>
    </Html>
  );
}
