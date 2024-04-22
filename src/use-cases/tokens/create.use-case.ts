import { TokenEntity } from "@/entities";
import { GetUserByEmail } from "@/use-cases/users";
import {
  CreateToken,
  CreateTokenDto,
  DeleteToken,
  GetTokenByEmail,
} from "./types";
import { tokenToCreateDto } from "./utils";

/**
 * @throws throws an error if user does not exist or token was not created
 */
export async function createTokenUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    getTokenByEmail: GetTokenByEmail;
    deleteToken: DeleteToken;
    createToken: CreateToken;
  },
  data: CreateTokenDto
) {
  const existingUser = await context.getUserByEmail(data.email);
  if (!existingUser) throw new Error("User does not exist!");

  const existingToken = await context.getTokenByEmail(existingUser.email);
  if (existingToken) await context.deleteToken(existingToken.id);

  const token = new TokenEntity(data);
  await context.createToken(tokenToCreateDto(token));

  const createdToken = await context.getTokenByEmail(data.email);
  if (!createdToken) throw new Error("Token was not created!");

  return createdToken;
}
