"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutAction(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return { error: "Unauthorized!" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

interface ActionResult {
  error: string | null;
}
