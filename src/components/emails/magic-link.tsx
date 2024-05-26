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

export function MagicLinkEmail({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Body>
        <Tailwind>
          <Container className="p-5 bg-gray-100 rounded-lg font-sans">
            <Text className="text-3xl font-bold text-gray-800">
              Welcome to DevHarmony
            </Text>
            <Text className="text-lg text-gray-800">
              Click the link below to login using the magic link:
            </Text>
            <Link
              href={`${domain}/api/auth/magic?token=${token}`}
              className="inline-block my-5 p-3 bg-blue-600 text-white rounded-md"
            >
              Login using magic link
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
