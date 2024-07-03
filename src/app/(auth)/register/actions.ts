"use server";

import { createUserByCredentialsUseCase } from "@/infrastructure/users";
import { createVerificationUseCase } from "@/infrastructure/verification-tokens";

import { z } from "zod";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";

import { sendEmail } from "@/lib/mail";
import { unauthenticatedAction } from "@/lib/safe-action";

import { VerifyEmail } from "@/components/emails/verify-email";

export const registerAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(5),
    }),
  )
  .handler(async ({ input }) => {
    const user = await createUserByCredentialsUseCase(input);

    const verification = await createVerificationUseCase(user.id);
    await sendEmail(
      user.email,
      `Verify your email for ${siteConfig.name}`,
      VerifyEmail({ token: verification.token }),
    );

    redirect("/email-verification");
  });
