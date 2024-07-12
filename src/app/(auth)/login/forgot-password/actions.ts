"use server";

import { forgotPasswordUseCase } from "@/use-cases/users";

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
    const token = await forgotPasswordUseCase(input.email);

    await sendEmail(
      input.email,
      `Your password reset link for ${siteConfig.name}`,
      ResetPasswordEmail({ token }),
    );

    redirect("/reset-password-email");
  });
