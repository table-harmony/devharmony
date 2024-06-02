import { env } from "@/env";
import {
  Body,
  Container,
  Html,
  Link,
  Tailwind,
  Text,
} from "@react-email/components";

const domain = env.NEXT_PUBLIC_APP_URL;

export function NewVerificationEmail({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Body>
        <Tailwind>
          <Container className="rounded-lg bg-gray-100 p-5 font-sans">
            <Text className="text-3xl font-bold text-gray-800">
              Welcome to DevHarmony
            </Text>
            <Text className="text-lg text-gray-800">
              Click the link below to verify your email:
            </Text>
            <Link
              href={`${domain}/api/auth/new-verification?token=${token}`}
              className="my-5 inline-block rounded-md bg-blue-600 p-3 text-white"
            >
              Verify your email
            </Link>
            <Text className="text-xs text-gray-600">
              If you didn&apos;t request this email, please ignore it.
            </Text>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
}
