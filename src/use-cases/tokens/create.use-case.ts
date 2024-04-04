import type { GetUserByEmail } from "@/use-cases";
import type {
  CreateToken,
  CreateTokenDto,
  DeleteToken,
  GetTokenByEmail,
} from "@/use-cases";
import { TokenEntity } from "@/entities";

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

  // user does not exist
  if (!existingUser) throw new Error("User does not exist!");

  const existingToken = await context.getTokenByEmail(existingUser.email);

  // delete existing token
  if (existingToken) await context.deleteToken(existingToken.id);

  const token = new TokenEntity({
    email: existingUser.email,
  });

  // create token
  await context.createToken(token.toCreateDto());

  const createdToken = await context.getTokenByEmail(data.email);

  // token was not created
  if (!createdToken) throw new Error("Token was not created!");

  return createdToken;
}
