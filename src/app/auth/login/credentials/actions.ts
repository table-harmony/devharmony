"use server";

import {
  getUserByCredentialsUseCase,
  getUserByEmail,
} from "@/infrastructure/users";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

import { getIp } from "@/lib/get-ip";
import {
  createTokenUseCase,
  createVerificationToken,
} from "@/infrastructure/tokens";
import { sendEmail } from "@/lib/mail";
import { NewVerificationEmail } from "@/components/emails/new-verification";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "10s"),
});

export async function credentialsLoginAction(email: string, password: string) {
  const ip = getIp();
  const { success } = await ratelimit.limit(ip ?? "anonymous011");

  if (!success) return { error: "Rate limit exceeded!" };

  try {
    const user = await getUserByCredentialsUseCase(
      { getUserByEmail: getUserByEmail },
      { email, password }
    );

    if (!user.emailVerified) {
      const createdToken = await createTokenUseCase(
        { createToken: createVerificationToken },
        { email }
      );

      await sendEmail(
        createdToken.email,
        `Your verification link`,
        NewVerificationEmail({ token: createdToken.token })
      );

      return { success: "Verification email sent!" };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (err) {
    const error = err as Error;
    return {
      error: error.message,
    };
  }

  return redirect("/");
}
