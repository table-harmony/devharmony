"use server";

import { createUser } from "@/infrastructure/users/data-access/create.persistence";
import { getUserByEmail } from "@/infrastructure/users/data-access/get.persistence";
import { createUserUseCase } from "@/infrastructure/users/use-cases/create.use-case";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(email: string, password: string) {
  try {
    const user = await createUserUseCase(
      { getUserByEmail: getUserByEmail, createUser: createUser },
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
