import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  subject: string,
  body: React.ReactElement
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: subject,
    react: body,
  });
};
