"use server";

import { getUserByEmailUseCase } from "@/infrastructure/users";
import { createResetTokenUseCase } from "@/infrastructure/reset-tokens";

import { z } from "zod";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";

import { sendEmail } from "@/lib/mail";
import { unauthenticatedAction } from "@/lib/safe-action";

import { ResetPasswordEmail } from "@/components/emails/reset-password";

export const resetPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .handler(async ({ input }) => {
    const user = await getUserByEmailUseCase(input.email);

    if (!user) throw new Error("A user with this email doesn't exist!");

    const token = await createResetTokenUseCase(user.id);
    await sendEmail(
      input.email,
      `Password reset for ${siteConfig.name}`,
      ResetPasswordEmail({ token }),
    );

    redirect("/reset-password");
  });
