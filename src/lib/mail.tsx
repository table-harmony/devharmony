import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

const EMAIL_FROM = "onboarding@resend.dev";

export async function sendEmail(
  email: string,
  subject: string,
  body: React.ReactNode,
  from?: string,
) {
  const { error } = await resend.emails.send({
    from: from ?? EMAIL_FROM,
    to: email,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
}

export async function sendEmailBatch(
  emails: {
    from?: string;
    to: string;
    subject: string;
    body: React.ReactNode;
  }[],
) {
  const batch = emails.map((email) => ({
    from: email.from ?? EMAIL_FROM,
    to: email.to,
    subject: email.subject,
    react: <>{email.body}</>,
  }));

  const { error } = await resend.batch.send(batch);

  if (error) {
    throw error;
  }
}
