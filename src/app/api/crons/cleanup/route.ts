import { env } from "@/env";

import { lucia } from "@/lib/auth";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${env.CRON_SECERT}`)
    return new Response("Unauthorized", { status: 401 });

  try {
    await lucia.deleteExpiredSessions();

    //TODO: delete expired verification tokens
  } catch (e) {
    return new Response("Error", { status: 500 });
  }

  return Response.json({ success: true });
}
