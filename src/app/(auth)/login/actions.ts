"use server";

import { getUserByCredentialsUseCase } from "@/infrastructure/users";
import { createVerificationUseCase } from "@/infrastructure/verification-tokens";

import { redirect } from "next/navigation";
import { z } from "zod";

import { siteConfig } from "@/config/site";

import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { sendEmail } from "@/lib/mail";

import { VerifyEmail } from "@/components/emails/verify-email";

export const loginAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(5),
    }),
  )
  .handler(async ({ input }) => {
    const user = await getUserByCredentialsUseCase(input);

    if (!user.emailVerified) {
      const verification = await createVerificationUseCase(user.id);

      await sendEmail(
        user.email,
        `Verify your email for ${siteConfig.name}`,
        VerifyEmail({ token: verification.token }),
      );

      redirect("/email-verification");
    }

    await setSession(user.id);
    redirect("/");
  });
