import { CreateToken } from "../types";
import { generateToken } from "../utils";

export async function createTokenUseCase(
  context: {
    createToken: CreateToken;
  },
  data: { email: string }
) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  const createdToken = await context.createToken({
    email: data.email,
    token: token,
    expiresAt: expiresAt,
  });

  return createdToken;
}
