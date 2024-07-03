import { getUserUseCase, updateUserUseCase } from "@/infrastructure/users";
import {
  deleteVerificationUseCase,
  getVerificationUseCase,
} from "@/infrastructure/verification-tokens";

import { setSession } from "@/lib/session";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/email-verification/error?message=Missing token",
      },
    });

  try {
    const verification = await getVerificationUseCase(token);
    if (!verification) throw new Error("Invalid token!");

    await deleteVerificationUseCase(verification.token);

    if (verification.expiresAt.getTime() < Date.now())
      throw new Error("Expired token!");

    const existingUser = await getUserUseCase(verification.userId);

    if (!existingUser) throw new Error("User doesn't exist!");

    await updateUserUseCase(existingUser.id, { emailVerified: new Date() });

    await setSession(existingUser.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/email-verification/error?message=${error.message}`,
      },
    });
  }
}
