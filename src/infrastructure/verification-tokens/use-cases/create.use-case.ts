import { VerificationTokenEntity } from "../entity";
import { verificationTokenToCreateDto } from "../utils";
import {
  DeleteVerificationToken,
  CreateVerificationToken,
  GetVerificationTokenByEmail,
} from "../types";
import { GetUserByEmail } from "@/infrastructure/users";

/**
 * @throws throws an error if user does not exist or token was not created
 */
export async function createVerificationTokenUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    getTokenByEmail: GetVerificationTokenByEmail;
    deleteToken: DeleteVerificationToken;
    createToken: CreateVerificationToken;
  },
  data: { email: string; token?: string; expires?: Date }
) {
  const existingUser = await context.getUserByEmail(data.email);
  if (!existingUser) throw new Error("User does not exist!");

  const existingToken = await context.getTokenByEmail(data.email);
  if (existingToken) await context.deleteToken(existingToken.id);

  const token = new VerificationTokenEntity(data);
  await context.createToken(verificationTokenToCreateDto(token));

  const createdToken = await context.getTokenByEmail(token.getEmail());
  if (!createdToken) throw new Error("Verification token was not created!");

  return createdToken;
}
