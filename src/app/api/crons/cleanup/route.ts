import { deleteExpiredPasswordResetTokensUseCase } from "@/use-cases/reset-tokens";
import { deleteExpiredVerificationTokensUseCase } from "@/use-cases/verification-tokens";
import { deleteExpiredMagicLinksUseCase } from "@/use-cases/magic-links";

import { env } from "@/env";

import { lucia } from "@/lib/auth";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${env.CRON_SECERT}`)
    return new Response("Unauthorized", { status: 401 });

  try {
    await lucia.deleteExpiredSessions();

    await deleteExpiredMagicLinksUseCase();
    await deleteExpiredPasswordResetTokensUseCase();
    await deleteExpiredVerificationTokensUseCase();
  } catch (e) {
    return new Response("Error", { status: 500 });
  }

  return Response.json({ success: true });
}
