import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { TwoFactorConfirmation, twoFactorConfirmations } from "@/db/schema";

import type { TwoFactorConfirmationDto } from "@/use-cases";

export function toTwoFactorConfirmationDtoMapper(
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
  id: number
): Promise<TwoFactorConfirmation> {
  const foundConfirmation = await db.query.twoFactorConfirmations.findFirst({
    where: eq(twoFactorConfirmations.id, id),
  });

  if (!foundConfirmation) throw new Error("Two factor confirmation not found!");

  return toTwoFactorConfirmationDtoMapper(foundConfirmation);
}

export async function getTwoFactorConfirmationByUser(
  userId: number
): Promise<TwoFactorConfirmation | undefined> {
  const foundConfirmation = await db.query.twoFactorConfirmations.findFirst({
    where: eq(twoFactorConfirmations.userId, userId),
  });

  if (!foundConfirmation) return undefined;

  return toTwoFactorConfirmationDtoMapper(foundConfirmation);
}

export async function getTwoFactorConfirmations(): Promise<
  TwoFactorConfirmation[]
> {
  const twoFactorConfirmations =
    await db.query.twoFactorConfirmations.findMany();

  return twoFactorConfirmations.map(toTwoFactorConfirmationDtoMapper);
}
