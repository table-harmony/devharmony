"use server";

import { createUserUseCase } from "@/use-cases/users";
import { createVerificationTokenUseCase } from "@/use-cases/verification-tokens";

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
    const user = await createUserUseCase(input.email, input.password);

    const token = await createVerificationTokenUseCase(user.id);

    await sendEmail(
      user.email,
      `Verify your email for ${siteConfig.name}`,
      VerifyEmail({ token }),
    );

    redirect("/email-verification");
  });
