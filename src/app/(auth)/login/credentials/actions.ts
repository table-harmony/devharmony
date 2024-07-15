"use server";

import { getUserByCredentialsUseCase } from "@/use-cases/users";
import { createVerificationTokenUseCase } from "@/use-cases/verification-tokens";

import { redirect } from "next/navigation";
import { z } from "zod";

import { siteConfig } from "@/config/site";

import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/utils/session";
import { sendEmail } from "@/lib/mail";

import { VerifyEmail } from "@/components/emails/verify-email";

export const credentialsLoginAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(5),
    }),
  )
  .handler(async ({ input }) => {
    const user = await getUserByCredentialsUseCase(input.email, input.password);

    if (!user.emailVerified) {
      const token = await createVerificationTokenUseCase(user.id);

      await sendEmail(
        user.email,
        `Verify your email for ${siteConfig.name}`,
        VerifyEmail({ token }),
      );

      redirect("/email-verification");
    }

    await setSession(user.id);
    redirect("/");
  });
