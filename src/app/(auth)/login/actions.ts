"use server";

import { createMagicLinkUseCase } from "@/use-cases/magic-links";

import { z } from "zod";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";

import { sendEmail } from "@/lib/mail";
import { unauthenticatedAction } from "@/lib/safe-action";

import { MagicLinkEmail } from "@/components/emails/magic-link";

export const magicLinkLoginAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .handler(async ({ input }) => {
    const token = await createMagicLinkUseCase(input.email);

    await sendEmail(
      input.email,
      `Magic link sign in for ${siteConfig.name}`,
      MagicLinkEmail({ token }),
    );

    redirect("/magic-email");
  });
