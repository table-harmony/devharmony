import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

const EMAIL_FROM = "mail@devharmony.io";

export async function sendEmail(
  email: string,
  subject: string,
  body: React.ReactNode,
) {
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
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
    to: string;
    subject: string;
    body: React.ReactNode;
  }[],
) {
  const batch = emails.map((email) => ({
    from: EMAIL_FROM,
    to: email.to,
    subject: email.subject,
    react: <>{email.body}</>,
  }));

  const { error } = await resend.batch.send(batch);

  if (error) {
    throw error;
  }
}
