"use server";

import {
  getUserByCredentialsUseCase,
  getUserByEmail,
} from "@/infrastructure/users";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  try {
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
