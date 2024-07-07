import { verifyEmailUseCase } from "@/infrastructure/users";

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
    const userId = await verifyEmailUseCase(token);

    await setSession(userId);
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
