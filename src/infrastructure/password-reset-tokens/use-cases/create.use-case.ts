import { PasswordResetTokenEntity } from "../entity";
import { passwordResetTokenToCreateDto } from "../utils";
import {
  DeletePasswordResetToken,
  CreatePasswordResetToken,
  GetPasswordResetTokenByEmail,
} from "../types";
import { GetUserByEmail } from "@/infrastructure/users";

/**
 * @throws throws an error if user does not exist or token was not created
 */
export async function createPasswordResetTokenUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    getTokenByEmail: GetPasswordResetTokenByEmail;
    deleteToken: DeletePasswordResetToken;
    createToken: CreatePasswordResetToken;
  },
  data: { email: string; token?: string; expires?: Date }
) {
  const existingUser = await context.getUserByEmail(data.email);
  if (!existingUser) throw new Error("User does not exist!");

  const existingToken = await context.getTokenByEmail(data.email);
  if (existingToken) await context.deleteToken(existingToken.id);

  const token = new PasswordResetTokenEntity(data);
  await context.createToken(passwordResetTokenToCreateDto(token));

  const createdToken = await context.getTokenByEmail(token.getEmail());
  if (!createdToken) throw new Error("Password reset token was not created!");

  return createdToken;
}
