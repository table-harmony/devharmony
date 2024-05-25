import { db } from "@/db";
import { magicLinkTokens, verificationTokens } from "@/db/schema";

import { toDtoMapper } from "./get.persistence";
import { CreateTokenDto, TokenDto } from "../types";

export async function createMagicLinkToken(
  data: CreateTokenDto
): Promise<TokenDto> {
  const [token] = await db
    .insert(magicLinkTokens)
    .values({
      email: data.email,
      token: data.token,
      expiresAt: data.expiresAt,
    })
    .returning();

  return toDtoMapper(token);
}

export async function createVerificationToken(
  data: CreateTokenDto
): Promise<TokenDto> {
  const [token] = await db
    .insert(verificationTokens)
    .values({
      email: data.email,
      token: data.token,
      expiresAt: data.expiresAt,
    })
    .returning();

  return toDtoMapper(token);
}
