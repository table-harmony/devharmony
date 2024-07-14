import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { siteConfig } from "@/config/site";
import { BASE_URL } from "@/utils/metadata";

export function FeedbackEmail({
  title,
  message,
  label,
}: {
  title: string;
  label: string;
  message: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Feedback</Preview>
      <Tailwind>
        <>
          <Body className="bg-white font-sans">
            <Section className="mb-[32px] mt-[32px]">
              <Text className="text-[24px] font-bold leading-[24px] text-black">
                {title}
              </Text>
              <Text className="flex items-center justify-center text-[12px] leading-[24px] text-[#666666]">
                {label}
              </Text>
              <Text className="text-[14px] leading-[24px] text-black">
                {message}
              </Text>
            </Section>
          </Body>
        </>
      </Tailwind>
    </Html>
  );
}
