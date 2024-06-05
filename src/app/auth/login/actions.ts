"use server";

import { redirect } from "next/navigation";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

import {
  createMagicLinkToken,
  createTokenUseCase,
  deleteMagicLinkTokenByEmail,
  deleteTokenByEmailUseCase,
} from "@/infrastructure/tokens";

import { getIp } from "@/lib/get-ip";
import { sendEmail } from "@/lib/mail";
import { ActionError, unauthenticatedAction } from "@/lib/safe-action";

import { MagicLinkEmail } from "@/components/emails/magic-link";

import { schema } from "./validation";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(2, "10s"),
});

export const magicLinkLoginAction = unauthenticatedAction(
  schema,
  async ({ email }) => {
    const ip = getIp();
    const { success } = await ratelimit.limit(ip ?? "anonymous011");

    if (!success) throw new ActionError("Rate limit exceeded!");

    await deleteTokenByEmailUseCase(
      { deleteTokenByEmail: deleteMagicLinkTokenByEmail },
      { email },
    );

    const createdToken = await createTokenUseCase(
      { createToken: createMagicLinkToken },
      { email },
    );

    await sendEmail(
      createdToken.email,
      `Your magic link`,
      MagicLinkEmail({ token: createdToken.token }),
    );

    return redirect("/auth/magic");
  },
);
