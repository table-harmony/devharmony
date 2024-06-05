"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

import {
  getUserByCredentialsUseCase,
  getUserByEmail,
} from "@/infrastructure/users";
import {
  createTokenUseCase,
  createVerificationToken,
} from "@/infrastructure/tokens";

import { lucia } from "@/lib/auth";
import { getIp } from "@/lib/get-ip";
import { sendEmail } from "@/lib/mail";
import { ActionError, unauthenticatedAction } from "@/lib/safe-action";

import { NewVerificationEmail } from "@/components/emails/new-verification";

import { schema } from "./validation";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "10s"),
});

export const credentialsLoginAction = unauthenticatedAction(
  schema,
  async ({ email, password }) => {
    const ip = getIp();
    const { success } = await ratelimit.limit(ip ?? "anonymous011");

    if (!success) throw new ActionError("Rate limit exceeded!");

    const user = await getUserByCredentialsUseCase(
      { getUserByEmail: getUserByEmail },
      { email, password },
    );

    if (!user.emailVerified) {
      const createdToken = await createTokenUseCase(
        { createToken: createVerificationToken },
        { email },
      );

      await sendEmail(
        createdToken.email,
        `Your verification link`,
        NewVerificationEmail({ token: createdToken.token }),
      );

      return redirect("/auth/new-verification");
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  },
);
