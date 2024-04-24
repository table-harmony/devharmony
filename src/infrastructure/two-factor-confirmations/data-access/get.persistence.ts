import "server-only";

import { db } from "@/db";
import { TwoFactorConfirmation, twoFactorConfirmations } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { TwoFactorConfirmationDto } from "../types";

function toDtoMapper(
  twoFactorConfirmation: TwoFactorConfirmation
): TwoFactorConfirmationDto {
  return {
    id: twoFactorConfirmation.id,
    userId: twoFactorConfirmation.userId,
  };
}

/**
 * @throws throws an error if two factor confirmation was not found
 */
export async function getTwoFactorConfirmation(
  id: string
): Promise<TwoFactorConfirmation> {
  const foundConfirmation = await db.query.twoFactorConfirmations.findFirst({
    where: eq(twoFactorConfirmations.id, id),
  });

  if (!foundConfirmation) throw new Error("Two factor confirmation not found!");

  return toDtoMapper(foundConfirmation);
}

export async function getTwoFactorConfirmationByUser(
  userId: string
): Promise<TwoFactorConfirmation | undefined> {
  const foundConfirmation = await db.query.twoFactorConfirmations.findFirst({
    where: eq(twoFactorConfirmations.userId, userId),
  });

  if (!foundConfirmation) return undefined;

  return toDtoMapper(foundConfirmation);
}

export async function getTwoFactorConfirmations(): Promise<
  TwoFactorConfirmation[]
> {
  const twoFactorConfirmations =
    await db.query.twoFactorConfirmations.findMany();

  return twoFactorConfirmations.map(toDtoMapper);
}
