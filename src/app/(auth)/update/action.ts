"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { UpdateSchema } from "../schemas";

import { currentUser } from "@/lib/auth/utils";

import { getUserUseCase, updateUserUseCase } from "@/use-cases";
import { getUser, updateUser } from "@/data-access";

export const updateAction = async (values: z.infer<typeof UpdateSchema>) => {
  const user = await currentUser();

  try {
    if (!user || !user.id) {
      throw new Error("Unauthorized!");
    }

    if (user.isOAuth) {
      throw new Error("OAuth accounts cannot update data!");
    }

    const dbUser = await getUserUseCase({ getUser: getUser }, { id: user.id });

    if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );

      if (!passwordsMatch) {
        throw new Error("Incorrect password!");
      }

      values.password = values.newPassword;
      values.newPassword = undefined;
    }

    const updatedUser = await updateUserUseCase(
      { getUser: getUser, updateUser: updateUser },
      { id: dbUser.id, ...values }
    );

    //TODO: update session
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "User Updated!" };
};
