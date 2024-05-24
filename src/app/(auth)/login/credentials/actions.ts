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

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "10s"),
});

export async function loginAction(email: string, password: string) {
  try {
    const ip = getIp();
    const { success } = await ratelimit.limit(ip ?? "anonymous011");

    if (!success)
      throw new Error(`Rate limit exceeded! Try again in a couple of seconds!`);

    const user = await getUserByCredentialsUseCase(
      { getUserByEmail: getUserByEmail },
      { email, password }
    );
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
