import { env } from "@/env";
import { Body, Html, Link } from "@react-email/components";

const domain = env.NEXT_PUBLIC_APP_URL;

export function MagicLinkEmail({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Body />
      <Link href={`${domain}/api/login/magic?token=${token}`}>
        Login using magic link
      </Link>
    </Html>
  );
}
