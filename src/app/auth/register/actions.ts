"use server";

import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

import {
  createVerificationToken,
  createTokenUseCase,
} from "@/infrastructure/tokens";
import {
  createUser,
  getUserByEmail,
  createUserUseCase,
} from "@/infrastructure/users";

import { sendEmail } from "@/lib/mail";
import { getIp } from "@/lib/get-ip";

import { NewVerificationEmail } from "@/components/emails/new-verification";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(2, "10s"),
});

export async function registerAction(email: string, password: string) {
  const ip = getIp();
  const { success } = await ratelimit.limit(ip ?? "anonymous011");

  if (!success) return { error: "Rate limit exceeded!" };

  await createUserUseCase(
    { getUserByEmail: getUserByEmail, createUser: createUser },
    { email, password }
  );

  const createdToken = await createTokenUseCase(
    { createToken: createVerificationToken },
    { email }
  );

  await sendEmail(
    createdToken.email,
    `Your verification link`,
    NewVerificationEmail({ token: createdToken.token })
  );

  return redirect("/auth/new-verification");
}
