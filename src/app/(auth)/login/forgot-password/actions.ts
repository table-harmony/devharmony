"use server";

import { getUserByEmailUseCase } from "@/infrastructure/users";
import { createResetTokenUseCase } from "@/infrastructure/reset-tokens/use-cases";

import { redirect } from "next/navigation";
import { z } from "zod";

import { siteConfig } from "@/config/site";

import { unauthenticatedAction } from "@/lib/safe-action";
import { sendEmail } from "@/lib/mail";

import { ResetPasswordEmail } from "@/components/emails/reset-password";

export const forgotPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .handler(async ({ input }) => {
    const user = await getUserByEmailUseCase(input.email);

    if (!user) throw new Error("A user with that email doesn't exist!");

    const resetToken = await createResetTokenUseCase(user.id);

    await sendEmail(
      user.email,
      `Your password reset link for ${siteConfig.name}`,
      ResetPasswordEmail({ token: resetToken.token }),
    );

    redirect("/reset-password-email");
  });
