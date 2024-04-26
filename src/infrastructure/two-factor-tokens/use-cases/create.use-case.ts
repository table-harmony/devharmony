import { TwoFactorTokenEntity } from "../entity";
import { twoFactorTokenToCreateDto } from "../utils";
import {
  DeleteTwoFactorToken,
  CreateTwoFactorToken,
  GetTwoFactorTokenByEmail,
} from "../types";
import { GetUserByEmail } from "@/infrastructure/users";

/**
 * @throws throws an error if user does not exist or token was not created
 */
export async function createTwoFactorTokenUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    getTokenByEmail: GetTwoFactorTokenByEmail;
    deleteToken: DeleteTwoFactorToken;
    createToken: CreateTwoFactorToken;
  },
  data: { email: string; token?: string; expires?: Date }
) {
  const existingUser = await context.getUserByEmail(data.email);
  if (!existingUser) throw new Error("User does not exist!");

  const existingToken = await context.getTokenByEmail(data.email);
  if (existingToken) await context.deleteToken(existingToken.id);

  const token = new TwoFactorTokenEntity(data);
  await context.createToken(twoFactorTokenToCreateDto(token));

  const createdToken = await context.getTokenByEmail(token.getEmail());
  if (!createdToken) throw new Error("Two factor token was not created!");

  return createdToken;
}
